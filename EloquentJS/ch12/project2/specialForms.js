let specialForms = Object.create(null);

specialForms.if = function (args, scope) {
  if (args.length != 3) {
    throw new SyntaxError(`Invalid number of arguments to 'if': ${args}`);
  }
  if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = function (args, scope) {
  if (args.length != 2) {
    throw new SyntaxError(`Invalid number of arguments to 'while': ${args}`);
  }

  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }
  // Return a meanningless value.
  return false;
};

specialForms.do = function (args, scope) {
  let value = false;
  if (!args.length) {
    throw new SyntaxError(`Empty arguments to 'do'`);
  }
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = function (args, scope) {
  if (args.length != 2 || args[0]) {

  }
};

exports.specialForms = specialForms;
