// Chapter 10: Modules incoming....
// Testing Date object
let date = new Date();
console.log(date);
console.log(date.getDay());
console.log(date.getDate());
console.log(date.getFullYear());
console.log(date.getMonth());

const {days, months} = require("date-names");
console.log(days);
console.log(months);
