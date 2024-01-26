import { Router } from "express";
import { sample_foods, sample_tags } from "../food-data";
import expressAsyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get("/tags", expressAsyncHandler(
    async(req,res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags' //groups the tags => 2 foods 3 tags , after unwind => 6 foods, 1 tag
            }, {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1}) // -1 for descending , 1 for ascending

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }
        tags.unshift(all); //adds to the beginning of the array
        res.send(tags);
    }
));

router.get("/seed", expressAsyncHandler(
    async(req,res) => {
        const foodCount = await FoodModel.countDocuments();
        if(foodCount > 0) {
            res.send("Seed is already done!")
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seed is done!");
    }
));

router.post( "/update-favorite", expressAsyncHandler(
    async(req: any, res: any) => {
        const food = req.body;
        const updatedFood =  await FoodModel.findByIdAndUpdate(food._id, food, { new: true });
        if (!updatedFood) {
            res.status(HTTP_BAD_REQUEST).send();
            return;
        } else {
            res.send({updatedFavorite: updatedFood.favorite});
        }
    }
));

router.get("/", expressAsyncHandler(
    async (req,res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
));

router.get("/search/:searchTerm", expressAsyncHandler(
    async(req,res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i'); //i for case sensitive
        const foods = await FoodModel.find({name: {$regex: searchRegex}})
        res.send(foods);
    }
));

router.get("/:id", expressAsyncHandler(
    async(req,res) => {
        const food = await FoodModel.findById(req.params.id);
        res.send(food);
    }
));

router.get("/tag/:tagName", expressAsyncHandler(
    async(req,res) => {
        const foods =  req.params.tagName.toLowerCase() === 'all' ? await FoodModel.find() :await FoodModel.find({tags: req.params.tagName});
        res.send(foods);
    }
));

export default router;