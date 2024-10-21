const logger = require('./utils/logger');

/**
 * @param {Client} client
 */
module.exports = () => {
	const express = require('express');
	const app = express();
	app.use(express.json());
	const port = process.env.PORT || 3000;

	app.get('/', (req, res) => {
		res.send('Alive!');
	});

	app.post('/webhook', (req, res) => {
		logger.info('Webhook received', JSON.stringify(req.body));
		res.send('Received');
	});

	app.listen(port, () => {
		console.log(`Bot listening on port ${port}`);
	});
};
