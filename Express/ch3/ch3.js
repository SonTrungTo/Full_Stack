const express = require("express");
const {createServer} = require("http");

const app = express();

app.use((req, res) => {
  console.log("In coming a request from", req.url);
  res.end("Hello world!");
});

createServer(app).listen(3000); // app.listen(3000);
