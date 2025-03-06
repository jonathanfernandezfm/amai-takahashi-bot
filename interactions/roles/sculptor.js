const { ANNOUNCEMENTS_ROLE, RUSSIAN_ROLE, SPANISH_ROLE, PORTUGUESE_ROLE, SCULPTOR_ROLE, NICE_PERSON_ROLE } = require('../../utils/config');

module.exports = {
	name: 'sculptor',
	description: 'Announcements',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.member.roles.add(SCULPTOR_ROLE);
		return await interaction.deferUpdate();
	},
};
