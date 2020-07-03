const results = [
  {name: "Satisfied",   count: 1043, color: "lightblue"},
  {name: "Neutral",     count: 563,  color: "lightgreen"},
  {name: "Unsatisfied", count: 510,  color: "pink"},
  {name: "No comment",  count: 175,  color: "silver"}
];

cx = document.querySelector("#canvas5").getContext("2d");
let total = results.reduce((sum, {count}) => sum + count, 0);

let startAngle = -0.5 * Math.PI;
for (let result of results) {
  cx.beginPath();
  let resultAngle = 2 * Math.PI / total * result.count;
  cx.arc(100, 100, 100, startAngle, resultAngle + startAngle);
  cx.lineTo(100, 100);
  startAngle += resultAngle;

  cx.fillStyle = result.color;
  cx.fill();
}

cx.font = "28px Georgia";
cx.fillStyle = "fuchsia";
cx.fillText("I can add text", 5, 250);
