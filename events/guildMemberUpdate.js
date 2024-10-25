const { Events, GuildMember } = require('discord.js');
const logger = require('../utils/logger');
const { TIER_ROLES } = require('../utils/config');

module.exports = {
	name: Events.GuildMemberUpdate,

	/**
	 *
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 * @returns
	 */
	async execute(oldMember, newMember) {
		// const oldRoles = oldMember.roles.cache;
		// const newRoles = newMember.roles.cache;
		// try {
		// 	TIER_ROLES.forEach((role) => {
		// 		const oldHas = oldRoles.has(role.id);
		// 		const newHas = newRoles.has(role.id);
		// 		console.log({ id: role.id, oldHas, newHas });
		// 		if (oldHas && !newHas) {
		// 			if (newMember.displayName.startsWith(`[${role.icon}] `)) {
		// 				newMember.setNickname(`${newMember.displayName.split('] ')[1]}`);
		// 			}
		// 		} else if (!oldHas && newHas) {
		// 			if (!newMember.displayName.startsWith(`[${role.icon}] `)) {
		// 				newMember.setNickname(`[${role.icon}] ${newMember.displayName}`);
		// 			}
		// 		}
		// 	});
		// } catch (error) {
		// 	logger.error('Cant set nickname', error);
		// }
	},
};
