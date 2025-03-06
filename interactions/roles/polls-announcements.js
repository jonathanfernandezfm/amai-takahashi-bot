const { ANNOUNCEMENTS_ROLE, POLLS_ANNOUNCEMENTS_ROLE } = require('../../utils/config');

module.exports = {
	name: 'polls-announcements',
	description: 'Polls Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(POLLS_ANNOUNCEMENTS_ROLE);
		return await interaction.deferUpdate();
	},
};
