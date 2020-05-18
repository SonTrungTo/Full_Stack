// car and cat
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

// prop and pop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

// ferret, ferry and ferrari
verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

// ending in 'ious'
verify(/\w+?ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

// whitespace followed by .,;:
verify(/\s[,.;:]/,
       ["bad punctuation ."],
       ["escape the period"]);

// words longer than 6 letters.
verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

// words without e/E
verify(/\b[^eE ]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);

// Automate verification
function verify(regexp, yes, no) {
  // Ignore unfinished verification
  if (regexp.source == "...") return;
  for (let str of yes) {
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  }
  for (let str of no) {
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
  }
}
