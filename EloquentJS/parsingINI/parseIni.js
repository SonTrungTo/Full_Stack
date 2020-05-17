const fs = require('fs');

// We are now going to write program that converts the string into
// an object whose properties hold strings for settings written before a section header
// and subobjects for sections, with those subobjects holding the section's settings.
function parseINI(string) {
  // Start with an object that holds the top-level fields
  let result = {};
  let section = result;
}

try {
  let data = fs.readFileSync("data.ini", "utf-8");
  console.log(data);
} catch (e) {
  console.log("Error:", e);
}
