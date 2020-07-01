const lives = 3;
let para = document.createElement("p");
para.id = "help1";

// runAnimation
function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// runLevel
function runLevel(level, Display) {
  let display = new Display(document.body, level);
  document.body.appendChild(para);
  let state   = State.start(level);
  let ending  = 1;
  return new Promise(resolve => {
    let isPaused = false;
    /* "false": Running the game.
       "true" : Pausing the game, but the game needs to keep going, runAnimation has to be running
       MEANING ? runAnimation has to be receiving the signal. HOW???? */
    window.addEventListener("keydown", event => {
      if (event.key == "Escape") {
        isPaused = true;
      }
    });

    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

// runGame
async function runGame(plans, Display) {
  let remainingLives = lives;
  for (let level = 0; level < plans.length;) {
    para.textContent = `Remaining Lives: ${remainingLives}`;
    let status = await runLevel(new Level(plans[level]), Display);
    if(status == "won") ++level;
    if (status == "lost") {
      remainingLives--;
      if (remainingLives == 0) {
        level = 0;
        remainingLives = lives;
      }
    }
  }
  para.textContent = "CONGRATS! YOU HAVE WON THE GAME!"
}
