let trailElements = [];

for (let i = 0; i < 6; i++) {
  let trailElement = document.createElement("div");
  trailElement.className = "trailElement";
  trailElement.style.backgroundColor = getRandomColor();
  trailElements.push(trailElement);
}

window.addEventListener("mousemove", event => {
  for (let i = 0; i < trailElements.length; i++) {
    trailElements[i].style.top  = (event.pageY + 8 * (i + 2)) + "px";
    trailElements[i].style.left = (event.pageX + 8 * (i + 1)) + "px";
    document.body.appendChild(trailElements[i]);
  }
});

function getRandomColor() {
  let letters = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    color += randomLetter;
  }
  return color;
}
