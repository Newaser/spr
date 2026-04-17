import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import characterPkgs from "../package/character/index.js";

/** @type {importExtensionConfig['content']} */
export const content = (config, pack) => {
	for (const pkg of characterPkgs) {
		for (const characterData of pkg.dataset) {
			const info = characterData.getInfo();

			// character rank
			const rank = /** @type {any} */ (lib).rank;
			if (rank) {
				if (info.rank) {
					rank[info.rank].push(characterData.id);
				}
				if (rank.rarity && info.rarity) {
					rank.rarity[info.rarity].push(characterData.id);
				}
			}

			// custom skill audio
			if (info.audioRedirect !== undefined) {
				for (const skillId in info.audioRedirect) {
					if (!lib.skill[skillId].audioname2) {
						lib.skill[skillId].audioname2 = {};
					}
					lib.skill[skillId].audioname2[characterData.id] = `${skillId}__${characterData.id}`;
				}
			}
		}
	}
};
