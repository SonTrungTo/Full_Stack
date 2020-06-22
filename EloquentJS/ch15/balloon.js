let balloon = document.querySelector(".balloon");
let size = 12;

window.addEventListener("keydown", adjustBalloon);

function adjustBalloon(event) {
  if (event.key == "ArrowUp") {
    size *= (1 + 0.1);
    balloon.style.fontSize = size + "px";
  } else if (event.key == "ArrowDown") {
    size *= (1 - 0.1);
    balloon.style.fontSize = size + "px";
  }
  if (size > 100) {
    balloon.textContent = "💥";
    window.removeEventListener("keydown", adjustBalloon);
  }
  event.preventDefault();
}
