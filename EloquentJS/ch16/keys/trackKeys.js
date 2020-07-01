const arrowKeys = trackKeys(["ArrowUp", "ArrowLeft", "ArrowRight"]);

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if(keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }

  down.addHandler = () => {
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
  };

  down.removeHandler = () => {
    window.removeEventListener("keydown", track);
    window.removeEventListener("keyup", track);
  };

  return down;
}
