// array.forEach(f) => action on element of an array
function repeat(array, action) {
  for (let element of array) {
    action(element);
  }
}

// array.filter(f) => an array of whose element is filtered(Boolean) by a function
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }

  return passed;
}

// array.map(f) => an array of whose element is changed(by action) by a function
function map(array, transform) {
  let transformed = [];
  for (let element of array) {
    transformed.push(transform(element));
  }

  return transformed;
}

// array.reduce(f, start) => return a value from a calculation (combine) on an element and its successor.
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }

  return current;
}

// array.some(f) => True for any element of array decided by f, else false.
function some(array, test) {
  for (let element of array) {
    if (test(element)) {
      return true;
    }
  }

  return false;
}
