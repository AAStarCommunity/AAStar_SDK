import {describe, test} from "@jest/globals";
import {Path} from "../src/common/path";
import {utils} from "ethers";
import {generateUrl} from "../src/common/PaymasterUtil";
import {ENV} from "../src/common/type";
import {DefaultProdHost} from "../src/ethPaymasterClient";

describe("UTIL", () => {
    test("generateUrl", () => {
        const health = Path.Health

        let str = generateUrl(DefaultProdHost, Path.Health)
        console.log(str)
    })

})
