import { SkillData } from "../../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shouye|守邺", {
	description:
		"<b>转换技</b>，阳：当你受到伤害后，你可以回复2点体力。阴：当你造成伤害后，你可以弃置至多两名角色各一张牌。",
	voices: [
		"敌军攻势渐殆，还望诸位依策坚守。",
		"袁幽州不日便至，当行策建功以报之。",
		"今伐曹氏，譬如覆手之举。",
		"十，则围之；五，则攻之。",
	],
	skill: {
		audio: "ext:☆SPR/audio/skill:4",
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: {
			content(storage, player, skill) {
				return storage ?
					"当你造成伤害后，你可以弃置至多两名角色各一张牌。" :
					"当你受到伤害后，你可以回复2点体力。";
			},
		},
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		filter(event, player, name, target) {
			if (name == "damageEnd") {
				return !player.storage.spr_shouye && player.isDamaged();
			}
			if (name == "damageSource") {
				return player.storage.spr_shouye;
			}
		},
		async cost(event, trigger, player) {
			if (!player.storage.spr_shouye) {
				event.result = await player.chooseBool({
					prompt: get.prompt("spr_shouye"),
					prompt2: "当你受到伤害后，你可以回复2点体力。",
					ai: (event, player) => {
						return player.maxHp < 3 || player.getDamagedHp() >= 2;
					},
				}).forResult();
			} else {
				event.result = await player.chooseTarget({
					prompt: get.prompt("spr_shouye"),
					prompt2: "当你造成伤害后，你可以弃置至多两名角色各一张牌。",
					filterTarget: (card, player, target) => {
						return target.countCards("he") > 0;
					},
					selectTarget: [1, 2],
					ai: target => {
						return 1 - get.attitude(get.player(), target);
					},
				}).forResult();
			}
		},
		/**
		 * @param {GameEvent} event 
		 * @param {Player} player 
		 * @param {string} name trigger name
		 * @param {number} indexedData 
		 * @param {GameEvent} evt cost result
		 */
		logAudio(event, player, name, indexedData, evt) {
			let idx = [1, 2].randomGet();
			if (player.storage.spr_shouye) idx += 2;
			return `ext:☆SPR/audio/skill/spr_shouye${idx}.mp3`;
		},
		async content(event, trigger, player) {
			player.changeZhuanhuanji("spr_shouye");
			if (player.storage.spr_shouye) {
				await player.recover({ num: 2 });
			} else {
				for (const target of event.targets.sortBySeat(_status.currentPhase)) {
					await player.discardPlayerCard({
						forced: true,
						target: target,
					});
				}
			}
		},
		ai: {
			threaten(player) {
				if (player.storage.spr_shouye === false)
					return 0.9;
			},
			skillTagFilter(player, tag, arg) {
				return !player.storage.spr_shouye;
			},
			tag: {
				"maixie_defend": 1,
			},
		},
	},
});
