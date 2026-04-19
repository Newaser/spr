import { lib } from "../../../noname.js";

export const EXTENSION = {
	ID: "spr",
	NAME: "☆SPR",
	NAME_PREFIX: "星",
};

export const URL = {
	PACKAGE_INFO: `${lib.assetURL}extension/${EXTENSION.NAME}/info.json`,
	CHARACTER_IMAGE: {
		STANDARD: `${lib.assetURL}extension/${EXTENSION.NAME}/image/character`,
	},
	DIE_AUDIO: `ext:${EXTENSION.NAME}/audio/die`,
	SKILL_AUDIO: `ext:${EXTENSION.NAME}/audio/skill`,
};

export const STYLE = {
	EXTENSION_NAME_PREFIX: { color: "#FFECB3", nature: "soilmm" },
};
