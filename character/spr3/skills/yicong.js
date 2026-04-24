import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_yicong|义从", {
	description: "<b>锁定技</b>，若你未受伤，你与其他角色的距离-1；否则，其他角色与你的距离+1。",
	voices: [
		"进退有余，方可立于不败之地。",
		"勇者，以退为进。",
	],
	skill: {
		/** @type {import("../../../utils/type.ts").LogAudioFunc} */
		logAudio(event, player, name, indexedData, evt) {
			const idx = player.isHealthy() ? 1 : 2;
			return `${URL.SKILL_AUDIO}/spr_yicong${idx}.mp3`;
		},
		trigger: {
			player: ["changeHpAfter", "gainMaxHpEnd", "loseMaxHpEnd"],
		},
		forced: true,
		filter(event, player, name, target) {
			if (player.storage.nohp) return false;

			const preHealthy = player.storage.spr_yicong;
			if (preHealthy === undefined) return false;
			delete player.storage.spr_yicong;

			const nowHealthy = Boolean(player.isHealthy());
			return preHealthy != nowHealthy;
		},
		async content(event, trigger, player) { },
		group: "spr_yicong_record",
		subSkill: {
			record: {
				charlotte: true,
				trigger: {
					player: ["changeHpBegin", "gainMaxHpBegin", "loseMaxHpBegin"],
				},
				direct: true,
				async content(event, trigger, player) {
					player.storage.spr_yicong = Boolean(player.isHealthy());
				},
			},
		},
		mod: {
			globalFrom(from, to, current) {
				if (from.isHealthy()) {
					return current - 1;
				}
			},
			globalTo(from, to, current) {
				if (to.isDamaged()) {
					return current + 1;
				}
			},
		},
		ai: {
			threaten: 0.9,
		},
	},
});
