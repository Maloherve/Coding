const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('liste')
            .setDescription('Liens vers le Google Sheet.'),
    async execute(interaction){
        await interaction.reply('Si vous voulez contribuer : https://docs.google.com/spreadsheets/d/1J2m9s9cmBZxjGdFS4jUvWqTPP_za-K7jVd1J1ReWH6M/edit#gid=0')
    }
}