const scale = 20;
let otherSprites = document.createElement("img");
otherSprites.src = "drawing/img/sprites_others.png";
let playerSprites = document.createElement("img");
playerSprites.src = "drawing/img/marijn.png";

let invertedPlayerSprites = document.createElement("canvas");
invertedPlayerSprites.width  = 480;
invertedPlayerSprites.height = 60;
let cx_P = invertedPlayerSprites.getContext("2d");
playerSprites.addEventListener("load", () => {
  for (let i = 0; i < 10; i++) {
    cx_P.save();
    flipHorizontally(cx_P, i * 48 + 48 / 2);
    cx_P.drawImage(playerSprites,
                   i * 48, 0, 48, 60,
                   i * 48, 0, 48, 60);
    cx_P.restore();
  }
});

let monsterSprites = document.createElement("img");
monsterSprites.src = "drawing/img/monsters.png";

let invertedMonsterSprites = document.createElement("canvas");
invertedMonsterSprites.width = 138;
invertedMonsterSprites.height = 47;
let cx_M = invertedMonsterSprites.getContext("2d");
monsterSprites.addEventListener("load", () => {
  for (let i = 0; i < 3; i++) {
    cx_M.save();
    flipHorizontally(cx_M, i * 46 + 46 / 2);
    cx_M.drawImage(monsterSprites,
                   i * 46, 0, 46, 47,
                   i * 46, 0, 46, 47);
    cx_M.restore();
  }
});

let game           = document.createElement("div");
game.className     = "game";
const playerXOverlap  = 16;
const monsterXOverlap = 8;

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
    game.appendChild(this.canvas);
    parent.appendChild(game);
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
    let player = state.player;
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
      this.cx.fillStyle = "rgb(153, 218, 255)";
    } else if (status == "lost") {
      this.cx.fillStyle = "rgb(255, 102, 128)";
    } else {
      this.cx.fillStyle = "rgb(46, 150, 255)";
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
        let tileX = tile == "lava" ? (scale * 2) : 0;             // 40 : 0
        this.cx.drawImage(otherSprites,
                          tileX,         0, scale * 2, scale * 2, // 40 x 40
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
    if (player.speed.y != 0) {
      tile = 9;
    } else if (player.speed.x != 0) {
      tile = Math.floor(Date.now() / 60) % 8;
    }


    let tileX = tile * width;
    if (this.flipPlayer) {
      this.cx.drawImage(invertedPlayerSprites,
                        tileX, 0, 48, 60,
                        x,     y, width, height);
    } else {
      this.cx.drawImage(playerSprites,
                        tileX, 0, 48, 60,                     // 48:60 for each sprite
                        x,     y, width, height);
    }
  }

  drawMonster(monster, x, y, width, height) {
    width += monsterXOverlap * 2;
    x -= monsterXOverlap;

    let tile = 1;
    if (monster.speed.x != 0) {
      this.flipMonster = monster.speed.x < 0;
      tile  = Math.floor(Date.now() / 60) % 3;
    }

    let tileX = tile * width;
    if (this.flipMonster) {
      this.cx.drawImage(monsterSprites,
                        tileX, 0, 46, 47,                  // 46:47 for each sprite
                        x,     y, width, height);
    } else {
      this.cx.drawImage(invertedMonsterSprites,
                        tileX, 0, 46, 47,
                        x,     y, width, height);
    }
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
        let tileX = (actor.type == "coin" ? 4 : 2) * scale;
        this.cx.drawImage(otherSprites,
                          tileX, 0, 24, 24,
                          x,     y, width, height);
      }
    }
  }

  clear() {
    this.canvas.remove();
  }
}
