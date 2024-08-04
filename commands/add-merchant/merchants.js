const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { messageEmbed } = require('../../utils/embeds.js');

module.exports = {
	data: new SlashCommandBuilder().setName('merchants').setDescription('Get the list of merchants.'),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		return await interaction.editReply({
			embeds: [messageEmbed(null, '🏬 [Merchants sheet](https://docs.google.com/spreadsheets/d/1rV2ehi2-JSUuS9PR4emINDDH7RRxS6X0W8vESWnPpOA)', null, '#326da8')],
			ephemeral: true,
		});
	},
};
