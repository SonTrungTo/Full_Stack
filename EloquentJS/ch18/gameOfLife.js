let  grid = document.querySelector("#grid");
let  startButton   = document.querySelector("#start");
let  advanceButton = document.querySelector("#advance");

function createGrid(rows, cols) {
  grid.setAttribute("rows", rows);
  grid.setAttribute("cols", cols);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.setAttribute("row", row);
      checkbox.setAttribute("col", col);
      grid.appendChild(checkbox);
    }
    let breakLine = document.createElement("br");
    grid.appendChild(breakLine);
  }
}

function adjacentCells(cells, cell) {
  let adjCells = [];
  let rows = Number(grid.getAttribute("rows"));
  let cols = Number(grid.getAttribute("cols"));
  let centerRow  = Number(cell.getAttribute("row"));
  let centerCol  = Number(cell.getAttribute("col"));

  for (let i = 0; i < cells.length; i++) {
    let adjCell = cells[i];
    let adjCellRow = Number(adjCell.getAttribute("row"));
    let adjCellCol = Number(adjCell.getAttribute("col"));
    if (adjCell.getAttribute("row") == null || adjCell.getAttribute("col") == null) {
      continue;
    }
    for (let rowAdd = -1; rowAdd < 2; rowAdd++) {
      for (let colAdd = -1; colAdd < 2; colAdd++) {
        if (rowAdd != 0 || colAdd != 0) {
          let sumRow = centerRow + rowAdd;
          let sumCol = centerCol + colAdd;
          if (!(sumRow < 0 || sumRow == rows || sumCol < 0 || sumCol == cols)) {
            if (adjCellRow == sumRow && adjCellCol == sumCol) {
              adjCells.push(adjCell);
            }
          }
        }
      }
    }
  }

  return adjCells;
}

createGrid(20, 30);

startButton.addEventListener("click", () => {
  let rows = Number(grid.getAttribute("rows"));
  let cols = Number(grid.getAttribute("cols"));
  let checkboxes = grid.childNodes;

  // Refresh the grid
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  // Initialize the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        if (checkbox.getAttribute("row") == String(row) &&
            checkbox.getAttribute("col") == String(col)) {
              if (Math.random() < 0.525) {
                checkbox.checked = true;
              }
        }
      }
    }
  }
});

advanceButton.addEventListener("click", () => {
  let checkboxes = grid.childNodes;
  let checkedBox = [];

  // Initialize the already checked box
  for (let i = 0; i < checkboxes.length; i++) {
    let checkbox = checkboxes[i];
    if (checkbox.type == "checkbox" && checkbox.checked) checkedBox.push(checkbox);
  }

  for (let i = 0; i < checkboxes.length; i++) {
    let countChecked = 0;
    let checkbox = checkboxes[i];
    let adjCells = adjacentCells(checkboxes, checkbox);
    for (let adjCell of adjCells) {
      if (adjCell.checked) ++countChecked;
    }
    if (checkbox.checked) {
      if (countChecked < 2 || countChecked > 3) {
        checkbox.checked = false;
      } else if (countChecked == 2 || countChecked == 3) {
        checkbox.checked = true;
      }
    } else {
      if (countChecked == 3) {
        checkbox.checked = true;
      }
    }
  }
});
