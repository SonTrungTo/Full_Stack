const fs = require('fs');

// We are now going to write program that converts the string into
// an object whose properties hold strings for settings written before a section header
// and subobjects for sections, with those subobjects holding the section's settings.
function parseINI(string) {
  // Start with an object that holds the top-level fields
  let result = {};
  let section = result;
  let match;

  string.split(/\r?\n/).forEach(line => {
    if (match = line.match(/^(\w+) = (.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!line.match(/^\s*(;.*)?$/)) {
      throw new Error("Line '" + line + "' is invalid!");
    }
  });

  return result;
}

try {
  let data = fs.readFileSync("data.ini", "utf-8");
  console.log(parseINI(data));
} catch (e) {
  console.log("Error:", e);
}
