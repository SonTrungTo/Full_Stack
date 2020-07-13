let textarea = document.querySelector("textarea");
let runCodes  = document.querySelector("#runCodes");
let helpText  = document.querySelector("#help");

runCodes.addEventListener("click", () => {
  helpText.textContent = "";
  let codesBody = textarea.value;
  console.log = function(value) {
    let valueNode = document.createTextNode(String(value));
    let para      = document.createElement("p");
    para.appendChild(valueNode);
    helpText.appendChild(para);
  }

  try {
    let run = Function("", codesBody);
    run();
  } catch (e) {
    let para = document.createElement("p");
    let errorMessage = document.createTextNode("Error: " + String(e));
    para.appendChild(errorMessage);
    helpText.appendChild(para);
  }
});
