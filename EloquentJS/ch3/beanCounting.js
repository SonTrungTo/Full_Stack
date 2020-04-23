// My version of writing countChar to use the concept of closure
function countChar(char) {
  return string => {
    let count = 0;

    for (let i = 0; i < string.length; i++) {
      if(string[i] == char)
       ++count;
    }

    return count;
  };
}

let countBs = countChar("B");
console.log(countBs("BullBillBo"));
console.log(countChar("u")("BullBillBo"));

// Another way
function countChar2(string, char) {
  let count = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] == char) {
      ++count;
    }
  }

  return count;
}

function countBs2(string) {
  return countChar2(string, "B");
}

console.log(countBs2("BullBillBo"));
