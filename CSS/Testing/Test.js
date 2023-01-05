
const myImage = document.querySelector("img");
myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src")

    if (mySrc==="assets/firefox-icon.png"){
        myImage.setAttribute("src", "assets/firefox-icon2.png")
    } else {
        myImage.setAttribute("src", "assets/firefox-icon.png")
    }
}


let myButton = document.querySelector("button")
let myHeading = document.querySelector("h1")

function setUserName() {
    const myName = prompt("Please Enter Your Name.");
    if (!myName){ setUserName() 
    }else{
        localStorage.setItem("name", myName);
        myHeading.textContent = 'Mozilla is cool, '+myName;
    }
}


if (!localStorage.getItem("name")){ 
    setUserName(); 
}else{
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Mozilla is cool, ${storedName}`;
} 

myButton.onclick = () => {
    setUserName()
}