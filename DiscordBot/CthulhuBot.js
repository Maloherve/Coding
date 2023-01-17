const { Client, Collection, Events, GatewayIntentBits } = require( 'discord.js' );
const { GoogleSpreadsheet } = require('google-spreadsheet')     // access and modify google spreadsheet 

const { CronJob } = require('cron'); // Used for executing a job at a given date / time
const fs = require('node:fs');    // Used for accessing and modifying files
const path = require('node:path');    // Helps construct paths to access files and directories


const slash_symbol = "$"
const config = require( './token_bot.json' );   // Credentials for bot
const sheetCreds = require('./token_sheets.json');  // Credentials for google sheet API
const { join } = require('path');
const { cp } = require('node:fs');

const commands = {
    nextGame : "release",
    info : "info",
    accessSpreadsheet: "list",
    easterEggTut: "tut"
}



// Load Client with all authorizations
const client = new Client({intents: 3276799})


// -------------- Discord related stuff --------------

function updateActiveGuilds(){
    const Guilds_String = fs.readFileSync('DiscordBot/activeOn.json', 'utf-8')

    // Check if json file is empty
    if(Guilds_String.length !== 0){
        var Guilds_Parsed = JSON.parse(Guilds_String);
    }
    else{
        Guilds_Parsed = [];
    }

    // Create list of new Guild Objects
    var newGuilds_Parsed = [];
    let guildIds = Guilds_Parsed.map(obj => obj.id)
    client.guilds.cache.forEach(guild => {
        if (!guildIds.includes(guild.id)){
            console.log(`${guild.name} is being added to the list.`)
            newGuilds_Parsed.push({"id": guild.id, "name": guild.name})
        }
    })

    // Push new guilds to parsed collection and stringify
    newGuilds_Parsed.forEach(newGuild => Guilds_Parsed.push(newGuild) )  
    const newGuilds_String = JSON.stringify(Guilds_Parsed, null, 4);

    // // Write to JSON file
    fs.writeFileSync('DiscordBot/activeOn.json', newGuilds_String)
}



function checkCommand(command){
    command.toLowerCase()
    switch (command){
        case commands.nextGame:
            return () => checkReleases()
        case commands.accessSpreadsheet:
            return () => accessSpreadsheet()
        case commands.info:
            return () => gameInfo()
        case commands.easterEggTuts:
            return () => snoot()
    }  
}








// -------------- Access Spreadsheet --------------


async function getCommingGames(){ // Returns a list of objects
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
    const commingGames = rows.filter(row => { return row['Release Date']===printDate(nextDate) })

    return commingGames

}


async function checkReleases(){
    console.log("Checking game releases...")
    
    const commingGames = await getCommingGames()

    // Check release Date
    if (commingGames[0]['Release Date'] === printDate(new Date()) ) { 
        return 'New release Today';
    }else{
        var text = `Next game release is ${commingGames[0]['Title']} on the ${commingGames[0]['Release Date']}.`;
        if (commingGames.length > 1) {
            text += (' ( And also ' + commingGames.slice(1).map(row => {return row['Title']}).join(', ') + ' )')
        }
        return text;
    }
}

async function accessSpreadsheet(){
    return 'If you want to access game releases or contribute : https://docs.google.com/spreadsheets/d/1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M/edit#gid=0'
}

async function gameInfo(){
    const commingGames = await getCommingGames();
    console.log(commingGames)
    return `Next game is ${commingGames[0]['Title']} coming ${commingGames[0]['Release Date']} : \n${commingGames[0]['Description']}.`
}








// -------------- Working with Dates --------------

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




// -------------- Bot Events --------------

// When Bot Connects
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setUsername('JibeBot');
    updateActiveGuilds()
})



// Listen for $ commands
client.on('messageCreate', msg => {
    // Don't react to own message
    if (msg.author.bot) return

    if (msg.content === "$inspire") { msg.reply("This is not a functionality anymore.") }

    if (msg.content[0] === slash_symbol){
        var message = msg.content.slice(1)
        const functionToExecute = checkCommand(message)
        if (functionToExecute){ 
            functionToExecute() 
                .then( reply => {   if(reply){ msg.channel.send(reply) }
                                    else{ msg.channel.send('This is a valid Command, but code is not finished')} } )
        }
    }
})



// Listen for slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;  // Exit if the interaction is not a slash command
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
        console.error(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error){
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command.', ephemeral: true });
    }
})


// -------------- Easter Eggs --------------

async function snoot(){
    return 'snoot'
}






// -------------------------------------------------
// const job = new CronJob('0 * 17 * * *', () => {
// })

// job.start()



// Retrieve commands
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // Import all files

for (const file of commandFiles){
    // Require command
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    }else{
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}



client.login(config.TOKEN)