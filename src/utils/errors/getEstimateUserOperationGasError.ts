import { BaseError, UnknownNodeError } from "viem"

import {
    EstimateUserOperationGasError,
    type EstimateUserOperationGasErrorType
} from "../../errors/estimateUserOperationGas"
import { type ErrorType } from "../../errors/utils"
import type { EntryPoint, GetEntryPointVersion } from "../../types/entrypoint"
import {
    type GetBundlerErrorParameters,
    type GetBundlerErrorReturnType,
    getBundlerError
} from "./getBundlerError"
import { PartialBy, UserOperation } from "@/types"
export type EstimateUserOperationGasParameters<entryPoint extends EntryPoint> =
    {
        userOperation: GetEntryPointVersion<entryPoint> extends "v0.6"
            ? PartialBy<
                  UserOperation<"v0.6">,
                  "callGasLimit" | "preVerificationGas" | "verificationGasLimit"
              >
            : PartialBy<
                  UserOperation<"v0.7">,
                  | "callGasLimit"
                  | "preVerificationGas"
                  | "verificationGasLimit"
                  | "paymasterVerificationGasLimit"
                  | "paymasterPostOpGasLimit"
              >
        entryPoint: entryPoint
    }
export type GetEstimateUserOperationGasErrorReturnType<
    entryPoint extends EntryPoint,
    cause = ErrorType
> = Omit<EstimateUserOperationGasErrorType<entryPoint>, "cause"> & {
    cause: cause | GetBundlerErrorReturnType
}

export function getEstimateUserOperationGasError<
    err extends ErrorType<string>,
    entryPoint extends EntryPoint
>(error: err, args: EstimateUserOperationGasParameters<entryPoint>) {
    const cause = (() => {
        const cause = getBundlerError(
            // biome-ignore lint/complexity/noBannedTypes: <explanation>
            error as {} as BaseError,
            args as GetBundlerErrorParameters<entryPoint>
        )
        // biome-ignore lint/complexity/noBannedTypes: <explanation>
        if (cause instanceof UnknownNodeError) return error as {} as BaseError
        return cause
    })()

    throw new EstimateUserOperationGasError(cause, {
        ...args
    }) as GetEstimateUserOperationGasErrorReturnType<entryPoint, err>
}
