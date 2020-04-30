function everything1(array, test) {
  for (let element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

// I cannot write this one.
function everything2(array, test) {
  return (!array.some(element => !test(element))); // There is none that matches the unmatched!
}

let array = [1,2,3,4,5];
console.log(everything1(array, n => n<=5 && n>=1));
console.log(everything1(array, n => n<=5 && n>1));
console.log(everything1(array, n => n>6));
console.log(everything2(array, n => n<=5 && n>1));
console.log(everything2(array, n => n>6));
