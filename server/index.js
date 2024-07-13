import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

import { postSignup, postLogin } from './controllers/user.js';

import { postTransaction, getTransactions, deleteTransaction } from "./controllers/transaction.js";


// Connect to MongoDB
const connectDB = async () =>{
  const conn = await mongoose.connect(process.env.MONGODB_URL)

  if (conn) {
    console.log(`MongoDB connected successfully ✅`);
  }
};
connectDB();


app.get('/', (req, res) => {
  res.json({
    message: `Welcome to Expense Tracker API`
  })
})

app.post("/signup", postSignup)
app.post("/login", postLogin)

app.post("/transaction", postTransaction)
app.get("/transactions", getTransactions)
app.delete("/transaction/:id", deleteTransaction)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
