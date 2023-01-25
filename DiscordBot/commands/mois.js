const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const { getGamesInMonth } = require('../tools.js')

const monthList = [
    {name: "Janvier", value: 1},
    {name: "Février", value: 2},
    {name: "Mars", value: 3},
    {name: "Avril", value: 4},
    {name: "Mai", value: 5},
    {name: "Juin", value: 6},
    {name: "Juillet", value: 7},
    {name: "Aout", value: 8},
    {name: "Septembre", value: 9},
    {name: "Octobre", value: 10},
    {name: "Novembre", value: 11},
    {name: "Décembre", value: 12}
]

module.exports = {
    data: new SlashCommandBuilder()
                .setName('mois')
                .setDescription('Donne la liste des jeu à sortir pour un mois donné.')
                .addIntegerOption(option => 
                    option.setName('mois')
                          .setDescription('Mois désiré.')
                          .addChoices( ...monthList ) ),
    async execute(interaction){
        const moisInt = interaction.options.getInteger('mois') ?? 01
        const moisStr = monthList.filter(month => month.value === moisInt)[0].name
        
        // Parse Embed Objects
        const embedGames = getGamesInMonth(moisInt).map(game => { return {name: game['Title'], value: game['Release Date'], inline: false} })

        // Create the Embed Message and add the fields
        const embedMessage = new EmbedBuilder()
        embedMessage.addFields({ name: '\u200B', value: '\u200B' })
        embedGames.forEach(game => embedMessage.addFields(game))

        // Reply to messages
        interaction.reply({
            embeds: [embedMessage
                        .setTitle(`Voici les jeux à sortir en ${moisStr}.`)
                        .setDescription("Utiliser `/info NOM_DU_JEU` pour obtenir plus d'information ")],
        })
    }
}