setTimeout(() => console.log("Tick"), 1000);
setTimeout(() => console.log("Tick"), 2000);

// Promise (=> object that contains future events)
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
fifteen.then(s => console.log(`Got ${s}`));

// Let's write some pseudo-code for the crow-tech module (to illustrate asynchronous)
// First, to read food caches, an array of names, each of which can refer to
// another piece of data, which will eventually lead to the whole cache.
// NOTE: This is an awkward piece of code to illustrate later how Promise can simplify this problem.
import {bigOak} from './crow-tech';

bigOak.readStorage("food caches", caches => {
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    console.log(info);
  });
});

// Note how awkward it can be: multiple callbacks nested for a single action.
// Crow nests communicate using request-response pairs. We can start using
// a method *send*: It expects the name of the target nest, the *type* of the
// request, the content of the request and a callback function to signify
// a request is done.
bigOak.send("Cow Pasture", "note", "Let's caw loudly at Stanford on 9:00 AM",
            () => console.log("Note delivered!"));

// Note that we have to define the type "note" here. It needs to be defined
// on all the nests, so that our handler can use it.
import {defineRequestType} from './crow-tech';

defineRequestType("note", (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done();
});

// In this way, asynchronicity is contagious. Yet, there are ways to simplify
// and express the abstract concepts in value: Promise.

// note that it has the method then()
// the constructor Promise(f(g(x))) such that f(x) resolves the promise.
function storeData(nest, name) {
  return new Promise(resolve => {
    readStorage(name, result => resolve(result));
  });
}

storeData(bigOak, "enemies").then(value => console.log("Got", value));
