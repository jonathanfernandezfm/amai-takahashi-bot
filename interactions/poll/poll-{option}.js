const { prisma } = require('../../database/db');
const { messageEmbed } = require('../../utils/embeds');

module.exports = {
	name: 'poll-{option}',
	description: 'Poll response X',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	execute: async (interaction, value) => {
		await interaction.deferReply({ ephemeral: true });

		const pollEntry = await prisma.poll.findFirst({
			where: {
				messageId: interaction.message.id,
			},
		});

		if (!pollEntry) {
			return await interaction.editReply({ embeds: [messageEmbed('This poll is not available anymore.', null, '#ff5555')], ephemeral: true });
		}

    const voters = JSON.parse(pollEntry.voters);
    if (voters.includes(interaction.user.id)) {
      return await interaction.editReply({ embeds: [messageEmbed('You have already voted!', null, '#ff5555')], ephemeral: true });
    }

    const result = JSON.parse(pollEntry.result);
    result[value] += 1;

    await prisma.poll.update({
      where: {
        id: pollEntry.id,
      },
      data: {
        result: JSON.stringify(result),
        voters: JSON.stringify([...voters, interaction.user.id]),
      },
    });

		await interaction.editReply({ content: 'Thanks for voting!', ephemeral: true });
	},
};
