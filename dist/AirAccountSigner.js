"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirAccountSigner = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
class AirAccountSigner {
    static createLocalSigner(privateKey) {
        const account = (0, accounts_1.privateKeyToAccount)(privateKey);
        const signer = (0, viem_1.createWalletClient)({
            account,
            chain: chains_1.mainnet,
            transport: (0, viem_1.http)(),
        });
        return signer;
    }
}
exports.AirAccountSigner = AirAccountSigner;
