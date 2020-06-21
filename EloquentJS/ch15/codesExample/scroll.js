// Create example text.
document.body.appendChild(document.createTextNode(
"Aalto University is a great school, but I have bad history there. ".repeat(1000)));

let bar = document.querySelector("#progress");
window.addEventListener("scroll", () => {
  let max = document.body.scrollHeight - innerHeight;
  bar.style.width = `${(pageYOffset / max) * 100}%`;
});
