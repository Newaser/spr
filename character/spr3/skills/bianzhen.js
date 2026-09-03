import { SkillData } from "../../../utils/import.js";
import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";

export default new SkillData("spr_bianzhen|变阵", {
	description: "每轮限一次，一名角色的回合开始时，你可以调整本回合额定阶段的顺序并声明之。",
	voices: [
		"时以进而取之，无则磨锋以待。",
		"将者，上不制（于）天，下不制（于）地，中不制（于）人。",
	],
	skill: {
		round: 1,
		trigger: {
			global: "phaseBegin",
		},
		filter(event, player, name, indexedData) {
			return event.phaseList?.length > 1;
		},
		async content(event, trigger, player) {
			const
				filter = phase => lib.phaseName.includes(phase),
				standardPhases = trigger.phaseList.map((name, index) => [index + 1, "", name]).filter(info => filter(info[2]));
			const result = await player.chooseToMove({
				forced: true,
				prompt: "变阵：请调整本回合额定阶段顺序",
				list: [
					[
						"额定阶段",
						[
							standardPhases,
							(item, type, position, noclick, node) => {
								const showCard = [item[0], item[1], `lusu_${item[2]}`];
								node = ui.create.buttonPresets.vcard(showCard, type, position, noclick);
								node.node.info.innerHTML = `<span style = "color:#ffffff">${item[0]}</span>`;
								node.node.info.style["font-size"] = "20px";
								node._link = node.link = item;
								node._customintro = uiintro => {
									uiintro.add(get.translation(node._link[2]));
									uiintro.addText(`此阶段为本回合第${get.cnNumber(node._link[0], true)}个阶段`);
									return uiintro;
								};
								return node;
							},
						],
					],
				],
			}).forResult();
			if (!result?.bool || !result.moved?.length) {
				return;
			}
			result.moved[0].forEach((info, index) => {
				const name = info[2];
				const newIndex = standardPhases[index][0] - 1;
				trigger.phaseList[newIndex] = name;
			});
		},
	},
});
