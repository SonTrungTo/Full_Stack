const express = require("express");

const api = express.Router();

// app.get("/random/:min/:max", (req, res) => {
//   let min = parseInt(req.params.min), max = parseInt(req.params.max);
//
//   if (isNaN(min) || isNaN(max)) {
//     res.status(400).json({error: "Bad request."});
//     return ;
//   }
//
//   let result = Math.round(Math.random() * (max - min) + min);
//
//   res.json({result});
// });

api.get("/timezone", (req, res) => {
  res.send("Sample response to /timezone.");
});

api.get("/alltimezone", (req, res) => {
  res.send("Sample response to /allTimezone")
})

module.exports = api;
