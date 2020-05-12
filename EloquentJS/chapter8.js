// Testing
function canYouSpotTheProblem() {
  "use strict"; // without it, removing "let" still reports ReferenceError
  for (let counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();

// function Person(name) {this.name = name;}
// let sonto = Person("Son_TO"); // OOPS, already in strict
// console.log(sonto);

// I can't believe I cannot spot this error
function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }

  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);

  return sign + result;
}

console.log(numberToString(13,10));
