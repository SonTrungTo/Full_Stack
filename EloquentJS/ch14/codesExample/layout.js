let para = document.getElementById('layout');
console.log("offsetWidth:", para.offsetWidth);
console.log("clientWidth:", para.clientWidth);
console.log("getBoundingClientRect:", para.getBoundingClientRect());
console.log("offsetHeight:", para.offsetHeight);
console.log("clientHeight:", para.clientHeight);

para.style.color = "magenta";

// Reading DOM and alternating DOM consume significant amount of time.
function time(name, action) {
  let start = Date.now(); // Current time in milliseconds
  action();
  console.log(name, "took", Date.now() - start, "ms");
}

time("naive", () => {
  let target = document.getElementById('one');
  while (target.offsetWidth < 2000) {
    target.appendChild(document.createTextNode("X")); // Reading 'text = document.createTextNode("X");' forces computation. => freezing
  }
});

time("clever", () => {
  let target = document.getElementById('two');
  target.appendChild(document.createTextNode("XXXXX"));
  let total = Math.ceil(20000 / (target.offsetWidth / 5));
  target.firstChild.nodeValue = "X".repeat(total);
});
