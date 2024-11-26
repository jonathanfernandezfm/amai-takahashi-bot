const { Events, EmbedBuilder, CommandInteraction } = require('discord.js');
const { ROLE_FREE_MEMBER, WELCOME_CHANNEL, TIER_ROLES } = require('../utils/config');
const logger = require('../utils/logger');

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

		// let isSubscribed = false;
		// TIER_ROLES.forEach((tierRole) => {
		//   const memberRoles = member.roles.cache;
		//   if (memberRoles && memberRoles.has(tierRole.id)) {
		//     if (!member.displayName.startsWith(`[${tierRole.icon}] `)) {
		//       member.setNickname(`[${tierRole.icon}] ${member.displayName}`);
		//       isSubscribed = true;
		//     }
		//   }
		// });

		// if (!isSubscribed) {
		//   let role = await member.guild.roles.cache.get(ROLE_FREE_MEMBER);
		//   if (role === undefined) {
		//     role = await member.guild.roles.fetch(ROLE_FREE_MEMBER);
		//   }
		//   await member.roles.add(role);
		// }

		const channel = await member.guild.channels.fetch(WELCOME_CHANNEL);
		if (!channel) return;

		const embed = new EmbedBuilder()
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(
				`🩵 Welcome to Amai Takahashi's Community, ${member.user} (${member.username})!\nRemember to follow the rules!\n\nPlease wait to be verified and assigned a role, an admin will do it shortly\n`
			)
			.setColor(0x3498eb)
			.setTimestamp();

		await channel.send({ embeds: [embed] });
	},
};
