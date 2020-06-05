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
      throw new ReferenceError("Binding", expr.name, "is not defined!");
    }
  } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" &&
        operator.name in specialForms) {
      return specialForms[operator.name](args, scope); // no need to write "expr.args" ?
    }
    else {
      op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError(`Applying a non-function`);
      }
    }
  }
}

// However, it needs additional special forms and a few more values in the environment
