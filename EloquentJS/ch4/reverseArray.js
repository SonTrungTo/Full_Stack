// Function create a new inverse array of the original
function reverseArray([...elements]) {
  let inverseArray = [];

  for (let element of elements) {
    inverseArray.unshift(element);
  }

  return inverseArray;
}

let array = [1,2,3,4,5,6,7,8,9,10,11];
console.log(reverseArray(array));
console.log(array);

// Function to modify existing array and turn it into an inverse one.
function reverseArrayInPlace(array) {
  for (let i = 0, j = array.length - 1;
      i < Math.floor(array.length / 2), j > Math.floor(array.length / 2);
      ++i, j--) {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array;
}

console.log(reverseArrayInPlace(array));
console.log(array);

/* reverseArray is a pure function. Hence, more versatile.
** reverseArrayInPlace runs faster.
*/
