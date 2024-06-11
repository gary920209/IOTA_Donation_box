import { Client, initLogger } from '@iota/sdk';

async function run() {
    initLogger();

    const client = new Client({
        nodes: ['http://140.112.18.206:14265'],
        // nodes: ['https://api.testnet.shimmer.network'],
        localPow: true,
    });

    try {
        const nodeInfo = await client.getInfo();
        console.log('Node info: ', nodeInfo);
    } catch (error) {
        console.error('Error: ', error);
    }
}

run().then(() => process.exit());