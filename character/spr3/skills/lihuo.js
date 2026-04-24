import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

const viewAsCard = {
	name: "sha",
	nature: "fire",
	storage: {
		spr_lihuo: true,
	},
};

export default new SkillData("spr_lihuo|疠火", {
	description:
		"你可以将一张红色牌当可指定X个目标的火【杀】使用（X为你的体力上限），" +
		`然后发动${get.poptip("benghuai")}。`,
	voices: [
		"结石投火，以诛逆贼！",
		"临阵叛军者，焚其尸骨！",
	],
	skill: {
		hiddenCard(player, name) {
			if (player.countCards("hes", { color: "red" }) > 0)
				return name == "sha";
		},
		enable: "chooseToUse",
		filterCard(card, player) {
			return get.color(card, player) == "red";
		},
		position: "hes",
		viewAs: viewAsCard,
		filter(event, player, name, target) {
			return event.filterCard(viewAsCard, player, event) &&
				player.countCards("hes", { color: "red" }) > 0;
		},
		prompt(event, player) {
			return `将一张红色牌当可指定至多${player.maxHp}个目标的火【杀】使用，` +
				`然后${get.poptip("benghuai")}`;
		},
		group: "spr_lihuo_benghuai",
		subSkill: {
			benghuai: {
				charlotte: true,
				direct: true,
				trigger: {
					player: "useCardAfter",
				},
				filter(event, player, name, target) {
					return event.card.storage?.spr_lihuo === true;
				},
				async content(event, trigger, player) {
					await player.useSkill({ skill: "benghuai" });
				},
			},
		},
		mod: {
			selectTarget(card, player, range) {
				if (card.storage?.spr_lihuo && range[1] != -1)
					range[1] += player.maxHp - 1;
			},
		},
		ai: {
			respondSha: true,
		},
		derivation: "benghuai",
	},
});
