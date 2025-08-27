import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  AuthRes,
  StrategyRes,
  TryPayUserOpRes,
  UserOpReq,
} from '../types/response';
import { NetworkError, PaymasterError } from '../types/errors';

const API_PATHS = {
  Auth: '/api/auth',
  GetSupportStrategyV1: '/api/v1/get-support-strategy',
  TryPayUserOperationV1: '/api/v1/try-pay-user-operation',
};

export interface SuperRelayClientConfig {
  baseURL?: string;
}

export class SuperRelayClient {
  private axiosInstance: AxiosInstance;

  constructor(config?: SuperRelayClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config?.baseURL || 'https://EthPaymaster.org',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data || response,
      (error: AxiosError) => {
        if (error.response) {
          const errorMessage = `Paymaster API error: ${error.response.status} ${error.response.statusText}.`;
          return Promise.reject(new PaymasterError(errorMessage));
        } else if (error.request) {
          return Promise.reject(new NetworkError('Paymaster API request failed: No response received.'));
        } else {
          return Promise.reject(new PaymasterError(`Paymaster client setup error: ${error.message}`));
        }
      }
    );
  }

  async auth(apiKey: string): Promise<AuthRes> {
    const response: AuthRes = await this.axiosInstance.post(API_PATHS.Auth, { apiKey });
    if (response && response.token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
    }
    return response;
  }

  async getSupportStrategyV1(network: string = 'ethereum'): Promise<StrategyRes> {
    return this.axiosInstance.get(API_PATHS.GetSupportStrategyV1, {
      params: { network },
    });
  }

  async tryPayUserOperationV1(data: UserOpReq): Promise<TryPayUserOpRes> {
    const payload = {
        force_strategy_id: data.forceStrategyId,
        user_operation: data.userOperation
    };
    return this.axiosInstance.post(API_PATHS.TryPayUserOperationV1, payload);
  }
}
