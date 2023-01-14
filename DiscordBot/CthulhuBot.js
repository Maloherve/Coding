import { Client, Events, GatewayIntentBits } from 'discord.js';
import fetch from "node-fetch"
import config from './config.json' assert {type: "json"};
import database from './database.json' assert {type: "json"};


const client = new Client({intents: 3276799})

const sadWords = ["sad", "depressed", "unhappy", "angry"]
const encouragements = [
    "Cheer Up",
    "Hang in there", 
    "You are a great person / bot"
]


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


    if (sadWords.some( word => msg.content.includes(word) )){ // This goes through every item in sadWords, and applies function to it
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement)
    }
})











console.log(database.sad_words)

// client.login(config.TOKEN)