let form = document.querySelector("form");
console.log(form.elements[1].name);
console.log(form.elements.password.type);
console.log(form.elements.password.form == form); // -> true

form.addEventListener("submit", event => {
  console.log("Saving password: " + form.elements.password.value);
  console.log("Saving name: " + form.elements.name.value);
  event.preventDefault();
});
