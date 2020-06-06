// Egg, the programming language in JavaScript
function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;

  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Invalid syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length)); // e.g, do*   ()*<- parseApply
}

function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1)); // There is no need to skipSpace, since parseExpression do it for us!
    } else if (program[0] != ")") {
      throw new SyntaxError("Was expecting either ',' or ')', but get " + program[0]);
    }
  }
  return parseApply(expr, program.slice(1));
}

// The parser is finished!
function parse(program) {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

console.log(parse(`+(a, 10)`));

// The evaluator: it evaluates the expression the syntax tree represents and returns
// the value it produces.
let specialForms = Object.create(null);

function evaluate(expr, scope) {
  if(expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError("Binding "+ `'${expr.name}'` + " is not defined!");
    }
  } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" &&
        operator.name in specialForms) {
      return specialForms[operator.name](args, scope); // no need to write "expr.args" ?
    }
    else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError(`Applying a non-function`);
      }
    }
  }
}

// However, it needs additional special forms and a few more values in the environment
// specialForms = {if, while, do, define}
specialForms.if = function (args, scope) {
  if (args.length != 3) {
    throw new SyntaxError(`Invalid arguments for 'if' statement: ${args}`);
  }
  if (evaluate(args[0], scope) !== false) { // 0, "", null, undefined,... is "true"!
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = function (args, scope) {
  if (args.length != 2) {
    throw new SyntaxError(`Wrong number of arguments for 'while': ${args}`);
  }

  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since there is no "undefined" property in Egg, let the while statement return false.
  return false;
};

specialForms.do = function (args, scope) {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value; // value produced by the last arg.
};

specialForms.define = function (args, scope) {
  if (args[0].type != "word" || args.length != 2) {
    throw new SyntaxError(`Invalid use of 'define': ${args}`);
  }
  scope[args[0].name] = evaluate(args[1], scope);
  return scope[args[0].name];
};

// evaluate needs its scope(a.k.a, ENVI: Boolean, arithmetic, comparisions. etc... basic functional values)
let topScope = Object.create(null);

topScope.true   = true;
topScope.false  = false;

for (let op of ["+", "-", "*", "/", ">", "<", "==", "%"]) {
    topScope[op] = Function(`a, b`, `return a ${op} b;`);
}

topScope.print = (...args) => {
  console.log(...args);
  return false;
};

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

run(`do(define(i, 1),
        define(result, 0),
        while(<(i, 11), do(define(result, +(result, i)), define(i, +(i, 1)))),
        print("result =", result))`);
