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
  for (let element of data) {
    let dataFields = Object.values(element);
    let row = document.createElement("tr");
    for (let field of dataFields) {
      let tableData = document.createElement('td');
      let text      = document.createTextNode(field);
      if (typeof field == "number") {
        tableData.style.textAlign = "right";
      }
      tableData.appendChild(text);
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  table.style.marginLeft = "auto";
  table.style.marginRight = "auto";
  table.id = "moutains";
  return table;
}

let list = [{name: "Kilimanjaro", height: 5895, place: "Tanzania"},
            {name: "Everest", height: 8848, place: "Asia"},
            {height: 8611, name: "K2", place: "Asia"},
            {place: "Japan", name: "Fuji", height: 3776}];
