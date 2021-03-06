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
import {churchTower} from './crow-tech';

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
    nest.readStorage(name, result => resolve(result));
  });
}

storeData(bigOak, "enemies").then(value => console.log("Got", value));

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

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failure, success) => {
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

// Promise.all returns a promise that resolves to an array of values produced by
// an array of promises.
requestType("ping", () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping").then(() => true, () => false);
  });

  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_,i) => result[i]);
  });
}

// Network flooding
import {everywhere} from './crow-tech'

everywhere(nest => {
  nest.state.message = [];
});

function sendGossip(nest, content, exceptFor = null) {
  nest.state.message.push(content);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", content);
  }
}

requestType("gossip", (nest, content, source) => { // nest here is the receiver.
  if(nest.state.message.includes(content)) return;
  console.log(`${nest.name} has successfully received
"${message}" from ${source}`);

  sendGossip(nest, content, source);
});

// sendGossip(bigOak, "I want to be King");

// Message routing: If a nest needs to communicate with some other nest directly,
// flooding is not a nice strategy. Unlike chapter 7, the exact layout of the network
// is not known. Still, a partial info can be obtained: by flooding all pieces of info
// to all nests in a way that those can be updated if needed.
requestType("connections", (nest, {name, neighbors}, source) => {
  let connections = nest.state.connections;
  if(JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
  connections.set(name, neighbors);

  sendConnections(nest, name, source);
});

function sendConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "connections", {
      name,
      neighbors: nest.state.connections.get(name)
    });
  }
}

everywhere( nest => {
  nest.state.connections = new Map();
  nest.state.connections.set(nest.name, nest.neighbors);
  sendConnections(nest, nest.name);
});

// Now that an abstract of the network layout is known. It's time to write
// a route-finding function that finds the shortest length between the sender
// and the getter.
function findRoute(from, to, connections) {
  let work = [{at: from, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    for (let next of connections.get(at) || []) {
      if(next == to) return via;
      if(!work.some(w => w.at == next)) {
        work.push({at: next, via: via || next});
      }
    }
  }
  return null;
}

// We can now write a message routing program between a sender and a receiver.
function messageRouting(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`Unable to find a route to ${target}`);
    request(nest, via, "routing", {target, type, content});
  }
}

requestType("routing", (nest, {target, type,content}, source) => {
  return messageRouting(nest, target, type, content);
});

// If an info isn't found in a storage bulb, it will be search in random
// other nests until it is either found or not.
requestType("storage", (nest, name) => storeData(nest,name)); // name == info
// version 1:
function findInStorage(nest, name) {
  return storeData(nest, name).then(value => {
    if(value != null) return value;          // One
    else findInRemoteStorage(nest, name);
  });
}

function network(nest) {
  return Array.from(nest.state.connections.keys()); // .keys() only returns an iterator.
}

function findInRemoteStorage(nest, name) {
  let sources = network(nest).filter(n => n != nest.name);
  function next() {
    if (sources.length == 0) {
      return Promise.reject(new Error("Not found!")); // Two
    } else {
      let source = sources[Math.floor(Math.random() * sources.length)];
      sources = sources.filter(n => n != source);
      return messageRouting(nest, source, "storage", name)
             .then(value => value != null ? value : next(),   // Three
                   next);
    }
  }
  return next();
}
// This is awkward: multiple promises are chained in a non-obvious way.
// Note that the code is linear: it waits for the previous action to finish before
// continue to a new one. Solution: Async with await
// version 2:
async function findInStorage(nest, name) {
  let local = await storeData(nest, name);
  if(local != null) return local;

  let sources = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources[Math.floor(Math.random() * sources.length)];
    sources = sources.filter(n => n != source);
    try {
      let found = await messageRouting(nest, source, "storage", name);
      if(found != null) return found;
    } catch (_) {}
  }
  throw new Error("Not found!");
}

// I will give it a try to write GroupIterator from page 114 with generator
// Group.prototype[Symbol.iterator] = function* () {
//   for (let index = 0; index < this.member.length; ++index) {
//     yield this.member[index];
//   }
// }
// which is correct!

// Asynchronous gap... A gap in executions can break your code.
// Let's say you are writing a program to enumerate the number of chickens that
// hatch over the years stored in all nests.
function anyStorage(nest, target, name) {
  if(target == nest.name) return storeData(nest, name);
  else messageRouting(nest, target, "storage", name);
}

async function chicks(nest, year) {
  let list = "";
  await Promise.all(network(nest).map(async name => {
    list += `${name}: ${
      await anyStorage(nest, name, `chicks in ${year}`)
    }\n`
  }));

  return list;
}
// This code is seriously broken!
// Output: *name*: # chicks (slowest to response)
// this is due to list = "" + `...` (asynchronous gap).
// Fix:
async function chicks(nest, year) {
  let lines = network(nest).map(async name => {
    return `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}`;
  });

  return (await Promise.all(lines)).join("\n");
}

chicks(bigOak, 2017).then(console.log);
findInStorage(bigOak, "events on 2017-12-21")
  .then(console.log);

// import{allNests} from './crow-tech.js';
// console.log(allNests);
