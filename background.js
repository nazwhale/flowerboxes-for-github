chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "github.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // read changeInfo data
  if (changeInfo.url) {
    // url has changed; do something here
    // like send message to content script
    chrome.tabs.sendMessage(tabId, {
      message: "tabUpdated",
      url: changeInfo.url
    });
  }
  return;
});
