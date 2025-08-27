import { AAStarClient, SendUserOperationOptions } from '../client/AAStarClient';
import { AirAccount } from '../AirAccount';
export declare class TransactionTypeHandler {
    private client;
    private account;
    constructor(client: AAStarClient, account: AirAccount);
    /**
     * Executes an ERC20 token transfer.
     * @param tokenAddress The address of the ERC20 token contract.
     * @param to The recipient's address.
     * @param amount The amount of tokens to transfer (in the token's smallest unit).
     * @param options Options for sending the UserOperation (e.g., with paymaster).
     * @returns The UserOperation hash.
     */
    executeERC20Transfer(tokenAddress: `0x${string}`, to: `0x${string}`, amount: bigint, options?: SendUserOperationOptions): Promise<`0x${string}`>;
    /**
     * Executes an NFT mint transaction.
     * @param nftAddress The address of the ERC721 contract.
     * @param to The address to mint the NFT to.
     * @param options Options for sending the UserOperation (e.g., with paymaster).
     * @returns The UserOperation hash.
     */
    executeNFTMint(nftAddress: `0x${string}`, to: `0x${string}`, options?: SendUserOperationOptions): Promise<`0x${string}`>;
    /**
     * Executes a generic DApp interaction.
     * @param contractAddress The address of the contract to interact with.
     * @param callData The encoded function call data.
     * @param options Options for sending the UserOperation (e.g., with paymaster).
     * @returns The UserOperation hash.
     */
    executeDAppInteraction(contractAddress: `0x${string}`, callData: `0x${string}`, options?: SendUserOperationOptions): Promise<`0x${string}`>;
}
