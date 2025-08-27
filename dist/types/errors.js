"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.PaymasterError = exports.SigningError = exports.NetworkError = exports.SdkError = void 0;
class SdkError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.SdkError = SdkError;
class NetworkError extends SdkError {
    constructor(message = 'A network error occurred.') {
        super(message);
    }
}
exports.NetworkError = NetworkError;
class SigningError extends SdkError {
    constructor(message = 'An error occurred during signing.') {
        super(message);
    }
}
exports.SigningError = SigningError;
class PaymasterError extends SdkError {
    constructor(message = 'An error occurred with the paymaster.') {
        super(message);
    }
}
exports.PaymasterError = PaymasterError;
class ValidationError extends SdkError {
    constructor(message = 'A validation error occurred.') {
        super(message);
    }
}
exports.ValidationError = ValidationError;
