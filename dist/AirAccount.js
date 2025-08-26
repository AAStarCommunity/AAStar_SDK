"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirAccount = void 0;
const sdk_1 = require("@account-abstraction/sdk");
const providers_1 = require("@ethersproject/providers");
class AirAccount {
    constructor(params) {
        const provider = new providers_1.JsonRpcProvider(params.rpcUrl);
        this.simpleAccountAPI = new sdk_1.SimpleAccountAPI({
            owner: params.signer,
            provider,
            entryPointAddress: params.entryPointAddress,
            factoryAddress: params.factoryAddress,
        });
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
}
exports.AirAccount = AirAccount;
