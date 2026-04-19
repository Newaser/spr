import { URL } from "../../../utils/constants.js";
import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_zhijue|智绝", {
	description:
		`每回合每种${get.poptip("mobile_zhinangs")}各限一次，你可以将一张牌当任意智囊使用。`,
	voices: [
		"已有胜算七成，此策当再添三分。",
		"以今日之时局，唯以此策解之。",
		"尽料敌计，使其无计可施。",
	],
	texts: {
		"(poptip)mobile_zhinangs|智囊": "即【过河拆桥】、【无懈可击】、【无中生有】。",
	},
	skill: {
		enable: "chooseToUse",
		init(player, skill) {
			player.storage.spr_zhijue_used = [];
		},
		hiddenCard(player, name) {
			return (
				player.countCards("he") > 0 &&
				!player.storage.spr_zhijue_used.includes("wuxie") &&
				name == "wuxie"
			);
		},
		filter(event, player, name, target) {
			if (player.countCards("he") == 0) return false;
			for (const zhinang of get.zhinangs()) {
				if (!player.storage.spr_zhijue_used.includes(zhinang) &&
					event.filterCard({ name: zhinang }, player, event)) {
					return true;
				}
			}
			return false;
		},
		chooseButton: {
			dialog(event, player) {
				const list = [];
				for (const zhinang of get.zhinangs()) {
					if (!player.storage.spr_zhijue_used.includes(zhinang) &&
						event.filterCard({ name: zhinang }, player, event)) {
						list.push(zhinang);
					}
				}
				return ui.create.dialog([list, "vcard"]);
			},
			check(button) {
				const parent = _status.event.getParent();
				if (parent && parent.type != "phase") return 1;
				const player = get.player();
				return player.getUseValue(button.link[2]);
			},
			backup(links, player) {
				/** @type {string} */
				const cardname = links[0][2];
				/** @type {Skill} */
				const viewAsSkill = {
					selectCard: 1,
					filterCard: true,
					position: "hes",
					popname: true,
					/**  @param {Card} card  */
					ai1(card) {
						return 7 - get.value(card);
					},
					viewAs: {
						name: cardname,
					},
					/** @type {import("../../../utils/type.ts").LogAudioFunc} */
					logAudio(event, player, name, indexedData, evt) {
						const idx = ["wuzhong", "guohe", "wuxie"].indexOf(cardname) + 1;
						return `${URL.SKILL_AUDIO}/spr_zhijue${idx}.mp3`;
					},
					onuse(result, player) {
						player.storage.spr_zhijue_used.push(cardname);
					},
				};
				return viewAsSkill;
			},
			prompt(links, player) {
				return `将一张牌当作${get.translation(links[0][2])}使用`;
			},
		},
		group: "spr_zhijue_refresh",
		subSkill: {
			refresh: {
				direct: true,
				trigger: {
					global: "phaseAfter",
				},
				async content(event, trigger, player) {
					player.storage.spr_zhijue_used = [];
				},
			},
		},
		ai: {
			order: 7,
			threaten: 2,
			result: {
				player: 1,
			},
		},
	},
});
