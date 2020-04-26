// array to list
function arrayToList(array) {
  let list = null;

  for (let value of array.reverse()) {
    list = {value, rest: list};
  }

  array.reverse(); // Undo the reverse.

  return list;
}

let array = [1,2,3];
console.log(arrayToList(array));
console.log(array);

// list to array
function listToArray(list) {
  let array = [];

  while (list != null) {
    array.push(list.value);
    list = list.rest;
  }

  return array;
}

console.log(listToArray((arrayToList(array))));

// prepend to list
function prepend(element, list) {
  let newList = {};

  newList = {value: element, rest: list};

  return newList;
}

let list = arrayToList(array);
console.log(prepend(0, list));
console.log(prepend(-1, prepend(0, list)));

// nth returns an element in a list at the specific index
function nth(list, index) {
  if (index == 0)
    return list;
  else if (index < 0 || list == null)
    return undefined;
  else
    return nth(list.rest, index - 1);
}

console.log(nth(list, 1));
console.log(nth(list, 2));
console.log(nth(list, 3));
console.log(nth(list, 4));
