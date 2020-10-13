import express from "express";
import devBundle from "./devBundle";
import path from "path";
import template from "../template";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const CURRENT_WORKING_DIR = process.pwd();
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI ||
    `mongodb+srv://${process.env.REACT_APP_MONGODB_USERNAME}:${process.env.REACT_APP_MONGODB_PASSWORD}@cluster0.a2uik.azure.mongodb.net/${process.env.REACT_APP_MONGODB_DB}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;

devBundle.compile(app);
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.get("/", (req, res) => {
    res.status(200).send(template());
});
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`App is running at ${port}`);
});