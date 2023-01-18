const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('list')
            .setDescription('Gives the link to the game release spreadsheet.'),
    async execute(interaction){
        await interaction.reply('If you want to access game releases or contribute : https://docs.google.com/spreadsheets/d/1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M/edit#gid=0')
    }
}