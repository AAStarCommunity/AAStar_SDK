import { AAStarClient } from '../client/AAStarClient';
import { Signer } from '../signer/Signer';
import { AirAccount } from '../AirAccount';
import { ethers } from 'ethers';

// Represents a test user persona
export interface TestUser {
  name: string;
  signer: ReturnType<typeof Signer.createLocalSigner>;
  account: AirAccount;
  description: string;
}

export class TestAccountManager {
  private client: AAStarClient;
  private accounts: Map<string, TestUser> = new Map();

  constructor(client: AAStarClient) {
    this.client = client;
  }

  async createAliceAccount(): Promise<TestUser> {
    // Alice: New user, no wallet (we generate one)
    const wallet = ethers.Wallet.createRandom();
    const signer = Signer.createLocalSigner(wallet.privateKey);
    const account = this.client.createAccount(signer);
    const alice: TestUser = {
      name: 'Alice',
      signer,
      account,
      description: 'New user with a fresh smart account.'
    };
    this.accounts.set('Alice', alice);
    console.log(`Alice's account created: ${await account.getAccountAddress()}`);
    return alice;
  }

  async createBobAccount(): Promise<TestUser> {
    // Bob: Existing user, no gas (assumes account exists, we just track it)
    const wallet = ethers.Wallet.createRandom();
    const signer = Signer.createLocalSigner(wallet.privateKey);
    const account = this.client.createAccount(signer);
    const bob: TestUser = {
      name: 'Bob',
      signer,
      account,
      description: 'Existing user, needs gas sponsorship.'
    };
    this.accounts.set('Bob', bob);
    console.log(`Bob's account created: ${await account.getAccountAddress()}`);
    return bob;
  }

  async createCharlieAccount(): Promise<TestUser> {
    // Charlie: Experienced user, has gas
    const wallet = ethers.Wallet.createRandom();
    const signer = Signer.createLocalSigner(wallet.privateKey);
    const account = this.client.createAccount(signer);
    const charlie: TestUser = {
      name: 'Charlie',
      signer,
      account,
      description: 'Experienced user with gas, can pay for transactions.'
    };
    this.accounts.set('Charlie', charlie);
    console.log(`Charlie's account created: ${await account.getAccountAddress()}`);
    return charlie;
  }

  getAccount(name: 'Alice' | 'Bob' | 'Charlie'): TestUser | undefined {
    return this.accounts.get(name);
  }

  // NOTE: fundAccount and getAccountBalance would require a real provider and network connection.
  // They are included as placeholders to fulfill the task requirements.

  async fundAccount(name: string, amount: string): Promise<void> {
    console.log(`Funding ${name} with ${amount} ETH... (placeholder)`);
    // In a real scenario, this would use an ethers provider to send funds.
    return Promise.resolve();
  }

  async getAccountBalance(name: string): Promise<string> {
    console.log(`Getting balance for ${name}... (placeholder)`);
    // In a real scenario, this would use an ethers provider to get the balance.
    return '0.0';
  }
}
