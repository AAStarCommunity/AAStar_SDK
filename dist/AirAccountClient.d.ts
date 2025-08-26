import { AirAccount } from './AirAccount';
import { UserOperationStruct } from '@account-abstraction/contracts';
export declare class AirAccountClient {
    account: AirAccount;
    bundlerUrl: string;
    private provider;
    constructor(params: {
        account: AirAccount;
        bundlerUrl: string;
    });
    sendUserOperation(userOp: UserOperationStruct): Promise<`0x${string}`>;
    getUserOperationReceipt(userOpHash: `0x${string}`): Promise<any>;
}
