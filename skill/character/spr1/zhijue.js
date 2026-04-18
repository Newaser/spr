import { SkillData } from "../../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_zhijue|智绝", {
	description: "每回合每种智囊各限一次，你可以将一张牌当任意智囊使用。",
	voices: [
		"已有胜算七成，此策当再添三分。",
		"以今日之时局，唯以此策解之。",
		"尽料敌计，使其无计可施。",
	],
	skill: {
		audio: "ext:☆SPR/audio/skill:3",
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
				/**@type {Skill} */
				const viewAsSkill = {
					// audio: true,
					selectCard: 1,
					filterCard: true,
					position: "hes",
					popname: true,
					/**  @param {Card} card  */
					ai1(card) {
						return 7 - get.value(card);
					},
					viewAs: {
						name: links[0][2],
					},
					onuse(result, player) {
						player.storage.spr_zhijue_used.push(links[0][2]);
						const idx = ["wuzhong", "guohe", "wuxie"].indexOf(links[0][2]) + 1;
						game.broadcastAll(() => {
							// @ts-expect-error lib.config为动态加入，不能被ts解析
							if (lib.config.background_speak)
								game.playAudio({ path: `ext:☆SPR/audio/skill/spr_zhijue${idx}.mp3` });
						});
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
