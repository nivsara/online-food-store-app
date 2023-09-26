import { Router } from "express";
import jwt from 'jsonwebtoken';
import { sample_users } from "../food-data";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

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
        const user = await UserModel.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))) {
            res.send(generateTokenResponse(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("Invalid Credentials");
        }
    }
));

router.post( "/register", expressAsyncHandler(
    async(req, res) => {
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user) {
            res.status(HTTP_BAD_REQUEST).send("Email is already registered with us!");
            return;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser: User = {
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, 'SomeRandomText',  {
        expiresIn: "30d"
    })
    return {
        id: user.id,
        email: user.email,
        token: token,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin
    };
}

export default router;