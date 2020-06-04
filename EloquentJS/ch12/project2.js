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

  return parseApply(expr, program.slice(match[0].length)); // e.g, do   ()<- parseApply
}

function skipSpace(string) {
  let first = program.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

function parseApply(expr, program) {
  let program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = program.slice(1); // There is no need to skipSpace, since parseExpression do it for us!
    } else if (program[0] != ")") {
      throw new SyntaxError("Was expecting either ',' or ')', but get " + program[0]);
    }
  }
  return parseApply(expr, program.slice(1));
}
