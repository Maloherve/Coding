const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName('tut')
            .setDescription('Snoot.'),
    async execute(interaction){
        await interaction.reply('Snoot.')
    }
}