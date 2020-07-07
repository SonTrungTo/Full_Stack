let pie = document.getElementById('pie');
const results = [
  {name: "Satisfied",   count: 1043, color: "lightblue"},
  {name: "Neutral",     count: 563,  color: "lightgreen"},
  {name: "Unsatisfied", count: 510,  color: "pink"},
  {name: "No comment",  count: 175,  color: "silver"}
];

function createPieChart(results) {
  let canvas = document.createElement("canvas");
  canvas.width  = 200;
  canvas.height = 150;
  pie.appendChild(canvas);
  let cx = canvas.getContext("2d"); 
}
