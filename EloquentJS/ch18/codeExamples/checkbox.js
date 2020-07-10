let form = document.querySelector("form");
let checkbox = form.elements.checkbox;

checkbox.addEventListener("change", () => {
  document.body.style.background =
  checkbox.checked ? "mediumpurple" : "";
});
