// const {readFile} = require("fs");
// readFile("file.txt", "utf8", (error, text) => {
//   if (error) throw error;
//   console.log("The file contains:", text);
// });

// const {readFile} = require("fs");
// readFile("file.txt", (error, buffer) => {
//   if (error) throw error;
//   console.log("The buffer contains", buffer.length, "bytes");
//   console.log("The first byte is:", buffer[0]);
// });

// const {writeFile} = require("fs");
// writeFile("graffiti.txt", "I want to love Finland", err => {
//   if (err) {
//     console.log(`Failed to write file: ${err}`);
//   } else {
//     console.log("File written.");
//   }
// }); // second arg can also be a Buffer object

const {readFile} = require("fs").promises;
readFile("file.txt", "utf8").then(text => console.log(text)); // readFileSync for synchronous.
