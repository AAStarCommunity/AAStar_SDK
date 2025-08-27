
import { createWalletClient, http, publicActions, PublicActions, WalletClient } from 'viem';
import { privateKeyToAccount, PrivateKeyAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
import { ValidationError, SigningError } from '../types/errors';

/**
 * A type alias for a Viem WalletClient extended with public actions.
 * This is the primary type used to interact with accounts.
 */
export type ViemSigner = WalletClient & PublicActions;

/**
 * The Signer class provides utility methods for creating and managing signers.
 * It is designed to be extensible for different signer types (e.g., local, passkey).
 */
export class Signer {
  /**
   * Creates a local signer from a private key.
   * This method handles key validation and formatting.
   *
   * @param privateKey - The private key as a hex string (with or without '0x' prefix).
   * @returns A Viem WalletClient instance, ready to be used with AirAccount.
   * @throws An error if the private key is invalid.
   */
  static createLocalSigner(privateKey: string): ViemSigner {
    const formattedKey = (privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`) as `0x${string}`;

    if (!/^0x[0-9a-fA-F]{64}$/.test(formattedKey)) {
      throw new ValidationError('Invalid private key format. Please provide a 64-character hex string.');
    }

    try {
      const account = privateKeyToAccount(formattedKey);
      const signer = createWalletClient({
        account,
        chain: mainnet,
        transport: http(),
      }).extend(publicActions);

      return signer;
    } catch (error: any) {
      throw new SigningError(`Failed to create signer from private key: ${error.message}`);
    }
  }

  /**
   * Derives the public key from a private key.
   * @param privateKey - The private key as a hex string.
   * @returns The corresponding public key.
   */
  static getPublicKey(privateKey: string): `0x${string}` {
    const account = privateKeyToAccount((privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`) as `0x${string}`);
    return account.publicKey;
  }

  /**
   * Verifies a signature against a public key.
   * NOTE: This is a placeholder for future implementation.
   * @param args - The arguments for signature verification.
   * @returns A promise that resolves to true if the signature is valid, false otherwise.
   */
  static async verifySignature(args: { publicKey: `0x${string}`, message: string, signature: `0x${string}` }): Promise<boolean> {
    console.warn('verifySignature is a placeholder and does not perform actual verification.');
    // In a real implementation, you would use a public client's `verifyMessage` method.
    return Promise.resolve(false);
  }
}
