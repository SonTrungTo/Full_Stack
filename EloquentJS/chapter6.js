// Arrow != function := function has its own binding, but arrow does not.
function normalize() {
  console.log(this.coord.map(n => n / this.length));
}

normalize.call({coord: [0, 2, 3], length: 5});
let obj = {coord: [0, 2, 3], length: 5};
console.log(Object.getPrototypeOf(obj) == Object.prototype);
console.log(Object.prototype.toString.call([1,2]));
console.log(obj.toString());

// Symbol: It's possible for multiple interfaces to use the same property for different purposes.
let sym = Symbol("toString");
console.log(sym);
console.log(sym == "toString");
console.log(String(obj));
let toStringProperty = Symbol("toString");
Array.prototype[toStringProperty] = function () {
  return `${this.length} cm of blue yarn`;
}

console.log([1,2].toString());
console.log([1,2][toStringProperty]());
