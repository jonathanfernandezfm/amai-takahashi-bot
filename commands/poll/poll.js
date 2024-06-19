const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { prisma } = require('../../database/db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('title').setDescription('The title of the poll.').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('The description of the poll.').setRequired(true))
    .addStringOption(option => option.setName('image-url').setDescription('The image of the poll.').setRequired(true))
    .addStringOption(option => option.setName('option1').setDescription('The first option for the poll.').setRequired(true))
    .addStringOption(option => option.setName('option2').setDescription('The second option for the poll.').setRequired(true))
    .addStringOption(option => option.setName('option3').setDescription('The third option for the poll.').setRequired(false))
    .addStringOption(option => option.setName('option4').setDescription('The fourth option for the poll.').setRequired(false))
    .addStringOption(option => option.setName('option5').setDescription('The fifth option for the poll.').setRequired(false)),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
    await interaction.deferReply();
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const imageUrl = interaction.options.getString('image-url');
    const option1 = interaction.options.getString('option1');
    const option2 = interaction.options.getString('option2');
    const option3 = interaction.options.getString('option3');
    const option4 = interaction.options.getString('option4');
    const option5 = interaction.options.getString('option5');

    const options = [option1, option2, option3, option4, option5].filter(option => option !== null);

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor('#00ccff')
      .setImage(imageUrl)
      .setAuthor({
        name: 'Polls',
        iconURL: interaction.user.displayAvatarURL()
      });

    const buttons = options.map((option) => {
      return new ButtonBuilder().setCustomId(`poll-${option}`).setLabel(option).setStyle(ButtonStyle.Primary);
    });

    if (options.length < 5) buttons.push(new ButtonBuilder().setCustomId('poll-result').setLabel('Poll result').setStyle(ButtonStyle.Success));
    const row = new ActionRowBuilder().addComponents(buttons);

    const response = await interaction.editReply({ embeds: [embed], components: [row] });

    const emptyResult = options.reduce((acc, option, index) => {
      acc[`${options[index]}`] = 0;
      return acc;
    }, {});
    await prisma.poll.create({
      data: {
        title,
        description,
        result: JSON.stringify(emptyResult),
        messageId: response.id,
        voters: JSON.stringify([]),
      }
    });
	},
};
