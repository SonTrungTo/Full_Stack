## Project: Egg, a programming language built on JavaScript.
The purpose is to have a taste on how a programming language is
built. Certain aspects of JavaScript, such as closures, have
made an excellent demonstration of how full features of JavaScript
can make creative codes.

### Arrays.
Added supports for arrays

### Closures.
Looking at the definition of `fun` inside `specialForms.js`, we see that it returns
a function that remembers the environment it was created: by saving
all `params[i]` in `localScope` and later evaluating `body` along with its `localScope`.

### Comments.
Just need to note that an extra `+` is needed outside the parentheses, since
there might be two consecutives `\s+` and `#.*`.

### Fixing Scope.
