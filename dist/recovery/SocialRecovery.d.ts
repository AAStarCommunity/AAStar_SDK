import { AirAccount, Transaction } from '../AirAccount';
export declare class SocialRecovery {
    private account;
    private static readonly iface;
    constructor(account: AirAccount);
    /**
     * Prepares the transaction data to add a guardian.
     * @param guardianAddress The address of the guardian to add.
     * @returns A transaction object to be used in a UserOperation.
     */
    addGuardian(guardianAddress: string): Promise<Transaction>;
    /**
     * Prepares the transaction data to remove a guardian.
     * @param guardianAddress The address of the guardian to remove.
     * @returns A transaction object to be used in a UserOperation.
     */
    removeGuardian(guardianAddress: string): Promise<Transaction>;
    /**
     * Prepares the transaction data to initiate the recovery process.
     * @param newOwnerAddress The address of the new proposed owner.
     * @returns A transaction object to be used in a UserOperation.
     */
    initiateRecovery(newOwnerAddress: string): Promise<Transaction>;
}
