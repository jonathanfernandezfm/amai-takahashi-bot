const { ANNOUNCEMENTS_ROLE, WIP_ANNOUNCEMENTS_ROLE, ENGLISH_ROLE } = require('../../utils/config');

module.exports = {
	name: 'english',
	description: 'WIP Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(ENGLISH_ROLE);
		return await interaction.deferUpdate();
	},
};
