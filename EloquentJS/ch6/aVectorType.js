class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vector) {
    return new Vec(this.x+vector.x,this.y+vector.y);
  }
  minus(vector) {
    return new Vec(this.x-vector.x,this.y-vector.y);
  }
  get length() {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  }
}

let vectorAlpha = new Vec(2,3);
let vectorBeta  = new Vec(3,4);
console.log(vectorAlpha.plus(vectorBeta));
console.log(vectorAlpha.minus(vectorBeta));
console.log(vectorAlpha.length);
console.log(vectorBeta.length);
