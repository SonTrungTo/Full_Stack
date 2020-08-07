const express = require("express");
const {urlencoded, json} = require("body-parser");
const db = require("./queries");

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({
    extended: true
}));

app.get("/", (request, response) => {
  response.json({info: 'Node.js, Express and Postgres.'});
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on ${port}.`);
});
