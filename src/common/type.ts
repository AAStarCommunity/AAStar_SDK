export interface HealthResponse {
    hello: string
}

export enum ENV {
    PROD = 'prod',
    DEV = 'dev'
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
}

export interface BaseRequest {
    apiKey: string
}
export interface BaseResponse{

}
