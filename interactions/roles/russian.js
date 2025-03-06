const { ANNOUNCEMENTS_ROLE, RUSSIAN_ROLE } = require('../../utils/config');

module.exports = {
	name: 'russian',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(RUSSIAN_ROLE);
		return await interaction.deferUpdate();
	},
};
