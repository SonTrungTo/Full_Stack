// elt creates a DOM element, attach to it attributes and its children.
function elt(element, attrs, ...children) {
  let elementDOM = document.createElement(element);
  for (let attr of Object.keys(attrs)) {
    elementDOM.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    elementDOM.appendChild(child);
  }
  return elementDOM;
}
