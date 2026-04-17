import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import characterPkgs from "../package/character/index.js";

/** @type {importExtensionConfig['content']} */
export const content = (config, pack) => {
  // character rank
  // @ts-ignore `lib.rank` 会因不存在而报错
  let rank = lib.rank
  if (rank) {
    for (let pkg of characterPkgs) {
      for (let characterData of pkg.dataset) {
        rank[characterData.getInfo().rank].push(characterData.id);
        if (rank.rarity) {
          rank.rarity[characterData.getInfo().rarity].push(characterData.id);
        }
      }
    }
  }
  // TODO: custom skill audio
}
