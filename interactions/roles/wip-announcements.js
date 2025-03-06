const { ANNOUNCEMENTS_ROLE } = require('../../utils/config');

module.exports = {
	name: 'wip-announcements',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(ANNOUNCEMENTS_ROLE);
		return await interaction.deferUpdate();
	},
};
