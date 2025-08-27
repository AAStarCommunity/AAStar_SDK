import { AAStarClient, Signer, Transaction } from '../src/index';
import { ethers } from 'ethers';

async function main() {
  console.log('AAStar SDK Example');

  // 1. Configuration
  const config = {
    bundlerUrl: 'https://api.pimlico.io/v1/sepolia/rpc?apikey=YOUR_PIMLICO_API_KEY',
    paymasterUrl: 'https://api.aastar.xyz/paymaster', // Optional
    entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    factoryAddress: '0x9406Cc6185a346906296840746125a0E44976454',
  };

  // 2. Create the main client
  const client = new AAStarClient(config);
  console.log('Client created');

  // 3. Create a signer for the user
  const wallet = ethers.Wallet.createRandom();
  const signer = Signer.createLocalSigner(wallet.privateKey);
  console.log(`Signer created for address: ${wallet.address}`);

  // 4. Create the AirAccount instance
  const account = client.createAccount(signer);
  const accountAddress = await account.getAccountAddress();
  console.log(`Smart Account address: ${accountAddress}`);

  // 5. Build a transaction
  const tx: Transaction = {
    to: '0xRecipientAddress000000000000000000000000', // Replace with a real address
    value: 1000000000000000n, // 0.001 ETH
    data: '0x',
  };
  console.log('Transaction built:', tx);

  // 6. Create the UserOperation
  const userOp = await account.createUnsignedUserOperation(tx);
  console.log('Unsigned UserOperation created');

  // 7. Send the UserOperation (with paymaster sponsorship)
  try {
    console.log('Attempting to send UserOperation with paymaster...');
    await client.authPaymaster('YOUR_AASTAR_API_KEY');

    const userOpHash = await client.sendUserOperation(account, userOp, {
      withPaymaster: true,
    });

    console.log(`UserOperation sent! Hash: ${userOpHash}`);

    // 8. Wait for the receipt
    const receipt = await client.getUserOperationReceipt(userOpHash);
    console.log('UserOperation receipt:', receipt);
  } catch (error) {
    console.error('Failed to send UserOperation:', error);
  }
}

main().catch((error) => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
});
