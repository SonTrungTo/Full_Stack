// Let's write codes to replace img with its alt text.
function replaceImage() {
  let images = document.body.getElementsByTagName('img');
  for (let i = images.length - 1; i >= 0; i--) { // Live NodeList, use Array.from for solid.
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

// elt: create an element node and treat the rest of its args as that node's children.
function elt(type, ...children) {
  let masterNode =  document.createElement(type);
  for (let child of children) {
    if (typeof child == "string") {
      masterNode.appendChild(document.createTextNode(child));
    } else {
      masterNode.appendChild(child);
    }
  }
  return masterNode;
}

document.getElementById('quote').appendChild(
  elt('footer', "--",
      elt('strong', "Karl Popper"),
      ", preface to the second edition of ",
      elt('em', "The Open Society and Its Enemies"),
      ", 1950")
);
