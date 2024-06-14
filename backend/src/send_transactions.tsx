import { SendParams } from '@iota/sdk';
import { getUnlockedWallet } from './common';
import { Mutex } from 'async-mutex';
import { initLogger, Wallet, CoinType, WalletOptions } from '@iota/sdk';

require('dotenv').config({ path: '.env' });

interface SendTransactionParams {
    accountName: string;
    amount: Number;
    recvAddress: string;
}
const data = {
    "accountName": "Cheesecake",
    "amount": 100,
    "recvAddress": "tst1qpsd69fc9gfu2y598xr4fy3eg2h0htkwxht5k3mp7rqdmfm5rwy76fdvaj7"
}

const mutex = new Mutex();

const walletOptions: WalletOptions = {
    storagePath: process.env.WALLET_DB_PATH,
    clientOptions: {
        nodes: [process.env.NODE_URL as string],
    },
    coinType: 4218,
    secretManager: {
        stronghold: {
            snapshotPath: process.env.STRONGHOLD_SNAPSHOT_PATH,
            password: process.env.STRONGHOLD_PASSWORD,
        },
    },
};

export async function sendTransaction({ accountName, amount, recvAddress }: SendTransactionParams) {
    return await mutex.runExclusive(async () => {
        try {
            for (const envVar of ['NODE_URL']) {
                if (!(envVar in process.env)) {
                    throw new Error(`.env ${envVar} is undefined, see .env.example`);
                }
            }

            // Create the wallet
            const wallet = await getUnlockedWallet();
            // const wallet = new Wallet(walletOptions);

            // Get the specified account
            const account = await wallet.getAccount(accountName);

            // May want to ensure the account is synced before sending a transaction.
            await account.sync();

            console.log(`Sending '${amount}' coin(s) to '${recvAddress}'...`);
            const params: SendParams[] = [
                { address: recvAddress, amount: String(Number(amount)) },
            ];

            // Send the transaction
            const transaction = await account.sendWithParams(params, {
                allowMicroAmount: true,
            });
            console.log(`Transaction sent: ${transaction.transactionId}`);

            // Wait for transaction to get included
            const blockId = await account.retryTransactionUntilIncluded(transaction.transactionId);
            console.log(`Block included: ${process.env.NODE_URL}/block/${blockId}`);
        } catch (error) {
            console.log('Error: ', error);
        }
    });
}

// Example usage:
// sendTransaction({
//     accountName: 'Cheesecake',
//     amount: 100,
//     recvAddress: process.env.RECV_ADDRESS!
// });

// console.log(BigInt(1))
