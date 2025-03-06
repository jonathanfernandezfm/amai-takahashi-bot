const { ANNOUNCEMENTS_ROLE, RUSSIAN_ROLE, NICE_PERSON_ROLE } = require('../../utils/config');

module.exports = {
	name: 'nice-person',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(NICE_PERSON_ROLE);
		return await interaction.deferUpdate();
	},
};
