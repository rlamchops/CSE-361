chrome.browserAction.onClicked.addListener(function() {
  //img is the base64 encoding of the image
  chrome.tabs.captureVisibleTab(function(img) {
    //console.log(img)
    var image = document.createElement("img");
    image.src = img;
    document.body.appendChild(image);
  });
});
