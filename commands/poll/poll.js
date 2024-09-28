const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { prisma } = require('../../database/db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) => option.setName('title').setDescription('The title of the poll.').setRequired(true))
		.addStringOption((option) => option.setName('description').setDescription('The description of the poll.').setRequired(true))
		.addStringOption((option) => option.setName('options').setDescription('The options for the poll separated by commas. Ex: Ashe,Ekko,Ahri').setRequired(true))
		.addStringOption((option) => option.setName('image').setDescription('The image url of the poll.')),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply();
		const title = interaction.options.getString('title');
		const description = interaction.options.getString('description');
		const image = interaction.options.getString('image');
		const options = interaction.options.getString('options');

		const optionsArray = options.split(',').map((option) => option.trim());
		if (optionsArray.length < 2) {
			await interaction.deleteReply();
			return interaction.reply({ content: 'You must provide at least 2 options', ephemeral: true });
		}

		if (optionsArray.length > 10) {
			await interaction.deleteReply();
			return interaction.reply({ content: 'You can only provide up to 10 options', ephemeral: true });
		}

		const embed = new EmbedBuilder().setDescription(description).setColor('#2a2c31').setAuthor({
			name: title,
		});

		if (image) {
			embed.setImage(image);
		}

		const buttonsRow1 = optionsArray.slice(0, 5).map((option) => {
			return new ButtonBuilder().setCustomId(`poll-${option}`).setLabel(option).setStyle(ButtonStyle.Secondary);
		});

		const buttonsRow2 = optionsArray.slice(5, 10).map((option) => {
			return new ButtonBuilder().setCustomId(`poll-${option}`).setLabel(option).setStyle(ButtonStyle.Secondary);
		});

		const rows = [];

		if (buttonsRow1.length > 0) {
			rows.push(new ActionRowBuilder().addComponents(buttonsRow1));
		}

		if (buttonsRow2.length > 0) {
			rows.push(new ActionRowBuilder().addComponents(buttonsRow2));
		}

		const response = await interaction.editReply({ content: '||@everyone||', embeds: [embed], components: rows });

		const emptyResult = optionsArray.reduce((acc, option, index) => {
			acc[option] = 0;
			return acc;
		}, {});

		await prisma.poll.create({
			data: {
				title,
				description,
				result: JSON.stringify(emptyResult),
				messageId: response.id,
				voters: JSON.stringify([]),
			},
		});
	},
};
