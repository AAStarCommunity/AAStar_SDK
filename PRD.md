# AAStar SDK Product Requirements Document (PRD)

[English](#aastar-sdk-product-requirements-document-prd-english) | [中文](#aastar-sdk--prd)

---

# AAStar SDK Product Requirements Document (PRD) (English)

**Version:** 1.0
**Created:** 2025-08-22
**Last Modified:** 2025-08-22

## Phase 1: Core Functionality (MVP)

### 1.1. Key Questions to Answer

*   **Question 1:** Can we create a stable and reliable SDK that allows developers to easily create and manage ERC-4337 smart accounts?
*   **Question 2:** Can the SDK send user operations successfully on a testnet, with the user paying for gas?
*   **Question 3:** Is the initial API design intuitive and easy to use for developers?

### 1.2. Core Business Logic and Architecture

*   **`AirAccount.ts`:**
    *   Implement the `create` method to generate a new smart account.
    *   Implement the `getNonce` method to retrieve the account's nonce.
    *   Implement the `signUserOperation` method to sign user operations.
*   **`AAStarClient.ts`:**
    *   Implement the `sendUserOperation` method to send a user operation to the bundler.
*   **`Signer.ts`:**
    *   Implement the `createLocalSigner` method to create a signer from a private key.

### 1.3. User Stories and Use Cases

*   **User Story 1:** As a dApp developer, I want to easily integrate account abstraction into my application so that my users can have a better experience.
*   **Use Case 1:** A developer uses the SDK to create a new smart account for a user and sends a simple transaction from that account.

## Phase 2: SuperPaymaster Integration

### 2.1. Key Questions to Answer

*   **Question 1:** Can the SDK successfully interact with the `SuperRelay` to get gas sponsorship for user operations?
*   **Question 2:** Can the SDK send gasless transactions on a testnet?
*   **Question 3:** How does the gas sponsorship feature affect the complexity of the SDK's API?

### 2.2. Detailed Business Logic and Architecture

*   **`AAStarClient.ts`:**
    *   Implement the `sponsorUserOperation` method to get `paymasterAndData` from the `SuperRelay`.
    *   Update the `sendUserOperation` method to handle both regular and sponsored user operations.
*   **`SuperRelayClient.ts`:**
    *   Implement a new client to handle the communication with the `SuperRelay`.

### 2.3. User Stories and Use Cases

*   **User Story 2:** As a dApp developer, I want to offer gasless transactions to my users to reduce friction and improve adoption.
*   **Use Case 2:** A developer uses the SDK to send a gasless transaction for a user, sponsored by the `SuperPaymaster`.

## Phase 3: Advanced Features

### 3.1. Key Questions to Answer

*   **Question 1:** How can we implement social recovery in a way that is both secure and user-friendly?
*   **Question 2:** What are the implications of EIP-7702 for the SDK's architecture and API?
*   **Question 3:** What other advanced features (e.g., batch transactions, session keys) would be most valuable to developers?

### 3.2. Final Business Logic and Architecture

*   **`AirAccount.ts`:**
    *   Add methods for managing social recovery guardians.
    *   Update the signing logic to support EIP-7702.
*   **`AAStarClient.ts`:**
    *   Add methods for batching transactions.
    *   Add methods for managing session keys.

### 3.3. User Stories and Use Cases

*   **User Story 3:** As a user, I want to be able to recover my account if I lose my primary device.
*   **Use Case 3:** A user initiates the social recovery process to regain access to their `AirAccount`.

---

# AAStar SDK 产品需求文档 (PRD) (中文)

**版本:** 1.0
**创建日期:** 2025-08-22
**最后修改:** 2025-08-22

## 第一阶段：核心功能 (MVP)

### 1.1. 关键问题解答

*   **问题 1:** 我们能否创建一个稳定可靠的 SDK，让开发者能够轻松创建和管理 ERC-4337 智能账户？
*   **问题 2:** SDK 能否在测试网上成功发送用户操作，并由用户支付 Gas？
*   **问题 3:** 初期的 API 设计对开发者来说是否直观易用？

### 1.2. 核心业务逻辑和架构

*   **`AirAccount.ts`:**
    *   实现 `create` 方法以生成新的智能账户。
    *   实现 `getNonce` 方法以检索账户的 nonce。
    *   实现 `signUserOperation` 方法以签署用户操作。
*   **`AAStarClient.ts`:**
    *   实现 `sendUserOperation` 方法以将用户操作发送到 bundler。
*   **`Signer.ts`:**
    *   实现 `createLocalSigner` 方法以从私钥创建签名者。

### 1.3. 用户故事和用例

*   **用户故事 1:** 作为 dApp 开发者，我希望轻松地将账户抽象集成到我的应用程序中，以便我的用户可以获得更好的体验。
*   **用例 1:** 开发者使用 SDK 为用户创建一个新的智能账户，并从该账户发送一个简单的交易。

## 第二阶段：集成 SuperPaymaster

### 2.1. 关键问题解答

*   **问题 1:** SDK 能否成功与 `SuperRelay` 交互，为用户操作获取 Gas 赞助？
*   **问题 2:** SDK 能否在测试网上发送无 Gas 交易？
*   **问题 3:** Gas 赞助功能对 SDK API 的复杂性有何影响？

### 2.2. 详细的业务逻辑和架构

*   **`AAStarClient.ts`:**
    *   实现 `sponsorUserOperation` 方法以从 `SuperRelay` 获取 `paymasterAndData`。
    *   更新 `sendUserOperation` 方法以处理常规和赞助的用户操作。
*   **`SuperRelayClient.ts`:**
    *   实现一个新的客户端来处理与 `SuperRelay` 的通信。

### 2.3. 用户故事和用例

*   **用户故事 2:** 作为 dApp 开发者，我希望为我的用户提供无 Gas 交易，以减少摩擦并提高采用率。
*   **用例 2:** 开发者使用 SDK 为用户发送一笔由 `SuperPaymaster` 赞助的无 Gas 交易。

## 第三阶段：高级功能

### 3.1. 关键问题解答

*   **问题 1:** 我们如何以既安全又用户友好的方式实现社交恢复？
*   **问题 2:** EIP-7702 对 SDK 的架构和 API 有何影响？
*   **问题 3:** 哪些其他高级功能（例如，批量交易、会话密钥）对开发者最有价值？

### 3.2. 最终的业务逻辑和架构

*   **`AirAccount.ts`:**
    *   添加用于管理社交恢复守护者的方法。
    *   更新签名逻辑以支持 EIP-7702。
*   **`AAStarClient.ts`:**
    *   添加用于批量处理交易的方法。
    *   添加用于管理会话密钥的方法。

### 3.3. 用户故事和用例

*   **用户故事 3:** 作为用户，我希望在我丢失主设备的情况下能够恢复我的账户。
*   **用例 3:** 用户启动社交恢复过程以重新获得对其 `AirAccount` 的访问权限。
