const {grep} = require("./src/grepFunction");

let regexArg = process.argv[2];
let fileArgs = Array.from(process.argv).slice(3);

console.log(grep(regexArg, fileArgs));
