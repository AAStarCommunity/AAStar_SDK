"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperRelayClient = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../types/errors");
const API_PATHS = {
    Auth: '/api/auth',
    GetSupportStrategyV1: '/api/v1/get-support-strategy',
    TryPayUserOperationV1: '/api/v1/try-pay-user-operation',
};
class SuperRelayClient {
    constructor(config) {
        this.axiosInstance = axios_1.default.create({
            baseURL: config?.baseURL || 'https://EthPaymaster.org',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.axiosInstance.interceptors.response.use((response) => response.data || response, (error) => {
            if (error.response) {
                const errorMessage = `Paymaster API error: ${error.response.status} ${error.response.statusText}.`;
                return Promise.reject(new errors_1.PaymasterError(errorMessage));
            }
            else if (error.request) {
                return Promise.reject(new errors_1.NetworkError('Paymaster API request failed: No response received.'));
            }
            else {
                return Promise.reject(new errors_1.PaymasterError(`Paymaster client setup error: ${error.message}`));
            }
        });
    }
    async auth(apiKey) {
        const response = await this.axiosInstance.post(API_PATHS.Auth, { apiKey });
        if (response && response.token) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        }
        return response;
    }
    async getSupportStrategyV1(network = 'ethereum') {
        return this.axiosInstance.get(API_PATHS.GetSupportStrategyV1, {
            params: { network },
        });
    }
    async tryPayUserOperationV1(data) {
        const payload = {
            force_strategy_id: data.forceStrategyId,
            user_operation: data.userOperation
        };
        return this.axiosInstance.post(API_PATHS.TryPayUserOperationV1, payload);
    }
}
exports.SuperRelayClient = SuperRelayClient;
