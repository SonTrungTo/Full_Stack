const express   = require("express");
const {resolve} = require("path");
const {zipcode} = require("zippity-do-dah");
const ForecastIo = require("forecastio");

const app = express();
const weather = new ForecastIo("c63a8baf76fdc40e38124f6e28ef6752");

app.use(express.static(resolve(__dirname, "public")));

app.set("views", resolve(__dirname, "views"));
app.set("view engine", "ejs");
