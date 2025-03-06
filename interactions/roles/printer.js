const { ANNOUNCEMENTS_ROLE, RUSSIAN_ROLE, SPANISH_ROLE, PRINTER_ROLE } = require('../../utils/config');

module.exports = {
	name: 'printer',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(PRINTER_ROLE);
		return await interaction.deferUpdate();
	},
};
