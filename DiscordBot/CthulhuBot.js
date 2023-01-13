import { Client, Events, GatewayIntentBits } from 'discord.js';
import fetch from "node-fetch"
import config from './config.json' assert {type: "json"};

const client = new Client({intents: 3276799})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})




function getQuote() {
    return fetch("https://zenquotes.io/api/random")
    .then(res => {    // Convert to json
        return res.json();
    })
    .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]  // Format in appropriate way
    })
}



client.on('messageCreate', msg => {
    if (msg.author.bot) return

    if (msg.content === "$inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }
})







client.login(config.TOKEN)



// const channel = client.channels.cache.get()
// channel.send('content');



