const { ANNOUNCEMENTS_ROLE, OTHER_ANNOUNCEMENTS_ROLE } = require('../../utils/config');

module.exports = {
	name: 'other-announcements',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(OTHER_ANNOUNCEMENTS_ROLE);
		return await interaction.deferUpdate();
	},
};
