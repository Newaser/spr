import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { Character } from "../../../noname/library/element/index.js";
import { SkillData } from "../import/structs.js";
import characterPkgs from "../package/character/index.js";
import characterSkills from "../skill/character/index.js";

/** @type {importExtensionConfig['precontent']} */
export const precontent = (data) => {
	// add characters
	const
		/** @type {Record<string, Character>} */
		character = {},

		/** @type {Record<string, string>} */
		characterIntro = {},

		/** @type {Record<string, string>} */
		characterTitle = {},

		/** @type {Record<string, Record<string, string[]>>} */
		characterSort = { spr: {} },

		/** @type {Record<string, Skill>} */
		skill = {},

		/** @type {Record<string, string>} */
		translate = {},

		/** @type {SkillData[]} */
		audioRedirectSkills = [];

	for (const pkg of characterPkgs) {
		const sort = [];
		for (const characterData of pkg.dataset) {
			const info = characterData.getInfo();
			character[characterData.id] = info.character;
			character[characterData.id].img =
        `extension/☆SPR/image/character/${  characterData.id  }.jpg`;
			character[characterData.id].dieAudios =
        [`ext:☆SPR/audio/die/${  characterData.id  }.mp3`];
			if (info.intro !== undefined) {
				characterIntro[characterData.id] = info.intro;
			}
			if (info.title !== undefined) {
				characterTitle[characterData.id] = info.title;
			}
			sort.push(characterData.id);
			if (info.audioRedirect !== undefined) {
				for (const skillId in info.audioRedirect) {
					audioRedirectSkills.push(new SkillData(`${skillId  }__${  characterData.id}`, {
						voices: info.audioRedirect[skillId],
						skill: {
							audio: `ext:☆SPR/audio/skill:${  info.audioRedirect[skillId].length}`,
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
		};
		return config;
	});

	lib.translate.spr_character_config = "☆SPR";

	// set name prefix style
	lib.namePrefix.set("星", { color: "#FFECB3", nature: "soilmm" });
};
