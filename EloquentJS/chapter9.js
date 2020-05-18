// Testing, starting REGEX
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-10-1992 15:30"));
console.log(dateTime.test("01.10.1992 15:30"));

// Try writing a version of dateTime that allows single- and double-digit days,
// months, and hours.
let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime2.test("01-10-1992 15:30"));
console.log(dateTime2.test("01.10.1992 15:30"));

// Grouping subexpressions
let cartoonCrying = /Boo+(hoo+)+/i;
let match = /(\d)?/.exec("one two 100");
console.log(cartoonCrying.exec("Boohooooooohoohoooo"));
console.log(match);
console.log(/bad(ly)?/.exec("bad"));

// Creating a date object
function getDate(string) {
  let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}

console.log(getDate("10-01-1992"));
console.log(getDate("100-1-30000")); // Nonsense!
console.log(getDate("00-1-1992"));

// word boundary
console.log(/\bcat\b/.test("con cat enate"));

// replace method with regex,
let bigNames = "Liskov, Barbara\nMcCarthy,John\nWadler, Philip";
console.log(bigNames.replace(/\b(\w+),\s?(\w+)\b/g, "$2 $1"));

// replace with functions
let s = "the cia and fbi";
console.log(/\b(fbi|cia)\b/.exec(s));
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()));

let stock = "1 lemon, 2 cabbages, 101 eggs and 2 kingcrabs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }

  return  amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

// Greedy operators? How to become ungreedy?
// Let's try to write a stripComment function
function stripComment(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g,"");
}
console.log(stripComment("1 + /* 2 */3"));
console.log(stripComment("x = 10; // ten!"));
console.log(stripComment("1 /* a */+/* b */ 1"));

// Patterns known ex-post. Can't use slash-based notation.
let name = "harry";
let text = "Harry Potter is a horny teenager";
let regexp = RegExp("\\b(" + name + ")\\b", "gi");
console.log(regexp);
console.log(text.replace(regexp, "_$1_"));

// Unusual name (name with special characters)?
let specialName = "dea+hl\\[]{}rd";
let specialText = "This dea+hl\\[]{}rd is an annoying kid";
// Solution: escape the special characters
let escaped = specialName.replace(/[\\()+*.{[|^$]/g, "\\$&");
console.log(escaped);
let regexp2 = RegExp("\\b(" + escaped + ")\\b", "gi");
console.log(regexp2);
console.log(specialText.replace(regexp2, "_$1_"));
// P/S : It's beautiful!

// 2 properties of regex additionally: source and lastIndex, the latter
// needs to: 1. have option (global/sticky) 2. match done by exec method.
let pattern = /y/g;
console.log(pattern.source);
pattern.lastIndex = 3;
match = pattern.exec("xyxxy");
console.log(match.index);
console.log(pattern.lastIndex);

// global vs sticky
let globe = /abc/g;
console.log(globe.test("xyz abc"));
let sticky = /abc/y;
console.log(sticky.test("xyz abc"));

// Be careful when sharing a regular expression value (for multiple exec calls)
pattern = /\d/g;
console.log(pattern.exec("Here is what is is: 1"));
console.log(pattern.exec("Now bye bye: 1"));

// Also weird behavior of match when g is enabled (returns array of all matched)
console.log("I AM SON TO".match(/\w/g));

// We can now write a looping over occurences of a pattern in a string,
// with lastIndex and exec mechanism behind it...
let input = "A string with 3 numbers in it... 42 and 88.";
let number = /\b\d+\b/g;
while (match = number.exec(input)) {
  console.log("Found", match[0], "at", match.index);
}

let date = "01-10-1992 22-11-1988";
console.log(date.match(/\b(\d+)-(\d+)-(\d+)\b/));
let regexp3 = /\b(\d+)-(\d+)-(\d+)\b/g
console.log(regexp3.exec(date));
console.log(regexp3.exec(date));

// Finally, add option "u" for Unicode for non-English characters
console.log(/\p{Alphabetic}/u.test("ärsyttävä"));
console.log(/\p{Number}/u.test("&"));
