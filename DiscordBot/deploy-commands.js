// Here we push the commands to the application, so it knows what to show wen user is typing. Only has access to data, not execute

const { REST, Routes } = require('discord.js');
const { clientId, guildId, TOKEN } = require('./token_bot.json');
const fs = require('node:fs');
const path = require('node:path');

const forAllGuilds = true;		// Where to deploy the non test commands


const commands = [];
const test_commands = [];
// Grab all the command files from the commands directory
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
	if ( command.data.name.startsWith('test') ){
		test_commands.push(command.data.toJSON());
	}else{	
		commands.push(command.data.toJSON());	// Calls the toJSON function of the SlashCommandBuilder (contains the setName, setDescription etc...) No information on the execute !
	}
}



// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);





// Deploy Non Test commands to all servers if forAllGuilds
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		
		// The put method is used to fully refresh all commands in the guild with the current set
		let data;
		if (forAllGuilds){
			data = await rest.put( Routes.applicationCommands(clientId), { body: commands }, );	// All Guilds
		}else{	
			data = await rest.put( Routes.applicationGuildCommands(clientId, guildId), { body: commands }, );	// Test Guild
		}
		
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.log('There was an arror during the deploy process.')
		console.error(error);
	}
})();




// Deploy Test commands to test server
(async () => {
	try {
		console.log(`Started refreshing ${test_commands.length}  test application (/) commands.`);
		
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put( Routes.applicationGuildCommands(clientId, guildId), { body: test_commands }, );	// Test Guild
		
		console.log(`Successfully reloaded ${data.length} test application (/) commands.`);
	} catch (error) {
		console.log('There was an arror during the deploy process of Test commands.')
		console.error(error);
	}
})();

