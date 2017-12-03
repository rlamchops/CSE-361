
let list = new LinkedList();
var lastTab = {
  tabID: -1
}

function captureImage(){
  chrome.tabs.captureVisibleTab(function(img) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      captureImageCallback(tabs, img);
    });
  });
}

function captureImageCallback(tabs, img){
  console.log(tabs[0].url);
  list.add(img, tabs[0].url);
}

function captureImageWithoutCheck(){
  chrome.tabs.captureVisibleTab(function(img) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      captureImageCallbackWithoutCheck(tabs, img);
    });
  });
}

function captureImageCallbackWithoutCheck(tabs, img){
  console.log(tabs[0].url);
  list.addWithoutCheck(img, tabs[0].url);
}

//Using Chrome Alarm API capture an image periodically
chrome.alarms.create("captureImageWithoutCheck", {
  delayInMinutes: 0,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "captureImageWithoutCheck") {
      captureImageWithoutCheck();
  }
});

chrome.tabs.onActivated.addListener(function(tabInfo) {
  chrome.tabs.executeScript(null, {
      code: "var i = document.getElementById(\"iframe\"); if(i != null){i.parentNode.removeChild(i);} "
  })

  captureImage();
});

//When the icon is clicked
chrome.browserAction.onClicked.addListener((tab) => {
});
