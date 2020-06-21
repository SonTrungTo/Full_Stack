let help = document.querySelector("#help");
let fields = document.querySelectorAll("input");
let textarea = document.querySelector("textarea");

for (let field of Array.from(fields)) {
  field.addEventListener("focus", () => {
    let text = field.getAttribute("data-help");
    help.textContent = text;
  });

  field.addEventListener("blur", () => {
    help.textContent = "";
  });
}

textarea.addEventListener("focus", () => {
  textarea.textContent = "";
});

textarea.addEventListener("blur", () => {
  textarea.textContent = "Type something here...";
});
