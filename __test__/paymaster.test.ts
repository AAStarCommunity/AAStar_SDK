import {describe, test} from "@jest/globals";
import {EthPaymasterClient} from "../src/ethPaymasterClient";

describe("PAYMASTER", () => {
    test("should work", () => {
        let client = EthPaymasterClient.development()
        client.health()
    })
})
