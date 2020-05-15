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
