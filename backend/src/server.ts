import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./food-data";

const app = express(); //creates an express application
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


const port = 5000;
app.listen(port, () => {
    console.log("I'm running at ", +port);
});