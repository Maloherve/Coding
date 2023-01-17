const { SlashCommandBuilder } = require("discord.js");
const { getComingGames, printDate } = require("../tools.js")


module.exports = {
    data: new SlashCommandBuilder()
            .setName('release')
            .setDescription('Finds the next games releasing.'),
    async execute(interaction){
        console.log("Checking game releases...")
    
        const comingGames = await getComingGames()
    
        // Check release Date
        if (comingGames[0]['Release Date'] === printDate(new Date()) ) { 
            return 'New release Today';
        }else{
            var text = `Next game release is ${comingGames[0]['Title']} on the ${comingGames[0]['Release Date']}.`;
            if (comingGames.length > 1) {
                text += (' ( And also ' + comingGames.slice(1).map(row => {return row['Title']}).join(', ') + ' )')
            }
            return text;
        }
    },
}