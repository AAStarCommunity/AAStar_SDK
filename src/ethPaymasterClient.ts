export class EthPaymasterClient {
    static production(fetcher = fetch) {
        return new EthPaymasterClient('https://EthPaymaster.org')
    }

    static development(fetcher = fetch) {
        return new EthPaymasterClient('https://pre.EthPaymaster.org')
    }


    constructor(baseURL: string) {
    }
}
