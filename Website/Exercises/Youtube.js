const assetsFolder = "assets/"
const channelIconFolder = assetsFolder+"icons/"
const thumbnailFolder = assetsFolder+"thumbnail/"


class Video{
    constructor(thumbnailURL, iconURL, title, channel, views, daysAgo){
        this._thumbnailURL = thumbnailURL;
        this._iconURL = iconURL;
        this._title = title;
        this._channel = channel;
        this._views = views;
        this._daysAgo = daysAgo;
    }

    get thumbnailURL(){return this._thumbnailURL;}
    get iconURL(){return this._iconURL;}
    get title(){return this._title;}
    get channel(){return this._channel;}
    get views(){return this._views;}
    get daysAgo(){return this._daysAgo;}

    createHTMLCode() {
        const mainDiv = createElementWithClass("div", "video_container")

        const thumbnailDiv = createElementWithClass("div", "thumbnail")
        thumbnailDiv.setAttribute("style", `--thumbnail-picture: url(${this._thumbnailURL});`)

        const bottomDiv = createElementWithClass("div", "bottom_container")
        
        const channelDiv = createElementWithClass("div", "channel_picture")
        channelDiv.setAttribute("style", `--profile-pic: url(${this._iconURL});`)
        
        const titleDiv = createElementWithClass("div", "title_container")
        const videoMetadata =  createElementWithClass("p", "video_metadata");
        videoMetadata.appendChild( createElementWithClass("span", "views", this._views+" vues") );
        videoMetadata.appendChild( createElementWithClass("span", "dot") );
        videoMetadata.appendChild( createElementWithClass("span", "date", "il y a "+this._daysAgo+" jours") );
        
        titleDiv.appendChild( createElementWithClass("p", "title", this._title) );
        titleDiv.appendChild( createElementWithClass("p", "channel_title", this._channel) );
        titleDiv.appendChild( videoMetadata )


        bottomDiv.appendChild(channelDiv)
        bottomDiv.appendChild(titleDiv)

        mainDiv.appendChild(thumbnailDiv)
        mainDiv.appendChild(bottomDiv)

        return mainDiv
    }



    publishVideo(){
        const videoContainer = document.getElementsByClassName("videos")[0]
        videoContainer.append(this.createHTMLCode())
    }




}


function createElementWithClass (type, class_name, content = "") {
    const myElement = document.createElement(type);
    myElement.classList.add(class_name);
    if (content){ myElement.textContent = content; }
    return myElement;
}


const video1 = new Video(thumbnailFolder+"thumbnail1.png", channelIconFolder+"icon2.png", "This is a title of a very interesting video that will go on youtube but it is too long", "Channel", "86k", "8")
video1.publishVideo()

const video2 = new Video(thumbnailFolder+"thumbnail2.jpg", channelIconFolder+"icon1.png", "This is a title of a very interesting video that will go on youtube but it is too long", "Channel", "86k", "8")
video2.publishVideo()




