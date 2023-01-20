const { SlashCommandBuilder } = require("discord.js");
const { getTitleOptions } = require("../tools.js")




module.exports = {
    data: async () => {
        // The list is fetched here (where we can use promises and async-await) before the SlashCommandBuilder gets made.
        const list = await getTitleOptions();
        return new SlashCommandBuilder()
            .setName("test3")
            .setDescription("Test command for commands with options.")
            .addStringOption((option) =>
                option
                    .setName("input")
                    .setDescription("The input to echo back.")
                    .setChoices(...list)
            );
    },
    async execute(interaction){
        await interaction.reply('Testing')
    }
}