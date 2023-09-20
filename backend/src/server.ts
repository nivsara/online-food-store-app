import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./food-data";
import jwt from 'jsonwebtoken';

const app = express(); //creates an express application
app.use(express.json());

app.use(cors({             // since we have to use another port, we use cors
    credentials: true,
    origin: ["http://localhost:4200"] //tells the express that localhost 4200 could have a request on this server and the credentials are true
}));

app.get("/api/foods", (req,res) => {
    res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req,res) => {
    const searchTerm = req.params.searchTerm;
    const searchResults = sample_foods.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(searchResults);
});

app.get("/api/foods/:id", (req,res) => {
    const foodId = req.params.id;
    const searchResults = sample_foods.find((item) => item.id === foodId);
    res.send(searchResults);
});

app.get("/api/tags", (req,res) => {
    res.send(sample_tags);
});

app.get("/api/foods/tag/:tagName", (req,res) => {
    const tagName = req.params.tagName;
    const searchResults = (tagName === 'All' ? sample_foods : sample_foods.filter((item) => item.tags.includes(tagName)));
    res.send(searchResults);
});

app.post( "/api/users/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find((user) => user.email === email && user.password === password);
    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Invalid Credentials");
    }
});

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, 'SomeRandomText',  {
        expiresIn: "30d"
    })

    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("I'm running at ", +port);
});