// Embeds are ways of making the text look nicer, with more options.
// It is an object that is passed in the reply, created via embeds: [new EmbedBuilder] and then setting properties.
// Propterties include : .setColor, .setTitle, .setURL, .setAuthor, .setDescription (main message), .setThumbnail, .addFields, .setImage, .setTimestamp, .setFooter
// https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor


const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
            .setName('test4')   // Same name as the file
            .setDescription('Test command for embed messages.'),
    async execute(interaction){ // You have 3 seconds to reply, except if you use interaction.deferReply(), in which case you have 15 minutes
        

        interaction.reply( {
            embeds: [new EmbedBuilder()
                            .setDescription('Hello World')
                            .setTitle('Tut') ],
        });
    }
}