import { PublicActions, WalletClient } from 'viem';
/**
 * A type alias for a Viem WalletClient extended with public actions.
 * This is the primary type used to interact with accounts.
 */
export type ViemSigner = WalletClient & PublicActions;
/**
 * The Signer class provides utility methods for creating and managing signers.
 * It is designed to be extensible for different signer types (e.g., local, passkey).
 */
export declare class Signer {
    /**
     * Creates a local signer from a private key.
     * This method handles key validation and formatting.
     *
     * @param privateKey - The private key as a hex string (with or without '0x' prefix).
     * @returns A Viem WalletClient instance, ready to be used with AirAccount.
     * @throws An error if the private key is invalid.
     */
    static createLocalSigner(privateKey: string): ViemSigner;
    /**
     * Derives the public key from a private key.
     * @param privateKey - The private key as a hex string.
     * @returns The corresponding public key.
     */
    static getPublicKey(privateKey: string): `0x${string}`;
    /**
     * Verifies a signature against a public key.
     * NOTE: This is a placeholder for future implementation.
     * @param args - The arguments for signature verification.
     * @returns A promise that resolves to true if the signature is valid, false otherwise.
     */
    static verifySignature(args: {
        publicKey: `0x${string}`;
        message: string;
        signature: `0x${string}`;
    }): Promise<boolean>;
}
