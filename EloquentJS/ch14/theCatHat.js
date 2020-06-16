let microBook = document.getElementById('MWG');
let statBook  = document.getElementById('CB');
let angle     = Math.PI / 2;

function animate(time, lastTime) {
  if (lastTime != null) {
    angle += (time - lastTime) * 0.001;
  }
  statBook.style.top  = (Math.sin(angle + Math.PI) * 80)  + 580 + "px";
  statBook.style.left = (Math.cos(angle + Math.PI) * 200) + 925 + "px";
  microBook.style.top = (Math.sin(angle) * 80) + 580 + "px";
  microBook.style.left = (Math.cos(angle) * 200) + 925 + "px";
  requestAnimationFrame(newTime => animate(newTime, time));
}
requestAnimationFrame(animate);
