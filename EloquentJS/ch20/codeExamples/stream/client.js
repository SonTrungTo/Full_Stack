const {request} = require("https");
request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, response => {
  response.on("data", chunk => {
    process.stdout.write(chunk.toString());
  });
}).end("Son To is a noob!");
