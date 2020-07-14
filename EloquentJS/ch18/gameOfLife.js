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
