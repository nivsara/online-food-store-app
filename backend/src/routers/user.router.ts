import { Router } from "express";
import jwt from 'jsonwebtoken';
import { sample_users } from "../food-data";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";

const router = Router();

router.get("/seed", expressAsyncHandler(
    async(req,res) => {
        const userCount = await UserModel.countDocuments();
        if(userCount > 0) {
            res.send("Seed is already done!")
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done!");
    }
));

router.post( "/login", expressAsyncHandler(
    async(req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email, password});
        if(user) {
            res.send(generateTokenResponse(user));
        } else {
            res.status(400).send("Invalid Credentials");
        }
    }
));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, 'SomeRandomText',  {
        expiresIn: "30d"
    })

    user.token = token;
    return user;
}

export default router;