"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAccountManager = void 0;
const Signer_1 = require("../signer/Signer");
const ethers_1 = require("ethers");
class TestAccountManager {
    constructor(client) {
        this.accounts = new Map();
        this.client = client;
    }
    async createAliceAccount() {
        // Alice: New user, no wallet (we generate one)
        const wallet = ethers_1.ethers.Wallet.createRandom();
        const signer = Signer_1.Signer.createLocalSigner(wallet.privateKey);
        const account = this.client.createAccount(signer);
        const alice = {
            name: 'Alice',
            signer,
            account,
            description: 'New user with a fresh smart account.'
        };
        this.accounts.set('Alice', alice);
        console.log(`Alice's account created: ${await account.getAccountAddress()}`);
        return alice;
    }
    async createBobAccount() {
        // Bob: Existing user, no gas (assumes account exists, we just track it)
        const wallet = ethers_1.ethers.Wallet.createRandom();
        const signer = Signer_1.Signer.createLocalSigner(wallet.privateKey);
        const account = this.client.createAccount(signer);
        const bob = {
            name: 'Bob',
            signer,
            account,
            description: 'Existing user, needs gas sponsorship.'
        };
        this.accounts.set('Bob', bob);
        console.log(`Bob's account created: ${await account.getAccountAddress()}`);
        return bob;
    }
    async createCharlieAccount() {
        // Charlie: Experienced user, has gas
        const wallet = ethers_1.ethers.Wallet.createRandom();
        const signer = Signer_1.Signer.createLocalSigner(wallet.privateKey);
        const account = this.client.createAccount(signer);
        const charlie = {
            name: 'Charlie',
            signer,
            account,
            description: 'Experienced user with gas, can pay for transactions.'
        };
        this.accounts.set('Charlie', charlie);
        console.log(`Charlie's account created: ${await account.getAccountAddress()}`);
        return charlie;
    }
    getAccount(name) {
        return this.accounts.get(name);
    }
    // NOTE: fundAccount and getAccountBalance would require a real provider and network connection.
    // They are included as placeholders to fulfill the task requirements.
    async fundAccount(name, amount) {
        console.log(`Funding ${name} with ${amount} ETH... (placeholder)`);
        // In a real scenario, this would use an ethers provider to send funds.
        return Promise.resolve();
    }
    async getAccountBalance(name) {
        console.log(`Getting balance for ${name}... (placeholder)`);
        // In a real scenario, this would use an ethers provider to get the balance.
        return '0.0';
    }
}
exports.TestAccountManager = TestAccountManager;
