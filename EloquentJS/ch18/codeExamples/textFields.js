// Program outputs instantly a word with a single press of a button
let textarea = document.querySelector("textarea");

textarea.addEventListener("keydown", event => {
      // F12
  if (event.key == "F12") {
    replaceSelection(textarea, "Katiemuonio");
    event.preventDefault();
  }
});

function replaceSelection(textField, word) {
  let from = textField.selectionStart;
  let to   = textField.selectionEnd;

  textField.value = textField.value.slice(0, from) + word +
                    textField.value.slice(to);

  textField.selectionStart = from + word.length;
  textField.selectionEnd   = from + word.length;
}
