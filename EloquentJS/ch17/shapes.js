function drawTrapezoid(posX, posY, ...sizes) {
  let canvas = document.createElement("canvas");
  canvas.width  = 150;
  canvas.height = 100;
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

function drawRedDiamond(posX, posY, ...lengths) {
  let canvas = document.createElement("canvas");
  canvas.width  = 100;
  canvas.height = 150;
  document.body.appendChild(canvas);
  let cx = canvas.getContext("2d");

  let length = lengths[0] == null ? 50 : lengths[0];
  function rotateCenter(context, aroundX, aroundY) {
    context.translate(aroundX, aroundY);
    context.rotate(Math.PI / 4);
    context.translate(-aroundX, -aroundY);
  }

  cx.save();
  rotateCenter(cx, posX + length / 2, posY + length / 2);
  cx.fillStyle = "red";
  cx.fillRect(posX, posY, length, length);
  cx.restore();
}

drawTrapezoid(50, 10, 60, 50);
drawRedDiamond(30, 60);
