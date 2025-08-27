import { AAStarClient } from '../client/AAStarClient';
import { Signer } from '../signer/Signer';
import { AirAccount } from '../AirAccount';
export interface TestUser {
    name: string;
    signer: ReturnType<typeof Signer.createLocalSigner>;
    account: AirAccount;
    description: string;
}
export declare class TestAccountManager {
    private client;
    private accounts;
    constructor(client: AAStarClient);
    createAliceAccount(): Promise<TestUser>;
    createBobAccount(): Promise<TestUser>;
    createCharlieAccount(): Promise<TestUser>;
    getAccount(name: 'Alice' | 'Bob' | 'Charlie'): TestUser | undefined;
    fundAccount(name: string, amount: string): Promise<void>;
    getAccountBalance(name: string): Promise<string>;
}
