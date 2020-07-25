exports.grep = grep;

const {readFile} = require("fs");

function grep(pattern, files) {
  let match;

  for (let file of files) {
    readFile(String(file), "utf8", (err, text) => {
      if (err) throw err;
      if (match = pattern.exec(text)) return file;
    });
  }
}
