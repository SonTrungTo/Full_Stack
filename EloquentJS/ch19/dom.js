function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else {
      let textNodeChild = document.createTextNode(child);
      dom.appendChild(textNodeChild);
    }
  }
  return dom;
}
