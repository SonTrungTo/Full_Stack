// const {readFile} = require("fs").promises;
//
// readFile("myfile.txt", "utf8").then((text, err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(text.match(/x/gi).length + " Xs in the file.");
// });
const {createServer} = require("http");

function handlerRequest(request, response) {
  if (request.url == "/") {
    response.end("Hello world!");
  } else if (request.url == "/about") {
    response.end("This is about page!");
  } else {
    response.end("OOPS!");
  }
  console.log("There is a request to: ", request.url);
}

createServer(handlerRequest).listen(3000);
