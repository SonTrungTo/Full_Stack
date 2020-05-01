var SCRIPTS = require('/home/stt92/Documents/Full_Stack/EloquentJS/scripts.js');

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) =>
      code >= from && code < to
    )) {
      return script;
    }
  }
  return null;
}

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

// We use both the functions above from chapter5.js to write this
function dominantWritingDirection(text) {
  let dtrArray = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script? script.direction : "none";
  }).filter(({name}) => name != "none");

  let domDtr= dtrArray.reduce((a,b) => a.count < b.count ? b : a);
  let total = dtrArray.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No writing direction found!";

  return dtrArray.map(s => `${Math.round(s.count / total * 100)}%  ${s.name}`).join(", ")
  .concat(`. The dominant writing style is ${domDtr.name}`);
}

console.log(dominantWritingDirection(`Sword Art Online is a shitty anime.
  キリトは、インバの力を備えた、とてもオシャレで下品なキャラクターです。
  אַסונאַ איז אַ וואַיפו בלויז פֿאַר פאַנסערוויסע.`));
