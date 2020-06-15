function getElementsByTagName(node, type, result) { // recursive itself
  if (node.nodeName == type.toUpperCase()) {
    result.concat(node);
  }
  for (let i = 0; i < node.childNodes.length; ++i) {
    if (node.childNodes[i].nodeType == node.ELEMENT_NODE)
      getElementsByTagName(node.childNodes[i], type, result);
  }
  return result;
}
