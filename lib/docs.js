const { JWT } = require('google-auth-library');
const creds = process.env.SERVICE_ACCOUNT;
const { GoogleSpreadsheet } = require('google-spreadsheet');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];

const parsedCreds = JSON.parse(creds);
const jwt = new JWT({
	email: parsedCreds.client_email,
	key: parsedCreds.private_key,
	scopes: SCOPES,
});

const doc = new GoogleSpreadsheet('1rV2ehi2-JSUuS9PR4emINDDH7RRxS6X0W8vESWnPpOA', jwt);

module.exports = {
	doc,
};
