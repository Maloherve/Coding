// To add options, use the add******Option() function. Each option must have at least a name and a description, set inside the add string option function.
// Options can have multiple types : (String, Boolean, Integer, Number), (Channel, User, Role, Mentionable), Attachment, Subcommand, SubcommandGroup
// An option can be required with option.setRequired(true)
// You can give the user a list of choices for certain types. Use option.addChoice(). Choices are objects with a name property and a value property.
// Options can have validation options, like option.setMaxLength() for Strings

// You can then access the options using interaction.options.get_____('optionName'), where _____ is the type.
const { SlashCommandBuilder, ChannelType } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    data: new SlashCommandBuilder()
            .setName('test2')
            .setDescription('Test command for commands with options.')
            .addStringOption(option => 
                option.setName('input')
                    .setDescription('The input to echo back.') 
                    .setRequired(true)  )
            .addIntegerOption(option =>
                option.setName('number')
                    .setDescription('A number to be printed after the test')
                    .addChoices(
                        {name: 'One', value: 1},
                        {name: 'Two', value: 2},
                        {name: 'Three', value: 3}   )   )
            .addChannelOption(option => 
                option.setName('channel')
                    .setDescription('Channel in which to echo.')
                    .addChannelTypes(ChannelType.GuildText)    )
            .addBooleanOption(option =>
                option.setName('ephemeral')
                    .setDescription('Will the message be ephemeral.')   ),
    async execute(interaction){ 
        const content = interaction.options.getString('input')
        const number = interaction.options.getInteger('number')
        const channel = interaction.options.getChannel('channel')
        const ephemeral = interaction.options.getBoolean('ephemeral') ?? true
        

        await interaction.reply({content: `${content}, ${number}`, ephemeral: ephemeral})
        
        console.log('Test 2 Done')
    }
}