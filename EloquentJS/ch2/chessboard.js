let size = Number(prompt("Give a size for chessboard: "));
let line = "";

for (let row = 1; row < size + 1 ; row++) {
  if (row % 2 == 0) {
    for (let col = 1; col < size + 1; col++) {
      if (col % 2 == 0) {
          line += " ";
      } else {
          line += "#";
      }
    }
} else {
    for (let col = 1; col < size + 1; col++) {
      if (col % 2 == 0) {
          line += "#";
      } else {
          line += " ";
      }
    }
  }
  line += "\n"
}

console.log(line);
