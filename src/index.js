import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';

const app = express();

mongoose.connect('mongodb+srv://uwebdev:uwebdev2020@recipes.kshlhno.mongodb.net/recipes?retryWrites=true&w=majority');

app.use(express.json());
app.use(cors());
app.use('/', router());
app.listen(3001, () => console.log("server started"));


