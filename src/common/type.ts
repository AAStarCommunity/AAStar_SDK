export enum ENV {
    PROD = 'prod',
    DEV = 'dev'
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
}

export interface BaseRequest {
}

export interface AuthRequest {
    apiKey: string
}

export interface BaseResponse {
    code: number
    message: string
    cost: string
}
export interface TryPayUserOpResponse{

}

export interface HealthResponse extends BaseResponse {
    data: Map<string, string>
}

export interface AuthResponse {
    "code": number,
    "expire": string,
    "token": string
}
