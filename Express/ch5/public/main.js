let form = document.querySelector("form");
let header = document.querySelector("h1");

form.addEventListener("submit", event => {
  event.preventDefault();

  let zipInput = event.target.elements.zip.value.trim();
  header.textContent = "Loading...";

  fetch("/" + zipInput, {"Content-Type": "application/json"}).then(response => {
    let data = JSON.parse(response);
    let temperature = data.temperature;
    header.textContent = `It is ${temperature} &#176; in ${zipInput}.`;
  });
});
