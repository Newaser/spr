import { lib, game, ui, get, ai, _status } from "../../noname.js";
import { content } from "./main/content.js";
import { precontent } from "./main/precontent.js";

const extensionInfo = await lib.init.promises.json(`${lib.assetURL}extension/☆SPR/info.json`);

/** @type {importExtensionConfig} */
const extension = {
  name: "",
  editable: false,
  config: {},
  package: {},
  content,
  precontent,
};

extension.name = extensionInfo.name;
Object
  .keys(extensionInfo)
  .filter(key => key !== "name")
  .forEach(key => {
    extension.package[key] = extensionInfo[key];
  });

export const type = "extension";
export default extension;
