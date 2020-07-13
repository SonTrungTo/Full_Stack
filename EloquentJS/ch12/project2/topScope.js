let topScope = Object.create(null);

// Adding Boolean for specialForms to read.
topScope.true  = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "%", "==", "<", ">"]) {
  topScope[op] = Function(`a, b`, `return a ${op} b;`);
}

// Since you don't need to complexly interact with args.
topScope.print = function(...args) {
  console.log(...args);
  return false;
};

// Adding array support, its length and its element.
topScope.array = function (...values) {
  return values;
};

topScope.length = function (array) {
  return array.length;
};

topScope.element = function (array, n) {
  return array[n];
};

exports.topScope = topScope;
