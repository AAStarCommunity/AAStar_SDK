import { UserOperationStruct } from '@account-abstraction/contracts';
import { ViemSigner } from './signer/Signer';
import { SocialRecovery } from './recovery/SocialRecovery';
export interface Transaction {
    to: string;
    value?: bigint;
    data?: string;
}
export declare class AirAccount {
    private simpleAccountAPI;
    readonly recovery: SocialRecovery;
    constructor(params: {
        signer: ViemSigner;
        rpcUrl: string;
        entryPointAddress: string;
        factoryAddress: string;
    });
    getAccountAddress(): Promise<`0x${string}`>;
    getNonce(): Promise<number>;
    signUserOperation(userOp: UserOperationStruct): Promise<`0x${string}`>;
    getAccountInitCode(): Promise<`0x${string}`>;
    createUnsignedUserOperation(tx: Transaction): Promise<UserOperationStruct>;
    createUnsignedBatchUserOperation(txs: Transaction[]): Promise<UserOperationStruct>;
}
