chrome.browserAction.onClicked.addListener(function() {
  //img is the base64 encoding of the image
  chrome.tabs.captureVisibleTab(function(img) {
    //console.log(img)
    var image = document.createElement("img");
    image.onload = split;
    image.src = img;
    document.body.appendChild(image);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var parts = [];
    //the total # of pieces to split into is pieces^2
    var pieces = 4;

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
});
