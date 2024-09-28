const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { prisma } = require('../../database/db');
const { messageEmbed } = require('../../utils/embeds');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll-result')
		.setDescription('Checks poll results')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) => option.setName('message-id').setDescription('The message id of the poll').setRequired(true)),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const messageId = interaction.options.getString('message-id');

		const pollEntry = await prisma.poll.findFirst({
			where: {
				messageId: messageId,
			},
		});

		if (!pollEntry) {
			return await interaction.editReply({ embeds: [messageEmbed('This poll is not available.', null, '#ff5555')], ephemeral: true });
		}

		const result = JSON.parse(pollEntry.result);
		const resultString = Object.keys(result)
			.map((key) => `${key} : ${result[key]}`)
			.join('\n');

		const embedResult = new EmbedBuilder().setAuthor({ name: '📊 Result of the poll' }).setTitle(pollEntry.title).setDescription(resultString).setColor('#2a2c31');

		await interaction.editReply({ embeds: [embedResult], ephemeral: true });
	},
};
