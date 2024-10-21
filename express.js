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
		console.log(JSON.stringify(req.body));
		channel.send(JSON.stringify(req.body).slice(0, 1900));
		channel.send(JSON.stringify(req.body).slice(1900));
		res.sendStatus(200);
	});

	app.listen(port, () => {
		console.log(`Bot listening on port ${port}`);
	});
};
