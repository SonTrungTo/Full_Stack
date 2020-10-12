import express from "express";
import devBundle from "./devBundle";
import path from "path";
import template from "../template";

const app = express();
const CURRENT_WORKING_DIR = process.pwd();
const port = process.env.PORT || 3000;

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