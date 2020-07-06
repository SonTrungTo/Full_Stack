let shapes = document.getElementById("shapes");

function drawTrapezoid(posX, posY, ...sizes) {
  let canvas = document.createElement("canvas");
  canvas.width  = 150;
  canvas.height = 100;
  shapes.appendChild(canvas);
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
  shapes.appendChild(canvas);
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

function drawZigzaggingLine(posX, posY, ...lengths) {
  let canvas = document.createElement("canvas");
  canvas.width  = 100;
  canvas.height = 150;
  shapes.appendChild(canvas);
  let cx = canvas.getContext("2d");

  let length = lengths[0] == null ? 50 : lengths[0];
  let lines  = lengths[1] == null ? 10 : lengths[1];
  let isLeft = 0;
  let increment = length / lines;

  cx.beginPath();
  cx.moveTo(posX, posY);
  for (let line = 0; line < lines; line++, isLeft++) {
    if (isLeft % 2 == 0) {
      cx.lineTo(posX + length, posY + increment);
    } else {
      increment += 10;
      cx.lineTo(posX, posY + increment);
    }
  }
  cx.stroke();
}

function spiral(posX, posY) {
  let canvas = document.createElement("canvas");
  canvas.width  = 200;
  canvas.height = 150;
  shapes.appendChild(canvas);
  let cx = canvas.getContext("2d");

  let centerX = posX, centerY = posY;
  let radius = 50;
  let angle  = Math.PI / 200;
  cx.beginPath();

  cx.moveTo(centerX, centerY);
  for (let i = 0; i < 1700; i++) {
    radius = 50 * i / 1500;
    cx.lineTo(centerX + radius * Math.cos(angle * i),
              centerY + radius * Math.sin(angle * i));
  }

  cx.stroke();
}

drawTrapezoid(50, 10, 60, 50);
drawRedDiamond(30, 60);
drawZigzaggingLine(30, 30, 50, 16);
spiral(80, 60);
