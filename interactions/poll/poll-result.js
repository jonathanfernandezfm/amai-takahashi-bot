const { EmbedBuilder } = require('discord.js');
const { prisma } = require('../../database/db');
const { messageEmbed } = require('../../utils/embeds');

module.exports = {
	name: 'poll-result',
	description: 'Poll result',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction) => {
		await interaction.deferReply({ ephemeral: true });

		const pollEntry = await prisma.poll.findFirst({
			where: {
				messageId: interaction.message.id,
			},
		});

		if (!pollEntry) {
			return await interaction.editReply({ embeds: [messageEmbed('This poll is not available anymore.', null, '#ff5555')], ephemeral: true });
		}

    const result = JSON.parse(pollEntry.result);
    const resultString = Object.keys(result).map(key => `${key} : ${result[key]}`).join('\n');

    const embedResult = new EmbedBuilder()
      .setTitle('Result of the poll')
      .setDescription(resultString)
      .setColor('#00ccff')
      .setAuthor({
        name: 'Polls',
        iconURL: interaction.user.displayAvatarURL()
      });

		await interaction.editReply({ embeds: [embedResult], ephemeral: true });
	},
};
