function range(start,end,step) {
  let array = [];

  if (step === undefined) {
    step = 1;
  }
  // can use start <= end and start >= end, but the boundary should be avoided.
  for (; step > 0 ? (start < end + 1) : (start + 1 > end); start += step) {
    array.push(start);
  }

  return array;
}

console.log(range(1,10).reverse());
console.log(range(1,10,3));
console.log(range(5,2,-1));
console.log(range(1,4,3));

function sum([...numbers]) {
  let result = 0;

  for (let number of numbers) {
    result += number;
  }

  return result;
}

console.log(sum(range(1,10)));
console.log(sum(range(1,10,3)));
console.log(sum(range(5,2,-1)));
console.log(sum(range(1,4,3)));
