# Solution
本项目目标为aastar开源组织的各个开源组件开发npm package包和demo.
包括:
1. AirAccount 
Control your crypto assets only by you. 🤑
2. SuperPaymaster 
Pay gas seamlessly by your retweet. 📡
3. CometENS 
Naming your crypto address meaningful. 🎖️
4. OpenPNTS 
Issue your own PNTs. 🪙
5. OpenCards 
Issue your own cards. 💳
6. Arcadia 
Issue community chain games and play. 🎲
7. COS72 
Manage your group or community. 🍄
8. Rain Computing/Edge Computing/SDSS Nodes :cloud_with_rain:
Merge account and gas and bundler and even RPC ability into one node backend and provide computing service.

Detail service check [API.md](API.md)
Use the way [Dev guide](dev-guide.md)
## SDK设计

### Core

负责创建账户\账户生命周期维护 需要确定的参数:

1. 工厂合约地址,带着代码
2. 指定EP,目前0.6, 0.7
3. 指定Paymaster,目前我们默认值使用SuperPaymaster稳定版本0.1或者开发版0.2,因为要支持社区代币,其他的都不支持;是否支持其他Paymaster待讨论,默认不;
4. 指定验证方法,默认是Dual
   Verification:指纹+TEE,未来会新增多签,不同验证方法,不同验证函数和流程,不可更改.

### Relay

#### 开发阶段

1. Paymaster relay服务
2. Bundler relay 服务
3. RPC,依赖infra或者Alchemy
4. DVT验证者,主要做签名二次验证
5. Account relay,主要服务账户生命周期
6. 其他Relay(看需要)

#### 理想状态

合并1-2 合并4,5,6

### 合约

1. Account:支持二次签名和验证的simple account改进版
2. Paymaster:基于siglton的pimilico版本,依赖EP0.7
3. Bundler:计划惨zerodev的,但也要看下particle的
4. 7702代理:只完成gas sponsor,有扩展的跨链参数(目前默认OP)
5. 节点注册(stake)合约:先用我写的
6. passkey

#### 参考

最精简的:https://viem.sh/docs/eip7702/sending-transactions P256
r1的验证合约(临时替代RIP7212):https://github.com/ithacaxyz/exp-0001/blob/ff4ed36a51c6fe2eca013fb14be72b20105751c3/contracts/src/utils/P256.sol#L13-L29
zk-webauthn:https://github.com/AAStarCommunity/webauthn-halo2
https://github.com/ithacaxyz/exp-0001/blob/ff4ed36a51c6fe2eca013fb14be72b20105751c3/example/src/modules/Account.ts#L64-L71
https://ithaca.xyz/updates/exp-0001
https://github.com/ethereum/go-ethereum/blob/v1.15.10/core/types/transaction.go#L480-L487
https://github.com/ethereum/go-ethereum/blob/v1.15.10/core/types/receipt.go#L51-L74

https://hackmd.io/@colinlyguo/SyAZWMmr1x#fnref5

### 设计思路

1. 使用viem配合核心sdk、airaccount等sdk，基于公共物品构建公共物品。
2. 分几个demo，来完成设计和演示
3. Viem为基础的4337交易发送，基于RainComputing的bundler，基于SuperPaymaster的paymaster
4. Viem为基础的7702交易发送，基于RainComputing的bundler，基于SuperPaymaster的paymaster

#### 主要代码

```
// constants.ts,定义基础合约等常量，配备检查sdk hash的安全校验自检
//useroperation 定义
struct PackedUserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    bytes32 accountGasLimits;
    uint256 preVerificationGas;
    bytes32 gasFees;
    bytes paymasterAndData;
    bytes signature;
}

//接口
interface IAccount {
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData);
}

//实现接口
contract EIP7702Account is IAccount, IERC165, IERC1155Receiver {
    address payable private immutable entrypoint = payable(0x0000000071727De22E5E9d8BAf0edAc6f37da032);

    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData) {
        require(msg.sender == entrypoint);

        (bytes32 r, bytes32 vs) = abi.decode(userOp.signature, (bytes32, bytes32));
        bytes32 s = vs & bytes32(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
        uint8 v = uint8(uint256(vs >> 255) + 27);

        if (address(this) == ecrecover(userOpHash, v, r, s)) {
            (bool ok, ) = entrypoint.call{
                value: missingAccountFunds,
                gas: type(uint256).max
            }("");
            require(ok);
            return 0; // success
        } else {
            return 1; // failure
        }
    }
// 参考：https://gist.github.com/frangio/e40305b9f99de290b73750dff5ebe50a#file-eip7702account-sol-L90-L100
```

An account trusts the EntryPoint that its execute method is only called if
validateUserOp is called first (and doesn’t fail). When an application submits a
UserOperation (by calling the eth_sendUserOperation rpc call), the bundler first
validate this UserOp is valid. It does so by calling the simulateValidation()
helper function, to make sure that creation, account validation and paymaster
validation all succeed. In order to protect itself (the bundler, not account),
from denial of service attacks, it has to make sure this UserOp can’t interfere
(invalidate) any other UserOp already in the mempool. To do so, it performs a
set of checks by tracing the above validation simulation - e.g. to make sure
that opcodes that can be used for such denial of service (block number,
timestamp,etc) are not used, and also that it only uses its own storage. It will
only accept UserOps that pass these validations. If a UserOp is validated, the
bundler knows it will pay, so there is no longer a possible of denial of service
attack. The executed code of the UserOp can do whatever it pleases - the UserOp
is already guaranteed to pay. Just like normal transaction, the user pays even
if the UserOp (or transaction) reverts.

#### Bundler

官方技术规格 https://github.com/eth-infinitism/bundler-spec/tree/main
https://github.com/eth-infinitism/bundler-spec-tests
https://github.com/eth-infinitism/bundler
https://github.com/eth-infinitism/bundler/blob/master/packages/sdk/README.md

#### Paymaster

基于zerodev的ultra relay（合并Paymaster和bundler了）
和particle的跨链特性的bundler
## AAStar概述
[https://github.com/AAStarCommunity/EvaluationAll-AA/tree/main/evaluations/aastar](https://github.com/AAStarCommunity/EvaluationAll-AA/tree/main/evaluations/aastar)
## 目标1
### 完成基础环境配置
Foundry and solidity: forge, anvil, optimism sepolia
TyperScript
pnpm
swagger
### 完成一个基础测试
1. 基于viem,完成一个4337账户的交易提交
2. 使用不同AA方案的合约发起交易(本地部署和调用,以及链上)
3. 基础的gas sponsor
4. eoa集成不同合约的7702测试

### 初始化sdk
sdk package定义:为了快速体验和发起一个交易,同时集成了aastar的所有标准服务.
如果需要更深层的服务,需要自己扩展,例如AirAccount中的账户合约,你需要扩展,增加自己的逻辑, SuperPaymaster需要适配不同的NFT协议,CometENS需要添加自己的自定义ENS等,需要自己扩展对应包.

我们借鉴下zerodev的sdk,学习结构和api交互方式:

### 魔改和测试
1. 集成david的二次签名和验证的账户合约和流程demo
2. 



## 目标2
### 开发SDK,完成AirAccount的生命周期
并实现一个交互demo
### 完成嵌入SuperPaymaster
基础嵌入,gas sponsor
使用OpenPNTs支付
使用OpenCards检测并支付

## 目标3
### 提供Account测试
基于nodejs sdk,提供一个demo下载和运行,获得测试数据.
具体可以参考: https://github.com/zerodevapp/aa-benchmark
### SDSS的加入

### SDSS的计算服务使用





