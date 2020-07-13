let codesBody = document.querySelector("textarea");
let runCodes  = document.querySelector("#runCodes");
let helpText  = document.querySelector("#help");

runCodes.addEventListener("click", () => {
  try {
    let result = Function("", codesBody.value);
    let output = result();
    helpText.textContent = String(output);
  } catch (e) {
    helpText.textContent = String(e);
  }
});
