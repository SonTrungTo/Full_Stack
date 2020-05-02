// Arrow != function := function has its own binding, but arrow does not.
function normalize() {
  console.log(this.coord.map(n => n / this.length));
}

normalize.call({coord: [0, 2, 3], length: 5});
