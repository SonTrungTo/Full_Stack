function drawTrapezoid(posX, posY, ...sizes) {
  let canvas = document.createElement("canvas");
  canvas.width  = 300;
  canvas.height = 300;
  document.body.appendChild(canvas);
  let cx = canvas.getContext("2d");
  cx.beginPath();

  cx.moveTo(posX, posY);

  let width  = sizes[0] == null ? 20 : sizes[0];
  let height = sizes[1] == null ? 10 : sizes[1];
  cx.lineTo(posX + width, posY);
  cx.lineTo(posX + width + width / 2, posY + height);
  cx.lineTo(posX - width / 2, posY + height);

  cx.closePath();
  cx.stroke();
}

function drawRedDiamond() {

}

drawTrapezoid(50, 10, 50, 50);
