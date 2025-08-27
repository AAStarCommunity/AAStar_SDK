"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AAStarClient = void 0;
const providers_1 = require("@ethersproject/providers");
const AirAccount_1 = require("../AirAccount");
const SuperRelayClient_1 = require("./SuperRelayClient");
const errors_1 = require("../types/errors");
class AAStarClient {
    constructor(config) {
        this.provider = new providers_1.JsonRpcProvider(config.bundlerUrl);
        this.superRelayClient = new SuperRelayClient_1.SuperRelayClient({ baseURL: config.paymasterUrl });
        this.bundlerUrl = config.bundlerUrl;
        this.entryPointAddress = config.entryPointAddress;
        this.factoryAddress = config.factoryAddress;
    }
    async authPaymaster(apiKey) {
        return this.superRelayClient.auth(apiKey);
    }
    createAccount(signer) {
        return new AirAccount_1.AirAccount({
            signer,
            rpcUrl: this.bundlerUrl,
            entryPointAddress: this.entryPointAddress,
            factoryAddress: this.factoryAddress,
        });
    }
    async sponsorUserOperation(userOp, forceStrategyId) {
        const userOperationForReq = {
            sender: String(userOp.sender),
            nonce: String(userOp.nonce),
            initCode: String(userOp.initCode),
            callData: String(userOp.callData),
            callGasLimit: String(userOp.callGasLimit),
            verificationGasLimit: String(userOp.verificationGasLimit),
            preVerificationGas: String(userOp.preVerificationGas),
            maxFeePerGas: String(userOp.maxFeePerGas),
            maxPriorityFeePerGas: String(userOp.maxPriorityFeePerGas),
            paymasterAndData: String(userOp.paymasterAndData),
            signature: String(userOp.signature),
        };
        const userOpReq = {
            forceStrategyId: forceStrategyId || '',
            userOperation: userOperationForReq,
        };
        const paymasterResponse = await this.superRelayClient.tryPayUserOperationV1(userOpReq);
        return paymasterResponse.data.paymaster_and_data;
    }
    async sendUserOperation(account, userOp, options) {
        console.log('Preparing user operation...');
        const userOpToSend = { ...userOp };
        if (options?.withPaymaster) {
            console.log('Requesting paymaster sponsorship...');
            try {
                const paymasterAndData = await this.sponsorUserOperation(userOpToSend, options.forceStrategyId);
                userOpToSend.paymasterAndData = paymasterAndData;
            }
            catch (error) {
                if (error instanceof errors_1.SdkError) {
                    throw error;
                }
                throw new errors_1.PaymasterError(`Failed to get paymaster sponsorship: ${error.message}`);
            }
        }
        console.log('Signing and sending user operation...');
        try {
            const signedUserOp = {
                ...userOpToSend,
                signature: await account.signUserOperation(userOpToSend),
            };
            const userOpHash = await this.provider.send('eth_sendUserOperation', [
                signedUserOp,
                this.entryPointAddress,
            ]);
            return userOpHash;
        }
        catch (error) {
            throw new errors_1.NetworkError(`Failed to send user operation: ${error.message}`);
        }
    }
    async getUserOperationReceipt(userOpHash) {
        try {
            const receipt = await this.provider.send('eth_getUserOperationReceipt', [userOpHash]);
            return receipt;
        }
        catch (error) {
            throw new errors_1.NetworkError(`Failed to get user operation receipt: ${error.message}`);
        }
    }
}
exports.AAStarClient = AAStarClient;
