const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, PermissionFlagsBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { MERCHANT_FORUM } = require('../../utils/config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-rol-picker-announcements')
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
			new ButtonBuilder().setCustomId('wip-announcements').setLabel('Work In Progress Announcements').setStyle(ButtonStyle.Secondary).setEmoji('🔨'),
			new ButtonBuilder().setCustomId('polls-announcements').setLabel('Polls Announcements').setStyle(ButtonStyle.Secondary).setEmoji('📊'),
			new ButtonBuilder().setCustomId('other-announcements').setLabel('Other Announcements').setStyle(ButtonStyle.Secondary).setEmoji('☎️'),
		]);

		await channel.send({
			content: `
# 📢 Announcements Roles

Do you want to receive extra announcements? To avoid spamming we have separated the announcements in different roles and you can choose yourself.

Click on the buttons below to get the roles you want to be notified about.\n
      `,
			components: [row],
		});

		return await interaction.editReply({
			content: 'Button created!',
			ephemeral: true,
		});
	},
};
