export declare class AirAccountSigner {
    static createLocalSigner(privateKey: `0x${string}`): {
        account: import("viem").PrivateKeyAccount;
        batch?: {
            multicall?: boolean | import("viem/_types/types/utils").Prettify<import("viem").MulticallBatchOptions> | undefined;
        } | undefined;
        cacheTime: number;
        chain: import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>;
        key: string;
        name: string;
        pollingInterval: number;
        request: import("viem").EIP1193RequestFn<import("viem").WalletRpcSchema>;
        transport: import("viem").TransportConfig<"http", import("viem").EIP1193RequestFn> & {
            fetchOptions?: import("viem").HttpTransportConfig["fetchOptions"];
            url?: string;
        };
        type: string;
        uid: string;
        addChain: (args: import("viem").AddChainParameters) => Promise<void>;
        deployContract: <const TAbi extends import("viem").Abi | readonly unknown[], TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").DeployContractParameters<TAbi, import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, TChainOverride>) => Promise<import("viem").DeployContractReturnType>;
        getAddresses: () => Promise<import("viem").GetAddressesReturnType>;
        getChainId: () => Promise<import("viem").GetChainIdReturnType>;
        getPermissions: () => Promise<import("viem").GetPermissionsReturnType>;
        prepareTransactionRequest: <TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, TChainOverride>) => Promise<import("viem").PrepareTransactionRequestReturnType>;
        requestAddresses: () => Promise<import("viem").RequestAddressesReturnType>;
        requestPermissions: (args: import("viem").RequestPermissionsParameters) => Promise<import("viem").RequestPermissionsReturnType>;
        sendRawTransaction: (args: import("viem/_types/actions/wallet/sendRawTransaction").SendRawTransactionParameters) => Promise<import("viem/_types/actions/wallet/sendRawTransaction").SendRawTransactionReturnType>;
        sendTransaction: <TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").SendTransactionParameters<import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, TChainOverride>) => Promise<import("viem").SendTransactionReturnType>;
        signMessage: (args: import("viem").SignMessageParameters<import("viem").PrivateKeyAccount>) => Promise<import("viem").SignMessageReturnType>;
        signTransaction: <TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem/_types/actions/wallet/signTransaction").SignTransactionParameters<import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, TChainOverride>) => Promise<import("viem/_types/actions/wallet/signTransaction").SignTransactionReturnType>;
        signTypedData: <const TTypedData extends {
            [key: string]: unknown;
        } | {
            [x: string]: readonly import("viem").TypedDataParameter[];
            [x: `string[${string}]`]: undefined;
            [x: `function[${string}]`]: undefined;
            [x: `address[${string}]`]: undefined;
            [x: `bool[${string}]`]: undefined;
            [x: `bytes[${string}]`]: undefined;
            [x: `bytes16[${string}]`]: undefined;
            [x: `bytes1[${string}]`]: undefined;
            [x: `bytes2[${string}]`]: undefined;
            [x: `bytes3[${string}]`]: undefined;
            [x: `bytes4[${string}]`]: undefined;
            [x: `bytes5[${string}]`]: undefined;
            [x: `bytes6[${string}]`]: undefined;
            [x: `bytes7[${string}]`]: undefined;
            [x: `bytes8[${string}]`]: undefined;
            [x: `bytes9[${string}]`]: undefined;
            [x: `bytes10[${string}]`]: undefined;
            [x: `bytes11[${string}]`]: undefined;
            [x: `bytes12[${string}]`]: undefined;
            [x: `bytes13[${string}]`]: undefined;
            [x: `bytes14[${string}]`]: undefined;
            [x: `bytes15[${string}]`]: undefined;
            [x: `bytes17[${string}]`]: undefined;
            [x: `bytes18[${string}]`]: undefined;
            [x: `bytes19[${string}]`]: undefined;
            [x: `bytes20[${string}]`]: undefined;
            [x: `bytes21[${string}]`]: undefined;
            [x: `bytes22[${string}]`]: undefined;
            [x: `bytes23[${string}]`]: undefined;
            [x: `bytes24[${string}]`]: undefined;
            [x: `bytes25[${string}]`]: undefined;
            [x: `bytes26[${string}]`]: undefined;
            [x: `bytes27[${string}]`]: undefined;
            [x: `bytes28[${string}]`]: undefined;
            [x: `bytes29[${string}]`]: undefined;
            [x: `bytes30[${string}]`]: undefined;
            [x: `bytes31[${string}]`]: undefined;
            [x: `bytes32[${string}]`]: undefined;
            [x: `int[${string}]`]: undefined;
            [x: `int16[${string}]`]: undefined;
            [x: `int8[${string}]`]: undefined;
            [x: `int24[${string}]`]: undefined;
            [x: `int32[${string}]`]: undefined;
            [x: `int40[${string}]`]: undefined;
            [x: `int48[${string}]`]: undefined;
            [x: `int56[${string}]`]: undefined;
            [x: `int64[${string}]`]: undefined;
            [x: `int72[${string}]`]: undefined;
            [x: `int80[${string}]`]: undefined;
            [x: `int88[${string}]`]: undefined;
            [x: `int96[${string}]`]: undefined;
            [x: `int104[${string}]`]: undefined;
            [x: `int112[${string}]`]: undefined;
            [x: `int120[${string}]`]: undefined;
            [x: `int128[${string}]`]: undefined;
            [x: `int136[${string}]`]: undefined;
            [x: `int144[${string}]`]: undefined;
            [x: `int152[${string}]`]: undefined;
            [x: `int160[${string}]`]: undefined;
            [x: `int168[${string}]`]: undefined;
            [x: `int176[${string}]`]: undefined;
            [x: `int184[${string}]`]: undefined;
            [x: `int192[${string}]`]: undefined;
            [x: `int200[${string}]`]: undefined;
            [x: `int208[${string}]`]: undefined;
            [x: `int216[${string}]`]: undefined;
            [x: `int224[${string}]`]: undefined;
            [x: `int232[${string}]`]: undefined;
            [x: `int240[${string}]`]: undefined;
            [x: `int248[${string}]`]: undefined;
            [x: `int256[${string}]`]: undefined;
            [x: `uint[${string}]`]: undefined;
            [x: `uint16[${string}]`]: undefined;
            [x: `uint8[${string}]`]: undefined;
            [x: `uint24[${string}]`]: undefined;
            [x: `uint32[${string}]`]: undefined;
            [x: `uint40[${string}]`]: undefined;
            [x: `uint48[${string}]`]: undefined;
            [x: `uint56[${string}]`]: undefined;
            [x: `uint64[${string}]`]: undefined;
            [x: `uint72[${string}]`]: undefined;
            [x: `uint80[${string}]`]: undefined;
            [x: `uint88[${string}]`]: undefined;
            [x: `uint96[${string}]`]: undefined;
            [x: `uint104[${string}]`]: undefined;
            [x: `uint112[${string}]`]: undefined;
            [x: `uint120[${string}]`]: undefined;
            [x: `uint128[${string}]`]: undefined;
            [x: `uint136[${string}]`]: undefined;
            [x: `uint144[${string}]`]: undefined;
            [x: `uint152[${string}]`]: undefined;
            [x: `uint160[${string}]`]: undefined;
            [x: `uint168[${string}]`]: undefined;
            [x: `uint176[${string}]`]: undefined;
            [x: `uint184[${string}]`]: undefined;
            [x: `uint192[${string}]`]: undefined;
            [x: `uint200[${string}]`]: undefined;
            [x: `uint208[${string}]`]: undefined;
            [x: `uint216[${string}]`]: undefined;
            [x: `uint224[${string}]`]: undefined;
            [x: `uint232[${string}]`]: undefined;
            [x: `uint240[${string}]`]: undefined;
            [x: `uint248[${string}]`]: undefined;
            [x: `uint256[${string}]`]: undefined;
            string?: undefined;
            address?: undefined;
            bool?: undefined;
            bytes?: undefined;
            bytes16?: undefined;
            bytes1?: undefined;
            bytes2?: undefined;
            bytes3?: undefined;
            bytes4?: undefined;
            bytes5?: undefined;
            bytes6?: undefined;
            bytes7?: undefined;
            bytes8?: undefined;
            bytes9?: undefined;
            bytes10?: undefined;
            bytes11?: undefined;
            bytes12?: undefined;
            bytes13?: undefined;
            bytes14?: undefined;
            bytes15?: undefined;
            bytes17?: undefined;
            bytes18?: undefined;
            bytes19?: undefined;
            bytes20?: undefined;
            bytes21?: undefined;
            bytes22?: undefined;
            bytes23?: undefined;
            bytes24?: undefined;
            bytes25?: undefined;
            bytes26?: undefined;
            bytes27?: undefined;
            bytes28?: undefined;
            bytes29?: undefined;
            bytes30?: undefined;
            bytes31?: undefined;
            bytes32?: undefined;
            int16?: undefined;
            int8?: undefined;
            int24?: undefined;
            int32?: undefined;
            int40?: undefined;
            int48?: undefined;
            int56?: undefined;
            int64?: undefined;
            int72?: undefined;
            int80?: undefined;
            int88?: undefined;
            int96?: undefined;
            int104?: undefined;
            int112?: undefined;
            int120?: undefined;
            int128?: undefined;
            int136?: undefined;
            int144?: undefined;
            int152?: undefined;
            int160?: undefined;
            int168?: undefined;
            int176?: undefined;
            int184?: undefined;
            int192?: undefined;
            int200?: undefined;
            int208?: undefined;
            int216?: undefined;
            int224?: undefined;
            int232?: undefined;
            int240?: undefined;
            int248?: undefined;
            int256?: undefined;
            uint16?: undefined;
            uint8?: undefined;
            uint24?: undefined;
            uint32?: undefined;
            uint40?: undefined;
            uint48?: undefined;
            uint56?: undefined;
            uint64?: undefined;
            uint72?: undefined;
            uint80?: undefined;
            uint88?: undefined;
            uint96?: undefined;
            uint104?: undefined;
            uint112?: undefined;
            uint120?: undefined;
            uint128?: undefined;
            uint136?: undefined;
            uint144?: undefined;
            uint152?: undefined;
            uint160?: undefined;
            uint168?: undefined;
            uint176?: undefined;
            uint184?: undefined;
            uint192?: undefined;
            uint200?: undefined;
            uint208?: undefined;
            uint216?: undefined;
            uint224?: undefined;
            uint232?: undefined;
            uint240?: undefined;
            uint248?: undefined;
            uint256?: undefined;
        }, TPrimaryType extends string>(args: import("viem").SignTypedDataParameters<TTypedData, TPrimaryType, import("viem").PrivateKeyAccount>) => Promise<import("viem").SignTypedDataReturnType>;
        switchChain: (args: import("viem").SwitchChainParameters) => Promise<void>;
        watchAsset: (args: import("viem").WatchAssetParameters) => Promise<import("viem").WatchAssetReturnType>;
        writeContract: <const TAbi extends import("viem").Abi | readonly unknown[], TFunctionName extends string, TChainOverride extends import("viem").Chain | undefined = undefined>(args: import("viem").WriteContractParameters<TAbi, TFunctionName, import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, TChainOverride>) => Promise<import("viem").WriteContractReturnType>;
        extend: <const client extends {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            chain?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        } & Partial<Pick<import("viem").PublicActions, "getChainId" | "prepareTransactionRequest" | "sendRawTransaction" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<import("viem").HttpTransport, import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, import("viem").WalletRpcSchema, import("viem").WalletActions<import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount>>) => client) => import("viem").Client<import("viem").HttpTransport, import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount, import("viem").WalletRpcSchema, { [K in keyof client]: client[K]; } & import("viem").WalletActions<import("viem/_types/types/utils").Assign<{
            readonly id: 1;
            readonly network: "homestead";
            readonly name: "Ethereum";
            readonly nativeCurrency: {
                readonly name: "Ether";
                readonly symbol: "ETH";
                readonly decimals: 18;
            };
            readonly rpcUrls: {
                readonly alchemy: {
                    readonly http: readonly ["https://eth-mainnet.g.alchemy.com/v2"];
                    readonly webSocket: readonly ["wss://eth-mainnet.g.alchemy.com/v2"];
                };
                readonly infura: {
                    readonly http: readonly ["https://mainnet.infura.io/v3"];
                    readonly webSocket: readonly ["wss://mainnet.infura.io/ws/v3"];
                };
                readonly default: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
                readonly public: {
                    readonly http: readonly ["https://cloudflare-eth.com"];
                };
            };
            readonly blockExplorers: {
                readonly etherscan: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
                readonly default: {
                    readonly name: "Etherscan";
                    readonly url: "https://etherscan.io";
                };
            };
            readonly contracts: {
                readonly ensRegistry: {
                    readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
                };
                readonly ensUniversalResolver: {
                    readonly address: "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62";
                    readonly blockCreated: 16966585;
                };
                readonly multicall3: {
                    readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
                    readonly blockCreated: 14353601;
                };
            };
        }, import("viem/_types/types/chain").ChainConfig<undefined>>, import("viem").PrivateKeyAccount>>;
    };
}
