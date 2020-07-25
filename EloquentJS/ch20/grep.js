const {search} = require("./src/grepFunction");

let regex = new RegExp(process.argv[2]);
let files = process.argv.slice(3);

for (let file of files) {
  search(regex, file);
}
