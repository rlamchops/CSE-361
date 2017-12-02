function LinkedList(){
    this.head = null;
}

//compare before and after images
function compareImages(before, after){
    resemble(before).compareTo(after).onComplete(function(data){
        console.log("hi");
        var comparison = data.getImageDataUrl();

        var a = document.createElement("img");
        a.src = comparison;
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        context = canvas.getContext('2d');
        a.onload = function(){
            context.drawImage(a, 0, 0);
        }

        chrome.tabs.executeScript(null,
        {
            code: "alert(\"poop\");"
        })
        
        chrome.tabs.executeScript(null, {
            code: "var iframe = document.createElement(\"iframe\"); iframe.src = \"" + comparison + "\"; iframe.allowtransparency = true; iframe.frameborder = \"0\"; iframe.scrolling=\"no\"; "
            + "iframe.position = \"absolute\"; iframe.width = \"100%\";  iframe.height = \"100%\"; iframe.zIndex = \"9000\"; document.body.appendChild(iframe);"
        })

        return data;
        /*
        {
          misMatchPercentage : 100, // %
          isSameDimensions: true, // or false
          getImageDataUrl: function(){}
        }
        */
    });
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    var parts = [];
    var parts2 = [];
    //the total # of pieces to split into is pieces^2
    var pieces = 2;

    var image = document.createElement("img");
    image.onload = function() {
      var w = image.width / pieces;
      var h = image.height / pieces;
      canvas.width = w;
      canvas.height = h;
      for (var i = 0; i < pieces * pieces; i++) {
        var x = (-w * i) % (w * pieces);
        var y = (h * i ) <= h ? 0 : -h;
        ctx.drawImage(this, x, y, w * pieces, h * pieces);
        parts.push(canvas.toDataURL());
      }
      //console.log(parts);
      //console.log("hi1");
    };
    // image.onload = split(2, parts);
    image.src = before;

    var image2 = document.createElement("img");
    image2.onload = function() {
      var w = image2.width / pieces;
      var h = image2.height / pieces;
      canvas.width = w;
      canvas.height = h;
      for (var i = 0; i < pieces * pieces; i++) {
        var x = (-w * i) % (w * pieces);
        var y = (h * i ) <= h ? 0 : -h;
        ctx.drawImage(this, x, y, w * pieces, h * pieces);
        parts2.push(canvas.toDataURL());
      }
      //console.log(parts2);
      //console.log("hi2");
    };
    image2.src = after;
}

LinkedList.prototype.add = function(img, url){
    var node = {
        image: img,
        url: url,
        next: null
    }

    //if empty list set head = to this
    if(!this.head){
        this.head = node;
    } else{
        current = this.head;
        while(current.next){
            //If matching url then compare before and after images
            if(current.url == url){
                compareImages(current.image, img);
                break;
            }
            current = current.next;
        }
        current.next = node;
    }
}
