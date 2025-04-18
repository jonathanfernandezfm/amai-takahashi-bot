const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { doc } = require('../../lib/docs.js');
const { prisma } = require('../../database/db.js');
const { MERCHANT_ROLE, MERCHANT_FORUM } = require('../../utils/config.js');
const { messageEmbed } = require('../../utils/embeds.js');

module.exports = {
	name: 'add-merchant-button',
	description: 'Adds a merchant',

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		const existingMerchant = await prisma.merchants.findUnique({
			where: {
				userId: interaction.user.id,
			},
		});

		if (existingMerchant) {
			return await interaction.reply({ embeds: [messageEmbed('You are already a merchant.', null, '#ff5555')], ephemeral: true });
		}

		if (!interaction.member.roles.cache.has(MERCHANT_ROLE)) {
			return await interaction.reply({ embeds: [messageEmbed('You need to be a merchant to use this command.', null, '#ff5555')], ephemeral: true });
		}

		const modal = new ModalBuilder().setCustomId('add-merchant').setTitle('Add merchant');

		const storeNameInput = new TextInputBuilder()
			.setCustomId('store-name')
			.setLabel('Store name')
			.setPlaceholder('Introduce your store name')
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMinLength(3);

		const storeLinkInput = new TextInputBuilder().setCustomId('store-link').setLabel('Store link').setPlaceholder('Introduce your store link').setStyle(TextInputStyle.Short).setRequired(true);

		const countryInput = new TextInputBuilder()
			.setCustomId('country')
			.setLabel('Country')
			.setPlaceholder('Introduce where you are located and can ship. ex England, Worldwide')
			.setStyle(TextInputStyle.Short)
			.setRequired(true);

		const contactEmailInput = new TextInputBuilder()
			.setCustomId('contact')
			.setLabel('Contact')
			.setPlaceholder('Introduce your contact information, email, social links, etc.')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true);

		const serviceInput = new TextInputBuilder()
			.setCustomId('service')
			.setLabel('What service do you provide?')
			.setPlaceholder('Ex. Printing and painting')
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMinLength(3);

		const row = new ActionRowBuilder().addComponents(storeNameInput);
		const row1 = new ActionRowBuilder().addComponents(storeLinkInput);
		const row2 = new ActionRowBuilder().addComponents(countryInput);
		const row3 = new ActionRowBuilder().addComponents(contactEmailInput);
		const row4 = new ActionRowBuilder().addComponents(serviceInput);

		modal.addComponents([row, row1, row2, row3, row4]);

		await interaction.showModal(modal);

		const filter = (i) => i;

		await interaction
			.awaitModalSubmit({ time: 60_000, filter })
			.then(async (modalInteraction) => {
				await modalInteraction.deferReply({ ephemeral: true });
				const storeName = modalInteraction.fields.getTextInputValue('store-name');
				const storeLink = modalInteraction.fields.getTextInputValue('store-link');
				const country = modalInteraction.fields.getTextInputValue('country');
				const contactEmail = modalInteraction.fields.getTextInputValue('contact');
				const service = modalInteraction.fields.getTextInputValue('service');

				console.log(storeName, storeLink, country, contactEmail, service);

				await doc.loadInfo();
				console.log(doc.title);
				const sheet = doc.sheetsByIndex[0];
				const row = await sheet.loadHeaderRow(7);
				console.log(row);
				await sheet.addRow(['-', storeName, storeLink, country, contactEmail, service]);

				await prisma.merchants.create({
					data: {
						userId: interaction.user.id,
					},
				});

				const forumChannel = interaction.guild.channels.cache.get(MERCHANT_FORUM);
				await forumChannel.threads.create({
					name: storeName,
					message: {
						content: `
🔹 Store Link: ${storeLink}
🔹 Shipping to: ${country}
🔹 Store contact: ${contactEmail} 
🔹 Services: ${service}
            `,
					},
					appliedTags: [],
				});

				return await modalInteraction.editReply({ embeds: [messageEmbed('✅ Merchant added!', null, '#3b9c52')], ephemeral: true });
			})
			.catch((error) => {
				console.error(error);
				return interaction.reply({ embeds: [messageEmbed('Something went wrong. Contact the staff', null, '#ff5555')], ephemeral: true });
			});
	},
};
