const express = require("express");
const passport = require("passport");

const User = require("./models/user");

const router = express.Router();

router.use((req, res, next) => { // these are for ejs templates
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", (req, res, next) => { // Using queries to list users from the newest
  User.find()
  .sort({createdAt: "descending"})
  .exec((err, users) => {
    if (err) {return  next(err);}
    res.render("index", {users});
  });
});

module.exports = router;
