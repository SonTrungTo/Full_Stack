const {readFile} = require("fs").promises;

readFile("myfile.txt", "utf8").then((text, err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(text.match(/x/gi).length + " Xs in the file.");
});
