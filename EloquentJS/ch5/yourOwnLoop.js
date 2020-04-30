// A high-order loop function
function loop(start, test, update, body) {
  for (let current = start; test(current); current = update(current)) {
    body(current);
  }
}

loop(0, i => i < 10, i => ++i, console.log);
