const express   = require("express");
const {join} = require("path");
//const {stat} = require("fs");
const morgan = require("morgan");

const app = express();

app.use(morgan("short"));

let filePath = join(__dirname, "static");
app.use(express.static(filePath));
// app.use((req, res, next) => {
//   let filePath = join(__dirname, "static", req.url);
//   stat(filePath, (err, fileInfo) => {
//     if (err) {
//       next();
//       return;
//     }
//
//     if (fileInfo.isFile()) {
//       res.sendFile(filePath);
//     } else {
//       next();
//     }
//   });
// });

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send("Internal server error.");
});

app.use((req, res) => {
  res.status(404).send("File not found!");
});

app.listen(3000, () => {
  console.log("The app is at port 3000.");
});
