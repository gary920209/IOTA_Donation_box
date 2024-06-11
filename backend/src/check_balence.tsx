// Copyright 2023 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Wallet, CoinType, WalletOptions, Event, WalletEventType, RegularTransactionEssence, BasicOutput, CommonOutput, AddressUnlockCondition, Balance } from '@iota/sdk';
import { updateDatabase } from './index';

// This example uses secrets in environment variables for simplicity which should not be done in production.
require('dotenv').config({ path: '.env' });


const walletOptions: WalletOptions = {
    storagePath: process.env.WALLET_DB_PATH, // A name to associate with the created account.
    clientOptions: {
        // nodes: ['https://api.testnet.shimmer.network'], // The node to connect to.
        nodes: [process.env.NODE_URL as string],
    },
    // coinType: CoinType.Shimmer,
    coinType: 4218,
    secretManager: {
        // Setup Stronghold secret manager
        stronghold: {
            snapshotPath: process.env.RECV_ADDRESS, //  The path to store the account snapshot.
            password: process.env.STRONGHOLD_PASSWORD, // A password to encrypt the stored data. WARNING: Never hardcode passwords in production code.
        },
    },
};
const wallet = new Wallet(walletOptions);

// This example syncs the account and prints the balance.
const checkBalance = async () => {
    console.log('Checking balance...');
    for (const envVar of ['WALLET_DB_PATH', 'NODE_URL', 'STRONGHOLD_PASSWORD']) {
        if (!(envVar in process.env)) {
            throw new Error(`.env ${envVar} is undefined, see .env.example`);
        }
    }
    try {
        // await wallet.storeMnemonic(process.env.MNEMONIC as string);

        // Create a new account
        // const account = await wallet.createAccount({
        //     alias: 'Alice',
        // });
        // console.log('Generated new account:', account.getMetadata().alias);

        const callback = function (err: any, event: Event) {
            console.log('AccountIndex:', event.accountIndex);
            console.log('Event:', event.event);

            // Exit after receiving an event.
            // process.exit(0);
        };

        // Only interested in new outputs here.
        // await wallet.listen([WalletEventType.NewOutput], callback);
        // const account = await wallet.getAccount('Cheesecake');
        const account = await wallet.getAccount('Alice');
        // wallet.removeLatestAccount();
        // const account = await wallet.getAccount('Cheesecake');
        const addresses = await account.addresses();

        for (const address of addresses) console.log(address.address);
        // await wallet.getClient();
        await account.sync({ syncIncomingTransactions: true });

        const transactions = await account.transactions();
        console.log('Sent transactions:');
        // for (const transaction of transactions)
        //     console.log(transaction.transactionId);
        let SendingAddressandAmount = []
        for (let i = 0; i < transactions.length; i++) {
            const transactionDetails = transactions[i]
            const transactionsEssence = transactionDetails.payload.essence as RegularTransactionEssence
            console.log(transactionsEssence.outputs)
            let output = transactionsEssence.outputs[0] as CommonOutput
            // for (let output of transactionsEssence.outputs as CommonOutput[]) {
            console.log(output)
            // output = output as BasicOutput;
            if (output.type === 3) { // BasicOutput
                const addressUnlockCondition = output.unlockConditions[0] as AddressUnlockCondition; // Extract the recipient address
                const addressType = (addressUnlockCondition.type == 0) ? 'Ed25519' : (addressUnlockCondition.type == 4) ? 'Alias' : 'Unknown';
                const address = addressUnlockCondition.address.toString();
                SendingAddressandAmount.push({ address: address, amount: output.amount, transactionId: transactions[i].transactionId });
                // Now you have the address, you can track transactions involving this address
                // console.log(`Address Type: ${addressType}`);
                // console.log(`Sent to address: ${address} Amount: ${output.amount}`);
            }
            else if (output.type === 4) { // AliasOutput
                const addressUnlockCondition = output.unlockConditions[0] as AddressUnlockCondition;
                const aliasId = addressUnlockCondition.address;
                console.log(`AliasOutput with aliasId: ${aliasId} Amount: ${output.amount}`);
            }
            // }
        }
        console.log(SendingAddressandAmount)
        const incomingTransactions = await account.incomingTransactions();
        console.log('Incoming transactions:');
        for (const transaction of incomingTransactions) {
            console.log(transaction.transactionId);
        }
        let IncomingAddressandAmount = []
        for (let i = 0; i < incomingTransactions.length; i++) {
            const transactionDetails = incomingTransactions[i]
            const transactionsEssence = transactionDetails.payload.essence as RegularTransactionEssence
            console.log(transactionsEssence.outputs)
            let output = transactionsEssence.outputs[0] as CommonOutput
            // for (let output of transactionsEssence.outputs as CommonOutput[]) {
            console.log(output)
            // output = output as BasicOutput;
            if (output.type === 3) { // BasicOutput
                const addressUnlockCondition = output.unlockConditions[0] as AddressUnlockCondition; // Extract the recipient address
                const addressType = (addressUnlockCondition.type == 0) ? 'Ed25519' : (addressUnlockCondition.type == 4) ? 'Alias' : 'Unknown';
                const address = addressUnlockCondition.address.toString();
                IncomingAddressandAmount.push({ address: address, amount: output.amount, transactionId: incomingTransactions[i].transactionId });
                // Now you have the address, you can track transactions involving this address
                // console.log(`Address Type: ${addressType}`);
                // console.log(`Sent to address: ${address} Amount: ${output.amount}`);
            }
            else if (output.type === 4) { // AliasOutput
                const addressUnlockCondition = output.unlockConditions[0] as AddressUnlockCondition;
                const aliasId = addressUnlockCondition.address;
                console.log(`AliasOutput with aliasId: ${aliasId} Amount: ${output.amount}`);
            }
            // }
        }
        console.log(IncomingAddressandAmount)
        // Sync new outputs from the node.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _syncBalance = await account.sync();

        // After syncing the balance can also be computed with the local data
        const balance = await account.getBalance();
        console.log('Balance: ', balance.baseCoin);
        const primaryAddress = addresses[0].address;
        await updateDatabase(primaryAddress, transactions, incomingTransactions, balance.baseCoin, IncomingAddressandAmount, SendingAddressandAmount);

        return { transactions, incomingTransactions, balance };
    } catch (error) {
        console.error('Error: ', error);
    }
}
export default checkBalance;
// checkBalance();

// checkBalance().then(() => process.exit());

