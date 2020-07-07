let pie = document.getElementById('pie');
const results = [
  {name: "Satisfied",   count: 1043, color: "lightblue"},
  {name: "Neutral",     count: 563,  color: "lightgreen"},
  {name: "Unsatisfied", count: 510,  color: "pink"},
  {name: "No comment",  count: 175,  color: "silver"}
];

function createPieChart(results) {
  let canvas = document.createElement("canvas");
  canvas.width  = 300;
  canvas.height = 300;
  pie.appendChild(canvas);
  let cx = canvas.getContext("2d");

  let total = results.reduce((sum, {count}) => sum + count, 0);
  let startAngle = - Math.PI / 2;
  for (let result of results) {
    cx.beginPath();
    let endAngle = 2 * Math.PI / total * result.count;
    cx.arc(150, 150, 100, startAngle, startAngle + endAngle);
    startAngle += endAngle;
    cx.lineTo(150, 150);

    cx.fillStyle = result.color;
    cx.fill();
  }
}

createPieChart(results);
