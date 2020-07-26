// We first take the DOM element.
let filelist = document.getElementById('filelist');
let file     = document.getElementById('file');

// We now fetch the files from file server.
fetch("/").then(resp => resp.text()).then(files => {
  for (let f of files.split("\n")) {
    let option   = document.createElement("option");
    option.textContent = f;
    filelist.appendChild(option);
  }
  // Make sure that the textarea loads the selected file.
  loadSelectedFile();
});

function loadSelectedFile() {
  fetch(filelist.value).then(resp => resp.text()).then(content => {
    file.value = content;
  });
}

filelist.addEventListener("change", loadSelectedFile);

// now saving the file.
function saveFile() {
  fetch(filelist.value, {method: "PUT",
                         body: file.value});
}
