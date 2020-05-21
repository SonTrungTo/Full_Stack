const {find_path} = require('dijkstrajs');
const {roadGraph} = require('./road.js');

console.log(find_path(roadGraph, "Alice's House", "Erina's House"));
