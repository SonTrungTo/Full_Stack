let tabTag = document.querySelector("tab-panel");

function asTabs(node) {
  let tabs = [];
  let index = 0;

  for (let i = 0; i < node.children.length; i++) {
    let button = document.createElement("button");
    button.textContent = node.children[i].getAttribute("data-tabName");
    tabs.push(button);
  }

  tabs.forEach(tabNode => {
    node.insertBefore(tabNode, node.children[index]);
    index += 2;
  });

}

function changingTab() {

}

asTabs(tabTag);
