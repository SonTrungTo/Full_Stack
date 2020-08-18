const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.type("text");
  res.send(req.headers["user-agent"]);
});

app.listen(app.get("port"), () => {
  console.log("App started on port " + app.get("port"));
});

module.exports = app;
