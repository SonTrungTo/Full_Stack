// Roads form a graph
const roads = ["Cabin-Alice's House", "Alice's House-Bob's House",
               "Alice's House-Post Office", "Bob's House-Town Hall",
               "Dick's House-Erina's House", "Dick's House-Town Hall",
               "Erina's House-George's House", "George's House-Farm",
               "George's House-Shop", "Farm-Market",
               "Market-Post Office", "Market-Shop",
               "Market-Town Hall", "Town Hall-Shop"];
// Convert to a data structure that tells what places can be reached from a certain node.
function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdges(from, to) {
    if (graph[from] == undefined) {
        graph[from] = [to];
    } else {
        graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map(s => s.split("-"))) {
    addEdges(from, to);
    addEdges(to, from);
  }

  return graph;
}

let roadGraph = buildGraph(roads);

// We demonstrate world event with only minimal measurements: the robot's current location
// and a collection of parcels, each of which has a current location and its address.
// Also, we don't *change* the world event, but compute a *new* event.
class VillageState {
  constructor(location, parcels) {
    this.location = location;
    this.parcels = parcels;
  }

  move(destination) { // where the delivery happens
    if (!roadGraph[this.location].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if(p.place != this.location) return p;
        else return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);

      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");
console.log(next);
console.log(first);
