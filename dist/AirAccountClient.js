"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirAccountClient = void 0;
const providers_1 = require("@ethersproject/providers");
class AirAccountClient {
    constructor(params) {
        this.account = params.account;
        this.bundlerUrl = params.bundlerUrl;
        this.provider = new providers_1.JsonRpcProvider(this.bundlerUrl);
    }
    async sendUserOperation(userOp) {
        const userOpHash = await this.provider.send('eth_sendUserOperation', [userOp, await this.account.getAccountAddress()]);
        return userOpHash;
    }
    async getUserOperationReceipt(userOpHash) {
        const receipt = await this.provider.send('eth_getUserOperationReceipt', [userOpHash]);
        return receipt;
    }
}
exports.AirAccountClient = AirAccountClient;
