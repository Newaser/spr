import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * @returns {string[]}
 */
function getDamageCommonTricks() {
	return lib.inpile.filter(i => {
		//@ts-expect-error damageCard可以这样传参
		return get.is.damageCard({ name: i }) &&
			get.type(i) == "trick";
	});
}

/**
 * @param {Player} player 
 * @returns {Array}
 */
function getOptTrick(player) {
	const tricks = getDamageCommonTricks();
	tricks.sort((a, b) => {
		return player.getUseValue(b) - player.getUseValue(a);
	});
	return [tricks[0], player.getUseValue(tricks[0])];
}

export default new SkillData("spr_yaoji|要计", {
	description: "每回合限一次，你可以视为使用一张伤害类普通锦囊牌，并令此技能失效至你杀死一名角色。",
	voices: [
		"刚德克就，执心决断！",
		"你们的戏码已经结束，现在到我了。",
		"九幽泉下，是你最好的归宿。",
	],
	skill: {
		enable: "chooseToUse",
		usable: 1,
		hiddenCard(player, name) {
			if (!player.isTempBanned("spr_yaoji")) {
				return getDamageCommonTricks().some(i => name == i);
			}
		},
		filter(event, player, name, target) {
			return !player.isTempBanned("spr_yaoji") &&
				getDamageCommonTricks().some(i =>
					event.filterCard({ name: i, isCard: true }, player, event));
		},
		chooseButton: {
			dialog(event, player) {
				const list = getDamageCommonTricks().filter(i =>
					event.filterCard({ name: i, isCard: true }, player, event));
				return ui.create.dialog([list, "vcard"]);
			},
			check(button) {
				const player = get.player();
				return player.getUseValue(button.link[2]);
			},
			backup(links, player) {
				/** @type {string} */
				const cardname = links[0][2];
				/** @type {Skill} */
				const viewAsSkill = {
					logAudio: util.logSkillAudio("spr_yaoji", [1, 2]),
					selectCard: -1,
					filterCard: (card, player) => false,
					popname: true,
					viewAs: {
						name: cardname,
						isCard: true,
					},
					onuse(result, player) {
						player.tempBanSkill("spr_yaoji", "forever");
						player.addSkill("spr_yaoji_refresh");
					},
				};
				return viewAsSkill;
			},
			prompt(links, player) {
				return `视为使用一张${get.translation(links[0][2])}`;
			},
		},
		subSkill: {
			refresh: {
				charlotte: true,
				forced: true,
				logAudio: util.logSkillAudio("spr_yaoji", 3),
				trigger: { source: "die" },
				async content(event, trigger, player) {
					game.log(
						player,
						"的技能",
						`【${get.translation("spr_yaoji")}】`,
						"恢复了",
					);
					delete player.storage["temp_ban_spr_yaoji"];
					player.removeSkill(event.name);
				},
			},
		},
		ai: {
			order(item, player) {
				const [optTrick] = getOptTrick(player);
				return get.order({ name: optTrick });
			},
			result: {
				player(player, target, card) {
					const [_, useValue] = getOptTrick(player);
					return useValue;
				},
			},
		},
	},
});
