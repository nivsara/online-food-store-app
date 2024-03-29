import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import authMid from "../middlewares/auth.mid";

const router = Router();
router.use(authMid);

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
        });

        const newOrder = new OrderModel({...requestOrder, user: req.user.id});
        await newOrder.save();
        res.send(newOrder);
    }
));


router.get( "/", asyncHandler(
    async(req: any, res: any) => {
        const orders = await OrderModel.find({user: req.user.id});
        const sortedData = orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (orders) {
            res.send(sortedData);
        } else {
            res.status(HTTP_BAD_REQUEST).send();
        }
    })
)

router.get( "/newOrderForCurrentUser", asyncHandler(
    async(req: any, res: any) => {
        const order = await getNewCurrentOrderForUser(req);
        if (order) {
            res.send(order);
        } else {
            res.status(HTTP_BAD_REQUEST).send();
        }
    })
)

router.post( "/pay", asyncHandler(
    async(req: any, res: any) => {
        const {paymentId} = req.body;
        const order = await getNewCurrentOrderForUser(req);
        if (!order) {
            res.status(HTTP_BAD_REQUEST).send();
            return;
        }
        order.paymentId = paymentId;
        order.status = OrderStatus.PAID;
        await order.save();
        res.send(order._id);
    }
));

router.get( "/track/:id", asyncHandler(
    async(req: any, res: any) => {
        const order = await OrderModel.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(HTTP_BAD_REQUEST).send();
        }
    })
)

async function getNewCurrentOrderForUser(req: any) {
    return await OrderModel.findOne({user: req.user.id, status: OrderStatus.NEW});
}

export default router;