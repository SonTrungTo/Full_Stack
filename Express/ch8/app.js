const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/test");

app.set("port", process.env.PORT || 3000);
