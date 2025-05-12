const { Events, EmbedBuilder, CommandInteraction } = require('discord.js');
const { ROLE_FREE_MEMBER, WELCOME_CHANNEL, TIER_ROLES } = require('../utils/config');
const logger = require('../utils/logger');

const miscRoles = ['1368269510288871534', '1368269603557343312', '1368269442663972874', '1368270936133992610', '1368268212176945162'];

module.exports = {
	name: Events.GuildMemberAdd,

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @returns
	 */
	async execute(member) {
		logger.info('Member joined');
		console.log(member);

		let isSubscribed = false;
		TIER_ROLES.forEach((tierRole) => {
			const memberRoles = member.roles.cache;
			if (memberRoles && memberRoles.has(tierRole.id)) {
				isSubscribed = true;
			}
		});

		if (!isSubscribed) {
			let role = await member.guild.roles.cache.get(ROLE_FREE_MEMBER);
			if (role === undefined) {
				role = await member.guild.roles.fetch(ROLE_FREE_MEMBER);
			}
			await member.roles.add(role);
		}

		miscRoles.forEach(async (role) => {
			let miscRole = await member.guild.roles.cache.get(role);
			if (miscRole === undefined) {
				miscRole = await member.guild.roles.fetch(role);
			}
			await member.roles.add(miscRole);
		});

		const channel = await member.guild.channels.fetch(WELCOME_CHANNEL);
		if (!channel) return;

		const embed = new EmbedBuilder()
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(
				`💛 Welcome to **Bastet Figures's** Discord, ${member.user} (${member.user.username})!\n\nRemember to visit the <id:guide>\nFAQ: <#1360193709630689310>\nSay **Hi!** in <#1134920268469518451>`
			)
			.setColor(0xebbd34)
			.setTimestamp();

		await channel.send({ content: `${member.user}`, embeds: [embed] });
	},
};
