function LinkedList(){
    this.head = null;
}

//compare before and after images
function compareImages(before, after){
    chrome.tabs.executeScript(null,
        {
            code: "alert(\"poop\");"
        })
    if (typeof before == "undefined" || typeof after == "undefined"){
        return;
    }
    resemble(before).compareTo(after).onComplete(function(data){
        console.log("hi");
        var comparison = data.getImageDataUrl();
        
        chrome.tabs.executeScript(null, {
            code: "var iframe = document.createElement(\"iframe\"); iframe.src = \"" + comparison + "\"; iframe.allowtransparency = true; iframe.frameborder = \"0\"; " + 
            " iframe.scrolling=\"no\"; iframe.style.position = \"fixed\"; iframe.style.opacity = \"0.5\"; iframe.style.margin = \"0 auto\"; "
            + "iframe.position = \"absolute\"; iframe.width = \"100%\";  iframe.height = \"100%\"; iframe.style.zIndex = \"1\"; document.body.appendChild(iframe);"
            // code: "var i = document.createElement(\"img\"); i.src = \"" + comparison + "\"; i.zIndex = \"9000\"; document.body.appendChild(i);"
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
}

LinkedList.prototype.add = function(img, url){
    if(typeof img == "undefined"){
        return;
    }
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
            if(current.url == url && typeof current.img != "undefined"){
                compareImages(current.image, img);
                break;
            } else if (current.url == url && typeof current.img == "undefined"){
                current.img = img;
                break;
            }
            current = current.next;
        }
        current.next = node;
    }
}









// var a = document.createElement("img");
// a.src = comparison;
// var canvas = document.createElement("canvas");
// canvas.setAttribute("id", "canvas");
// context = canvas.getContext('2d');
// a.onload = function(){
//     context.drawImage(a, 0, 0);
// }
// var canvas = document.createElement('canvas');
// var ctx = canvas.getContext("2d");
// var parts = [];
// var parts2 = [];
// //the total # of pieces to split into is pieces^2
// var pieces = 2;

// var image = document.createElement("img");
// image.onload = function() {
//   var w = image.width / pieces;
//   var h = image.height / pieces;
//   canvas.width = w;
//   canvas.height = h;
//   for (var i = 0; i < pieces * pieces; i++) {
//     var x = (-w * i) % (w * pieces);
//     var y = (h * i ) <= h ? 0 : -h;
//     ctx.drawImage(this, x, y, w * pieces, h * pieces);
//     parts.push(canvas.toDataURL());
//   }
//   //console.log(parts);
//   //console.log("hi1");
// };
// // image.onload = split(2, parts);
// image.src = before;

// var image2 = document.createElement("img");
// image2.onload = function() {
//   var w = image2.width / pieces;
//   var h = image2.height / pieces;
//   canvas.width = w;
//   canvas.height = h;
//   for (var i = 0; i < pieces * pieces; i++) {
//     var x = (-w * i) % (w * pieces);
//     var y = (h * i ) <= h ? 0 : -h;
//     ctx.drawImage(this, x, y, w * pieces, h * pieces);
//     parts2.push(canvas.toDataURL());
//   }
//   //console.log(parts2);
//   //console.log("hi2");
// };
// image2.src = after;
