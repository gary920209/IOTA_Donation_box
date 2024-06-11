import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import checkBalance from './check_balence';
import { sendTransaction } from './send_transactions';
import { queue } from 'async';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const app = express();
const port = 8080;
require('dotenv').config({ path: '.env' });

const mongoUri = process.env.MONGOURL!;
console.log(mongoUri)
// Middleware to handle CORS
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

var db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB DBDBDB');
});


// type Status = 'success' | 'processing' | 'pending' | 'failed';
const transactionSchema = new mongoose.Schema({
  transaction: Object,
  transactionId: String,
  amount: Number,
  address: String,
  timestamp: Date,
});

type Transaction = {
  transactionId: String,
  amount: Number,
  timestamp: Date,
};


interface ITransaction extends Document {
  transactionId?: string | null;
  amount?: number | null;
  address?: string | null;
  timestamp?: Date | null;
}

const balanceSchema = new mongoose.Schema({
  total: BigInt,
  timestamp: Date,
});


// Define a simple schema and model
const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  transactions: { type: [transactionSchema], required: false },
  incomingTransactions: { type: [transactionSchema], required: false },
  balance: { type: balanceSchema, required: false },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: String, required: false }
});

const User = mongoose.model('IOTADB', itemSchema);
console.log(User);

export async function updateDatabase(address: string, transactions: any[], incomingTransactions: any[], balance: any, IncomingAddressandAmount: any[], SendingAddressandAmount: any[]) {
  try {
    let user = await User.findOne({ address });
    if (!user) {
      user = new User({
        address,
      });
    }

    user.transactions = SendingAddressandAmount.map(transaction => ({
      transactionId: transaction.transactionId,
      amount: transaction.amount,
      address: transaction.address,
      timestamp: new Date(),
    })) as Types.DocumentArray<{
      transactionId?: string | null | undefined;
      amount?: number | null | undefined;
      timestamp?: Date | null | undefined;
      address?: string | null | undefined;
    }> | null | undefined;

    user.incomingTransactions = IncomingAddressandAmount.map(transaction => ({
      transactionId: transaction.transactionId,
      amount: transaction.amount,
      address: transaction.address,
      timestamp: new Date(),
    })) as Types.DocumentArray<{
      transactionId?: string | null | undefined;
      amount?: number | null | undefined;
      timestamp?: Date | null | undefined;
      address?: string | null | undefined;
    }> | null | undefined;

    user.balance = {
      total: balance.total,
      timestamp: new Date(),
    };

    await user.save();
  } catch (error) {
    console.error('Error updating database:', error);
  }
}

// Create a queue with a concurrency of 1 (tasks will be processed one at a time)
const transactionQueue = queue(async (task: () => Promise<void>, callback) => {
  try {
    await task();
    callback(null);
  } catch (error) {
    // callback(error);
    console.error('Error processing task:', error);
  }
}, 1);

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Endpoint to get all items
app.get('/items', async (req: Request, res: Response) => {
  try {
    const items = await User.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/item', async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    console.log("Finding... ", name);
    const items = await User.findOne({ name: name });
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint to modify an existing item
app.put('/items/:id', async (req: Request, res: Response) => {
  try {
    const updatedItem = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});
let flag = 0;
app.get('/checkbalance', async (req: Request, res: Response) => {
  const address = req.params.address;

  transactionQueue.push(async () => {
    try {
      // Call the checkBalance function
      if (flag == 0) {
        console.log("Checking balance");
        const check_balance = await checkBalance();
        console.log(check_balance);
        res.status(200).json(check_balance);
      }
    } catch (error) {
      console.error('Error checking balance:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Endpoint to insert a new item (alternative to POST /items)
app.post('/insert', async (req: Request, res: Response) => {
  try {
    const newItem = new User(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/send_transaction', async (req: Request, res: Response) => {
  const { accountName, amount, recvAddress } = req.body;

  if (!accountName || !amount || !recvAddress) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  transactionQueue.push(async () => {
    try {
      // Call the sendTransaction function
      await sendTransaction({ accountName, amount: Number(amount), recvAddress });
      res.status(200).json({ message: 'Transaction sent successfully' });
    } catch (error) {
      console.error('Error sending transaction:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

app.post('/box_upload', async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const { money, time, wallet } = req.body;
  try {
    // Find the user by wallet (or create one if not found)
    let user = await User.findOne({ address: wallet });
    if (!user) {
      user = new User({
        _id: new mongoose.Types.ObjectId().toString(),
        name: `Project ${wallet}`,
        address: wallet,
        amount: 0,
        status: 'active'
      });
      console.log("create new user", user);
    }

    // Add the new transaction
    const newTransaction = {
      transactionId: new mongoose.Types.ObjectId().toString(),
      amount: money,
      timestamp: new Date(time * 1000),
    };
    user.transactions?.push(newTransaction);

    // Update the balance
    if (!user.balance) {
      user.balance = {
        total: BigInt(0),
        timestamp: new Date(),
      };
    }
    user.balance.total = BigInt(Number(user.balance.total)) + BigInt(money);
    user.balance.timestamp = new Date();

    await user.save();
    console.log("Data saved", user);
    res.status(201).json({ message: 'Data received successfully', recevied_data: data });
  } catch (error) {
    res.status(400).send(error);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
