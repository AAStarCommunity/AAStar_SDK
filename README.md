# AAStar SDK
For normal use of AAStar, you should install this SDK.

## Follow me
We first try three small demos. 
1. Normal contract account transaction
The first one is to use Viewm and its account abstraction example to show you how to use an public SDK and to complete the contract account transaction demo. 
2. Account with your logic programming
The second one is that we create our own account with customized logic.
3. Gas Sponsorship
The third one is that we need to support the ERC-20 gas token to pay gas.

### Install
1. install aastar/sdk, viem
  ```
  pnpm install aastar/sdk viem
  ```
2. create from this：https://github.com/wevm/viem/tree/main/examples/_template and https://viem.sh/account-abstraction
3. check constants and config your env with a copy of env.example

## constants.ts
Provided normal settings for account and gas and ens and pnts and more operations.
You can change some settings in your code to overide it.

## relay.ts
basic relay service flow maintainner, include bundler, paymaster, ens resolver.

## account.ts
finish the transaction flow with contract account and EOA.

## utils.ts
general purpose utils.

## Demo script


**To be tested**(under construction🚧), a basic ERC 4337 transaction:
```javascript
import { createPublicClient, http } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
 
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
 
const bundlerClient = createBundlerClient({ 
  client, 
  transport: http(BUNDLER_RPC_URL), 
}) 
 
const owner = privateKeyToAccount('0x...') 
const account = await toAAAtarSmartAccount({ //depend on your SDK improted method
  client, 
  owners: [owner] 
})

const hash = await bundlerClient.sendUserOperation({ 
  account, 
  calls: [{ 
    to: '0xaaaaaa', 
    value: parseEther('0.001') 
  }] 
}) 
 
const receipt = await bundlerClient.waitForUserOperationReceipt({ hash }) 

```

Here is a tx with gas sponsorship:
```
import { http } from 'viem'
import { 
  createBundlerClient, 
  createPaymasterClient,
} from 'viem/account-abstraction'
import { account, client } from './config.ts'
 
const paymasterClient = createPaymasterClient({ 
  transport: http(PAYMASTER_RPC_URL), 
}) 
 
const bundlerClient = createBundlerClient({
  account,
  client,
  paymaster: paymasterClient, 
  transport: http(BUNDLER_RPC_URL),
})
 
const hash = await bundlerClient.sendUserOperation({
  calls: [{
    to: '0xaaaaaaa',
    value: parseEther('0.001')
  }]
})

```

# EthPaymaster_sdk_ts （Deprecated）
EthPaymaster typescript Sdk

```tsx
let client = EthPaymasterClient.development(address)
 
const healthResponse = await client.health()
   
const authResponse = await client.auth("API-KEY")
  
const token = authResponse.token
  
const strategyResponse = await client.getSupportStrategyV1(Network.Ethereum, authResponse.token) 
  
const entrypointResponse = await client.getSupportEntryPointV1(Network.Ethereum, authResponse.token)
 
const request: TryPayUserOpRequestV1 = {
            force_strategy_id: "1",
            user_operation: {
                call_data: "0xb61d27f6000000000000000000000000c206b552ab127608c3f666156c8e03a8471c72df000000000000000000000000000000000000000000000000002386f26fc1000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
                call_gas_limit: "39837",
                init_code: "0xe19e9755942bb0bd0cccce25b1742596b8a8250b3bf2c3e700000000000000000000000078d4f01f56b982a3b03c4e127a5d3afa8ebee6860000000000000000000000008b388a082f370d8ac2e2b3997e9151168bd09ff50000000000000000000000000000000000000000000000000000000000000000",
                max_fee_per_gas: "44020",
                max_priority_fee_per_gas: "1743509478",
                nonce: "1",
                pre_verification_gas: "44020",
                sender: "0x4A2FD3215420376DA4eD32853C19E4755deeC4D1",
                signature: "0x760868cd7d9539c6e31c2169c4cab6817beb8247516a90e4301e929011451658623455035b83d38e987ef2e57558695040a25219c39eaa0e31a0ead16a5c925c1c",
                verification_gas_limit: "100000",
                paymaster_and_data : "0x"
            }

 }
const tryPayResponse = await client.tryPayUserOperationV1(authResponse.token, request)
```
