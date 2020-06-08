let topScope = Object.create(null);

for (let op of ["+", "-", "*", "/", "%", "==", "<", ">"]) {
  topScope[op] = Function(`a, b`, `return a ${op} b;`);
}

// Since you don't need to evaluate anything!
topScope.print = function(...args) {
  console.log(...args);
  return false;
};

exports.topScope = topScope;
