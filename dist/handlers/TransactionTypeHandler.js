"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypeHandler = void 0;
const viem_1 = require("viem");
// Minimal ABI for ERC20 transfer
const erc20Abi = [{
        constant: false,
        inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function'
    }];
// Minimal ABI for ERC721 minting
const erc721Abi = [{
        inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
        name: 'safeMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }];
class TransactionTypeHandler {
    constructor(client, account) {
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
    async executeERC20Transfer(tokenAddress, to, amount, options) {
        const callData = (0, viem_1.encodeFunctionData)({
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
    async executeNFTMint(nftAddress, to, options) {
        const callData = (0, viem_1.encodeFunctionData)({
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
    async executeDAppInteraction(contractAddress, callData, options) {
        const userOp = await this.account.createUnsignedUserOperation({
            to: contractAddress,
            data: callData,
        });
        return this.client.sendUserOperation(this.account, userOp, options);
    }
}
exports.TransactionTypeHandler = TransactionTypeHandler;
