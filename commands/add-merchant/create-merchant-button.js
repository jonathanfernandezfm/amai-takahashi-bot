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

		const buttonsRow = [new ButtonBuilder().setCustomId(`add-merchant-button`).setLabel('Add yourself as merchant').setStyle(ButtonStyle.Primary)];

		const forumChannel = interaction.guild.channels.cache.get(MERCHANT_FORUM);
		await forumChannel.threads.create({
			name: '🌟 Do you want to be added as an official Merchant?',
			message: {
				content: `
# Click the button below to add yourself as a merchant.

### Requirements:
- You need to be subscribed as merchant.
- You can only add yourself as merchant once.
- You need to have the merchant role.

If you dont meet the requirements, you can still check the merchants list by clicking the button below.
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
