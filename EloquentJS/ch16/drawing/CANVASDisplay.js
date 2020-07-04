const scale = 20;
let otherSprites = document.createElement("img");
otherSprites.src = "img/sprites_others.png";
let playerSprites = document.createElement("img");
playerSprites.src = "img/marijn.png";
let monsterSprites = document.createElement("img");
monsterSprites.src = "img/monsters.png";
const playerXOverlap  = 4;
const monsterXOverlap = 3;

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width  = Math.min(600, level.width  * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;
    this.flipMonster = false;

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
    x -= playerXOverlap; // this accounts for the flipping axis.
    if (player.speed.x != 0) {
      this.flipPlayer = player.speed.x < 0;
    }

    let tile = 8;
    if (player.x.speed != 0) {
      tile = Math.floor(Date.now() / 60) % 8;
    } else if (player.y.speed != 0) {
      tile = 9;
    }

    this.cx.save();
    if (this.flipPlayer) {
      flipHorizontally(this.cx, x + width / 2);
    }
    let tileX = tile * width;
    this.cx.drawImage(playerSprites,
                      tileX, 0, width, height,
                      x,     y, width, height);
    this.cx.restore();
  }

  drawMonster(monster, x, y, width, height) {
    width += monsterXOverlap * 2;
    x -= monsterXOverlap;

    let tile = 1;
    if (monster.speed.x != 0) {
      this.flipMonster = monster.speed.x < 0;
      tile  = Math.floor(Date.now() / 60) % 3;
    }

    this.cx.save();
    if (this.flipMonster) {
      flipHorizontally(this.cx, x + width / 2);
    }
    let tileX = tile * width;
    this.cx.drawImage(monsterSprites,
                      tileX, 0, width, height,
                      x,     y, width, height);
    this.cx.restore();
  }

  drawActors(actors) {
    for (let actor of actors) {
      let width = actor.size.x * scale;
      let height = actor.size.y * scale;
      let x = (actor.pos.x - this.viewport.left) * scale;
      let y = (actor.pos.y - this.viewport.top) * scale;
      if (actor.type == "player") {
        this.drawPlayer(actor, x, y, width, height);
      } else if (actor.type == "monster") {
        this.drawMonster(actor, x, y, width, height);
      } else {
        
      }
    }
  }

  clear() {
    this.canvas.remove();
  }
}
