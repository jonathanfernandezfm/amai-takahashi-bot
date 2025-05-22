const logger = require('./utils/logger');
const { EmbedBuilder } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = (client) => {
	const express = require('express');
	const app = express();
	app.use(express.json());
	const port = process.env.PORT || 3000;

	app.get('/', (req, res) => {
		res.send('Alive!');
	});

	app.post('/webhook', async (req, res) => {
		const channel = await client.channels.fetch('1297877884140261480');

		const attributes = req.body.data.attributes;
		if (attributes.patron_status !== 'active_patron') return res.sendStatus(200);

		const embed = new EmbedBuilder()
		  .setColor(0x0099FF) // You can change the color
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
		res.sendStatus(200);
	});

	app.listen(port, () => {
		console.log(`Bot listening on port ${port}`);
	});
};
