export interface NetworkConfig {
  name: string;
  bundlerUrl: string;
  paymasterUrl: string;
  entryPointAddress: string;
  factoryAddress: string;
}

export class NetworkManager {
  private static networks: { [key: string]: NetworkConfig } = {
    'sepolia': {
      name: 'sepolia',
      bundlerUrl: process.env.SEPOLIA_BUNDLER_URL || 'https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR_PIMLICO_API_KEY',
      paymasterUrl: process.env.SEPOLIA_PAYMASTER_URL || 'https://api.aastar.xyz/paymaster',
      entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      factoryAddress: '0x9406Cc6185a346906296840746125a0E44976454',
    },
    'op-sepolia': {
      name: 'op-sepolia',
      bundlerUrl: process.env.OP_SEPOLIA_BUNDLER_URL || 'https://api.pimlico.io/v1/op-sepolia/rpc?apikey=YOUR_PIMLICO_API_KEY',
      paymasterUrl: process.env.OP_SEPOLIA_PAYMASTER_URL || 'https://api.aastar.xyz/paymaster',
      entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      factoryAddress: '0x9406Cc6185a346906296840746125a0E44976454',
    },
    'op-mainnet': {
      name: 'op-mainnet',
      bundlerUrl: process.env.OP_MAINNET_BUNDLER_URL || 'https://api.pimlico.io/v1/op-mainnet/rpc?apikey=YOUR_PIMLICO_API_KEY',
      paymasterUrl: process.env.OP_MAINNET_PAYMASTER_URL || 'https://api.aastar.xyz/paymaster',
      entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
      factoryAddress: '0x9406Cc6185a346906296840746125a0E44976454',
    },
  };

  static getNetworkConfig(networkName: string): NetworkConfig {
    const config = NetworkManager.networks[networkName.toLowerCase()];
    if (!config) {
      throw new Error(`Network configuration for '${networkName}' not found.`);
    }
    return config;
  }

  static getAllNetworkNames(): string[] {
    return Object.keys(NetworkManager.networks);
  }
}
