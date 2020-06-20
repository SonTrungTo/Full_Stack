let button = document.querySelectorAll("button");
let para   = document.querySelectorAll("p");

button[0].addEventListener("click", () => {
  console.log("Button clicked!");
});

function once() {
  console.log("Done.");
  button[1].removeEventListener("click", once);
}

button[1].addEventListener("click", once);

button[2].addEventListener("mousedown", event => {
  if (event.button == 0) {
    console.log("Left button");
  } else if (event.button == 1) {
    console.log("Middle button");
  } else if (event.button == 2) {
    console.log("Right button");
  }
});

para[1].addEventListener("mousedown", () => {
  console.log("Handler for paragraph.");
});

button[3].addEventListener("mousedown", event => {
  console.log("Handler for button.");
  if (event.button == 2) event.stopPropagation();
});

document.body.addEventListener("click", event => {
  if (event.target.nodeName == "BUTTON") {
    console.log("Cliked", event.target.textContent);
  }
});
