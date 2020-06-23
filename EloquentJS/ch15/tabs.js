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
    index++;
  });

  changingTab(node, tabs, index);
}

function changingTab(panel, tabs, index) {
  tabs.forEach(tabNode => {
    tabNode.addEventListener("click", () => {
      for (let i = index; i < panel.children.length; i++) {
        let panelName = panel.children[i].getAttribute("data-tabName");
        if (tabNode.textContent != panelName) {
          panel.children[i].style.display = "none";
        } else {
          panel.children[i].style.display = "";
        }
      }
    });
  });
}

asTabs(tabTag);
