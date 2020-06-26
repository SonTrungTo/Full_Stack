// drawGrid(level)
const scale = 20;

function drawGrid(level) {
  return elt("table", {
    class: "background",
    style: `width: ${level.width * scale}px;`
  }, ...level.rows.map(row =>
    elt("tr", {
      style: `height: ${scale}px;`
    }, ...row.map(type => elt("td", {class: type})))));
}

function drawActors(actors) {
  return elt("div", {}, ...actors.map(actor => {
    let domElement = elt("div", {class: `actor ${actor.type}`});
    domElement.style.width  = actor.size.x * scale + "px"; // This is different from the book, which used string literals
    domElement.style.height = actor.size.y * scale + "px"; // Same
    domElement.style.left   = `${actor.pos.x * scale}px`;
    domElement.style.top    = `${actor.pos.y * scale}px`;
    return domElement;
  }));
}
