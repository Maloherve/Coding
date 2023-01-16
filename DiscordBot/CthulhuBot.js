const { Client, Events, GatewayIntentBits } = require( 'discord.js' );
const config = require( './token_bot.json' );
const database = require( './database.json' );


// Load Client with all authorizations
const client = new Client({intents: 3276799})



// When Bot Connects
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})





client.on('messageCreate', msg => {
    // Don't react to own message
    if (msg.author.bot) return


    if (msg.content === "$inspire") { msg.reply("This is not a functionality anymore.") }
})





client.login(config.TOKEN)