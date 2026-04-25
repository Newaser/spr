import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_luoshang|洛殇", {
	description:
		"<b>锁定技</b>，当其他角色死亡时，你选择一项：受到1点无来源伤害；回复1点体力并翻面。",
	voices: [
		"洛水点绛，潇潇雨。",
		"洛水逝兮潺湲，萧王醉兮嗟叹。",
	],
	skill: {
		forced: true,
		trigger: { global: "die" },
		async content(event, trigger, player) {
			const choices = [
				"受到1点无来源伤害",
				"回复1点体力并翻面",
			];
			/** @type {Result} */
			const result = await player.chooseControlList({
				forced: true,
				prompt: "洛殇：你须选择一项",
				list: choices,
			}).forResult();
			if (result.index == 0) {
				await player.damage({ num: 1, nosource: true });
			} else {
				await player.recover();
				await player.turnOver();
			}
		},
		ai: {
			neg: true,
		},
	},
});
