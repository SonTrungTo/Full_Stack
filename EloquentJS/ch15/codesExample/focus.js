let help = document.querySelector("#help");
let fields = document.querySelectorAll("input");

for (let field of Array.from(fields)) {
  field.addEventListener("focus", () => {
    let text = field.getAttribute("data-help");
    help.textContent = text;
  });

  field.addEventListener("blur", () => {
    help.textContent = "";
  });
}
