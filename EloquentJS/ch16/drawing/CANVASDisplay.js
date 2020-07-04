const scale = 20;
let otherSprites = document.createElement("img");
otherSprites.src = "img/sprites_others.png";
let playerSprites = document.createElement("img");
playerSprites.src = "img/marijn.png";
const playerXOverlap = 4;

class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width  = Math.min(600, level.width  * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;

    this.viewport = {
      top:    0,
      left:   0,
      width:  this.canvas.width  / scale,
      height: this.canvas.height / scale
    };
  }

  syncState(state) {
    this.updateViewPort(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
  }

  updateViewPort(state) {
    let view   = this.viewport;
    let margin = view.width / 3;
    let player = state.player();
    let center = player.pos.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width,
                           state.level.width - view.width);
    }

    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(margin + center.y - view.height,
                          state.level.height - view.height);
    }
  }

  clearDisplay(status) {
    if (status == "won") {
      this.cx.fillStyle = rgb(153, 218, 255);
    } else if (status == "lost") {
      this.cx.fillStyle = rgb(255, 102, 128);
    } else {
      this.cx.fillStyle = rgb(66, 183, 255);
    }
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(level) {
    let {top, left, width, height} = this.viewport;
    let xStart = Math.floor(left);
    let xEnd   = Math.ceil(left + width);
    let yStart = Math.floor(top);
    let yEnd   = Math.ceil(top + height);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let tile = level.rows[y][x];
        if (tile == "empty") continue;
        let screenX = (x - left) * scale;
        let screenY = (y - top) * scale;
        let tileX = tile == "lava" ? scale : 0;
        this.cx.drawImage(otherSprites,
                          tileX,         0, scale, scale,
                          screenX, screenY, scale, scale);
      }
    }
  }

  drawPlayer(player, x, y, width, height) {
    width += playerXOverlap * 2;
    x -= playerXOverlap;
    if (player.speed.x != 0) {
      
    }
  }

  clear() {
    this.canvas.remove();
  }
}
