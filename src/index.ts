import axios from 'axios';
import { HealthRes, AuthRes, EntryPointRes, StrategyRes, UserOp, TryPayUserOpRes } from '@/types/response'
import Path from "@utils/path";

/**
 * Change the base url to the production or development url
 * 
 * @param isProdUrl is production url
 */
export function init(isProdUrl = true) {
    axios.defaults.baseURL = isProdUrl ? "https://EthPaymaster.org" : "https://dev.EthPaymaster.org";
}

/**
 * 
 * @returns server is health or not
 */
export const health = (): Promise<HealthRes | any> => {
    return axios.get(Path.Health)
}

/**
 * 
 * @param apiKey 
 * @returns 
 */
export const auth = (apiKey: string): Promise<AuthRes | any> => {
    return axios.post(Path.Auth, { apiKey: apiKey });
}


export const getSupportEntryPointV1 = (network = "Network"): Promise<EntryPointRes | any> => {
    return axios.get(Path.GetSupportEntryPointV1, { params: { network } })
}

export const getSupportStrategyV1 = (network = 'ethereum'): Promise<StrategyRes | any> => {
    return axios.get(Path.GetSupportStrategyV1, { params: { network } })
}

export const tryPayUserOperationV1 = (userOp: UserOp): Promise<TryPayUserOpRes | any> => {
    return axios.post(Path.TryPayUserOperationV1, {
        data: userOp
    })
}
