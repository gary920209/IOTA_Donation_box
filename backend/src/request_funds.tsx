import { Utils, Wallet, initLogger } from '@iota/sdk';
import { getUnlockedWallet } from './common';

require('dotenv').config({ path: '.env' });

// Run with command:
// yarn run-example ./how_tos/alias-wallet/request-funds.ts

// In this example we request funds to an alias wallet.
async function run() {
    // initLogger();
    for (const envVar of ['WALLET_DB_PATH', 'FAUCET_URL']) {
        if (!(envVar in process.env)) {
            throw new Error(`.env ${envVar} is undefined, see .env.example`);
        }
    }
    try {
        const faucetUrl = process.env.FAUCET_API as string;

        // Create the wallet
        const wallet = await getUnlockedWallet();

        // Get the account we generated with `create_wallet`
        const account = await wallet.getAccount('Alice');

        const syncOptions = {
            alias: {
                basicOutputs: true,
            },
        };
        const balance = await account.sync(syncOptions);

        const totalBaseTokenBalance = balance.baseCoin.total;
        console.log(
            `Balance before requesting funds on alias address: ${totalBaseTokenBalance}`,
        );

        console.log('Alias:', balance);
        const aliasId = balance.aliases[0];
        console.log(`Alias Id: ${aliasId}`);

        const address = (await account.addresses())[0].address;
        
        // // Get Alias address
        const aliasAddress = Utils.aliasIdToBech32(
            aliasId,
            await (await wallet.getClient()).getBech32Hrp(),
        );
        console.log(aliasAddress);

        const faucetResponse = await (
            await wallet.getClient()
        ).requestFundsFromFaucet(faucetUrl, aliasAddress);
        console.log("response:", faucetResponse);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const totalBaseTokenBalanceAfter = (await account.sync(syncOptions))
            .baseCoin.total;
        console.log(
            `Balance after requesting funds on alias address: ${totalBaseTokenBalanceAfter}`,
        );
    } catch (error) {
        console.error('Error: ', error);
    }
}

run().then(() => process.exit());