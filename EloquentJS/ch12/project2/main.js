// Egg, the programming language in JavaScript
const {parse} = require('./parser');
const {evaluate} = require('./evaluator');
const {topScope} = require('./topScope');

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

run(`print(+(1, 3))`);
