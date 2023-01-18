const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    data: new SlashCommandBuilder()
            .setName('test2')
            .setDescription('Test command for commands with options.'),
    async execute(interaction){ 
        
        
        
        
        
        
        
        console.log('Test 2 Done')
    }
}