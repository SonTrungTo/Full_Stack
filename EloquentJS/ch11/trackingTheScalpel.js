import {bigOak} from '../crow-tech';
import {everywhere} from '../crow-tech';
import {defineRequestType} from '../crow-tech';

async function locateScalpel() {

}


function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

storage(bigOak, "food caches").then(value => console.log(value));

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
        else if(n < 3) attempt(n + 1);
        else reject(new Error("Timed out!"));
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

availableNeighbors(bigOak).then(value => console.log(value));

requestType("connections", (nest, {name, neighbors}, source) => {
  let connections = nest.state.connections;
  if(JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
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
  
}
