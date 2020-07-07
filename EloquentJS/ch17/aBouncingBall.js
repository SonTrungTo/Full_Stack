let ball = document.getElementById('ball');
let canvas = document.createElement("canvas");
canvas.width  = 300;
canvas.height = 300;
let cx = canvas.getContext("2d");
ball.appendChild(canvas);
ball.style.textAlign = "center";

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function updateFrame(time) {
  cx.clearRect(0, 0, 300, 300);
  cx.beginPath();

  cx.strokeRect(0, 0, 300, 300);

  cx.beginPath();
  let posX = ballPos.x + xSpeed * time;
  let posY = ballPos.y + ySpeed * time;
  if (posX > 290 || posX < 10) {
    xSpeed = Math.abs(xSpeed) > 300 ? -xSpeed : (-xSpeed * 2);
  }
  if (posY > 290 || posY < 10) {
    ySpeed = Math.abs(ySpeed) > 400 ? -ySpeed : (-ySpeed * 3);
  }
  ballPos.x = ballPos.x + xSpeed * time;
  ballPos.y = ballPos.y + ySpeed * time;
  cx.arc(ballPos.x, ballPos.y, 10, 0, 7);
  cx.fillStyle = "red";
  cx.fill();
}

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }

  times(factor) {
    return new Vec(factor * this.x, factor * this.y);
  }
}

let ballPos = new Vec(150, 150);
let xSpeed = 30, ySpeed = 20;
runAnimation(updateFrame);
