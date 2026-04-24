import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 获取冲阵的目标
 * @param {GameEvent} trigger
 * @returns {Player}
 */
function getChongzhenTarget(trigger) {
	if (trigger.name == "respond") {
		return trigger.source;
	}
	if (trigger.card.name == "sha") {
		return trigger.targets[0];
	}
	return trigger.respondTo[0];
}

/**
 * 判断两名玩家之间是否满足驰越条件
 * @param {Player} from 技能发动者
 * @param {Player} to 驰越目标
 * @returns {boolean}
 */
function canChiyue(from, to) {
	return get.distance(from, to) <= 1 &&
		get.distance(to, from) > 1;
}

export default new SkillData("spr_chongzhen|冲阵", {
	description:
		`当你发动${get.poptip("longdan")}时，你可以获得对方一张牌。` +
		`<i>${get.poptip("spr_chiyue")}：弃置此牌，对其造成1点伤害。</i>`,
	voices: [
		"单骑冲阵，力挽狂澜！",
		"久闻袁氏威名，某今便一试！",
	],
	texts: {
		"(poptip)spr_chiyue|驰越":
			"当你对一名角色发动一个效果后，若你与其距离1以内，" +
			"且其与你距离1以外，你可以发动“驰越”对应的效果。",
	},
	skill: {
		inherit: "chongzhen",
		prompt2(event, player) {
			const to = getChongzhenTarget(event);
			return `获得${get.translation(to)}的一张牌`;
		},
		check(event, player) {
			const to = getChongzhenTarget(event);
			return get.attitude(player, to) <= 0;
		},
		async content(evnet, trigger, player) {
			const to = getChongzhenTarget(trigger);
			/** @type {Result} */
			const result1 = await player.gainPlayerCard({
				forced: true,
				target: to,
				position: "he",
			}).forResult();

			if (canChiyue(player, to) && to.isIn()) {
				/** @type {Result} */
				const result2 = await player.chooseBool({
					prompt: get.prompt("spr_chongzhen", to),
					prompt2: "驰越：弃置获得的牌，对其造成1点伤害",
					ai(event, player) {
						return get.attitude(player, to) < 0 &&
							get.value(result1.cards[0], player) <= 7.5;
					},
				}).forResult();
				if (result2.bool) {
					await player.discard({ cards: result1.cards });
					await to.damage();
				}
			}
		},
	},
});
