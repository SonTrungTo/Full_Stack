const around = [{dx: 1, dy: 0}, {dx: -1, dy: 0},
                {dx: 0, dy: 1}, {dx: 0, dy: -1}];

function drawLine(from, to, color) {
  let points = [];
  if (Math.abs(to.x - from.x) > Math.abs(to.y - from.y)) { // along x axis
    if (to.x < from.x) [from, to] = [to, from];
    let slope = (to.y - from.y) / (to.x - from.x);
    for (let x = from.x, y = from.y; x <= to.x ; x++) {
      points.push({x, y: Math.round(y), color});
      y += slope;
    }
  } else { // along y axis
    if (to.y < from.y) [from, to] = [to, from];
    let slope = (to.x - from.x) / (to.y - from.y);
    for (let x = from.x, y = from.y; y <= to.y ; y++) {
      points.push({x: Math.round(x), y, color});
      x += slope;
    }
  }
  return points;
}

function draw(pos, state, dispatch) {
  function connect(newPos, state) {
    let drawn = drawLine(pos, newPos, state.color);
    pos = newPos;
    dispatch({picture: state.picture.draw(drawn)});
  }
  connect(pos, state);
  return connect;
}

function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd   = Math.max(start.x, pos.x);
    let yEnd   = Math.max(start.y, pos.y);
    let drawn  = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({x, y, color: state.color});
      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawRectangle(start);
  return drawRectangle;
}

function fill({x, y}, state, dispatch) {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{x, y, color: state.color}];
  for (let done = 0; done < drawn.length; done++) {
    for (let {dx, dy} of around) {
      let x = drawn[done].x + dx, y = drawn[done].y + dy;
      if (x >= 0 && x < state.picture.width &&
          y >= 0 && y < state.picture.height &&
          state.picture.pixel(x, y) == targetColor &&
          !drawn.some(p => p.x == x && p.y == y)) {
            drawn.push({x, y, color: state.color});
      }
    }
  }
  dispatch({picture: state.picture.draw(drawn)});
}

function pick(pos, state, dispatch) {
  dispatch({color: state.picture.pixel(pos.x, pos.y)});
}

function circle(start, state, dispatch) { // Drawing a filled circle here...
  function drawCircle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd   = Math.max(start.x, pos.x);
    let yEnd   = Math.max(start.y, pos.y);
    let drawn  = [];

    let radius  = Math.sqrt(Math.pow(xEnd - xStart, 2) + Math.pow(yEnd - yStart, 2));
    let radiusC = Math.ceil(radius);
    for (let dy = -radiusC; dy <= radiusC; dy++) { // We are now coloring all squares inside circle
      for (let dx = -radiusC; dx <= radiusC; dx++) {
        let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (dist > radius) continue;
        let x = xStart + dx, y = yStart + dy;
        if (x < 0 || y < 0 ||
            x >= state.picture.width || y >= state.picture.height) continue;
        drawn.push({x, y, color: state.color});
      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawCircle(start);
  return drawCircle;
}
