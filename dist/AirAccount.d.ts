import { WalletClient } from 'viem';
import { UserOperationStruct } from '@account-abstraction/contracts';
export declare class AirAccount {
    private simpleAccountAPI;
    constructor(params: {
        signer: WalletClient;
        rpcUrl: string;
        entryPointAddress: string;
        factoryAddress: string;
    });
    getAccountAddress(): Promise<`0x${string}`>;
    getNonce(): Promise<number>;
    signUserOperation(userOp: UserOperationStruct): Promise<`0x${string}`>;
    getAccountInitCode(): Promise<`0x${string}`>;
}
