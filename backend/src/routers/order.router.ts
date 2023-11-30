import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";

const router = Router();

router.post( "/create", asyncHandler(
    async(req: any, res: any) => {
        const requestOrder = req.body;
        if(requestOrder.items.length <= 0 ) {
            res.send(HTTP_BAD_REQUEST).send('Cart is Empty!');
            return;
        }

        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW
        })
    }
));