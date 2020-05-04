console.log(Object.getPrototypeOf(hasOwnProperty) == Function.prototype);
let ages = {
  hasOwnProperty: 20,
  Isa : 30,
  Ola : 22
}
console.log(ages);
// console.log(ages.hasOwnProperty("Isa")); // Not anymore!
console.log(Function.prototype.hasOwnProperty.call(ages, "Isa"));
console.log(Function.prototype.hasOwnProperty.call(ages, "hasOwnProperty"));
console.log(Function.prototype.hasOwnProperty.call(ages, "Ola"));
console.log(Function.prototype.hasOwnProperty.call(ages, "toString"));
