const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Express app started on port 3000.");
});
