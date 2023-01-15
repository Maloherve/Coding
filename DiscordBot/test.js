







// function loadData() {
//     var url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSjDw8QGEmSZUkWI64-DXGHFnPw0DqihZMWYUnbu4i9bjGTpImECSbVaIJddEU1GpFIkgANbcIHgrso/pubhtml?gid=0&single=true";
//     let xmlhttp=new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function() {
//       if(xmlhttp.readyState == 4 && xmlhttp.status==200){
//         document.getElementById("display").innerHTML = xmlhttp.responseText;
//       }
//     };
//     xmlhttp.open("GET",url,true);
//     xmlhttp.send(null);
//   }
// loadData()









































// ----- Modifying a JSON Dictionary Using ES6 -----
// import fs from 'fs'
// let data = fs.readFileSync('DiscordBot/database.json')
// var myObject = JSON.parse(data)[0]
// function modifyDatabaseEntry(key, type, value){
//     let file = fs.readFileSync('DiscordBot/database.json');
//     var myObject = JSON.parse(file);

//     let modify;
//     switch (type) {
//         case 'add':
//             modify = (obj) => obj[0][key] = obj[0][key].concat(value);
//             break;
//         case 'modify':
//             modify = (obj) => obj[0][key] = value;
//             break;
//         default:
//             console.log('Invalid modify type. Please use "add" or "modify".')
//     }

//     modify(myObject) 

//     let newObject = JSON.stringify(myObject, null, 3);

//     fs.writeFile('DiscordBot/database.json', newObject, err => { 
//         if (err) {throw err;}
//         console.log("Modifications were made.")
//     })
// }

// modifyDatabaseEntry("SadWords", "add", "woop")

