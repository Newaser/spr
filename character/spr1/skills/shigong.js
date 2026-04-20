import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_shigong|恃功", {
	description:
		"<b>转换技</b>，阳：当你使用基本牌指定目标后，你可以摸一张牌。" +
		"阴：当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。",
	voices: [
		"此战，难道不全凭我计策精妙？",
		"阿瞒帐下谋臣如云，哪个有我这般功绩？",
	],
	skill: {
		/** @type {import("../../../utils/type.ts").LogAudioFunc} */
		logAudio(event, player, name, indexedData, evt) {
			const idx = player.storage.spr_shigong ? 2 : 1;
			return `${URL.SKILL_AUDIO}/spr_shigong${idx}.mp3`;
		},
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: {
			content(storage, player, skill) {
				return storage ?
					"当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。" :
					"当你使用基本牌指定目标后，你可以摸一张牌。";
			},
		},
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player, name, target) {
			if (name == "useCardToPlayered") {
				return !player.storage.spr_shigong &&
					get.type(event.card) == "basic";
			}
			if (name == "useCardToTargeted") {
				return player.storage.spr_shigong &&
					get.type(event.card) == "trick" &&
					event.player.countCards("he");
			}
		},
		check(event, player, triggername, target) {
			if (player.storage.spr_shigong) {
				return get.attitude(player, event.player) <= 0;
			}
			return true;
		},
		prompt2(event, player) {
			return player.storage.spr_shigong ?
				"当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。" :
				"当你使用基本牌指定目标后，你可以摸一张牌。";
		},
		logTarget(event, player, triggername, target) {
			if (event && player && player.storage.spr_shigong) {
				return event.player;
			}
			return player;
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseBool({
				prompt: player.storage.spr_shigong ?
					get.prompt("spr_shigong", trigger.player) :
					get.prompt("spr_shigong"),
				prompt2: player.storage.spr_shigong ?
					"当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。" :
					"当你使用基本牌指定目标后，你可以摸一张牌。",
			}).forResult();
			if (event.result.bool && player.storage.spr_shigong) {
				event.result.targets = [trigger.player];
			}
		},
		async content(event, trigger, player) {
			player.changeZhuanhuanji("spr_shigong");
			if (player.storage.spr_shigong) {
				await player.draw();
			} else {
				await trigger.player.chooseToDiscard({
					forced: true,
					position: "he",
				});
			}
		},
		ai: {
			expose: 0.3,
			effect: {
				player(card, player, target, result1) {
					if (player.storage.spr_shigong) return;
					if (get.type(card) == "basic")
						return [1, 1];
				},
				target(card, player, target, result2) {
					if (!target.storage.spr_shigong &&
						!target.storage.gettingQingmanResult)
						return;
					if (get.type(card) == "trick")
						return [1, 0, 1, -1];
				},
			},
		},
	},
});
