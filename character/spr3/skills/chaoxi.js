import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_chaoxi|潮汐", {
	description: "<b>转换技</b>，<b>锁定技</b>，准备阶段，阳：你摸两张牌。阴：你弃置两张牌。",
	voices: [
		"（涨潮声）",
		"（退潮声）",
	],
	skill: {
		/** @type {import("../../../utils/type.ts").LogAudioFunc} */
		logAudio(event, player, name, indexedData, evt) {
			const idx = player.storage.spr_chaoxi ? 2 : 1;
			return `${URL.SKILL_AUDIO}/spr_chaoxi${idx}.mp3`;
		},
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		forced: true,
		intro: {
			content(storage, player, skill) {
				return "<b>锁定技</b>，准备阶段，" +
					`${storage ? "你弃置两张牌。" : "你摸两张牌。"}`;
			},
		},
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		async content(event, trigger, player) {
			player.changeZhuanhuanji(event.name);
			if (player.storage.spr_chaoxi) {
				await player.draw(2);
			} else {
				await player.chooseToDiscard({
					forced: true,
					prompt: "潮汐：你须弃置两张牌",
					selectCard: 2,
					position: "he",
				});
			}
		},
	},
});
