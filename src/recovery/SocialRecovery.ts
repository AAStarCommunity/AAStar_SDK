import { Interface } from '@ethersproject/abi';
import { AirAccount, Transaction } from '../AirAccount';

const SocialRecoveryAbi = [
    'function addGuardian(address guardian)',
    'function removeGuardian(address guardian)',
    'function initiateRecovery(address newOwner)',
];

export class SocialRecovery {
    private account: AirAccount;
    private static readonly iface = new Interface(SocialRecoveryAbi);

    constructor(account: AirAccount) {
        this.account = account;
    }

    /**
     * Prepares the transaction data to add a guardian.
     * @param guardianAddress The address of the guardian to add.
     * @returns A transaction object to be used in a UserOperation.
     */
    async addGuardian(guardianAddress: string): Promise<Transaction> {
        const calldata = SocialRecovery.iface.encodeFunctionData('addGuardian', [guardianAddress]);
        return {
            to: await this.account.getAccountAddress(),
            data: calldata,
            value: 0n,
        };
    }

    /**
     * Prepares the transaction data to remove a guardian.
     * @param guardianAddress The address of the guardian to remove.
     * @returns A transaction object to be used in a UserOperation.
     */
    async removeGuardian(guardianAddress: string): Promise<Transaction> {
        const calldata = SocialRecovery.iface.encodeFunctionData('removeGuardian', [guardianAddress]);
        return {
            to: await this.account.getAccountAddress(),
            data: calldata,
            value: 0n,
        };
    }

    /**
     * Prepares the transaction data to initiate the recovery process.
     * @param newOwnerAddress The address of the new proposed owner.
     * @returns A transaction object to be used in a UserOperation.
     */
    async initiateRecovery(newOwnerAddress: string): Promise<Transaction> {
        const calldata = SocialRecovery.iface.encodeFunctionData('initiateRecovery', [newOwnerAddress]);
        return {
            to: await this.account.getAccountAddress(),
            data: calldata,
            value: 0n,
        };
    }
}