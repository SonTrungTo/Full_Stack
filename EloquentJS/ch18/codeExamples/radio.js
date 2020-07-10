let buttons = document.querySelectorAll("[name=color]");

for (let button of buttons) {
  button.addEventListener("change", () => {
    document.body.style.background = button.value;
  });
}
