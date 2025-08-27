import { encodeFunctionData } from 'viem';
import { AAStarClient, SendUserOperationOptions } from '../client/AAStarClient';
import { AirAccount } from '../AirAccount';

// Minimal ABI for ERC20 transfer
const erc20Abi = [{
    constant: false,
    inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
}] as const;

// Minimal ABI for ERC721 minting
const erc721Abi = [{
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
}] as const;

export class TransactionTypeHandler {
    private client: AAStarClient;
    private account: AirAccount;

    constructor(client: AAStarClient, account: AirAccount) {
        this.client = client;
        this.account = account;
    }

    /**
     * Executes an ERC20 token transfer.
     * @param tokenAddress The address of the ERC20 token contract.
     * @param to The recipient's address.
     * @param amount The amount of tokens to transfer (in the token's smallest unit).
     * @param options Options for sending the UserOperation (e.g., with paymaster).
     * @returns The UserOperation hash.
     */
    async executeERC20Transfer(
        tokenAddress: `0x${string}`,
        to: `0x${string}`,
        amount: bigint,
        options?: SendUserOperationOptions
    ): Promise<`0x${string}`> {
        const callData = encodeFunctionData({
            abi: erc20Abi,
            functionName: 'transfer',
            args: [to, amount]
        });

        const userOp = await this.account.createUnsignedUserOperation({
            to: tokenAddress,
            data: callData,
        });

        return this.client.sendUserOperation(this.account, userOp, options);
    }

    /**
     * Executes an NFT mint transaction.
     * @param nftAddress The address of the ERC721 contract.
     * @param to The address to mint the NFT to.
     * @param options Options for sending the UserOperation (e.g., with paymaster).
     * @returns The UserOperation hash.
     */
    async executeNFTMint(
        nftAddress: `0x${string}`,
        to: `0x${string}`,
        options?: SendUserOperationOptions
    ): Promise<`0x${string}`> {
        const callData = encodeFunctionData({
            abi: erc721Abi,
            functionName: 'safeMint',
            args: [to]
        });

        const userOp = await this.account.createUnsignedUserOperation({
            to: nftAddress,
            data: callData,
        });

        return this.client.sendUserOperation(this.account, userOp, options);
    }

    /**
     * Executes a generic DApp interaction.
     * @param contractAddress The address of the contract to interact with.
     * @param callData The encoded function call data.
     * @param options Options for sending the UserOperation (e.g., with paymaster).
     * @returns The UserOperation hash.
     */
    async executeDAppInteraction(
        contractAddress: `0x${string}`,
        callData: `0x${string}`,
        options?: SendUserOperationOptions
    ): Promise<`0x${string}`> {
        const userOp = await this.account.createUnsignedUserOperation({
            to: contractAddress,
            data: callData,
        });

        return this.client.sendUserOperation(this.account, userOp, options);
    }
}
