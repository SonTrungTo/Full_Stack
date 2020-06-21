let bombTimer = setTimeout(() =>{
  console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) {
  clearTimeout(bombTimer);
  console.log("Defused!");
}

let ticks = 0;
let clock = setInterval(() => {
  console.log("tick", ticks++);
  if (ticks == 10) {
    clearInterval(clock);
    console.log("stop.");
  }
}, 500);
