const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Ping the bot.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(interaction) {
		await interaction.deferReply();
		const channel = await interaction.client.channels.fetch('1297877884140261480');

        const attributes = {
      "will_pay_amount_cents": 12314,
      "full_name": "Test subscription",
      "is_follower": true,
      "last_charge_date": null,
      "last_charge_status": null,
      "lifetime_support_cents": 10000,
      "note": "",
      "patron_status": "active_patron",
      "pledge_relationship_start": null
    }

        const embed = new EmbedBuilder()
                  .setColor("#2a2c31") // You can change the color
                  .setTitle('🎉 New Subscriber! 🎉')
                  .setDescription(`A new supporter has joined!`)
                  .addFields(
                    { name: 'Name', value: attributes.full_name, inline: true },
                    { name: 'Email', value: attributes.email, inline: true },
                    { name: 'Price', value: `${attributes.will_pay_amount_cents / 100}`, inline: true }, // Format price to 2 decimal places
                    { name: 'Follower', value: attributes.is_follower ? 'Yes' : 'No', inline: true },
                    { name: 'Lifetime Support', value: `${(attributes.lifetime_support_cents / 100).toFixed(2)}`, inline: true }, // Convert cents to dollars
                    // You can add more fields based on the available data and what you want to display
                    // For example, if last_charge_date and last_charge_status were available:
                    { name: 'Last Charge Date', value: attributes.last_charge_date || 'N/A', inline: true },
                    { name: 'Last Charge Status', value: attributes.last_charge_status || 'N/A', inline: true },
                  )
                  .setTimestamp()
                  .setFooter({ text: 'Patreon Webhook' });
                
                channel.send({ embeds: [embed] });
		await interaction.editReply({ content: `Pong! Bot latency: ${ping}ms.` });
	},
};
