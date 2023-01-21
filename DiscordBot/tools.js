const { GoogleSpreadsheet } = require('google-spreadsheet')     // access and modify google spreadsheet 

const wait = require('node:timers/promises').setTimeout;
const sheetCreds = require('./token_sheets.json');  // Credentials for google sheet API


module.exports = {
    getComingGames: () => getComingGames(),
    printDate: (date) => printDate(date),
    getTitleOptions: () => getTitleOptions(),
    getGameProperty: (idProperty, desiredProperty) => getGameProperty(idProperty, desiredProperty)
}




// Spreadsheet Tools

async function getComingGames(){ // Returns a list of objects
    // Spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M'); // Game Releases

    // Authentificate using API key
    await doc.useServiceAccountAuth({
        client_email: sheetCreds.client_email,
        private_key: sheetCreds.private_key,
    });

    // Load document properties and worksheets
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; // First spreadsheet

    // Extract Rows
    const rows = await sheet.getRows({
        offset: 0,
        limit: 10000    
    });
    
    // Extract Dates and format them in new array and sort
    const dateList = rows.map(row => new Date(convertDDMMYYYToDate(row['Release Date'])) );
    dateList.sort((a,b) => {return a-b; } )
    var today = new Date();

    // Next Date and corresponding Game
    const nextDate = dateList.find(date => { return isFuture(today, date); })
    const comingGames = rows.filter(row => { return row['Release Date']===printDate(nextDate) })

    return comingGames
}








async function getGameProperty(idProperty, desiredProperty = 'Description'){
    // Spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M'); // Game Releases

    // Authentificate using API key
    await doc.useServiceAccountAuth({
        client_email: sheetCreds.client_email,
        private_key: sheetCreds.private_key,
    });

    // Load document properties and worksheets
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; // First spreadsheet

    // Extract Rows
    const rows = await sheet.getRows({
        offset: 0,
        limit: 10000    
    })
    
    let game;
    for (prop in idProperty){ 
        game = rows.filter(row => row[prop] === idProperty[prop])[0]
    }

    return game[desiredProperty]
}















async function getGameTitleList(){
    // Spreadsheet key is the long id in the sheets URL
    const doc = await new GoogleSpreadsheet('1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M'); // Game Releases
    // Authentificate using API key
    await doc.useServiceAccountAuth({
        client_email: sheetCreds.client_email,
        private_key: sheetCreds.private_key,
    });
    
    // Load document properties and worksheets
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; // First spreadsheet
    
    // Extract Rows
    const rows = await sheet.getRows({
        offset: 0,
        limit: 10000    
    });
    
    const titleList = await rows.map(row => row['Title'] );
    return titleList
}

function listToOptions(list){
    const object = list.map(item => {return {name: item, value: item} })
    return object
}


async function getTitleOptions(){
    const titleOptions =  await getGameTitleList()
                                .then( titleList => listToOptions(titleList) )
    return titleOptions
}









// Date tools : 

function isFuture(today, date){ return date >= today; }

function convertDDMMYYYToDate(DDMMYYYY){
    const split_date = DDMMYYYY.split('.');
    const MMDDYYYY = [split_date[1],split_date[0],split_date[2]].join('.')
    return new Date(MMDDYYYY); 
}

function printDate(date){
    if (date.getMonth()+1 < 10) {return (date.getDate() + '.0' + (date.getMonth()+1) + '.' + date.getFullYear())}
    else{return (date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear())}
} 





// async function get




// async function updateSpreadsheetJson(){
//     const rows = getGameRows()

// }