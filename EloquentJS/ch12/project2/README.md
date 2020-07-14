## Project: Egg, a programming language built on JavaScript.
## [Demo](https://htmlpreview.github.io/?https://github.com/SonTrungTo/Full_Stack/blob/master/EloquentJS/ch12/project2/demo.html)
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
The main idea is to separate the topScope can be "affected"  by localScope.
As the way it was, if we try to set up a new value for the
nonlocal binding, we end up defining a new value for the local
binding; `set` is then used to update value directly from the
topScope.

With the current `set` functionality, we can define a new value,
updating the outer scope binding if the local one doesn't exist,
and throw `ReferenceError` if the binding doesn't exist at all.
