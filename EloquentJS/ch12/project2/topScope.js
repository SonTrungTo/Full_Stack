let topScope = Object.create(null);

// Adding Boolean for specialForms to read.
topScope.true  = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "%", "==", "<", ">"]) {
  topScope[op] = Function(`a, b`, `return a ${op} b;`);
}

// Since you don't need to evaluate anything!
topScope.print = function(...args) {
  console.log(...args);
  return false;
};

exports.topScope = topScope;
