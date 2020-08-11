const express = require("express");

const User = require("./models/user");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors;
  res.locals.infos;
});
