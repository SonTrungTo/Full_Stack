let ctxt = document.querySelector("#canvas8").getContext("2d");

function branch(length, angle, scale) {
  ctxt.fillRect(0, 0, 1, length);
  if (length < 8) return;
  ctxt.save();
  ctxt.translate(0, length);
  ctxt.rotate(-angle);
  branch(length * scale, angle, scale);
  ctxt.rotate(2 * angle);
  branch(length * scale, angle, scale);
  ctxt.restore();
}

ctxt.translate(300, 0);
branch(60, 0.2 * Math.PI, 0.8);
