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
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError(`Wrong arguments to 'define': ${args}`);
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

specialForms.fun = function (args, scope) {
  if (!args.length) {
    throw new SyntaxError(`Function must have its body: ${args}`);
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
      throw new SyntaxError(`Parameters must be words: ${expr}`);
    }
    return expr.name;
  });

  return function() {
    if (arguments.length != params.length) {
      throw new SyntaxError(`Wrong number of arguments to 'fun': ${arguments}`);
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  };
}

exports.specialForms = specialForms;
