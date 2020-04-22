let labels = document.getElementsByTagName("label");

let checkboxes = [];

let nodeBoxes = [];

var clickedImgURL = chrome.extension.getURL("images/cherry-blossom-emoji.png");
var imgURL = chrome.extension.getURL("images/seed-emoji.png");

for (let label of labels) {
  const relatedElementId = label.htmlFor;
  if (relatedElementId === "") continue;

  const relatedElement = document.getElementById(relatedElementId);

  if (relatedElement.type === "checkbox") {
    checkboxes.push(relatedElement);
  } else {
    continue;
  }
}

for (let box of checkboxes) {
  // Hide the checkboxes
  box.style.position = "absolute";
  box.style.left = "-9999px";

  var compStyles = window.getComputedStyle(box);
  var boxMargin = compStyles.getPropertyValue("margin");


  var newNode = document.createElement("img");

  newNode.src = imgURL;
  newNode.style.height = "20px";
  newNode.style.width = "20px";
  newNode.style.setProperty("margin", boxMargin);
  nodeBoxes.push({ newNode, box });

  box.after(newNode);
}

for (let nodeBox of nodeBoxes) {
  let node = nodeBox.newNode;
  let box = nodeBox.box
  node.onclick = function () {
    box.checked = !box.checked
    if (box.checked) node.src = clickedImgURL;
    else node.src = imgURL;

    console.log({ box })
  }
}
