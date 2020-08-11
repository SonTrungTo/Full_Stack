const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

let salt1 = bcrypt.genSaltSync();
let salt2 = bcrypt.genSaltSync();
let secret = bcrypt.hashSync(salt1 + salt2, 10);

const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/learn_about_me_db");

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret,
  resave: true, // session store that does not support "touch", or updating session (saving it)
  saveUninitialized: true // to regconize the session store id (cookie), regconize the old users and save it.
}));
app.use(flash());

app.use(routes);

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
