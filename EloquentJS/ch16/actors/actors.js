// measurements (stats) for Player, including his/her gravity, jump speed, movement speed
const gravity = 30;
const playerXSpeed = 7;
const jumpSpeed = 17;


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

  }
}
Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "=": Lava, "|": Lava, "v": Lava,
  "@": Player, "o": Coin
};
