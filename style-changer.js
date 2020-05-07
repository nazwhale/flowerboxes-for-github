var checkedImgURL = chrome.extension.getURL("images/cherry-blossom-emoji.png");
var uncheckedImgURL = chrome.extension.getURL("images/seed-emoji.png");
var floatBoxIds = [
  "merge_types_merge_commit",
  "merge_types_squash",
  "merge_types_rebase",
  "merge_types_delete_branch"
];

// This is pretty janky, but can't think of a better way to do it when navigating
// around different settings
// Problem is you got to wait for the page load
// perhaps there's a different event listener we can use
chrome.runtime.onMessage.addListener(async function(
  request,
  sender,
  sendResponse
) {
  // listen for messages sent from background.js
  if (request.message === "tabUpdated") {
    await sleep(700);
    runScript();
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function runScript() {
  let labels = document.getElementsByTagName("label");

  let checkboxes = [];
  let nodeBoxes = [];

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

    // Some inputs on github have float: left defined by the class:
    // .form-checkbox input[type=checkbox]
    // We spare the faff and hack around it
    if (floatBoxIds.includes(box.id)) {
      newNode.style.float = "left";
      newNode.style.marginRight = "4px";
    }

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
      box.click();
      node.src = getCheckboxImg(box.checked);
    };
  }
}

function getCheckboxImg(isChecked) {
  return isChecked ? checkedImgURL : uncheckedImgURL;
}

runScript();
