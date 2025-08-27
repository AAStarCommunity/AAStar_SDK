import { AirAccount } from '../AirAccount';
import { ViemSigner } from '../signer/Signer';
import { UserOperationStruct } from '@account-abstraction/contracts';
export interface AAStarClientConfig {
    bundlerUrl: string;
    entryPointAddress: string;
    factoryAddress: string;
    paymasterUrl?: string;
}
export interface SendUserOperationOptions {
    withPaymaster?: boolean;
    forceStrategyId?: string;
}
export declare class AAStarClient {
    private provider;
    private superRelayClient;
    private bundlerUrl;
    private entryPointAddress;
    private factoryAddress;
    constructor(config: AAStarClientConfig);
    authPaymaster(apiKey: string): Promise<import("../types/response").AuthRes>;
    createAccount(signer: ViemSigner): AirAccount;
    sponsorUserOperation(userOp: UserOperationStruct, forceStrategyId?: string): Promise<string>;
    sendUserOperation(account: AirAccount, userOp: UserOperationStruct, options?: SendUserOperationOptions): Promise<`0x${string}`>;
    getUserOperationReceipt(userOpHash: `0x${string}`): Promise<any>;
}
