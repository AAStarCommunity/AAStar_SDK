import {describe, test} from "@jest/globals";
import {EthPaymasterClient} from "../src/ethPaymasterClient";
import {Network, Token, TryPayUserOpRequest} from "../src/common/type";

const devAddres = "https://relay-ethpaymaster-pr-20.onrender.com/"
describe("PAYMASTER Health", () => {
    test("Health", async () => {
        let client = EthPaymasterClient.development(devAddres)
        const response = await client.health()
        console.log("response :" + JSON.stringify(response))
    })
})

describe("PAYMASTER Auth", () => {
    test("Auth", async () => {
        let client = EthPaymasterClient.development(devAddres)
        const response = await client.auth("string")
        console.log("response :" + JSON.stringify(response))
    })
})
describe("PAYMASTER Try Pay Sponsor Operation", () => {
    test("Try Pay Sponsor Operation", async () => {
        let client = EthPaymasterClient.development(devAddres)
        const authResponse = await client.auth("string");
        const token = authResponse.token
        console.log("token : " + token)
        const request: TryPayUserOpRequest = {
            force_strategy_id: "1",
            map: {
                call_data: "0x",
                call_gas_limit: "0x",
                init_code: "0x",
                max_fee_per_gas: "0x",
                max_priority_fee_per_gas: "0x",
                nonce: "0x",
                per_verification_gas: "0x",
                sender: "0x",
                signature: "0x",
                verification_gas_list: "0x"
            }

        }
        const response = await client.tryPayUserOperationV1(authResponse.token, request)
        console.log("response :" + JSON.stringify(response))
    })
})



