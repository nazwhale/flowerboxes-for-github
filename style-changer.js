let labels = document.getElementsByTagName("label");

let checkboxes = [];
let nodeBoxes = [];

var checkedImgURL = chrome.extension.getURL("images/cherry-blossom-emoji.png");
var uncheckedImgURL = chrome.extension.getURL("images/seed-emoji.png");

// TODO: "Uncaught SyntaxError: Identifier 'labels' has already been declared"
// Find all the labels with checkboxes and push those checkboxes to an array
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
  // Hide the checkbox
  box.style.position = "absolute";
  box.style.left = "-9999px";

  // Grab the styling on the existing checkbox
  var compStyles = window.getComputedStyle(box);
  var boxMargin = compStyles.getPropertyValue("margin");

  // Create new checkbox with styling
  var newNode = document.createElement("img");
  newNode.src = getCheckboxImg(box.checked);
  newNode.style.height = "20px";
  newNode.style.width = "20px";
  newNode.style.setProperty("margin", boxMargin);

  // Add to our array of new checkboxes
  nodeBoxes.push({ newNode, box });

  // Add to the DOM after the existing box
  box.after(newNode);
}

// Setup onClick handlers for each box
for (let nodeBox of nodeBoxes) {
  let node = nodeBox.newNode;
  let box = nodeBox.box;
  node.onclick = function() {
    box.checked = !box.checked;
    node.src = getCheckboxImg(box.checked);
  };
}

function getCheckboxImg(isChecked) {
  return isChecked ? checkedImgURL : uncheckedImgURL;
}
