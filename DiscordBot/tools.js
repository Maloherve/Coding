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
    getGamesInMonth: (month) => getGamesInMonth(month),
}




// ------------ Manage Loading ------------



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



// Function to load games from the JSON locally stored
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







// Returns a list games that are comming next
async function getComingGames(){ 
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


function getGamesInMonth(month){

    const gameList = getGames_JSON().filter( game => {
        const gameMonth = new Date(convertDDMMYYYToDate(game['Release Date'])).getMonth() + 1 
        return gameMonth === month
    });

    // console.log(gameList)
    return gameList


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



const test = [
    {name: "Janvier", value: 1},
    {name: "Février", value: 2},
    {name: "Mars", value: 3},
    {name: "Avril", value: 4},
    {name: "Mai", value: 5},
    {name: "Juin", value: 6},
    {name: "Juillet", value: 7},
    {name: "Aout", value: 8},
    {name: "Septembre", value: 9},
    {name: "Octobre", value: 10},
    {name: "Novembre", value: 11},
    {name: "Décembre", value: 12}
]



