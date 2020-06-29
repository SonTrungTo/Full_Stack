const arrowKeys = trackKeys(["ArrowUp", "ArrowLeft", "ArrowRight"]);

function trackKeys(keys) {
  let down = Object.create(null);
  function key(event) {
    if(keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }

  window.addEventListener("keydown", key);
  window.addEventListener("keyup", key);
  return down;
}
