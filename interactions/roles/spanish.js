const { ANNOUNCEMENTS_ROLE, RUSSIAN_ROLE, SPANISH_ROLE } = require('../../utils/config');

module.exports = {
	name: 'spanish',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(SPANISH_ROLE);
		return await interaction.deferUpdate();
	},
};
