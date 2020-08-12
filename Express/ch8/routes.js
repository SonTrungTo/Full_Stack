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

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({username}, (err, user) => {
    if (err) {return next(err);}
    if (user) {
      req.flash("error", "User already exists!");
      return res.redirect("/signup");
    }
    let newUser = new User({
      username,
      password
    });
    newUser.save(next); // Create a new user instance, save it to the database and move to the next request handler
  });
}, passport.authenticate("login", { // Authenticate the user with passport
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash:    true
}));

router.get("/users/:username");

module.exports = router;
