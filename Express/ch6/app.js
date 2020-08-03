const express = require("express");

const app = express();

app.get("/random/:min/:max", (req, res) => {
  let min = parseInt(req.params.min), max = parseInt(req.params.max);

  if (isNaN(min) || isNaN(max)) {
    res.status(400).json({error: "Bad request."});
    return ;
  }

  let result = Math.round(Math.random() * (max - min) + min);

  res.json({result});
});

app.listen(3000);
