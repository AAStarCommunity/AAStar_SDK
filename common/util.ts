import { ethers, BigNumber, BigNumberish } from 'ethers'
import {
    EntryPoint, EntryPoint__factory,
    UserOperationStruct
} from '@account-abstraction/contracts'
import {BaseAccountAPI} from "@account-abstraction/sdk/dist/src/BaseAccountAPI";
import {SimpleAccountAPI} from "@account-abstraction/sdk/src/SimpleAccountAPI";

export function buildCallData() {
    return "callDataBuider";
}
export function buildUserOp() {
    // let  api = new SimpleAccountAPI({
    //     index: 0,
    //     owner: new ethers.Wallet(""),
    //     factoryAddress: ""
    // });

    return "callDataBuider2";
}