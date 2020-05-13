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
// I see it now! Come on, I am a C programmer. (C makes bad habit!)
function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }

  do {
    // debugger;
    result = String(n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);

  return sign + result;
}

console.log(numberToString(13,10));

// Throw an exception
function promptDirection(question) {
  let result = prompt(question);
  if(result.toLowerCase() == "left")   return "L";
  if(result.toLowerCase() == "right")  return "R";

  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}

// Some really bad banking code (fixed)
const accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount)  return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}

transfer("a", 10);
