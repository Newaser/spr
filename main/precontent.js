import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import { Character } from "../../../noname/library/element/index.js";
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
    translate = {};

  for (let pkg of characterPkgs) {
    let sort = [];
    for (let characterData of pkg.dataset) {
      let info = characterData.getInfo();
      character[characterData.id] = info.character;
      character[characterData.id].img =
        "extension/☆SPR/image/character/standard/" + characterData.id + ".jpg";
      character[characterData.id].dieAudios =
        ["ext:☆SPR/audio/die/" + characterData.id + ".mp3"];
      if (info.intro !== undefined) {
        characterIntro[characterData.id] = info.intro;
      }
      if (info.title !== undefined) {
        characterTitle[characterData.id] = info.title;
      }
      sort.push(characterData.id);
    }
    characterSort.spr[pkg.id] = sort;
    Object.assign(translate, pkg.getTranslates());
  }

  for (let characterSkill of characterSkills) {
    skill[characterSkill.id] = characterSkill.getInfo().skill;
    Object.assign(translate, characterSkill.getTranslates());
  }

  game.import("character", function () {
    /** @type {importCharacterConfig} */
    let config = {
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
  lib.namePrefix.set('星', { color: '#FFECB3', nature: 'soilmm' })
}
