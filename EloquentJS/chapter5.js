var SCRIPTS = require('/home/stt92/Documents/Full_Stack/EloquentJS/scripts.js');

// Change from character units to script.
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

// Count the words belong to each script
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name  = groupName(item);
    let known = counts.findIndex(s => s.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }

  return counts;
}

// Identify which scripts are being used in the text
function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((n, {count}) => n+count, 0);
  if(total == 0) return "No scripts found!";

  return scripts.map(({name,count}) => `${Math.round(count / total * 100)}% ${name}`).join(", ");
}

console.log(textScripts(`わたしは、あなたを愛しています, Tôi mến bạn, tyttöystävä.
  Tiếng việt không xấu, nhưng cũng không tốt`));
