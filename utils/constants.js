import { lib } from "../../../noname.js";

export const EXTENSION = {
	ID: "spr",
	NAME: "☆SPR",
	NAME_PREFIX: "星",
};

export const QHLY_NAME = "千幻聆音";

export const URL = {
	PACKAGE_INFO: `${lib.assetURL}extension/${EXTENSION.NAME}/info.json`,
	CHARACTER_IMAGE: {
		STANDARD: `${lib.assetURL}extension/${EXTENSION.NAME}/image/character/standard`,
		MOBILE: `${lib.assetURL}extension/${EXTENSION.NAME}/image/character/mobile`,
	},
	DIE_AUDIO: `ext:${EXTENSION.NAME}/audio/die`,
	VICTORY_AUDIO: `ext:${EXTENSION.NAME}/qhly-assets/character`,
	SKILL_AUDIO: `ext:${EXTENSION.NAME}/audio/skill`,
	QHLY: {
		CHARACTER_ASSETS: `extension/${EXTENSION.NAME}/qhly-assets/character/`,
	},
};

export const STYLE = {
	EXTENSION_NAME_PREFIX: { color: "#FFECB3", nature: "soilmm" },
};
