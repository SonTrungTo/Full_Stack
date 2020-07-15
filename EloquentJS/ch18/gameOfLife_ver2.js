let gridNode      = document.querySelector("#grid");
let startButton   = document.querySelector("#start");
let advanceButton = document.querySelector("#advance");
let autoButton    = document.querySelector("#auto");
let running       = null;

// So we first need an array that contains all the checkboxes. This is how we will
// base our grid on.
let checkBoxes = [];
let rows = 20;
let cols = 30;

function createGrid(rows, cols) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      gridNode.appendChild(checkbox);
      checkBoxes.push(checkbox);
    }
    let breakLine = document.createElement("br");
    gridNode.appendChild(breakLine);
  }
}

// We now imagine the grid as an array of Boolean
function gridFromCheckboxes() {
  return checkBoxes.map(box => box.checked);
}
function checkboxesFromGrid(grid) {
  return grid.forEach((value, i) => checkBoxes[i].checked = value);
}
function randomGrid() {
  let grid = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid.push(Math.random() < 0.52);
    }
  }

  return grid;
}

createGrid(rows, cols);

startButton.addEventListener("click", () => {
  checkboxesFromGrid(randomGrid());
});

// count the number of all live neighbors around (x, y), except for (x, y) itself.
function countNeighbors(grid, x, y) {
  let count = 0;
  for (let x1 = Math.max(0, x - 1); x1 <= Math.min(rows - 1, x + 1); x1++) {
    for (let y1 = Math.max(0, y - 1); y1 <= Math.min(cols - 1, y + 1); y1++) {
      if ((x1 != x || y1 != y) && grid[y1 + x1 * cols]) {
        ++count;
      }
    }
  }
  return count;
}

function nextGrid(grid) {
  let newGrid = new Array(cols * rows);
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      let offSet    = y + x * cols;
      let neighbors = countNeighbors(grid, x, y);
      if (neighbors < 2 || neighbors > 3) {
        newGrid[offSet] = false;
      } else if (neighbors == 2) {
        newGrid[offSet] = grid[offSet];
      } else {
        newGrid[offSet] = true;
      }
    }
  }
  return newGrid;
}

function turn() {
  checkboxesFromGrid(nextGrid(gridFromCheckboxes()));
}

advanceButton.addEventListener("click", turn);
autoButton.addEventListener("click", () => {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
