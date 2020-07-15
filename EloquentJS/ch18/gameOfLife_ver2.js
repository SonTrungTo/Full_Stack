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

// count the number of all neighbors around (x, y), except for (x, y) itself.
function countNeighbors(grid, x, y) {
  for (var i = 0; i < array.length; i++) {
    for (var i = 0; i < array.length; i++) {
      array[i]
    }
  }
}
