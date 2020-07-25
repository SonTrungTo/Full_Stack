exports.search = search;

const {readFileSync, statSync, readdirSync} = require("fs");

function search(pattern, file) {
  let stats = statSync(file);

  if (stats.isDirectory()) {
    for (let dir of readdirSync(file)) {
      search(pattern, file + "/" + dir);
    }
  } else {
    let text = readFileSync(file, "utf8");
    if (pattern.test(text)) console.log(file);
  }
}
