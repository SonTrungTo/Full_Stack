class Level {
  constructor(plan) {
    let rows = plan.trim().split("\n").map(l => [...l]);
    this.height = rows.length;
    this.width  = rows[0].length;
    this.startActors = [];
    this.rows   = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type == "string")  return type;
        this.startActors.push(
          type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }

  touches(pos, size, type) {
    let firstX = Math.floor(pos.x);
    let lastX  = Math.ceil(pos.x + size.x);
    let firstY = Math.floor(pos.y);
    let lastY  = Math.ceil(pos.y + size.y);

    for (let y = firstY; y < lastY; y++) {
      for (let x = firstX; x < lastX; x++) {
        let isOutside = x < 0 || x > this.width ||
                        y < 0 || y > this.height;
        let here = isOutside ? "wall" : this.rows[y][x];
        if (here == type) return true;
      }
    }
    return false;
  }
}
