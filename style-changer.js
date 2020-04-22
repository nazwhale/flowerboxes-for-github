let labels = document.getElementsByTagName("label");

let checkboxes = [];

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
  console.log("classes", box.className);
  var compStyles = window.getComputedStyle(box);
  var boxMargin = compStyles.getPropertyValue("margin");

  // Insert new pic
  var imgURL = chrome.extension.getURL("images/seed-emoji.png");

  var newNode = document.createElement("img");
  newNode.src = imgURL;
  newNode.style.height = "20px";
  newNode.style.width = "20px";
  newNode.style.setProperty("margin", boxMargin);
  box.after(newNode);
}
