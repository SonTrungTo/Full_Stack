// Arrow != function := function has its own binding, but arrow does not.
function normalize() {
  console.log(this.coord.map(n => n / this.length));
}

normalize.call({coord: [0, 2, 3], length: 5});
let obj = {coord: [0, 2, 3], length: 5};
console.log(Object.getPrototypeOf(obj) == Object.prototype);
console.log(Object.prototype.toString.call([1,2]));
console.log(obj.toString());

// Symbol: It's possible for multiple interfaces to use the same property for different purposes.
let sym = Symbol("toString");
console.log(sym);
console.log(sym == "toString");
console.log(String(obj));
let toStringProperty = Symbol("toString");
Array.prototype[toStringProperty] = function () {
  return `${this.length} cm of blue yarn`;
}

console.log([1,2].toString());
console.log([1,2][toStringProperty]());

// Symbol.iterator as an interface (method) that is used by for/of, requiring the object
// received to be iterable. It returns the second interface, interator with next() =>
// an object with value and done property.
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

// Let us now build an iterable data structure (matrix class)
// As long as the instance of class communicates with for/of via appropriate interface
// we can iterate the data structure.
class Matrix {
  constructor(width, height, element = (x,y) => undefined) {
    this.width   = width;
    this.height  = height;
    this.content = [];

    for (let y = 0; y < height ; ++y) {
      for (let x = 0; x < width ; ++x) {
        this.content[y * width + x] = element(x,y);
      }
    }
  }
  get(x,y) {
    return this.content[y * this.width + x];
  }
  set(x,y,value) {
    this.content[y * this.width + x] = value;
  }
}

// Now we build the Matrix Iterator, an interface to iterate the matrix
// It needs to keep track of its coordinator and its value.
class MatrixIterator {
  constructor(matrix) {
    this.x      = 0;
    this.y      = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};
    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x , this.y)
    };
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }

    return {value, done: false};
  }
}

// Now, load it to Matrix.prototype
Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
}

// Let's loop!
let matrix = new Matrix(2,2,(x,y) => `value ${x}, ${y}`)
for (let {x,y,value} of matrix) {
  console.log(x,y,value);
}
