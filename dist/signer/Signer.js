"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const errors_1 = require("../types/errors");
/**
 * The Signer class provides utility methods for creating and managing signers.
 * It is designed to be extensible for different signer types (e.g., local, passkey).
 */
class Signer {
    /**
     * Creates a local signer from a private key.
     * This method handles key validation and formatting.
     *
     * @param privateKey - The private key as a hex string (with or without '0x' prefix).
     * @returns A Viem WalletClient instance, ready to be used with AirAccount.
     * @throws An error if the private key is invalid.
     */
    static createLocalSigner(privateKey) {
        const formattedKey = (privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`);
        if (!/^0x[0-9a-fA-F]{64}$/.test(formattedKey)) {
            throw new errors_1.ValidationError('Invalid private key format. Please provide a 64-character hex string.');
        }
        try {
            const account = (0, accounts_1.privateKeyToAccount)(formattedKey);
            const signer = (0, viem_1.createWalletClient)({
                account,
                chain: chains_1.mainnet,
                transport: (0, viem_1.http)(),
            }).extend(viem_1.publicActions);
            return signer;
        }
        catch (error) {
            throw new errors_1.SigningError(`Failed to create signer from private key: ${error.message}`);
        }
    }
    /**
     * Derives the public key from a private key.
     * @param privateKey - The private key as a hex string.
     * @returns The corresponding public key.
     */
    static getPublicKey(privateKey) {
        const account = (0, accounts_1.privateKeyToAccount)((privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`));
        return account.publicKey;
    }
    /**
     * Verifies a signature against a public key.
     * NOTE: This is a placeholder for future implementation.
     * @param args - The arguments for signature verification.
     * @returns A promise that resolves to true if the signature is valid, false otherwise.
     */
    static async verifySignature(args) {
        console.warn('verifySignature is a placeholder and does not perform actual verification.');
        // In a real implementation, you would use a public client's `verifyMessage` method.
        return Promise.resolve(false);
    }
}
exports.Signer = Signer;
