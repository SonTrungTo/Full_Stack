// A separated-time response that is fired during a series of events, not afterward.
let schedule = null;
let textNode = document.createElement("p");

window.addEventListener("mousemove", event => {
  if (!schedule) {
    setTimeout(() => {
      let text = `Coordinates: (${event.pageX}, ${event.pageY})`;
      textNode.textContent = text;
      document.body.appendChild(textNode);
      schedule = null;
    }, 250);
  }
  schedule = event;
});
