import { WalletClient } from 'viem';
import { SimpleAccountAPI } from '@account-abstraction/sdk';
import { JsonRpcProvider } from '@ethersproject/providers';
import { UserOperationStruct } from '@account-abstraction/contracts';

export class AirAccount {
  private simpleAccountAPI: SimpleAccountAPI;

  constructor(params: {
    signer: WalletClient;
    rpcUrl: string;
    entryPointAddress: string;
    factoryAddress: string;
  }) {
    const provider = new JsonRpcProvider(params.rpcUrl);
    this.simpleAccountAPI = new SimpleAccountAPI({
      owner: params.signer as any,
      provider,
      entryPointAddress: params.entryPointAddress,
      factoryAddress: params.factoryAddress,
    });
  }

  async getAccountAddress(): Promise<`0x${string}`> {
    return this.simpleAccountAPI.getAccountAddress() as Promise<`0x${string}`>;
  }

  async getNonce(): Promise<number> {
    const nonce = await this.simpleAccountAPI.getNonce();
    return nonce.toNumber();
  }

  async signUserOperation(userOp: UserOperationStruct): Promise<`0x${string}`> {
    const signedUserOp = await this.simpleAccountAPI.signUserOp(userOp);
    return signedUserOp.signature as `0x${string}`;
  }

  async getAccountInitCode(): Promise<`0x${string}`> {
    return this.simpleAccountAPI.getInitCode() as Promise<`0x${string}`>;
  }
}