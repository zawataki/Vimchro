var tabNum;

function MoveTab(idx) {
  chrome.tabs.query(
    { currentWindow: true, index: idx },
    function (t) {
      chrome.tabs.update(t[0].id, {selected: true});
    }
  );
}

chrome.storage.local.get({"isIgnoreMode": false}, function(item) {
  chrome.storage.local.set(item);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var activeTab = sender.tab;
    var tabIndex = activeTab.index;
    chrome.tabs.query( { currentWindow: true }, function (tabs) {
      tabNum = tabs.length;
    });

    switch ( request.cmd )
    {
      case "removeTab":
        chrome.tabs.remove(activeTab.id);
        break;

      case "movePrevTab":
        var i = tabIndex - 1;
        if ( i < 0 ) {
          i = tabNum + i;
        }
        MoveTab(i);
        break;

      default:
        break;
    }
  }
);

chrome.commands.onCommand.addListener(function(command) {
  if ( command == "MoveNextTab" )
  {
    chrome.storage.local.get("isIgnoreMode", function(items) {
      if ( items.isIgnoreMode )
      {
        chrome.windows.create({ state: 'maximized' }, function(){});
      }
      else
      {
        chrome.tabs.query( { currentWindow: true }, function (tabs) {
          tabNum = tabs.length;
        });
        chrome.tabs.query( { currentWindow: true, active: true }, function (tabs) {
          var i = (tabs[0].index + 1) % tabNum;
          MoveTab(i);
        });
      }
    });
  }
});

