let codesBody = document.querySelector("textarea");
let runCodes  = document.querySelector("#runCodes");
let helpText  = document.querySelector("#help");

runCodes.addEventListener("click", () => {
  let result = Function("", codesBody.value);
  try {
    let output = document.createTextNode(result());
    helpText.appendChild(output);
  } catch (e) {
    let errorMessage = document.createTextNode(e);
    helpText.appendChild(errorMessage);
  }
});
