import { concat, encodeFunctionData, createPublicClient, http, createClient } from 'viem';
import { sepolia } from 'viem/chains';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

import {
    UserOperation,
    bundlerActions,
    getAccountNonce,
    signUserOperationHashWithECDSA,
    getSenderAddress
} from "permissionless"
import { pimlicoBundlerActions } from "permissionless/actions/pimlico"

import { init, health, auth, getSupportEntryPoint, sponsorUserOp, estimateUserOpGas } from '@aastar/ethpaymaster_sdk_ts';

const publicClient = createPublicClient({
    transport: http("https://rpc.ankr.com/eth_sepolia"),
    chain: sepolia,
})

const bundlerClient = createClient({
    transport: http(`https://api.pimlico.io/v2/sepolia/rpc?apikey=085e6ede-800d-4de8-af64-b1ea89b34eee`),
    chain: sepolia,
})
    .extend(bundlerActions("0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"))
    .extend(pimlicoBundlerActions("0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"))

init(false);

// check service health
const healthRes = await health();
console.log(healthRes);

// authenticate with api key
const authRes = await auth('apiKey');
console.log(authRes);

// get entry points
const entryPoints = await getSupportEntryPoint('ethereum-sepolia');
console.log(entryPoints);

// get a privatekey 
const privateKey = '0xf9cf13d03cbab6f62cc8add9ce4a145ff77caec0b4cf84813930489d20a67af7' || generatePrivateKey();
console.log(privateKey);

// get signer 
const signer = privateKeyToAccount(privateKey);
console.log(signer.address, 'signer address');

const SIMPLE_ACCOUNT_FACTORY_ADDRESS = "0x9406Cc6185a346906296840746125a0E44976454";
const factoryData = encodeFunctionData({
    abi: [
        {
            inputs: [
                { name: 'owner', type: 'address' },
                { name: 'salt', type: 'uint256' },
            ],
            name: 'createAccount',
            outputs: [{ name: 'ret', type: 'address' }],
            stateMutability: 'nonpayable',
            type: 'function',
        }
    ],
    args: [signer.address, 0n],
});
const initCode = concat([SIMPLE_ACCOUNT_FACTORY_ADDRESS, factoryData])

const senderAddress = await getSenderAddress(publicClient, {
    factory: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
    factoryData,
    entryPoint: entryPoints[0],
});
console.log("Counterfactual sender address:", senderAddress);

const to = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // vitalik
const value = 0n
const data = "0x68656c6c6f" // "hello" encoded to utf-8 bytes

const callData = encodeFunctionData({
    abi: [
        {
            inputs: [
                { name: "dest", type: "address" },
                { name: "value", type: "uint256" },
                { name: "func", type: "bytes" },
            ],
            name: "execute",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    args: [to, value, data],
})

const sponsorRes = await sponsorUserOp({ callData, initCode, sender: senderAddress, nonce: '0x00', strategyCode: 'Ethereum_Sepolia_v06_verifyPaymaster' });
console.log(callData, 'callData', initCode, 'initCode', senderAddress, 'senderAddress');

console.log(sponsorRes);
const { data: {
    userOpResponse: {
        paymasterAndData,
        preVerificationGas,
        verificationGasLimit,
        callGasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas,
    }
} } = sponsorRes;


const estimateUserOpGasRes = await estimateUserOpGas({
    callData, initCode, sender: senderAddress, nonce: '0x00', strategyCode: 'Ethereum_Sepolia_v06_verifyPaymaster',
});

console.log(estimateUserOpGasRes, 'estimateUserOpGasRes');

const gasPrice1 = await bundlerClient.getUserOperationGasPrice()
console.log(gasPrice1, 'gasPrice');
// return;

const userOP: UserOperation<'v0.6'> = {
    sender: senderAddress,
    nonce: 0n,
    initCode,
    // factory: SIMPLE_ACCOUNT_FACTORY_ADDRESS as Address,
    // factoryData,
    callData,
    callGasLimit: BigInt(callGasLimit),
    verificationGasLimit: BigInt(verificationGasLimit),
    preVerificationGas: BigInt(preVerificationGas),
    maxPriorityFeePerGas: BigInt(maxPriorityFeePerGas),
    maxFeePerGas: BigInt(maxFeePerGas),
    paymasterAndData,
    signature: '0xa15569dd8f8324dbeabf8073fdec36d4b754f53ce5901e283c6de79af177dc94557fa3c9922cd7af2a96ca94402d35c39f266925ee6407aeb32b31d76978d4ba1c',
}

const signature = await signUserOperationHashWithECDSA({
    account: signer,
    userOperation: userOP as UserOperation<"v0.6">,
    chainId: sepolia.id,
    entryPoint: entryPoints[0],
})
userOP.signature = signature;

const gasPrice = await bundlerClient.getUserOperationGasPrice()
console.log(gasPrice, 'gasPrice');

userOP.maxFeePerGas = gasPrice.fast.maxFeePerGas;
userOP.maxPriorityFeePerGas = gasPrice.fast.maxPriorityFeePerGas;



const userOperationHash = await bundlerClient.sendUserOperation({
    userOperation: { ...userOP, initCode: initCode },
})

console.log("Received User Operation hash:", userOperationHash);

// let's also wait for the userOperation to be included, by continually querying for the receipts
console.log("Querying for receipts...")
const receipt = await bundlerClient.waitForUserOperationReceipt({
    hash: userOperationHash,
})
const txHash = receipt.receipt.transactionHash

console.log(`UserOperation included: https://sepolia.etherscan.io/tx/${txHash}`)



