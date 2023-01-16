const { Client, Events, GatewayIntentBits, Guild } = require( 'discord.js' );
const { CronJob } = require('cron'); // Used for executing a job at a given date / time
const fs = require('fs');    // Used for accessing and modifying files

const slash_symbol = "$"
const config = require( './token_bot.json' );   // token for modifying bot


// Load Client with all authorizations
const client = new Client({intents: 3276799})


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
        case 'release':
            return () => checkReleases()
    }

}






function checkReleases(channel){
    console.log("Checking game releases")
}




// -------------- Bot Events --------------

// When Bot Connects
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    // client.channels.cache.get('1063580431146045570').send('I have come online, tremble.')
    // const guildList = client.guilds.cache.map(g => g.name)
    // console.log(guildList)
    updateActiveGuilds()
})




client.on('messageCreate', msg => {
    // Don't react to own message
    if (msg.author.bot) return

    if (msg.content === "$inspire") { msg.reply("This is not a functionality anymore.") }

    if (msg.content[0] === slash_symbol){
        var message = msg.content.slice(1)
        const functionToExecute = checkCommand(message)
        if (functionToExecute){ functionToExecute(msg.channel) }
    }
})


// -------------------------------------------------




// const job = new CronJob('0 * 17 * * *', () => {
//     sendMessage()
// })

// job.start()


client.login(config.TOKEN)