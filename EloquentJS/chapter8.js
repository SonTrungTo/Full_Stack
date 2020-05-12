// Testing
function canYouSpotTheProblem() {
  "use strict"; // without it, removing "let" still reports ReferenceError
  for (let counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();
