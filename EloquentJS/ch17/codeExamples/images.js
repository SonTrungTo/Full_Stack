cx = document.querySelector("#canvas6").getContext("2d");
let img  = document.createElement("img");
let img2 = document.createElement("img");
img.src  = "contra.png";
img2.src = "marijn.png";
let spriteW = 19, spriteH = 37;
let spriteW2 = 48, spriteH2 = 60;

img.addEventListener("load", () => {
  let cycle = 0;
  setInterval(() => {
    cx.clearRect(0, 0, spriteW, spriteH);
    cx.drawImage(img,
      cycle * spriteW, 42 , spriteW, spriteH,
      0, 0, spriteW, spriteH);
    cycle = (cycle + 1) % 6;
  }, 120);
});

img2.addEventListener("load", () => {
  let cycle = 0;
  //flipHorizontally(cx, 40 + spriteW2 / 2); // it's stack
  setInterval(() => {
    cx.clearRect(40, 0, spriteW2, spriteH2);
    cx.drawImage(img2,
      cycle * spriteW2, 0, spriteW2, spriteH2,
      40, 0, spriteW2, spriteH2);
    cycle = (cycle + 1) % 8;
  }, 120);
});
