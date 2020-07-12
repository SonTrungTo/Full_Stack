let list = document.querySelector("select");
let note = document.querySelector("textarea");

let state;
function setState(newState) {
  list.textContent = "";
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected == name) option.selected = true;
    list.appendChild(option);
  }
  note.value = newState.notes[newState.selected];

  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}

setState(JSON.parse(localStorage.getItem("Notes")) ||
         {notes: {"shopping list": "Potatoes\nSalmon Fish"},
          selected: "shopping list"});

list.addEventListener("change", () => {
   setState({notes: state.notes, selected: list.value});
});

note.addEventListener("change", () => {
  setState({
    notes: Object.assign({}, state.notes, {[state.selected]: note.value}),
    selected: state.selected
  });
});
// 3rd argument in Object.assign is to save any edit to the message, otherwise it will revert to original.

document.querySelector("button")
.addEventListener("click", () => {
  let name = prompt("Note name");
  if (name) setState({
    notes: Object.assign({}, state.notes, {[name]: ""}),
    selected: name
  });
});
