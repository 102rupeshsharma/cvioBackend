import { connect, ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const dbConnect = () => {
    connect(process.env.dbUrl!, { } as ConnectOptions)
    .then( () => console.log("Connect successfully"),
    (error) => console.log(error)
    );
}
