import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

const descs = [
	"当你使用基本牌指定目标后，你可以摸一张牌。",
	"当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。",
];

/**
 * @param {Boolean} storage 
 * @returns {string}
 */
function getDesc(storage) {
	return !storage ? descs[0] : descs[1];
}

export default new SkillData("spr_shigong|恃功", {
	description: `<b>转换技</b>，阳：${descs[0]}阴：${descs[1]}`,
	voices: [
		"此战，难道不全凭我计策精妙？",
		"阿瞒帐下谋臣如云，哪个有我这般功绩？",
	],
	skill: {
		/** @type {import("../../../utils/type.ts").LogAudioFunc} */
		logAudio(event, player, name, indexedData, evt) {
			const idx = !player.storage.spr_shigong ? 1 : 2;
			return `${URL.SKILL_AUDIO}/spr_shigong${idx}.mp3`;
		},
		mark: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: {
			content: (storage, player, skill) => getDesc(storage),
		},
		trigger: {
			player: "useCardToPlayered",
			target: "useCardToTargeted",
		},
		filter(event, player, name, target) {
			if (!player.storage.spr_shigong) {
				return name == "useCardToPlayered" &&
					get.type(event.card) == "basic";
			}
			return name == "useCardToTargeted" &&
				get.type(event.card) == "trick" &&
				event.player.countCards("he") > 0;

		},
		async cost(event, trigger, player) {
			const to = trigger.player;
			/** @type {Result} */
			event.result = await player.chooseBool({
				prompt: !player.storage.spr_shigong ?
					get.prompt("spr_shigong") :
					get.prompt("spr_shigong", to),
				prompt2: getDesc(player.storage.spr_shigong),
				ai(event, player) {
					if (!player.storage.spr_shigong)
						return true;
					return get.attitude(player, to) <= 0;
				},
			}).forResult();
			if (event.result.bool && player.storage.spr_shigong) {
				event.result.targets = [to];
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
			effect: {
				player(card, player, target, result1) {
					if (!player.storage.spr_shigong &&
						get.type(card) == "basic")
						return [1, 1];
				},
				target(card, player, target, result2) {
					if (!target.hasFriend())
						return;
					if (target.storage.spr_shigong &&
						get.type(card) == "trick")
						return [1, 0, 1, -1];
				},
			},
		},
	},
});
