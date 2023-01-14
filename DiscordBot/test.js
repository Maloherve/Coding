import fs from 'fs'
// import data from './database.json' assert {type: "json"};


let data = fs.readFileSync('DiscordBot/database.json')
var myObject = JSON.parse(data)[0]

// let newData = {
//     HappyWords: ["TUT", "SNOOT", "BLOOP"] 
// }

// myObject.push(newData)

// var newObject = JSON.stringify(myObject)
// console.log(newObject)

// fs.writeFile('DiscordBot/database.json', newObject, err => {
//     if (err) {throw err}
//     console.log("New Data added") 
// });


function modifyDatabaseEntry(key, type, value){
    let file = fs.readFileSync('DiscordBot/database.json');
    var myObject = JSON.parse(file);

    let modify;
    switch (type) {
        case 'add':
            modify = (obj) => obj[0][key] = obj[0][key].concat(value);
            break;
        case 'modify':
            modify = (obj) => obj[0][key] = value;
            break;
        default:
            console.log('Invalid modify type. Please use "add" or "modify".')
    }

    modify(myObject) 

    let newObject = JSON.stringify(myObject, null, 3);

    console.log(newObject)


    fs.writeFile('DiscordBot/database.json', newObject, err => { 
        if (err) {throw err;}
        console.log("Modifications were made.")
    })
}




modifyDatabaseEntry("SadWords", "add", "woop")

