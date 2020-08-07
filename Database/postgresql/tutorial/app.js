const express = require("express");
const {urlencoded, json} = require("body-parser");

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({
    extended: true
}));

app.get("/", (request, response) => {
  response.json({info: 'Node.js, Express and Postgres.'});
});

app.listen(port, () => {
  console.log(`App running on ${port}.`);
});
