const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, PermissionFlagsBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { MERCHANT_FORUM } = require('../../utils/config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-rol-picker-services')
		.setDescription('Create role picker.')
		.addChannelOption((option) => option.setName('channel').setDescription('Channel to create the button in.').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const channel = interaction.options.getChannel('channel');

		const row = new ActionRowBuilder().addComponents([
			new ButtonBuilder().setCustomId('printer').setLabel('Printer').setStyle(ButtonStyle.Secondary).setEmoji('🖨️'),
			new ButtonBuilder().setCustomId('painter').setLabel('Painter').setStyle(ButtonStyle.Secondary).setEmoji('🎨'),
			new ButtonBuilder().setCustomId('sculptor').setLabel('Sculptor').setStyle(ButtonStyle.Secondary).setEmoji('🗽'),
			new ButtonBuilder().setCustomId('nice-person').setLabel('A Nice Person').setStyle(ButtonStyle.Secondary).setEmoji('🧑‍🦲'),
		]);

		await channel.send({
			content: `
# ⚒️ What do you do? ⚒️

Do you print the figures? Do you paint them? Are you a sculptor yourself?

Choose the role that best describes you and let the community know!\n
      `,
			components: [row],
		});

		return await interaction.editReply({
			content: 'Button created!',
			ephemeral: true,
		});
	},
};
