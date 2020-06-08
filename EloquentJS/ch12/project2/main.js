// Egg, the programming language in JavaScript
const {parse} = require('./parser');
const {evaluate} = require('./evaluator');

console.log(parse(`+(a, 10)`));
