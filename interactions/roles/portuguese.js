const { ANNOUNCEMENTS_ROLE, RUSSIAN_ROLE, SPANISH_ROLE, PORTUGUESE_ROLE } = require('../../utils/config');

module.exports = {
	name: 'portuguese',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(PORTUGUESE_ROLE);
		return await interaction.deferUpdate();
	},
};
