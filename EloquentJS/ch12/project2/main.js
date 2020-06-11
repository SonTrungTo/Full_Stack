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

run(`do(define(sumOfArrays, fun(array,
              do(define(i, 0),
                define(sum, 0),
                while(<(i, length(array)),
                    do(define(sum, +(sum, element(array, i))),
                       define(i, +(i, 1)))),
                       sum))),
        print(sumOfArrays(array(1, 2, 3))))`);

run(`do(define(f, fun(a, fun(b, +(b, a)))),
        print(f(4)(5)))`);

// Credits of this test go to the author.
console.log(parse("# hello\nx"));
// -> {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// -> {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}

// --- End of the test

// Inspired from the author's website(not identical).
run(`do(define(x, 10),
        define(setx, fun(val, set(x, val))),
        setx(50),
        print(x))`);
// -> 50
run(`do(define(x, 10),
        define(setx, fun(val, do(define(x, val), print(x)))),
        setx(30),
        print(x))`);
// -> 30
// -> 10
run(`set(x, 10)`);
// -> ReferenceError
