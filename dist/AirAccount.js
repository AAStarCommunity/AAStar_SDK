"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirAccount = void 0;
const sdk_1 = require("@account-abstraction/sdk");
const providers_1 = require("@ethersproject/providers");
const abi_1 = require("@ethersproject/abi");
const SocialRecovery_1 = require("./recovery/SocialRecovery");
const errors_1 = require("./types/errors");
const SimpleAccountAbi = ['function executeBatch(address[] calldata dest, bytes[] calldata func)'];
class AirAccount {
    constructor(params) {
        const { signer, rpcUrl, entryPointAddress, factoryAddress } = params;
        const provider = new providers_1.JsonRpcProvider(rpcUrl);
        if (!signer.account) {
            throw new errors_1.ValidationError("Viem signer is missing an account.");
        }
        const ownerAdapter = {
            _isSigner: true,
            getAddress: async () => signer.account.address,
            signMessage: async (message) => signer.signMessage({
                account: signer.account,
                message: { raw: message }
            }),
            _signTypedData: async (domain, types, userOp) => {
                const { EIP712Domain: _, ...otherTypes } = types;
                return signer.signTypedData({
                    account: signer.account,
                    domain,
                    types: otherTypes,
                    primaryType: 'UserOperation',
                    message: userOp
                });
            }
        };
        this.simpleAccountAPI = new sdk_1.SimpleAccountAPI({
            owner: ownerAdapter,
            provider,
            entryPointAddress: entryPointAddress,
            factoryAddress: factoryAddress,
        });
        this.recovery = new SocialRecovery_1.SocialRecovery(this);
    }
    async getAccountAddress() {
        return this.simpleAccountAPI.getAccountAddress();
    }
    async getNonce() {
        const nonce = await this.simpleAccountAPI.getNonce();
        return nonce.toNumber();
    }
    async signUserOperation(userOp) {
        const signedUserOp = await this.simpleAccountAPI.signUserOp(userOp);
        return signedUserOp.signature;
    }
    async getAccountInitCode() {
        return this.simpleAccountAPI.getInitCode();
    }
    async createUnsignedUserOperation(tx) {
        if (!tx.to) {
            throw new Error('Transaction "to" address is missing');
        }
        const userOp = await this.simpleAccountAPI.createUnsignedUserOp({
            target: tx.to,
            value: tx.value ? `0x${tx.value.toString(16)}` : '0x0',
            data: tx.data || '0x',
        });
        return userOp;
    }
    async createUnsignedBatchUserOperation(txs) {
        if (!txs || txs.length === 0) {
            throw new Error('Transaction array must not be empty.');
        }
        const destinations = [];
        const calldatas = [];
        for (const tx of txs) {
            if (!tx.to) {
                throw new Error('Each transaction in the batch must have a "to" address.');
            }
            if (tx.value && BigInt(tx.value) > 0) {
                console.warn('Batching native ETH transfers is not directly supported by this method. The "value" field will be ignored.');
            }
            destinations.push(tx.to);
            calldatas.push(tx.data || '0x');
        }
        const accountInterface = new abi_1.Interface(SimpleAccountAbi);
        const encodedExecuteBatch = accountInterface.encodeFunctionData('executeBatch', [
            destinations,
            calldatas,
        ]);
        const userOp = await this.simpleAccountAPI.createUnsignedUserOp({
            target: await this.getAccountAddress(),
            data: encodedExecuteBatch,
        });
        return userOp;
    }
}
exports.AirAccount = AirAccount;
