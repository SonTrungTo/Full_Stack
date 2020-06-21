// User types in the input, and a response is called, but not too close.
// textarea in focus.js

let timeout;
textarea.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log("Need help?");
  }, 3000);
});
