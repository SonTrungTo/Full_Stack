setTimeout(() => console.log("Tick"), 1000);
setTimeout(() => console.log("Tick"), 2000);

// Promise (=> object that contains future events)
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
fifteen.then(s => console.log(`Got ${s}`));

// // Let's write some pseudo-code for the crow-tech module (to illustrate asynchronous)
// // First, to read food caches, an array of names, each of which can refer to
// // another piece of data, which will eventually lead to the whole cache.
// // NOTE: This is an awkward piece of code to illustrate later how Promise can simplify this problem.
// import {bigOak} from './crow-tech';
//
// bigOak.readStorage("food caches", caches => {
//   let firstCache = caches[0];
//   bigOak.readStorage(firstCache, info => {
//     console.log(info);
//   });
// });
//
// // Note how awkward it can be: multiple callbacks nested for a single action.
// // Crow nests communicate using request-response pairs. We can start using
// // a method *send*: It expects the name of the target nest, the *type* of the
// // request, the content of the request and a callback function to signify
// // a request is done.
// bigOak.send("Cow Pasture", "note", "Let's caw loudly at Stanford on 9:00 AM",
//             () => console.log("Note delivered!"));
//
// // Note that we have to define the type "note" here. It needs to be defined
// // on all the nests, so that our handler can use it.
// import {defineRequestType} from './crow-tech';
//
// defineRequestType("note", (nest, content, source, done) => {
//   console.log(`${nest.name} received note: ${content}`);
//   done();
// });
//
// // In this way, asynchronicity is contagious. Yet, there are ways to simplify
// // and express the abstract concepts in value: Promise.
//
// // note that it has the method then()
// // the constructor Promise(f(g(x))) such that f(x) resolves the promise.
// function storeData(nest, name) {
//   return new Promise(resolve => {
//     readStorage(name, result => resolve(result));
//   });
// }
//
// storeData(bigOak, "enemies").then(value => console.log("Got", value));

// Failure. When everything proceeds normally, a non-promise value is returned.
// However, when exception is thrown, the value of the exception is the reason
// for the rejection, handled by the handler created by catch, which also resolves
// a value of the rejected promise.
new Promise((_,reject) => reject(new Error("Fail")))
.then(value => console.log("Handler 1"))
.catch(reason => {
  console.log("Caught failure: " + reason);
  return "nothing";
})
.then(value => console.log("Handler 2", value));

// Let's write automatic retry (request) callback, for network may fail to deliver(timeout)
// or should I say, the callback function was never called due to accidental reasons.
// Define request and requestType
class Timeout extends Error {};

function request(nest, type, source, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(nest, type, content, (failure, success) => {
        done = true;
        if(failure) reject(failure);
        else if(success) resolve(success);
      });
      setTimeout( () => {
        if(done) return;
        else if(n < 4) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      } , 250);
    }
    attempt(1);
  });
}

// Let's write a definition for requestType, which is the wrapper for defineRequestType
// so that its handler can returns a promise or a raw value wired to the callback.
function requestType(type, handler) {
  defineRequestType(type, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
      .then(response => callback(null, response),
            reject => callback(reject));
    } catch (exception) {
      callback(exception);                            // Otherwise, unexpected exception can slip through the callback. This is awkward.
    }
  });
}
