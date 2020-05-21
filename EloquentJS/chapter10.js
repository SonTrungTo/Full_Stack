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
const {days, months} = require('date-names');

exports.formatDate = function(date, template) {
  return template.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M")    return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D")    return date.getDate();
    if (tag == "Do")   return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDays()];
  });
}

// const {formatDate} = require('./chapter10.js');
// console.log(formatDate(new Date(),
//                       "MMMM Do YYYY"));

// We can define 'require'
// Then there is import, export from ECMAScript (it's a binding, unlike CommonJS)

// Let's rewrite findRoute from chapter 7, using 'dijkstrajs'
const {find_path} = require('dijkstrajs');
const {roadGraph} = require('./ch7/project1_Robot.js');

let graph = {};
for (let node of Object.keys(roadGraph)) {
  let edges = graph[node] = {};
  for (let dest of roadGraph[node]) {
    edges[dest] = 1;
  }
}

console.log(find_path(graph, "George's House", "Cabin"));
