import {BaseRequest, BaseResponse, ENV, Method} from "./common/type";
import {generateUrl} from "./common/PaymasterUtil";
import {Path} from "./common/path";

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

    health(): Promise<BaseResponse> {
        return this.request(Path.Health, Method.GET)
    }

    getSupportEntryPointV1(): Promise<BaseResponse> {
        return this.request(Path.GetSupportEntryPointV1, Method.GET)
    }

    getSupportStrategyV1(): Promise<BaseResponse> {
        return this.request(Path.GetSupportStrategyV1, Method.GET)
    }

    tryPayUserOperationV1(): Promise<BaseResponse> {
        return this.request(Path.TryPayUserOperationV1, Method.POST)
    }


    protected async request<Request extends BaseRequest, Response>(path: Path, method: Method, body?: Request, urlParams?: Map<string, string>) {
        let url = generateUrl(this.baseURL, path, urlParams)

        let response = await this.fetch(url, {
            method: method,
            body: JSON.stringify(body)
        })
        if(!response.ok){
            throw new Error(`Request failed with status ${response.status}`)
        }
        return await response.json() as Promise<Response>
    }

}

