import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { Character } from "../../../noname/library/element/index.js";
import { SkillData } from "../util/import.js";
import characterPkgs from "../package/character/index.js";
import characterSkills from "../skill/character/index.js";

/** @type {importExtensionConfig['precontent']} */
export const precontent = (data) => {
	// add characters
	const
		/** @type {importCharacterConfig['character'] & Record<string, Character>} */
		character = {},

		/** @type {importCharacterConfig['characterIntro']} */
		characterIntro = {},

		/** @type {importCharacterConfig['characterTitle']} */
		characterTitle = {},

		/** @type {importCharacterConfig['characterSort']} */
		characterSort = { spr: {} },

		/** @type {importCharacterConfig['skill']} */
		skill = {},

		/** @type {importCharacterConfig['translate']} */
		translate = {},

		/** @type {importCharacterConfig['dynamicTranslate']} */
		dynamicTranslate = {},

		/** @type {SkillData[]} */
		audioRedirectSkills = [];

	for (const pkg of characterPkgs) {
		const sort = [];
		for (const characterData of pkg.dataset) {
			const info = characterData.getInfo();
			character[characterData.id] = info.character;
			character[characterData.id].img =
				`extension/☆SPR/image/character/${characterData.id}.jpg`;
			character[characterData.id].dieAudios =
				[`ext:☆SPR/audio/die/${characterData.id}.mp3`];
			if (info.intro !== undefined) {
				characterIntro[characterData.id] = info.intro;
			}
			if (info.title !== undefined) {
				characterTitle[characterData.id] = info.title;
			}
			sort.push(characterData.id);
			if (info.audioRedirect !== undefined) {
				for (const skillId in info.audioRedirect) {
					audioRedirectSkills.push(new SkillData(`${skillId}__${characterData.id}`, {
						voices: info.audioRedirect[skillId],
						skill: {
							audio: `ext:☆SPR/audio/skill:${info.audioRedirect[skillId].length}`,
						},
					}));
				}
			}
		}
		characterSort.spr[pkg.id] = sort;
		Object.assign(translate, pkg.getTranslates());
	}

	for (const characterSkill of characterSkills.concat(audioRedirectSkills)) {
		skill[characterSkill.id] = characterSkill.getInfo().skill;
		Object.assign(translate, characterSkill.getTranslates());
		const dynamicDesc = characterSkill.getDynamicTranslate();
		if (dynamicDesc !== undefined) {
			dynamicTranslate[characterSkill.id] = dynamicDesc;
		}
	}

	game.import("character", function () {
		/** @type {importCharacterConfig} */
		const config = {
			name: "spr",
			character,
			characterIntro,
			characterTitle,
			characterSort,
			skill,
			translate,
			dynamicTranslate,
		};
		return config;
	});

	lib.translate.spr_character_config = "☆SPR";

	// set name prefix style
	lib.namePrefix.set("星", { color: "#FFECB3", nature: "soilmm" });
};
