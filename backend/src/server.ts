import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from "./configs/database.config";

dbConnect();
const app = express(); //creates an express application
app.use(express.json());

app.use(cors({             // since we have to use another port, we use cors
    credentials: true,
    origin: ["http://localhost:4200"] //tells the express that localhost 4200 could have a request on this server and the credentials are true
}));

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const port = 5000;
app.listen(port, () => {
    console.log("I'm running at ", +port);
});