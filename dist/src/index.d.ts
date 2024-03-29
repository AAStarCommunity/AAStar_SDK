import { HealthRes, AuthRes, EntryPointRes, StrategyRes, UserOp, TryPayUserOpRes } from '@/types/response';
/**
 * Change the base url to the production or development url
 *
 * @param isProdUrl is production url
 */
export declare function init(isProdUrl?: boolean): void;
/**
 *
 * @returns server is health or not
 */
export declare const health: () => Promise<HealthRes | any>;
/**
 *
 * @param apiKey
 * @returns
 */
export declare const auth: (apiKey: string) => Promise<AuthRes | any>;
export declare const getSupportEntryPointV1: (network?: string) => Promise<EntryPointRes | any>;
export declare const getSupportStrategyV1: (network?: string) => Promise<StrategyRes | any>;
export declare const tryPayUserOperationV1: (userOp: UserOp) => Promise<TryPayUserOpRes | any>;
