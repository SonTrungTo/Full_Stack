function getElementsByTagName(node, type) {
  let typeArray = [];
  let typeName  = type.toUpperCase();

  function explore(tag) {
    for (let i = 0; i < tag.childNodes.length; i++) {
      let child = tag.childNodes[i];
      if (child.nodeName == typeName) typeArray.push(child);
      if (child.nodeType == Node.ELEMENT_NODE) explore(child);
    }
  }

  explore(node);
  return typeArray;
}
