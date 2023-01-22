const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getTitleOptions, getGame } = require("../tools.js");



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
                    .setRequired(true)
            );
    },
    async execute(interaction){
        const gameTitle = interaction.options.getString('jeu')
        const game = getGame({'Title': gameTitle})
        const thumbnailURL = game['Image'] ?? 'https://external-preview.redd.it/9HZBYcvaOEnh4tOp5EqgcCr_vKH7cjFJwkvw-45Dfjs.png?auto=webp&s=ade9b43592942905a45d04dbc5065badb5aa3483'

        interaction.reply( {
            embeds: [new EmbedBuilder()
                            .setTitle(game['Title'])
                            .setThumbnail(thumbnailURL)
                            .addFields(
                                {name: 'Developpeurs', value: game['Developpeurs'] ?? '-', inline: true},
                                {name: 'Editeurs', value: game['Editeurs'] ?? '-', inline: true},
                                {name: 'Date de Sortie', value: game['Release Date'] ?? '-', inline: true},
                                { name: '\u200B', value: '\u200B' },
                                {name: 'Description', value: game['Description'] ?? '-', inline: true},
                            ) ],
        });
    }
}