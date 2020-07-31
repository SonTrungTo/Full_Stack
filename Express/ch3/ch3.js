const express = require("express");
const logger = require("morgan");
//const {createServer} = require("http");

const app = express();

app.use(logger("short"));

app.use((req, res, next) => {
  console.log("In comes a " + req.method + " to " + req.url);
  next();
});

app.use((req, res, next) => {
  let minute = (new Date()).getMinutes();
  if (minute % 2 === 0) {
    next();
  } else {
    res.statusCode = 403;
    res.end("Not authorized!");
  }
});

app.use((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Secret info: password is 'swordfish'!");
});

//createServer(app).listen(3000); // app.listen(3000);
app.listen(3000);
