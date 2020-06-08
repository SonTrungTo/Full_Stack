function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;

  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: match[0]};
  } else if (match = /^[^\s#(),"]+/.exec(program)) {
    expr = {type: "word", value: match[0]};
  } else {
    throw new SyntaxError(`Undefined syntax: ${program}`);
  }
  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  
}
