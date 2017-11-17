
let list = new LinkedList();

function captureImage(){
  chrome.tabs.captureVisibleTab(function(img) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      console.log(tabs[0].url);
      list.add(img, tabs[0].url);
    });
  });
}

//Using Chrome Alarm API capture an image periodically
chrome.alarms.create("captureImage", {
  delayInMinutes: 0,
  periodInMinutes: 5
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "captureImage") {
      captureImage();
  }
});

chrome.tabs.onActivated.addListener(function() {
  captureImage();
});
