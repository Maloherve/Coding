const { SlashCommandBuilder } = require("discord.js");
const { getTitleOptions, getComingGames, getGameProperty } = require("../tools.js");



// Can optimize by putting all info in JSON and then updating sometimes

module.exports = {
    data: async () => {
        // The list is fetched here (where we can use promises and async-await) before the SlashCommandBuilder gets made.
        const list = await getTitleOptions();
        return new SlashCommandBuilder()
            .setName("info")
            .setDescription("Donne des informations sur un jeu.")
            .addStringOption((option) =>
                option
                    .setName("jeu")
                    .setDescription("Le jeu dont on veut l'information.")
                    .setChoices(...list)
            );
    },
    async execute(interaction){
        await interaction.deferReply()
        const gameTitle = interaction.options.getString('jeu') ?? ''
        const comingGames = await getComingGames()


        if (gameTitle) {
            const gameInfo = await getGameProperty({'Title': gameTitle}, 'Description')
            const gameDate = await getGameProperty({'Title': gameTitle}, 'Release Date')
            await interaction.editReply(`Info sur ${gameTitle} ( ${gameDate} ) : \n${gameInfo}`)
        }else{
            await interaction.editReply(`Le prochain jeu à sortir est ${comingGames[0]['Title']}, le ${comingGames[0]['Release Date']} : \n${comingGames[0]['Description']}.`)
        }
    }
}