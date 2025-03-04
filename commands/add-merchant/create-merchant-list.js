const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, ButtonBuilder, PermissionFlagsBits } = require('discord.js');
const { MERCHANT_FORUM } = require('../../utils/config.js');

module.exports = {
	data: new SlashCommandBuilder().setName('create-merchant-list').setDescription('Create list merchant button.').setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const buttonsRow = [new ButtonBuilder().setLabel('Merchants').setStyle(ButtonStyle.Link).setURL('https://docs.google.com/spreadsheets/d/1LzeMXz3HKIoz_Qkw0uz1pAJeL7LDbnMDjCOyNHVDM0s')];

		const forumChannel = interaction.guild.channels.cache.get(MERCHANT_FORUM);
		await forumChannel.threads.create({
			name: '📗 Merchant Sheet',
			message: {
				content: `# Click the button below to get the merchant sheet.`,
				components: [new ActionRowBuilder().addComponents(buttonsRow)],
			},
			appliedTags: [],
		});

		return await interaction.editReply({
			content: 'Forum created!',
			ephemeral: true,
		});
	},
};
