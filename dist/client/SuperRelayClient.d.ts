import { AuthRes, StrategyRes, TryPayUserOpRes, UserOpReq } from '../types/response';
export interface SuperRelayClientConfig {
    baseURL?: string;
}
export declare class SuperRelayClient {
    private axiosInstance;
    constructor(config?: SuperRelayClientConfig);
    auth(apiKey: string): Promise<AuthRes>;
    getSupportStrategyV1(network?: string): Promise<StrategyRes>;
    tryPayUserOperationV1(data: UserOpReq): Promise<TryPayUserOpRes>;
}
