let bar = document.querySelector("div");
let lastX; // The lastest position of the mouse pointer.
bar.addEventListener("mousedown", event => {
  if (event.button == 0) {
    lastX = event.clientX;
    window.addEventListener("mousemove", moved);
    event.preventDefault(); // Prevent selection
  }
});

function moved(event) {
  if (event.buttons == 0) {
    window.removeEventListener("mousemove", moved);
  } else {
    let dist = event.clientX - lastX;
    let newWidth = Math.max(10, bar.offsetWidth + dist) + "px";
    bar.style.width = newWidth;
    lastX = event.clientX;
  }
}
