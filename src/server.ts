import 'localstorage-polyfill'
global['localStorage'] = localStorage;

import dotenv from 'dotenv';
dotenv.config();


import express from 'express'
import cors from 'cors'

import userRouter from '../src/router/user.router'
import { dbConnect } from './configs/database.config';
dbConnect();


const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use('/user', userRouter)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

