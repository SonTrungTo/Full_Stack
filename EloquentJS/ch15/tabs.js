let tabTag = document.querySelector("tab-panel");

function asTabs(node) {
  let tabs = [];
  let container = document.createElement("div");

  // Creating an array of objects, each of which contains a panel and its button.
  for (let i = 0; i < node.children.length; i++) {
    let button = document.createElement("button");
    button.textContent = node.children[i].getAttribute("data-tabname");
    tabs.push({panel: node.children[i], button});
  }

  tabs.forEach(({panel, button}, i) => {
    container.appendChild(button);
    button.addEventListener("click", () => selectTab(tabs[i]));
  });

  node.insertBefore(container, node.firstChild);

  function selectTab(selectedTab) {
    tabs.forEach(tab => {
      let {button, panel} = tab;
      if (selectedTab == tab) {
        button.style.backgroundColor = getRandomColor();
        panel.style.display = "";
      } else {
        button.style.backgroundColor = "";
        panel.style.display = "none";
      }
    });
  }

  selectTab(tabs[0]);
}
asTabs(tabTag);
