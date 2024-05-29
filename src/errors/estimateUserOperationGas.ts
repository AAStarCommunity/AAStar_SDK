import { BaseError } from "viem"

import type { EntryPoint, GetEntryPointVersion } from "../types/entrypoint"
import { prettyPrint } from "./utils"
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
export type EstimateUserOperationGasErrorType<entryPoint extends EntryPoint> =
    EstimateUserOperationGasError<entryPoint> & {
        name: "EstimateUserOperationGasError"
    }
export class EstimateUserOperationGasError<
    entryPoint extends EntryPoint
> extends BaseError {
    cause: BaseError

    override name = "EstimateUserOperationGasError"

    constructor(
        cause: BaseError,
        {
            userOperation,
            entryPoint,
            docsPath
        }: EstimateUserOperationGasParameters<entryPoint> & {
            docsPath?: string
        }
    ) {
        const prettyArgs = prettyPrint({
            sender: userOperation.sender,
            nonce: userOperation.nonce,
            initCode: userOperation.initCode,
            callData: userOperation.callData,
            callGasLimit: userOperation.callGasLimit,
            verificationGasLimit: userOperation.verificationGasLimit,
            preVerificationGas: userOperation.preVerificationGas,
            maxFeePerGas: userOperation.maxFeePerGas,
            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
            paymasterAndData: userOperation.paymasterAndData,
            signature: userOperation.signature,
            entryPoint
        })

        super(cause.shortMessage, {
            cause,
            docsPath,
            metaMessages: [
                ...(cause.metaMessages ? [...cause.metaMessages, " "] : []),
                "Estimate Gas Arguments:",
                prettyArgs
            ].filter(Boolean) as string[]
        })
        this.cause = cause
    }
}
