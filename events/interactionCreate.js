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

		if (interaction.customId && interactionWithId.includes('size-t-shirts-')) interactionWithId = 'size-t-shirts-{size}';
		else if (interaction.customId && interactionWithId.includes('color-t-shirts-')) interactionWithId = 'color-t-shirts-{color}';
		else if (interaction.customId && interactionWithId.includes('design-t-shirts-')) interactionWithId = 'design-t-shirts-{design}';
		else if (interaction.customId && interactionWithId.includes('size-')) interactionWithId = 'size-{size}';
		else if (interaction.customId && interactionWithId.includes('color-')) interactionWithId = 'color-{color}';

		const interactionAction =
			interaction.client.interactions.get(interaction.customId) ||
			interaction.client.slash.get(interaction.commandName) ||
			interaction.client.interactions.get(interactionWithId);

		if (!interactionAction) return;

		try {
			if (interactionWithId === 'size-{size}') {
				return await interactionAction.execute(interaction, interaction.customId.split('-')[1]);
			}

			if (interactionWithId === 'color-{color}') {
				return await interactionAction.execute(interaction, interaction.customId.split('-')[1]);
			}

			if (interactionWithId === 'size-t-shirts-{size}') {
				return await interactionAction.execute(interaction, interaction.customId.split('-')[3]);
			}

			if (interactionWithId === 'color-t-shirts-{color}') {
				return await interactionAction.execute(interaction, interaction.customId.split('-')[3]);
			}

			if (interactionWithId === 'design-t-shirts-{design}') {
				return await interactionAction.execute(interaction, interaction.customId.split('-')[3]);
			}

			await interactionAction.execute(interaction, interaction.customId);
		} catch (err) {
			interaction.editReply('there was an error executing this command. 😫');
			logger.error(err);
		}
	},
};
