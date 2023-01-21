const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    data: new SlashCommandBuilder()
            .setName('test1')   // Same name as the file
            .setDescription('Test command for different types of response.'),
    async execute(interaction){ // You have 3 seconds to reply, except if you use interaction.deferReply(), in which case you have 15 minutes
        await interaction.deferReply({ephemeral: true})
        await wait(5000)
        await interaction.editReply({content: `This is an ephemeral response.`, ephemeral: true })  // Create the defered reply
        await wait(5000)
        await interaction.followUp({ content: 'Following Up', ephemeral: true })
    }
}