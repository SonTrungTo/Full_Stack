let pie = document.getElementById('pie');
const results = [
  {name: "Satisfied",   count: 1043, color: "lightblue"},
  {name: "Neutral",     count: 563,  color: "lightgreen"},
  {name: "Unsatisfied", count: 510,  color: "pink"},
  {name: "No comment",  count: 175,  color: "silver"}
];

function createPieChart(results) {
  let canvas = document.createElement("canvas");
  canvas.width  = 350;
  canvas.height = 300;
  pie.appendChild(canvas);
  let cx = canvas.getContext("2d");

  let total = results.reduce((sum, {count}) => sum + count, 0);
  let startAngle = - Math.PI / 2;
  let radius = 100;
  let centerX = 175,  centerY = 150;
  for (let result of results) {
    cx.beginPath();
    let endAngle = 2 * Math.PI / total * result.count;
    cx.arc(centerX, centerY, radius, startAngle, startAngle + endAngle);
    startAngle += endAngle;
    cx.lineTo(centerX, centerY);

    cx.fillStyle = result.color;
    cx.fill();
  }

  for (let result of results) {
    cx.beginPath();
    let endAngle = 2 * Math.PI / total * result.count;
    let posXName = centerX + (radius + 20) * Math.cos(startAngle + endAngle / 2);
    let posYName = centerY + (radius + 20) * Math.sin(startAngle + endAngle / 2);
    cx.moveTo(centerX, centerY);
    cx.font = "10px Georgia";
    cx.fillStyle = "blue";
    cx.textAlign = Math.cos(startAngle + endAngle / 2) > 0 ? "left" : "right";
    cx.textBaseline = "middle";
    cx.fillText(result.name, posXName, posYName);
    startAngle += endAngle;
  }
}

createPieChart(results);
