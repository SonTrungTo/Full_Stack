// Egg, the programming language in JavaScript
const {parse} = require('./parser');
const {evaluate} = require('./evaluator');
const {topScope} = require('./topScope');

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

run(`do(define(pow, fun(base, exp, if(==(exp, 0), 1,
       *(base, pow(base, -(exp, 1)))))),
       print(pow(2, 10)))`);
