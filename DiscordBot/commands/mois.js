const { SlashCommandBuilder } = require("discord.js");
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
        const games = getGamesInMonth(moisInt).map(game => game['Title']).join('\n')
        

        interaction.reply(`Voici les jeux à sortir en ${moisStr}.\n${games}`)
    }
}