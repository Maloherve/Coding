const { Client, Collection, Events, GatewayIntentBits } = require( 'discord.js' );

const { CronJob } = require('cron'); // Used for executing a job at a given date / time
const fs = require('node:fs');    // Used for accessing and modifying files
const path = require('node:path');    // Helps construct paths to access files and directories

const config = require( './token_bot.json' );   // Credentials for bot
const { updateSpreadsheetJson } = require('./tools.js')





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



async function loadCommands(){
    // Retrieve commands by adding them to client.commands
    client.commands = new Collection()

    const commandsPath = path.join(__dirname, 'commands')
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // Import all files

    for (const file of commandFiles){
        // Require command
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {            
            if (typeof command.data == 'object') {
                await client.commands.set(command.data.name, command)
            }else if (typeof command.data == 'function'){
                const data = await command.data()
                client.commands.set(data.name, command) // The await is not very usefull here, but indicates that this is async 
            }
        }else{
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}






// -------------- Client Events --------------

// ---- When Bot Connects
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setUsername('JibeBot');
    updateActiveGuilds()
})


// ---- Listen for messages
client.on('messageCreate', msg => {
    // Don't react to own message
    if (msg.author.bot) return
})


// --- Listen for slash commands
client.on('interactionCreate', async interaction => {   // Will not be called if interaction is not deployed 
    // if (!interaction.isChatInputCommand()) return;  // Exit if the interaction is not a deployed command
    
    const command = interaction.client.commands.get(interaction.commandName);   // Get the name of the command in the list of client commands

    if (!command){  // This can happen if the command has been deployed, but not loaded via loadCommands()
        console.error(`No command matching ${interaction.commandName} was found.`)
        return;
    }


    // If didn't return before, then there is a corresponding command
    try {
        await command.execute(interaction);
    } catch(error){
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command.', ephemeral: true });
    }
})




async function __main__(){
    await loadCommands()
    console.log('Commands Loaded')
    await updateSpreadsheetJson()
    console.log('JSON list of games updated.')


    
    client.login(config.TOKEN)
}


__main__()