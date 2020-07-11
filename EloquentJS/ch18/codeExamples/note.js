let list = document.querySelector("select");
let note = document.querySelector("textarea");

let state;
function setState(newState) {
  let list.textContent = "";
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected == name) option.selected = true;
    list.appendChild(option);
  }
  note.value;

  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}
