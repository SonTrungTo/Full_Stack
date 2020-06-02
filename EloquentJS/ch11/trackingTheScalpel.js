import {bigOak}  from '../crow-tech';
import {chateau} from '../crow-tech';
import {everywhere} from '../crow-tech';
import {defineRequestType} from '../crow-tech';
import {butcherShop} from '../crow-tech';

async function locateScalpel(nest) {
  let remainingNests = network(nest);

  while (remainingNests.length > 0) {
    remainingNests = remainingNests.filter(n => n != current);
    try {
      let match = await anyStorage(current, source,"scalpel");
    } catch (_) {}
  }
  throw new Error("Cannot find the scalpel");
}


// These are codes from chapter11.js, improved version.
function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

// storage(bigOak, "scalpel").then(value => console.log(value));
// storage(chateau, "scalpel").then(value => console.log(value));
// storage(butcherShop, "scalpel").then(value => console.log(value));

class Timeout extends Error {};

function request(nest, target, type, content) {
  return new Promise((value, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (error, success) => {
        done = true;
        if(error) reject(error);
        else if(success) value(success);
      });
      setTimeout( () => {
        if(done) return;
        //else if(n < 3) attempt(n + 1);
        //else reject(new Error("Timed out!"));
      }, 250);
    }
    attempt(1);
  });
}

function requestType(type, handler) {
  defineRequestType(type, (nest, content, source, callback) => { // because of definition of send
    try {
      Promise.resolve(handler(nest, content, source))
      .then(value => callback(null, value),
            failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }
  });
}

requestType("ping", () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping").then(() => true,
    () => false);
  });

  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_,i) => result[i]);
  });
}

//availableNeighbors(bigOak).then(value => console.log(value));

requestType("connections", (nest, {name, neighbors}, source) => {
  let connections = nest.state.connections;
  if(JSON.stringify(connections.get(name))
  == JSON.stringify(neighbors)) return;
  connections.set(name, neighbors);

  broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if(neighbor == exceptFor) continue;
    request(nest, neighbor, "connections", {
      name,
      neighbors: nest.state.connections.get(name)
    });
  }
}

everywhere(nest => {
  nest.state.connections = new Map();
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

function findRoute(from, to, connections) {
  let work = [{at: from, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    for (let next of connections.get(at) || []) {
      if (next == to) {
        return via;
      } else if (!work.some(w => w.at == next)) {
        work.push({at: next, via: via || next});
      }
    }
  }
  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target))
    return request(nest, target, type, content);
  else {
    let via = findRoute(nest.name, target,
      nest.state.connections); // It doesn't have the time to load.
    if (!via) throw new Error(`Unable to find a route from ${nest.name} to ${target}`);
    return request(nest, via, "route", {target, type, content});
  }
}

requestType("route", (nest, {target, type, content}) => {
  return routeRequest(nest, target, type, content);
});

requestType("note", (nest, content, source) => {
  console.log(`${nest.name} received note: \"${content}\"`);
});

requestType("storage", (nest, name) => storage(nest, name));

function network(nest) {
  return Array.from(nest.state.connections.keys());
}

async function findInStorage(nest, name) {
  let local = await storage(nest, name);
  if(local != null) return local;

  let sources = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources[Math.floor(Math.random() * sources.length)];
    sources = sources.filter(n => n != source);
    try {
      let found = await routeRequest(nest, source, "storage", name);
      if(found != null) return found;
    } catch (_) {}
  }
  throw new Error("Not found!");
}

// Enumerate counts
function anyStorage(nest, source, name) {
  if(source == nest.name) return storage(nest, name);
  else return routeRequest(nest, source, "storage", name);
}

async function chicks(nest, year) {
  let lines = network(nest).map(async name => {
    return name + ": " +
    await anyStorage(nest, name, `chicks in ${year}`);
  });

  return (await Promise.all(lines)).join("\n");
}

setTimeout(() => {
  routeRequest(bigOak, "Jacques' Farm", "note", "JavaScript is the best!");
  findInStorage(bigOak, "events on 2017-12-21").then(console.log);
  chicks(bigOak, 1992).then(console.log);
  locateScalpel(bigOak).then(console.log);
}, 250);
