import { JsonRpcProvider } from '@ethersproject/providers';
import { AirAccount } from '../AirAccount';
import { ViemSigner } from '../signer/Signer';
import { UserOperationStruct } from '@account-abstraction/contracts';
import { SuperRelayClient } from './SuperRelayClient';
import { UserOpReq } from '../types/response';
import { PaymasterError, NetworkError, SdkError } from '../types/errors';
import { NetworkManager, NetworkConfig } from '../network/NetworkManager';

export interface AAStarClientConfig {
  networkName: string;
}

export interface SendUserOperationOptions {
  withPaymaster?: boolean;
  forceStrategyId?: string;
}

export class AAStarClient {
  private provider: JsonRpcProvider;
  private superRelayClient: SuperRelayClient;
  private bundlerUrl: string;
  private entryPointAddress: string;
  private factoryAddress: string;
  public readonly networkConfig: NetworkConfig;

  constructor(config: AAStarClientConfig) {
    this.networkConfig = NetworkManager.getNetworkConfig(config.networkName);

    this.bundlerUrl = this.networkConfig.bundlerUrl;
    this.entryPointAddress = this.networkConfig.entryPointAddress;
    this.factoryAddress = this.networkConfig.factoryAddress;

    this.provider = new JsonRpcProvider(this.bundlerUrl);
    this.superRelayClient = new SuperRelayClient({ baseURL: this.networkConfig.paymasterUrl });
  }

  async authPaymaster(apiKey: string) {
    return this.superRelayClient.auth(apiKey);
  }

  createAccount(signer: ViemSigner): AirAccount {
    return new AirAccount({
      signer,
      rpcUrl: this.bundlerUrl,
      entryPointAddress: this.entryPointAddress,
      factoryAddress: this.factoryAddress,
    });
  }

  async sponsorUserOperation(userOp: UserOperationStruct, forceStrategyId?: string): Promise<string> {
    const userOperationForReq = {
        sender: String(userOp.sender),
        nonce: String(userOp.nonce),
        initCode: String(userOp.initCode),
        callData: String(userOp.callData),
        callGasLimit: String(userOp.callGasLimit),
        verificationGasLimit: String(userOp.verificationGasLimit),
        preVerificationGas: String(userOp.preVerificationGas),
        maxFeePerGas: String(userOp.maxFeePerGas),
        maxPriorityFeePerGas: String(userOp.maxPriorityFeePerGas),
        paymasterAndData: String(userOp.paymasterAndData),
        signature: String(userOp.signature),
    };

    const userOpReq: UserOpReq = {
        forceStrategyId: forceStrategyId || '',
        userOperation: userOperationForReq,
    };

    const paymasterResponse = await this.superRelayClient.tryPayUserOperationV1(userOpReq);
    return paymasterResponse.data.paymaster_and_data;
  }

  async sendUserOperation(
    account: AirAccount,
    userOp: UserOperationStruct,
    options?: SendUserOperationOptions
  ): Promise<`0x${string}`> {
    console.log('Preparing user operation...');
    const userOpToSend = { ...userOp };

    if (options?.withPaymaster) {
      console.log('Requesting paymaster sponsorship...');
      try {
        const paymasterAndData = await this.sponsorUserOperation(userOpToSend, options.forceStrategyId);
        userOpToSend.paymasterAndData = paymasterAndData;
      } catch (error: any) {
        if (error instanceof SdkError) {
          throw error;
        }
        throw new PaymasterError(`Failed to get paymaster sponsorship: ${error.message}`);
      }
    }

    console.log('Signing and sending user operation...');
    try {
      const signedUserOp = {
        ...userOpToSend,
        signature: await account.signUserOperation(userOpToSend),
      };

      const userOpHash = await this.provider.send('eth_sendUserOperation', [
        signedUserOp,
        this.entryPointAddress,
      ]);

      return userOpHash as `0x${string}`;
    } catch (error: any) {
      throw new NetworkError(`Failed to send user operation: ${error.message}`);
    }
  }

  async getUserOperationReceipt(userOpHash: `0x${string}`): Promise<any> {
    try {
      const receipt = await this.provider.send('eth_getUserOperationReceipt', [userOpHash]);
      return receipt;
    } catch (error: any) {
      throw new NetworkError(`Failed to get user operation receipt: ${error.message}`);
    }
  }
}