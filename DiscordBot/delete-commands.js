const { REST, Routes } = require('discord.js');
const { clientId, guildId, TOKEN } = require('./token_bot.json');

const rest = new REST({ version: '9' }).setToken(TOKEN);


const forAllGuilds = true;


if (forAllGuilds){
    rest.get(Routes.applicationCommands(clientId))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
    });
}else{
    rest.get(Routes.applicationGuildCommands(clientId, guildId))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
    });
}



