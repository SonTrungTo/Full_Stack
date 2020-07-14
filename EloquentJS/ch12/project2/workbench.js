let textarea = document.querySelector("textarea");
let button   = document.querySelector("button");
let helpText = document.querySelector(".helpText");

textarea.value = `run("print(+(1, 1))");\
\n\nrun("do(define(pow, fun(base, exp, if(==(exp, 0), 1,\
*(base, pow(base, -(exp, 1)))))),\
print(pow(2, 10)))");\
\n\n` + 'run(`if(>(1, 0), print("Son is awesome!"), print("He is noob!"))`);';

button.addEventListener("click", () => {
  helpText.textContent = "";
  let codesBody = textarea.value;
  console.log = function (value) {
    let valueNode = document.createTextNode(String(value));
    let para      = document.createElement("p");
    para.appendChild(valueNode);
    helpText.appendChild(para);
  };

  try {
    let run = Function("", codesBody);
    run();
  } catch (e) {
    let para = document.createElement("p");
    let errorNode = document.createTextNode("Error: " + String(e));
    para.appendChild(errorNode);
    helpText.appendChild(para);
  }
});
