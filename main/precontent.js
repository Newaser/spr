import { lib, game, ui, get, ai, _status } from "../../../noname.js";
import "../character/index.js"; // 适用于简单、无依赖、非异步场景

/** @type {importExtensionConfig['precontent']} */
export const precontent = (data) => {
	lib.translate.spr_character_config = "☆SPR";
}
