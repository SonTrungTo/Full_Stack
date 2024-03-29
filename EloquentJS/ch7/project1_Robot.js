// Roads form a graph
var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Dick's House-Erina's House", "Dick's House-Town Hall",
  "Erina's House-George's House", "George's House-Farm",
  "George's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

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
// exports.roadGraph = roadGraph; // for chapter 10 demonstration of module composability.

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

  static random(parcelsCount = 10) {
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
// We need the robot to memorize the fixed route. (A.K.A, the not-so-smart robot)
const mailRoute = ["Alice's House", "Cabin", "Alice's House", "Bob's House",
"Town Hall","Dick's House","Erina's House", "George's House", "Shop", "Marketplace",
"Farm", "Marketplace", "Post Office"];

function mailRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }

  return {direction: memory[0] , memory: memory.slice(1) };
}

// Strategy #3: We aim to solve search problem: the problem of finding a route
// on a graph. This way, the robot will behave more intelligently.
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; ++i) {
    let {at, route} = work[i]; // === (let at = object.at, route = object.route;)
    for (let place of roadGraph[at]) {
      if (to == place) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function searchProblemRobot(state, memory) {
  if (memory.length == 0) {
    let parcel = state.parcels[0];
    if (state.location != parcel.place) {
      memory = findRoute(roadGraph, state.location, parcel.place);
    } else {
      memory = findRoute(roadGraph, state.location, parcel.address);
    }
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// Exercise 7.1: compareRobots(state, robot_1, robot_2, memory_1, memory_2)
function countSteps(state, robot, memory) {
  for (let step = 0; ; step++) {
    if (state.parcels.length == 0) {
      return step;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot_1, robot_2, memory_1, memory_2) {
  let stepsRobot1 = 0, stepsRobot2 = 0;
  let totalTasks = 100;
  for (let count = 0; count < totalTasks; count++) {
    let task = VillageState.random();
    stepsRobot1 += countSteps(task, robot_1, memory_1);
    stepsRobot2 += countSteps(task, robot_2, memory_2);
  }
  console.log(
`Robot_1 finished ${stepsRobot1/totalTasks} steps per task.
Robot_2 finished ${stepsRobot2/totalTasks} steps per task.`);
}

// Exercise 7.2: optimizedRobot(state, memory) can improve upon searchProblemRobot
// - the shortest path to a package
// - I CANNOT OPTIMIZE THIS ANYMORE.
function myOptimizedRobot({location, parcels}, memory) {
  if (memory.length == 0) {
    let routes = [];
    for (let parcel of parcels) {
      if (parcel.place != location) {
        routes.push(findRoute(roadGraph, location, parcel.place));
      } else {
        routes.push(findRoute(roadGraph, location, parcel.address));
      }
    }
    memory = routes.reduce((r1, r2) => r1.length < r2.length ? r1 : r2);
  }

  return {direction: memory[0], memory: memory.slice(1)};
}

// the BEST optimized robot.
//     - the shortest path to a package
// *** - if multiple shortest paths available, pick the pick-up over the delivery one. ***
function bestOptimizedRobot({location, parcels}, memory) {
  if (memory.length == 0) {
    let newParcels = parcels.map(p => { // Computing shortest route for each package with pickUp Boolean.
      if (p.place != location) {
        return {route: findRoute(roadGraph, location, p.place),
               pickUp: true};
      } else {
        return {route: findRoute(roadGraph, location, p.address),
               pickUp: false};
      }
    });

    // We now calculate **the score** for each package: the longer the route to
    // each package, more negative the score will be; a small bonus is counted
    // for a package that has pickUp priority.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    memory = newParcels.reduce((p1, p2) => score(p1) > score(p2) ? p1 : p2).route;
  }

  return {direction: memory[0], memory: memory.slice(1)};
}

compareRobots(searchProblemRobot, mailRobot, [], []);
compareRobots(bestOptimizedRobot, myOptimizedRobot, [], []);
compareRobots(bestOptimizedRobot, searchProblemRobot, [], []);
