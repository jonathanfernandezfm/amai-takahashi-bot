const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping the bot.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply();
		const ping = Date.now() - interaction.createdTimestamp;
		await interaction.editReply({ content: `Pong! Bot latency: ${ping}ms.` });
	},
};
