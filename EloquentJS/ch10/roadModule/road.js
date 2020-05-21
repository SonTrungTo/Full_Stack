const {roadsArray} = require('./graph.js');
const {buildGraph} = require('./graph.js');

exports.roadGraph = buildGraph(roadsArray);
