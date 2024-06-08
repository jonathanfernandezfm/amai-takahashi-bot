const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.registerSlashCommands();
		logger.info(`Ready! Logged in as ${client.user.tag}`);
	},
};
