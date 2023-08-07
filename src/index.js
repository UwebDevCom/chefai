import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(process.env.DB);

app.use(express.json());
app.use(cors());
app.use('/', router());
app.listen(3001, () => console.log("server started"));


