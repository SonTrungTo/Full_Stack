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
    let center = player.pos.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width,
                           state.level.width - view.width);
    }

    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(margin + center.y - view.height,
                          state.level.height - view.height);
    }
  }

  clearDisplay(status) {
    if (status == "won") {
      this.cx.fillStyle = rgb(153, 218, 255);
    } else if (status == "lost") {
      this.cx.fillStyle = rgb(255, 102, 128);
    } else {
      this.cx.fillStyle = rgb(66, 183, 255);
    }
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clear() {
    this.canvas.remove();
  }
}
