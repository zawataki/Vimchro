chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.cmd == "removeTab") {
      chrome.tabs.query(
        { currentWindow: true, active: true }, 
        function (tabs) {
          chrome.tabs.remove(tabs[0].id);
        }
      );
    }
  }
);
