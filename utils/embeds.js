const { EmbedBuilder } = require('discord.js');

const getErrorEmbed = (message) => {
	const embed = new EmbedBuilder().setTitle('❌ Error').setColor('#cc0000').setDescription(`${message}`).setTimestamp();

	return embed;
};

module.exports = {
	getErrorEmbed,
};
