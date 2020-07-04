const scale = 20;

class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width  = Math.min(600, level.width  * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;

    this.viewport = {
      top:    0,
      left:   0,
      width:  this.canvas.width  / scale,
      height: this.canvas.height / scale
    };
  }

  syncState(state) {
    this.updateViewPort(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);
  }

  updateViewPort(state) {
    let view   = this.viewport;
    let margin = view.width / 3;
    let player = state.player();
    let center;

  clear() {
    this.canvas.remove();
  }
}
