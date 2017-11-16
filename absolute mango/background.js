
let list = new LinkedList();

function captureImage(){
  chrome.tabs.captureVisibleTab(function(img) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      console.log(tabs[0].url);
      list.add(img, tabs[0].url);
    });
    var image = document.createElement("img");
    image.onload = split;
    image.src = img;
    document.body.appendChild(image);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var parts = [];
    //the total # of pieces to split into is pieces^2
    var pieces = 2;

    function split() {
      var w10 = image.width / pieces;
      var h10 = image.height / pieces;
      canvas.width = w10;
      canvas.height = h10;
      for (var i = 0; i < pieces * pieces; i++) {
        var x = (-w10 * i) % (w10 * pieces);
        var y = (h10 * i) <= h10 ? 0 : -h10;
        ctx.drawImage(this, x, y, w10 * pieces, h10 * pieces);
        parts.push(canvas.toDataURL());
        //test
        var slice = document.createElement("img");
        slice.src = parts[i];
        document.body.appendChild(slice);
      }
      console.log(parts);
    };
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
