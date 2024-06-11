import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    transactionId: String,
    amount: Number,
    timestamp: Date,
});

type Transaction = ({
    transactionId: String,
    amount: Number,
    timestamp: Date,
});

const balanceSchema = new mongoose.Schema({
    total: Number,
    timestamp: Date,
});

const userSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    transactions: [transactionSchema],
    balance: balanceSchema,
});


export async function updateDatabase(address: string, transactions: any[], incomingTransactions: any[], balance: any) {
    const User = mongoose.model('IOTADB', userSchema);
    try {
        let user = await User.findOne({ address });
        if (!user) {
            user = new User({
                address,
            });
        }
        // user.transactions = transactions.map(transaction => ({
        //     transactionId: transaction.transactionId,
        //     amount: transaction.amount,
        //     timestamp: new Date(),
        // }));

        user.balance = {
            total: balance.total,
            timestamp: new Date(),
        };

        await user.save();
    } catch (error) {
        console.error('Error updating database:', error);
    }
}