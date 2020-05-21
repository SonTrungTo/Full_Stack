// Before 2015, there was no module system. So we have to use functions to create
// local scope and objects as the module's interfaces.
// Consequently, there is no dependencies declaration. The interfaces are declared
// in global scope, so is any dependency. OUTDATED
const weekDay = function () {
  let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
               "Friday", "Saturday"];

  return {
    name(number) {return names[number];},
    number(name) {return names.indexOf(name);}
  };
}();

console.log(weekDay.name(weekDay.number("Thursday")));

// So we need to run string as part of the code. One such is to use Function.
// Fortunately, CommonJS module loads the module, wraps it in a function and
// exports its interface. (with NPM for massive scale development.)
const ordinal = require('ordinal');
