const { GoogleSpreadsheet } = require('google-spreadsheet')     // access and modify google spreadsheet 

const wait = require('node:timers/promises').setTimeout;
const sheetCreds = require('./token_sheets.json');  // Credentials for google sheet API
const fs = require('node:fs');    // Used for accessing and modifying files


module.exports = {
    getComingGames: () => getComingGames(),
    printDate: (date) => printDate(date),
    getTitleOptions: () => getTitleOptions(),
    getGameProperty: (idProperty, desiredProperty) => getGameProperty(idProperty, desiredProperty),
    updateSpreadsheetJson: () => updateSpreadsheetJson(),
}




// Spreadsheet Tools

async function getComingGames(){ // Returns a list of objects
    const gameList = getGames_JSON()
    
    // Extract Dates and format them in new array and sort
    const dateList = gameList.map(row => new Date(convertDDMMYYYToDate(row['Release Date'])) );
    dateList.sort((a,b) => {return a-b; } )
    var today = new Date();

    // Next Date and corresponding Game
    const nextDate = dateList.find(date => { return isFuture(today, date); })
    const comingGames = gameList.filter(row => { return row['Release Date']===printDate(nextDate) })

    return comingGames
}






async function getGameProperty(idProperty, desiredProperty = 'Description'){
    const gameList = getGames_JSON()
    
    let game;
    for (key in idProperty){   // Get the key name as prop
        game = gameList.filter(game => game[key] === idProperty[key])[0]
    }

    return game[desiredProperty]
}


async function getGameTitleList(){
    const gameList = getGames_JSON()
    
    const titleList = gameList.map(row => row['Title'] );
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



// Function to load game rows from the Google Sheets Spreadsheets

async function getGames_Spreadsheet(){
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
    const rows = await sheet.getRows();
    return rows
}



function getGames_JSON(){
    // Load existing JSON and parse into array of objects
    let Games_String = fs.readFileSync('DiscordBot/game_releases.json', 'utf-8')
    if(Games_String.length !== 0)   {  var Games_Parsed = JSON.parse(Games_String); }
                            else    { Games_Parsed = []; }
    return Games_Parsed
}



async function updateSpreadsheetJson(){
    // Get rows from sheets
    const rows = await getGames_Spreadsheet()

    
    // Get array of game objects
    let Games_Parsed = getGames_JSON()
    const existingTitles = Games_Parsed.map(game => game['Title'])

    // Go through the rows and add the new ones to the JSON.
    rows.forEach(gameRow => {
        if ( !existingTitles.includes(gameRow['Title']) ){
            Games_Parsed.push({
                'Title': gameRow['Title'],
                'Release Date': gameRow['Release Date'],
                'Description': gameRow['Description'],
                'Console': gameRow['Console'],
                'Links': gameRow['Links'],
            })
        }
    })

    // Convert to String and push to Json
    Games_String = JSON.stringify(Games_Parsed, null, 4);
    fs.writeFileSync('DiscordBot/game_releases.json', Games_String)
}



updateSpreadsheetJson()



