const { Events } = require('discord.js');
const logger = require('../utils/logger');
const { ID_EXTRACT_REGEX } = require('../utils/config');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (
			!interaction.isStringSelectMenu() &&
			!interaction.isButton() &&
			!interaction.isModalSubmit() &&
			!interaction.isChatInputCommand() &&
			!interaction.isUserContextMenuCommand() &&
			!interaction.isMessageContextMenuCommand()
		) {
			return;
		}

		let interactionWithId = interaction.customId;
		const matches = ID_EXTRACT_REGEX.exec(interactionWithId);
		if (matches && matches.length > 1 && matches[1]) {
			interactionWithId = interactionWithId.replace(matches[1], 'id');
		}

		if (interaction.customId && interactionWithId.includes('poll-')) interactionWithId = 'poll-{option}';

		const interactionAction =
			interaction.client.interactions.get(interaction.customId) || interaction.client.slash.get(interaction.commandName) || interaction.client.interactions.get(interactionWithId);

		if (!interactionAction) return;

		try {
			if (interactionWithId === 'poll-{option}') {
				return await interactionAction.execute(interaction, interaction.customId.split('-')[1]);
			}

			await interactionAction.execute(interaction, interaction.customId);
		} catch (err) {
			// interaction.editReply('there was an error executing this command. 😫');
			logger.error(err);
		}
	},
};
