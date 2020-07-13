let ex1 = document.querySelector('.ex1');
textReturn("text/plain");
textReturn("text/html");
textReturn("application/json");
textReturn("application/rainbows+unicorns");

async function textReturn(type) {
  let text = await fetch("https://eloquentjavascript.net/author", {headers: {Accept: type}})
  .then(response => {
    console.log(response.status);
    return response.text();
  })
  .then(text => text);

  let para = document.createElement("p");
  let textNode = document.createTextNode(text);
  para.appendChild(textNode);
  ex1.appendChild(para);
}
