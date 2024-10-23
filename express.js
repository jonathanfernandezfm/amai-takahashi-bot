const logger = require('./utils/logger');

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
		channel.send(`**NEW SUB!**\n\nName: ${attributes.full_name}\nEmail: ${attributes.email}\nPrice: ${attributes.will_pay_amount_cents / 100}`);
		res.sendStatus(200);
	});

	app.listen(port, () => {
		console.log(`Bot listening on port ${port}`);
	});
};
