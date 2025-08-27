export declare class SdkError extends Error {
    constructor(message: string);
}
export declare class NetworkError extends SdkError {
    constructor(message?: string);
}
export declare class SigningError extends SdkError {
    constructor(message?: string);
}
export declare class PaymasterError extends SdkError {
    constructor(message?: string);
}
export declare class ValidationError extends SdkError {
    constructor(message?: string);
}
