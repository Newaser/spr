import { EXTENSION } from "./constants.js";
import { config } from "./main/config.js";
import { packageData } from "./main/package.js";
import { content } from "./main/content.js";
import { precontent } from "./main/precontent.js";

/** @type {importExtensionConfig} */
const extension = {
	name: EXTENSION.NAME,
	editable: false,
	config,
	package: packageData,
	content,
	precontent,
};

export const type = "extension";
export default extension;
