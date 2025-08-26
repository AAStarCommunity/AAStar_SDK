# AAStar SDK Technical Solution

[English](#aastar-sdk-technical-solution-english) | [中文](#aastar-sdk-)

---

# AAStar SDK Technical Solution (English)

**Version:** 1.0
**Created:** 2025-08-22
**Last Modified:** 2025-08-22

## 1. Goal

The goal is to develop the `AAStar_SDK`, a lightweight, high-performance, and developer-friendly SDK for interacting with ERC-4337 compliant smart accounts. The SDK will provide a simple and intuitive API for creating and managing smart accounts, sending user operations, and interacting with paymasters for gas sponsorship.

## 2. Core Components

-   **`AirAccount.ts`:** A class representing the user's smart account. It will be based on the `simple-account` contract from `eth-infinitism` and will handle account creation, nonce management, and user operation signing.
-   **`AAStarClient.ts`:** The main client for interacting with the AAStar ecosystem. It will provide a high-level API for sending user operations, with and without gas sponsorship. It will interact with the `SuperRelay` for paymaster services.
-   **`Signer.ts`:** A helper class for creating and managing different types of signers, including local private key signers and passkey signers.

## 3. Phased Development Plan

### Phase 1: Core Functionality (MVP)

-   Implement the basic `AirAccount` class with account creation and signing capabilities.
-   Implement the `AAStarClient` with the ability to send user operations where the user pays for gas.
-   Write comprehensive unit and integration tests for the core functionality.

### Phase 2: SuperPaymaster Integration

-   Integrate the `SuperRelay` client into the `AAStarClient` to support gas sponsorship.
-   Implement the `sponsorUserOperation` method to get `paymasterAndData`.
-   Update the `sendUserOperation` method to handle gasless transactions.
-   Write tests for the paymaster integration.

### Phase 3: Advanced Features

-   Implement social recovery features for the `AirAccount`.
-   Add support for EIP-7702.
-   Explore and implement other advanced features like batch transactions and session keys.

## 4. API Design

The SDK will follow a direct and intuitive API style, inspired by the ZeroDev SDK. The goal is to make it as easy as possible for developers to integrate account abstraction into their dApps.

**Example:**
```typescript
const client = new AAStarClient({ rpcUrl: '...' });
const account = await client.createAccount({ signer });
const userOpHash = await account.sendTransaction({ to: '...', value: 1n });
```

## 5. RPC Provider

The `AAStarClient` will be initialized with an all-in-one RPC URL that includes a bundler and a paymaster, as provided by the user.

---

# AAStar SDK 技术解决方案 (中文)

**版本:** 1.0
**创建日期:** 2025-08-22
**最后修改:** 2025-08-22

## 1. 目标

我们的目标是开发 `AAStar_SDK`，一个轻量级、高性能、对开发者友好的 SDK，用于与兼容 ERC-4337 的智能账户进行交互。该 SDK 将提供一个简单直观的 API，用于创建和管理智能账户、发送用户操作，以及与 Paymaster 交互以实现 Gas 赞助。

## 2. 核心组件

-   **`AirAccount.ts`:** 代表用户智能账户的类。它将基于 `eth-infinitism` 的 `simple-account` 合约，并处理账户创建、nonce 管理和用户操作签名。
-   **`AAStarClient.ts`:** 与 AAStar 生态系统交互的主客户端。它将提供一个高级 API，用于发送用户操作（无论是否需要 Gas 赞助）。它将与 `SuperRelay` 交互以获取 Paymaster 服务。
-   **`Signer.ts`:** 用于创建和管理不同类型签名者的辅助类，包括本地私钥签名者和 Passkey 签名者。

## 3. 分阶段开发计划

### 第一阶段：核心功能 (MVP)

-   实现基本的 `AirAccount` 类，具备账户创建和签名功能。
-   实现 `AAStarClient`，使其能够发送由用户支付 Gas 的用户操作。
-   为核心功能编写全面的单元和集成测试。

### 第二阶段：集成 SuperPaymaster

-   将 `SuperRelay` 客户端集成到 `AAStarClient` 中，以支持 Gas 赞助。
-   实现 `sponsorUserOperation` 方法以获取 `paymasterAndData`。
-   更新 `sendUserOperation` 方法以处理无 Gas 交易。
-   为 Paymaster 集成编写测试。

### 第三阶段：高级功能

-   为 `AirAccount` 实现社交恢复功能。
-   增加对 EIP-7702 的支持。
-   探索并实现其他高级功能，如批量交易和会话密钥。

## 4. API 设计

SDK 将遵循直接且直观的 API 风格，灵感来自 ZeroDev SDK。目标是让开发者尽可能容易地将账户抽象集成到他们的 dApp 中。

**示例:**
```typescript
const client = new AAStarClient({ rpcUrl: '...' });
const account = await client.createAccount({ signer });
const userOpHash = await account.sendTransaction({ to: '...', value: 1n });
```

## 5. RPC 提供商

`AAStarClient` 将使用用户提供的一体化 RPC URL 进行初始化，该 URL 包含一个 bundler 和一个 paymaster。
