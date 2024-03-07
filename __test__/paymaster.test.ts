import {describe, test} from "@jest/globals";
import {EthPaymasterClient} from "../src/ethPaymasterClient";

const devAddres = "https://ethpaymaster-backservice.onrender.com"
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

})



