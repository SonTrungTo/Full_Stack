// measurements (stats) for Player, including his/her gravity, jump speed, movement speed
const gravity = 30;
const playerXSpeed = 7;
const jumpSpeed = 17;
// measurements (stats) for Coin, for it needs wobbleDist and wobbleSpeed
const wobbleDist = 0.07;
const wobbleSpeed = 8;
// measurements (stats) for Monster: it will be as fast as, stronger than its human player counterpart
const monsterSpeed = 7;
const monsterJumpSpeed = 20;

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

// Player class
class Player {
  constructor(pos, speed) {
    this.pos    = pos;
    this.speed  = speed;
  }

  get type() {
    return "player"; // It's immutable; it doesn't get created anew every time it is called!
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)),
                      new Vec(0, 0));
  }

  update(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft)  xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }

    return new Player(pos, new Vec(xSpeed, ySpeed));
  }
}
Player.prototype.size = new Vec(0.8, 1.5);

// Monster class
class Monster {
  constructor(pos, speed) {
    this.pos   = pos;
    this.speed = speed;
  }

  get type() {return "monster";}

  static create(pos) {
    return new Monster(pos.plus(new Vec(0, -1)),
                       new Vec(0, 0));
  }

  collide(state) {
    let player = state.player;
    let bottomPlayer = player.pos.y + player.size.y; // ~~ +1.5
    let headMonster = this.pos.y + 0.4;              // ~~ x > player.pos.y since its supposed to be below (at least 2)
    if (bottomPlayer < headMonster) {
      let filtered = state.actors.filter(actor => this != actor);
      return new State(state.level, filtered, state.status);
    }
    return new State(state.level, state.actors, "lost");
  }

  update(time, state) {
    let player = state.player;
    let xSpeed, ySpeed;

    xSpeed = player.pos.x > this.pos.x ? monsterSpeed : -monsterSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(time * xSpeed, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, time * ySpeed));
    if (!state.level.touches(movedY, this.size, "wall")) {
      pos = movedY;
    } else if (ySpeed > 0 && state.level.touches(movedX, this.size, "wall") || Math.random() < 0.15) {
      ySpeed = -monsterJumpSpeed;
    } else {
      ySpeed = 0;
    }

    return new Monster(pos, new Vec(xSpeed, ySpeed));
  }
}
Monster.prototype.size = new Vec(1.5, 2);

// Lava class
class Lava {
  constructor(pos, speed, reset) {
    this.pos   = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos, ch) {
    if (ch == "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }

  collide(state) {
    return new State(state.level, state.actors, "lost");
  }

  update(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      return new Lava(this.pos, this.speed.times(-1));
    }
  }
}
Lava.prototype.size = new Vec(1, 1);

// Coin class
class Coin {
  constructor(pos, basePos, wobble) {
    this.pos     = pos;
    this.basePos = basePos;
    this.wobble  = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos,
                    Math.random() * Math.PI * 2); // avoid synchronous movement.
  }

  collide(state) {
    let filtered = state.actors.filter(actor => actor != this);
    let status = state.status;
    if (!filtered.some(actor => actor.type == "coin")) {
      status = "won";
    }
    return new State(state.level, filtered, status);
  }

  update(time) {
    let wobble = this.wobble + wobbleSpeed * time;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
  }
}
Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "=": Lava, "|": Lava, "v": Lava,
  "@": Player, "o": Coin,
  "M": Monster
};
