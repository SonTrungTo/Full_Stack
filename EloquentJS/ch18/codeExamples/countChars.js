let textarea = document.querySelector("textarea");
let length   = document.querySelector("#length");

textarea.addEventListener("input", () => {
  length.textContent = textarea.value.length;
});
