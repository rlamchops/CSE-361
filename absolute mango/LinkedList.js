function LinkedList(){
    this.head = null;
}

//compare before and after images
function compareImages(before, after, beforeIcon, afterIcon){
    resemble(before).compareTo(after).onComplete(function(data){
        console.log("Callback of resemble's compareTo");
        var comparison = data.getImageDataUrl();

        if(data.misMatchPercentage <= 20){
            console.log("Mismatch percentage was less than 20%, value = " + data.misMatchPercentage + "%");
            return;
        }

        else {
          chrome.tabs.executeScript(null, {
              code: "alert(" + data.misMatchPercentage + " + \"% of the page was mismatched/different.\"); "
          })
          if (beforeIcon != afterIcon) {
            chrome.tabs.executeScript(null, {
              code: "alert(\"The page's favicon has changed\")"
            })
          }
        }

        chrome.tabs.executeScript(null, {
            code: "var iframe = document.createElement(\"iframe\"); iframe.src = \"" + comparison + "\"; iframe.allowtransparency = true; iframe.frameborder = \"0\"; " +
            " iframe.scrolling=\"no\"; iframe.style.position = \"absolute\"; iframe.style.opacity = \"0.5\"; iframe.style.margin = \"0 auto\"; "
            + " iframe.style.pointerEvents = \"none\"; iframe.setAttribute(\"id\", \"iframe\"); "
            + "var topOffset = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);"
            + "console.log(topOffset);"
            + "iframe.style.left = \"0px\"; iframe.style.top = topOffset.toString() + \"px\";"
            + "iframe.position = \"absolute\"; iframe.width = \"100%\";  iframe.height = \"100%\"; iframe.style.zIndex = \"9000\"; document.body.appendChild(iframe);"
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

LinkedList.prototype.addWithoutCheck = function(img, url, icon){
    if(typeof img == "undefined"){
        return;
    }
    var node = {
        image: img,
        url: url,
        icon: icon,
        next: null
    }

    if(!this.head){
        this.head = node;
    } else{
        var current = this.head;
        while(current.next){
            //If matching url then compare before and after images
            if(current.url == url){
                // compareImages(current.image, img);
                current.image = img;
                current.icon = icon;
                return;
            }
            current = current.next;
        }

        if(current.url == url){
            // compareImages(current.image, img);
            current.image = img;
            current.icon = icon;
            return;
        }
        current.next = node;
    }
}

LinkedList.prototype.add = function(img, url, icon){
    if(typeof img == "undefined"){
        console.log(url + " chrome API failed to catch an image.")
        return;
    }
    var node = {
        image: img,
        url: url,
        icon: icon,
        next: null
    }

    //if empty list set head = to this
    if(!this.head){
        this.head = node;
    } else{
        var current = this.head;
        while(current.next){
            //If matching url then compare before and after images
            if(current.url == url){
                compareImages(current.image, img, current.icon, icon);
                current.image = img;
                current.icon = icon;
                return;
            }
            current = current.next;
        }

        if(current.url == url){
            compareImages(current.image, img, current.icon, icon);
            current.image = img;
            current.icon = icon;
            return;
        }
        current.next = node;
    }
}
