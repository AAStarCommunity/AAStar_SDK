import {AuthResponse, BaseRequest, BaseResponse, ENV, HealthResponse, Method} from "./common/type";
import {generateUrl} from "./common/PaymasterUtil";
import {Path} from "./common/path";
import {PaymasterError} from "./common/error";

export const DefaultProdHost = "https://EthPaymaster.org";
export const DefaultDevHost = "https://dev.EthPaymaster.org";

export class EthPaymasterClient {

    private readonly baseURL: string
    private readonly fetch: typeof fetch
    private readonly env: ENV

    static production(baseUrl?: string, fetcher = fetch) {
        if (baseUrl == undefined || baseUrl == '') {
            baseUrl = DefaultProdHost
        }
        return new EthPaymasterClient(baseUrl, fetcher, ENV.PROD)
    }

    static development(baseUrl?: string, fetcher = fetch) {
        if (baseUrl == undefined || baseUrl == '') {
            baseUrl = DefaultDevHost
        }
        return new EthPaymasterClient(baseUrl, fetcher, ENV.DEV)
    }


    constructor(baseURL: string, fetcher: typeof fetch, env: ENV) {
        this.baseURL = baseURL
        this.fetch = fetcher
        this.env = env
    }

    async health(): Promise<HealthResponse> {
        return this.request(Path.Health, Method.GET)
    }

    async auth(apikey: string): Promise<AuthResponse> {
        return this.request(Path.Auth, Method.POST, {apiKey: apikey})
    }

    tryPayUserOperationV1WithToken(accessToken: string): Promise<BaseResponse> {

        return this.request(Path.TryPayUserOperationV1, Method.POST)
    }

    tryPayUserOperationV1(apiKey: string): Promise<BaseResponse> {
        return this.request(Path.TryPayUserOperationV1, Method.POST)
    }


    getSupportEntryPointV1(): Promise<BaseResponse> {
        return this.request(Path.GetSupportEntryPointV1, Method.GET)
    }

    getSupportStrategyV1(): Promise<BaseResponse> {
        return this.request(Path.GetSupportStrategyV1, Method.GET)
    }


    protected async request<Request extends BaseRequest, Response>(path: Path, method: Method, body?: Request, urlParams?: Map<string, string>, accessToken?: string) {
        let url = generateUrl(this.baseURL, path, urlParams)
        console.log(url)
        const response = await this.fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
        if (!response.ok) {
            throw await PaymasterError.from(response)
        }
        return await response.json() as Promise<Response>
    }

}

