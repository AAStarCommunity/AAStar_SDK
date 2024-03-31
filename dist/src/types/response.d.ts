interface BaseRes {
    code: number;
    message: string;
    cost: string;
}
export interface HealthRes extends BaseRes {
    data: {
        environment: string;
        hello: string;
        time: string;
        version: string;
    };
}
export interface AuthRes {
    code: number;
    expire: string;
    token: string;
}
export interface EntryPoint {
    address: string;
    desc: string;
    network: string;
    strategy_id: string;
}
export interface EntryPointRes extends BaseRes {
    data: EntryPoint[];
}
interface ExecuteRestriction {
    ban_sender_address: string;
    effective_start_time: number;
    effective_end_time: number;
    global_max_usd: number;
    global_max_op_count: number;
}
interface Strategy {
    description: string;
    enable_4844: boolean;
    enable_7560: boolean;
    enable_currency: boolean;
    enable_eoa: boolean;
    enable_erc20: boolean;
    entrypoint_address: string;
    entrypoint_tag: string;
    execute_restriction: ExecuteRestriction[];
    id: string;
    network: string;
    pay_type: string;
    paymaster_address: string;
    token: string;
}
export interface StrategyRes extends BaseRes {
    data: Strategy[];
}
export interface TryPayUserOpRes extends BaseRes {
    data: {
        strategy_id: string;
        entrypoint_address: string;
        paymaster_address: string;
        paymaster_signature: string;
        paymaster_and_data: string;
        pay_receipt: {
            transaction_hash: string;
            sponsor: string;
        };
        gas_info: {
            gas_info: {
                max_base_price_wei: number;
                max_base_price_gwei: number;
                max_base_price_ether: string;
                max_priority_price_wei: number;
                max_priority_price_gwei: number;
                max_priority_price_ether: string;
            };
            token_cost: string;
            network: string;
            token: string;
            usd_cost: number;
            blob_enable: boolean;
            max_fee: number;
        };
    };
}
export interface UserOpReq {
    forceStrategyId: string;
    userOperation: {
        callData: string;
        callGasLimit: string;
        initCode: string;
        maxFeePerGas: string;
        maxPriorityFeePerGas: string;
        nonce: string;
        preVerificationGas: string;
        sender: string;
        signature: string;
        verificationGasLimit: string;
        paymasterAndData: string;
    };
}
export {};
