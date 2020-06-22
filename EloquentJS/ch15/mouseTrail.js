let trailElements = [];
let index = 0; // Because of the one-element-only-at-a-time rule on the document.
let positionX;
let positionY;

for (let i = 0; i < 15; i++) {
  let trailElement = document.createElement("div");
  trailElement.className = "trailElement";
  trailElement.style.backgroundColor = getRandomColor();
  trailElements.push(trailElement);
}

window.addEventListener("mousemove", event => {
  positionX = event.pageX;
  positionY = event.pageY;
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

function animate(time, lastTime) {
  if (lastTime != null) {
    time += (time - lastTime) * 0.001;
  }
  index %= trailElements.length;
  let trailElement = trailElements[index];
  trailElement.style.top  = (positionY + 10) + "px";
  trailElement.style.left = (positionX + 2) + "px";
  document.body.appendChild(trailElement);
  ++index;
  requestAnimationFrame(newTime => animate(newTime, time));
}

requestAnimationFrame(animate);
