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
}
Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
  ".": "empty", "#": "wall", "+": "lava",
  "=": Lava, "|": Lava, "v": Lava,
  "@": Player, "o": Coin
};
