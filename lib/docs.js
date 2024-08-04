const { JWT } = require('google-auth-library');
const creds = require('../config/discord-bot-304712-8bb8255002c8.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];

const jwt = new JWT({
	email: creds.client_email,
	key: creds.private_key,
	scopes: SCOPES,
});

const doc = new GoogleSpreadsheet('1rV2ehi2-JSUuS9PR4emINDDH7RRxS6X0W8vESWnPpOA', jwt);

module.exports = {
	doc,
};
