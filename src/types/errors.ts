export class SdkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NetworkError extends SdkError {
  constructor(message: string = 'A network error occurred.') {
    super(message);
  }
}

export class SigningError extends SdkError {
  constructor(message: string = 'An error occurred during signing.') {
    super(message);
  }
}

export class PaymasterError extends SdkError {
  constructor(message: string = 'An error occurred with the paymaster.') {
    super(message);
  }
}

export class ValidationError extends SdkError {
  constructor(message: string = 'A validation error occurred.') {
    super(message);
  }
}
