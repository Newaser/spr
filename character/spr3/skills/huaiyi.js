import * as util from "../../../utils/util.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 
 * @param {string} group
 * @param {Player} player 
 * @returns {number}
 */
function getOthersNum(group, player) {
	return game.countPlayer(i => i != player && i.group == group);
}

export default new SkillData("spr_huaiyi|怀异", {
	description:
		`出牌阶段每项各限一次，你可以：视为对任意名同势力角色使用一张${get.poptip("chenghuodajie")}；` +
		"变更势力，然后视为对任意名原势力角色使用一张【过河拆桥】。",
	voices: [
		"天下苍生攘攘，何人不为利往？",
		"假诱东吴，进图曹魏！",
		"大丈夫，岂能久居人下？",
		"一生纵横，怎可对他人称臣？",
	],
	skill: {
		group: ["spr_huaiyi_chenhuo", "spr_huaiyi_guohe"],
		subSkill: {
			chenhuo: {
				logAudio: util.logSkillAudio("spr_huaiyi", [1, 2]),
				enable: "phaseUse",
				usable: 1,
				selectTarget: [1, Infinity],
				filterTarget(card, player, target) {
					return target.group == player.group &&
						player.canUse({ name: "chenghuodajie", isCard: true }, target);
				},
				multitarget: true,
				prompt: "对任意名与你势力相同的角色视为使用一张【趁火打劫】",
				async content(event, trigger, player) {
					await player.useCard({
						//@ts-expect-error 可以的
						card: { name: "chenghuodajie", isCard: true },
						targets: event.targets.sortBySeat(_status.currentPhase),
					});
				},
				ai: {
					order(item, player) {
						return get.order({ name: "chenghuodajie" });
					},
					result: {
						target(player, target, card) {
							return get.effect(target, { name: "chenghuodajie", isCard: true }, player, target);
						},
					},
				},
			},
			guohe: {
				logAudio: util.logSkillAudio("spr_huaiyi", [3, 4]),
				enable: "phaseUse",
				usable: 1,
				prompt: "变更势力，然后对任意名原势力角色视为使用一张【过河拆桥】",
				filter(event, player, name, target) {
					return lib.group.some(i => i != player.group);
				},
				async content(event, trigger, player) {
					const controls = lib.group.filter(i => i != player.group);
					/** @type {Result} */
					const result1 = await player.chooseControl({
						prompt: "怀异：请选择你要变至的势力",
						controls,
						ai(event, player) {
							const nums = controls.map(i => getOthersNum(i, player));
							const max = Math.max(...nums);
							const bestControls = controls.filter(i => getOthersNum(i, player) == max);
							return bestControls.randomGet();
						},
					}).forResult();

					console.log(`result1: ${result1.control}`);

					const preGroup = player.group;
					await player.changeGroup(result1.control);

					const tos = game.filterPlayer(i => {
						return i.group == preGroup &&
							player.canUse({ name: "guohe", isCard: true }, i);
					});

					if (tos.length == 0) return;

					/** @type {Result} */
					const result2 = await player.chooseTarget({
						forced: true,
						prompt: "怀异：你须对任意名原势力角色使用一张【过河拆桥】",
						selectTarget: [1, Infinity],
						filterTarget(card, player, target) {
							return tos.includes(target);
						},
						ai(target) {
							return get.effect(target, { name: "guohe", isCard: true }, player, player);
						},
					}).forResult();

					await player.useCard({
						//@ts-expect-error 可以的
						card: { name: "guohe", isCard: true },
						targets: result2.targets.sortBySeat(_status.currentPhase),
					});
				},
				ai: {
					order(item, player) {
						return get.order({ name: "chenghuodajie" }) - 0.1;
					},
					result: {
						player: 1,
					},
				},
			},
		},
	},
});
