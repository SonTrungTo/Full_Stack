const express = require("express");
const {resolve} = require("path");

const app = express();

const publicPath = resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get("/hello/:who", (req, res) => {
  res.end("Hello, " + req.params.who + ".");
});

app.use((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("No static file!");
});

app.listen(3000);
