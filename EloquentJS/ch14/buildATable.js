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
    let names = Object.keys(element);
    let row = document.createElement('tr');
    // Loading names.length numbers of <td>. NOTE: unable to append old nodes, related to pointers.
    for (let i = 0; i < names.length; i++) {
      row.appendChild(document.createElement('td'));
    }
    for (let name of names) {
      let text  = document.createTextNode(element[name]);
      if (typeof element[name] == "number") {
        row.childNodes[1].style.textAlign = "right";
      }
      if (name == "name") {
        row.childNodes[0].appendChild(text);
      } else if (name == "height") {
        row.childNodes[1].appendChild(text);
      } else if (name == "place") {
        row.childNodes[2].appendChild(text);
      }
      else {
        throw new ReferenceError(`Unknown property name: ${name}`);
      }
    }
    table.appendChild(row);
  }
  table.style.marginLeft = "auto";
  table.style.marginRight = "auto";
  table.id = "mountains";
  return table;
}

let list = [{name: "Kilimanjaro", height: 5895, place: "Tanzania"},
            {name: "Everest", height: 8848, place: "Asia"},
            {height: 8611, name: "K2", place: "Asia"},
            {place: "Japan", name: "Fuji", height: 3776}];
