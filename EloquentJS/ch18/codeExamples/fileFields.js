let input = document.querySelector("#file");

// input.addEventListener("change", () => {
//   if (input.files.length > 0) {
//     let file = input.files[0];
//     console.log(`You chose ${file.name}`);
//     if(file.type) console.log("It has type", file.type);
//   }
// });

input.addEventListener("change", () => {
  for (let file of Array.from(input.files)) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log("File", file.name, "starts with",
                   reader.result.slice(0, 20));
    });
    reader.readAsText(file);
  }
});

function readFileText(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsText(file);
  });
}
