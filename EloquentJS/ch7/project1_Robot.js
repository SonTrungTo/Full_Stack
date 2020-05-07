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

  move(destination) { // updates after certain robot location and parcels position, given its destination.
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
  static random(parcelsCount = 5) {
    let parcels = [];
    for (let count = 0; count < parcelsCount; count++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }

    return new VillageState("Post Office", parcels);
  }
}

// We now build a robot such that robot(state, memory) => object that has
// *direction*, which describes the next place it wants to go to, and *memory*, which
// returns a value for planning its action, properties.
function runRobot(state, robot, memory) {
  for (let turn = 0;;++turn) {
    if (state.parcels.length == 0) {
      console.log(`Finished in ${turn} moves.`);
      break;
    }
    let action = robot(state, memory);
    state  = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// ? Strategy in each state of the robot? How to decide direction?
// Strategy #1: Random walks. (A.K.A, Worst strategy ever!)
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.location])};
}

// We next initialize a world state where some parcels are laid around, waiting
// to be picked up, by adding a static method inside VillageState.

// Strategy #2: Mail-truck delivery: Follow a route such that the robot visits all.
const mailRoute = ["Alice's House",""];
