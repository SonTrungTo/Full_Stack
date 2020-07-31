const express = require("express");
const {resolve} = require("path");

const app = express();

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    "message": "Hey Everyone, this is my webpage!"
  });
});

app.listen(3000);
