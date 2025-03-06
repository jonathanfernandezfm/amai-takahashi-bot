const { ANNOUNCEMENTS_ROLE, WIP_ANNOUNCEMENTS_ROLE, ENGLISH_ROLE, PAINTER_ROLE } = require('../../utils/config');

module.exports = {
	name: 'painter',
	description: 'WIP Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(PAINTER_ROLE);
		return await interaction.deferUpdate();
	},
};
