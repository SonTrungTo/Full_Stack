function flattening(array) {
  let flatArray = [];

  flatArray = array.reduce((a,b) => a.concat(b));

  return flatArray;
}

let array = [[1,2,3],4,[5,6],1,9];
console.log(flattening(array));
