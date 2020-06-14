function count(selector) { // not live
  return document.querySelectorAll(selector).length;
}

console.log(count("p"));
console.log(count(".animal"));
console.log(count("p .animal"));
console.log(count("p > .animal"));
