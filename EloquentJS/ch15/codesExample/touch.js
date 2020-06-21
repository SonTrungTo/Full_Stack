function update(event) {
  for (let dot; dot = document.querySelector("dot"); ) {
    dot.remove();
  }
  for (let i = 0; i < event.touches.length; i++) {
    let {pageX, pageY} = event.touches[i];
    let dot = document.createElement("dot");
    dot.style.left = (pageX - 50) + "px";
    dot.style.top  = (pageY - 50) + "px";
    document.body.appendChild(dot);
  }
}

window.addEventListener("touchstart", event => {
  update(event);
  event.preventDefault(); // Prevent scrolling and mouse event firing up.
});
window.addEventListener("touchmove", event => {
  update(event);
  event.preventDefault();
});
window.addEventListener("touchend", event => {
  update(event);
  event.preventDefault();
});
