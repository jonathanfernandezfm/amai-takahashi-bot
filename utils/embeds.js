const { EmbedBuilder } = require('discord.js');

const getErrorEmbed = (message) => {
	const embed = new EmbedBuilder().setTitle('❌ Error').setColor('#cc0000').setDescription(`${message}`).setTimestamp();

	return embed;
};

const messageEmbed = (title, description, color) => {
	const embed = new EmbedBuilder().setColor(color ?? '#00ccff');
	if (title) embed.setTitle(title);
	if (description) embed.setDescription(description);

	return embed;
};

module.exports = {
	getErrorEmbed,
	messageEmbed,
};
