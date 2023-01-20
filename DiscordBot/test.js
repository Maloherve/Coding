const { getTitleOptions } = require("./tools.js")





// const argList = [1,2,3,4,5,6,8]
// test(1,2,3,4)

const fct = async (tut) => {
    const list = await getTitleOptions()
    test(...list)
}

function test(a, b, c, d){
    for (let i=0; i<arguments.length; i++){
        console.log(arguments[i])
    }
}


fct()



// let Dates = [ '20.03.2023', '24.10.2023', '27.01.2024', '29.02.2023', '21.09.2023', '24.02.2023', '24.02.2023', '03.05.2023', '17.04.2023', '22.03.2023' ]


// function convertDDMMYYYToDate(DDMMYYYY){
//     const split_date = DDMMYYYY.split('.');
//     const MMDDYYYY = [split_date[1],split_date[0],split_date[2]].join('.')
//     return new Date(MMDDYYYY); 
// }


// const dateList = Dates.map(date => new Date(convertDDMMYYYToDate(date)) );
// dateList.sort((a,b) => {return a-b})
// console.log(dateList)

































// const { GoogleSpreadsheet } = require('google-spreadsheet');
// const { creds } = require('./token_sheets.json');
// const { CronJob } = require('cron')

// // spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M'); // Game Releases



// // ------ Console Logging -----

// function printGame(gameRow){
//   console.log(`Title : ${gameRow['Title']}`)
//   console.log(`Release Date : ${gameRow['Release Date']}`)
//   console.log(`Console : ${gameRow['Console']}`)
//   console.log(`Description : ${gameRow['Description']}`)
//   console.log(`----------------------`)
// }


// function printSheetInfo(sheet){
//   console.log(`~~~~~~~~~~~~~~~~~~~~~~`)
//   console.log(`Sheet Title : ${sheet.title}`)
//   console.log(`Rows : ${sheet.rowCount}, Columns : ${sheet.columnCount}`)
//   console.log(`~~~~~~~~~~~~~~~~~~~~~~`)
// }

// // ------------------------------------------------




// // Loading Spreadsheet
// async function accessSpreadsheet() {

//   // Authentificate using API key
//   await doc.useServiceAccountAuth({
//     client_email: creds.client_email,
//     private_key: creds.private_key,
//   });

//   // Load document properties and worksheets
//   await doc.loadInfo(); 
//   const sheet = doc.sheetsByIndex[0];

//   printSheetInfo(sheet)
  
//   const rows = await sheet.getRows({
//     offset: 0,
//     limit: 10,
//     orderby: 'Release Date'
//   })

//   rows.forEach(row => printGame(row))
// }







// accessSpreadsheet()






















// // ----- Modifying a JSON Dictionary Using ES6 -----

// const fs = require('fs')
// let data = fs.readFileSync('DiscordBot/activeOn.json')
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

