const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getComingGames } = require("../tools.js")


module.exports = {
    data: new SlashCommandBuilder()
            .setName('sortie_prochaine')
            .setDescription('Donne le prochain jeu à sortir.'),
    async execute(interaction){    
        const game = await getComingGames()[0]
        const thumbnailURL = game['Image'] ?? 'https://external-preview.redd.it/9HZBYcvaOEnh4tOp5EqgcCr_vKH7cjFJwkvw-45Dfjs.png?auto=webp&s=ade9b43592942905a45d04dbc5065badb5aa3483'

        // Reply embed message
        interaction.reply( {
            embeds: [new EmbedBuilder()
                            .setTitle(game['Title'])
                            // .setDescription('Sortie prévue sur : ')  // A rajouter
                            .setThumbnail(thumbnailURL)
                            .addFields(
                                {name: 'Developpeurs', value: game['Developpeurs'] ?? '-', inline: true},
                                {name: 'Editeurs', value: game['Editeurs'] ?? '-', inline: true},
                                {name: 'Date de Sortie', value: game['Release Date'] ?? '-', inline: true},
                                { name: '\u200B', value: '\u200B' },
                                {name: 'Description', value: game['Description'] ?? '-', inline: true},
                            ) ],
            content: 'Voici la prochaine sortie.'
        });
    },
}