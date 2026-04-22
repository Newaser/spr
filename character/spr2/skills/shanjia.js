import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 获取当前玩家可使用的所有某个牌名的虚拟牌
 * @param {Player} player 
 * @param {string} cardname 
 * @returns {string[][]}
 */
function getUsableVcards(player, cardname) {
	return get
		.inpileVCardList((/** @type {any[]} */ info) => info[2] === cardname)
		.filter(info => {
			const vcard =
				new lib.element.VCard({ name: cardname, nature: info[3] });
			return player.hasUseTarget(vcard, false);
		});
}

export default new SkillData("spr_shanjia|缮甲", {
	description:
		"每名角色的结束阶段，你摸一张牌并选择一项：弃置一张牌；使用一张装备牌。" +
		"若你因此失去了装备区内的牌，你可以视为使用一张无距离限制的【杀】。",
	voices: [
		"不备不虞，不可以师！",
		"缮五方之兵，得攻敌之胜！",
		"（虎啸声）",
	],
	skill: {
		logAudio: util.logSkillAudio("spr_shanjia", [1, 2]),
		trigger: {
			global: "phaseJieshuBegin",
		},
		forced: true,
		locked: false,
		async content(event, trigger, player) {
			await player.draw();
			player.storage.spr_shanjia = true;
			const result = await player.chooseToUse({
				prompt: "缮甲：请使用一张装备牌，或点“取消”改为弃置一张牌",
				filterCard(card, player, event) {
					if (get.type(card) != "equip") return false;
					return lib.filter.filterCard(card, player, event);
				},
			}).forResult();
			if (!result.bool) {
				await player.chooseToDiscard({
					forced: true,
					prompt: "缮甲：请弃置一张牌，若为装备则你可以视为使用【杀】",
					position: "he",
				});
			}
			delete player.storage.spr_shanjia;
		},
		group: "spr_shanjia_sha",
		subSkill: {
			sha: {
				popup: false,
				logAudio: util.logSkillAudio("spr_shanjia", 3),
				trigger: {
					player: "loseAfter",
					global: [
						"equipAfter",
						"addJudgeAfter",
						"gainAfter",
						"loseAsyncAfter",
						"addToExpansionAfter",
					],
				},
				filter(event, player, name, target) {
					if (player.storage.spr_shanjia !== true)
						return false;
					const usableShas = getUsableVcards(player, "sha");
					if (usableShas.length == 0) return false;
					/** @type {GameEvent} */
					const evt = event.getl(player);
					return evt?.player == player &&
						evt.es?.length > 0;
				},
				async cost(event, trigget, player) {
					const usableShas = getUsableVcards(player, "sha");
					/** @type {Result} */
					const result = await player.chooseButton({
						createDialog: [
							"缮甲：你可以视为使用【杀】",
							"<div class=\"text center\">无距离限制</div>",
							[usableShas, "vcard"],
						],
						ai(button) {
							const card = new lib.element.VCard({
								name: "sha",
								nature: button.link[3],
							});
							return player.getUseValue(card, false);
						},
					}).forResult();
					if (result.bool) {
						event.result = {
							bool: true,
							cost_data: {
								nature: result.links[0][3],
							},
						};
					}
				},
				async content(event, trigget, player) {
					delete player.storage.spr_shanjia;
					const evt = player.chooseUseTarget({
						forced: true,
						// @ts-expect-error card可以这样取值
						card: {
							name: "sha",
							nature: event.cost_data.nature,
							isCard: true,
						},
						nopopup: true,
						nodistance: true,
					});
					evt.logSkill = "spr_shanjia_sha";
					await evt;
				},
			},
		},
	},
});
