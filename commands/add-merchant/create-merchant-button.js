const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, ButtonBuilder, PermissionFlagsBits } = require('discord.js');
const { MERCHANT_FORUM } = require('../../utils/config.js');

module.exports = {
	data: new SlashCommandBuilder().setName('create-merchant-button').setDescription('Create add merchant button.').setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const buttonsRow = [
			new ButtonBuilder().setCustomId(`add-merchant-button`).setLabel('Add Store').setStyle(ButtonStyle.Primary),
			new ButtonBuilder().setLabel('Merchants').setStyle(ButtonStyle.Link).setURL('https://docs.google.com/spreadsheets/d/1LzeMXz3HKIoz_Qkw0uz1pAJeL7LDbnMDjCOyNHVDM0s'),
		];

		const forumChannel = interaction.guild.channels.cache.get(MERCHANT_FORUM);
		await forumChannel.threads.create({
			name: '🌟 Do you want to be added as an official Merchant?',
			message: {
				content: `
# Click the button below to add your store.

### Requirements:
- You need to have an active subscription to Eye of Bastet tier.
- You can only add your store once.
- You need to have the Eye of Bastet role in Discord.

If you dont meet the requirements, you can still check the merchants sheet.
--------------------------
      `,
				components: [new ActionRowBuilder().addComponents(buttonsRow)],
			},
			appliedTags: [],
		});

		return await interaction.editReply({
			content: 'Button created!',
			ephemeral: true,
		});
	},
};
