const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, PermissionFlagsBits, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { MERCHANT_FORUM } = require('../../utils/config.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-rol-picker-languages')
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
			new ButtonBuilder().setCustomId('english').setLabel('English').setStyle(ButtonStyle.Primary).setEmoji('1️⃣'),
			new ButtonBuilder().setCustomId('spanish').setLabel('Spanish').setStyle(ButtonStyle.Secondary).setEmoji('2️⃣'),
			new ButtonBuilder().setCustomId('russian').setLabel('Russian').setStyle(ButtonStyle.Success).setEmoji('3️⃣'),
			new ButtonBuilder().setCustomId('portuguese').setLabel('Portuguese').setStyle(ButtonStyle.Danger).setEmoji('4️⃣'),
		]);

		await channel.send({
			content: `
# 🏳️ Language Roles 🏳️

Click on the buttons below to get the roles about the languages you speak.
You will unlock the channels for the languages you select.
      `,
			components: [row],
		});

		return await interaction.editReply({
			content: 'Button created!',
			ephemeral: true,
		});
	},
};
