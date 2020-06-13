function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (talksAbout(node.childNodes[i], string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

// My own version, using Array.from()
function talksAbout2(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let childNode of Array.from(node.childNodes)) {
      console.log(node.childNodes);
      if (talksAbout2(childNode, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}
