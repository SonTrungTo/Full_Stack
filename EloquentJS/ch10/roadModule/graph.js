var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Dick's House-Erina's House", "Dick's House-Town Hall",
  "Erina's House-George's House", "George's House-Farm",
  "George's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

exports.roadsArray = roads.map(a => a.split("-"));

exports.buildGraph = function(arrayOfArrays) {
  let graph = Object.create(null);

  function addEdges(from, to) {
    if (graph[from] == undefined) {
      let node = graph[from] = {};
      node[to] = 1;
    }
    else
      graph[from][to] = 1;
  }

  for (let [from, to] of arrayOfArrays) {
    addEdges(from, to);
    addEdges(to, from);
  }

  return graph;
}
