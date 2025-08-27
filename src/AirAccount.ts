import { SimpleAccountAPI } from '@account-abstraction/sdk';
import { JsonRpcProvider } from '@ethersproject/providers';
import { UserOperationStruct } from '@account-abstraction/contracts';
import { BigNumber } from 'ethers';
import { ViemSigner } from './signer/Signer';
import { Interface } from '@ethersproject/abi';
import { SocialRecovery } from './recovery/SocialRecovery';
import { ValidationError } from './types/errors';

const SimpleAccountAbi = ['function executeBatch(address[] calldata dest, bytes[] calldata func)'];

export interface Transaction {
  to: string;
  value?: bigint;
  data?: string;
}

export class AirAccount {
  private simpleAccountAPI: SimpleAccountAPI;
  public readonly recovery: SocialRecovery;

  constructor(params: {
    signer: ViemSigner;
    rpcUrl: string;
    entryPointAddress: string;
    factoryAddress: string;
  }) {
    const { signer, rpcUrl, entryPointAddress, factoryAddress } = params;
    const provider = new JsonRpcProvider(rpcUrl);

    if (!signer.account) {
        throw new ValidationError("Viem signer is missing an account.");
    }

    const ownerAdapter = {
        _isSigner: true,
        getAddress: async () => signer.account!.address,
        signMessage: async (message: any) => signer.signMessage({
            account: signer.account!,
            message: { raw: message }
        }),
        _signTypedData: async (domain: any, types: any, userOp: any) => {
            const { EIP712Domain: _, ...otherTypes } = types;
            return signer.signTypedData({
                account: signer.account!,
                domain,
                types: otherTypes,
                primaryType: 'UserOperation',
                message: userOp
            });
        }
    };

    this.simpleAccountAPI = new SimpleAccountAPI({
      owner: ownerAdapter as any,
      provider,
      entryPointAddress: entryPointAddress,
      factoryAddress: factoryAddress,
    });
    this.recovery = new SocialRecovery(this);
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

  async createUnsignedUserOperation(tx: Transaction): Promise<UserOperationStruct> {
    if (!tx.to) {
      throw new Error('Transaction "to" address is missing');
    }
    const userOp = await this.simpleAccountAPI.createUnsignedUserOp({
      target: tx.to,
      value: tx.value ? `0x${tx.value.toString(16)}` : '0x0',
      data: tx.data || '0x',
    });
    return userOp as UserOperationStruct;
  }

  async createUnsignedBatchUserOperation(txs: Transaction[]): Promise<UserOperationStruct> {
    if (!txs || txs.length === 0) {
        throw new Error('Transaction array must not be empty.');
    }

    const destinations: string[] = [];
    const calldatas: string[] = [];

    for (const tx of txs) {
        if (!tx.to) {
            throw new Error('Each transaction in the batch must have a "to" address.');
        }
        if (tx.value && BigInt(tx.value) > 0) {
            console.warn('Batching native ETH transfers is not directly supported by this method. The "value" field will be ignored.');
        }
        destinations.push(tx.to);
        calldatas.push(tx.data || '0x');
    }

    const accountInterface = new Interface(SimpleAccountAbi);
    const encodedExecuteBatch = accountInterface.encodeFunctionData('executeBatch', [
        destinations,
        calldatas,
    ]);

    const userOp = await this.simpleAccountAPI.createUnsignedUserOp({
        target: await this.getAccountAddress(),
        data: encodedExecuteBatch,
    });

    return userOp as UserOperationStruct;
  }
}