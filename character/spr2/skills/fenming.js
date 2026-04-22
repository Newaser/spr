import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

/**
 * 获得玩家除了某个技能的所有其他武将技能
 * @param {Player} player 
 * @param {string} excluded 被排除的技能名
 * @returns {string[]} 所有其他武将技能名
 */
function getCharacterSkillsExcept(player, excluded) {
	/** @type {Set<string>} */
	const ret = new Set();;
	for (const name of [player.name, player.name1, player.name2]) {
		const character = lib.character[name];
		if (character) {
			for (const skill of character.skills) {
				if (skill != excluded && player.hasSkill(skill)) {
					ret.add(skill);
				}
			}
		}
	}
	return [...ret];
}

export default new SkillData("spr_fenming|奋命", {
	description:
		"当你对其他角色造成伤害后，你可以失去1点体力或" +
		"武将牌上的一个其他技能，然后获得其一张牌。",
	voices: [
		"江东尽铁血男儿，可死不可退也！",
		"合肥一役，吾等必拼死效力！",
	],
	skill: {
		trigger: {
			source: "damageEnd",
		},
		filter(event, player, name, target) {
			return event.player != player &&
				event.player.isIn() &&
				event.player.countCards("he") > 0 &&
				(player.hp > 0 ||
					getCharacterSkillsExcept(player, "spr_fenming").length > 0);
		},
		async cost(event, trigger, player) {
			const controls = [];
			if (player.hp > 0) {
				controls.push("失去体力");
			}
			for (const skill of getCharacterSkillsExcept(player, "spr_fenming")) {
				controls.push(skill);
			}
			controls.push("cancel2");
			/** @type {Result} */
			const result = await player.chooseControl({
				prompt: get.prompt("spr_fenming"),
				prompt2: get.skillInfoTranslation("spr_fenming"),
				controls,
				ai(event, player) {
					const skills = controls.slice(1, -1);
					if (get.attitude(player, trigger.player) > 0 ||
						skills.length == 0)
						return "cancel2";
					if (player.hp > 1)
						return "失去体力";
					return skills.randomGet();
				},
			}).forResult();
			if (result.control != "cancel2") {
				event.result = {
					bool: true,
					cost_data: { control: result.control },
				};
			}
		},
		async content(event, trigger, player) {
			/** @type {string} */
			const control = event.cost_data.control;
			if (control == "失去体力") {
				await player.loseHp();
			} else {
				player.removeSkill(control);
			}
			await player.gainPlayerCard({
				forced: true,
				target: trigger.player,
			});
		},
	},
});
