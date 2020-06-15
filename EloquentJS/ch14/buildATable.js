function buildTable(data) {
  let table = document.createElement('table');
  // Creating column head names for the table
  if (document.querySelectorAll("#one > table th").length != 3) {
    let row = document.createElement("tr");
    for (let colName of Object.keys(data[0])) {
      let head = document.createElement("th");
      let text = document.createTextNode(colName);
      head.appendChild(text);
      row.appendChild(head); // Note: head.appendChild(text) is a method and returns nodeText, not head node.
    }
    table.appendChild(row);
  }
  // Now creating table data
  
  return table;
}

let list = [{name: "Kilimanjaro", height: 5895, place: "Tanzania"}];
