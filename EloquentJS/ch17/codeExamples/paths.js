cx = document.querySelector("#canvas3").getContext("2d");
cx.beginPath();
for (let y = 10; y < 100; y += 10) {
  cx.moveTo(10, y);
  cx.lineTo(90, y);
}
cx.stroke();

cx.moveTo(150, 10);
cx.lineTo(120, 90);
cx.lineTo(180, 90);

cx.fillStyle = "yellow"; // also closePath() then stroke()
cx.fill();
