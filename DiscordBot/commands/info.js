const { SlashCommandBuilder } = require("discord.js");
const { getComingGames } = require("../tools");


module.exports = {
    data: new SlashCommandBuilder()
            .setName('info')
            .setDescription('Get the description of the next game releasing.'),
    async execute(interaction){
        const comingGames = await getComingGames();
        await interaction.reply(`Next game is ${comingGames[0]['Title']} coming ${comingGames[0]['Release Date']} : \n${comingGames[0]['Description']}.`)
    }
}