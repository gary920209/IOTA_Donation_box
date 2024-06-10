import { initLogger, Wallet, CoinType, WalletOptions } from '@iota/sdk';

// This example uses secrets in environment variables for simplicity which should not be done in production.
require('dotenv').config({ path: '.env' });

async function getUnlockedWallet() {
    initLogger();
    for (const envVar of [
        'NODE_URL',
        'STRONGHOLD_PASSWORD',
        'STRONGHOLD_SNAPSHOT_PATH',
        'MNEMONIC',
        'WALLET_DB_PATH',
    ])
        if (!(envVar in process.env)) {
            throw new Error(`.env ${envVar} is undefined, see .env.example`);
        }

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
    const wallet = new Wallet(walletOptions);
    // await wallet.storeMnemonic(process.env.MNEMONIC as string);

    return wallet;
}

export { getUnlockedWallet };