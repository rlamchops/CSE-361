function LinkedList(){
    this.head = null;
}

//compare before and after images
function compareImages(before, after){
    resemble(before).compareTo(after).onComplete(function(data){
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