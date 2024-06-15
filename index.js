require('dotenv').config();

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { TOKEN } = process.env;

const client = new Client({
	intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.Guilds],
	partials: [Partials.GuildMember, Partials.User],
});

client.commands = new Collection();
client.interactions = new Collection();
client.slash = new Collection();
client.usersSubmitting = new Collection();
client.initialInteractions = new Collection();
client.registerSlashCommands = require('./utils/registerSlash');

['event_handler', 'command_handler', 'interaction_handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

client.login(TOKEN);

require('./express')(client);
