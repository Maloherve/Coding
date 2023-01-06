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
            
            const titleText = createElementWithClass("p", "title");
            titleText.appendChild( createElementWithClass("strong", "", this._title) )
            titleDiv.appendChild(titleText);

            titleDiv.appendChild( createElementWithClass("p", "channel_title", this._channel) );

            const videoMetadata =  createElementWithClass("p", "video_metadata");
                videoMetadata.appendChild( createElementWithClass("span", "views", this._views+" vues") );
                videoMetadata.appendChild( createElementWithClass("span", "dot") );
                videoMetadata.appendChild( createElementWithClass("span", "date", "il y a "+this._daysAgo+" jours") );

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
    if (class_name){ myElement.classList.add(class_name) };
    if (content){ myElement.textContent = content };
    return myElement;
}









const video1 = new Video(thumbnailFolder+"thumbnail1.png", channelIconFolder+"icon2.png", "Des gens se mettent ensemble et ca fait des trucs cool (je te jure)", "Channel", "86k", "8")
video1.publishVideo()

const video2 = new Video(thumbnailFolder+"thumbnail2.jpg", channelIconFolder+"icon1.png", "La science c'est bien on peut voir des petit trucs avec des grosses machines", "Channel", "86k", "8")
video2.publishVideo()

const video3 = new Video(thumbnailFolder+"thumbnail3.jpg", channelIconFolder+"icon1.png", "Il était une fois, l'arbre (il est super branché)", "Channel", "86k", "8")
video3.publishVideo()

const video4 = new Video(thumbnailFolder+"thumbnail4.jpg", channelIconFolder+"icon1.png", "How to be okay with life", "Channel", "86k", "8")
video4.publishVideo()

const video5 = new Video(thumbnailFolder+"thumbnail5.jpg", channelIconFolder+"icon1.png", "Poor people suck at football, here is 13 reasons why", "Channel", "86k", "8")
video5.publishVideo()

const video6 = new Video(thumbnailFolder+"thumbnail6.jpg", channelIconFolder+"icon1.png", "The history of that time when I almost mistook an object for another", "Channel", "86k", "8")
video6.publishVideo()





