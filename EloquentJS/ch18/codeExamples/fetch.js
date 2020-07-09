fetch("template.html").then(response => {
  console.log(response.status);
  console.log(response.headers.get("Content-type"));
});

fetch("template.html").then(resp => resp.text())
.then(text => console.log(text));

fetch("template.html", {method: "DELETE"})
.then(resp => console.log(resp.status));

fetch("template.html", {headers: {Range: "bytes=8-19"}})
.then(resp => resp.text())
.then(text => console.log(text));

Access-Control-Allow-Origin: *
