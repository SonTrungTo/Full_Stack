import express from "express";
import devBundle from "./devBundle";
import path from "path";
import template from "../template";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const CURRENT_WORKING_DIR = process.cwd();
const port = process.env.PORT || 3000;
const url = process.env.REACT_APP_MONGODB_URI ||
    `mongodb://localhost:27017/simpleMERNSetup`;

MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to mongodb server");
    db.close();
});
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