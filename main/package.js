import { lib } from "../../../noname.js";

/** @type {importExtensionConfig['package']} */
export const packageData = {};

const info = await lib.init.promises.json(`${lib.assetURL}extension/☆SPR/info.json`);

packageData.author = `<span class="bluetext">${info.author}</span>`;
packageData.version = info.version;

packageData.intro = `
<span style="text-align: center;">
  <h3 style="color: darkKhaki;">
    始于对☆SP系列武将进行重置，但不止于此。
  </h3>
  <h4 style="color: cyan;">
    扩展交流群：${info.groupId}
  </h4>
</span>
<hr>
<h3 style="text-align: center;">版本信息</h3>
<p>
  扩展版本：v${info.version}
  <br>更新日期：${info.lastUpdated}
  <br>支持的无名杀最低版本：v${info.minNoname}
  ${info.adaptedExts.length > 0 ?
    "<br>适配的其他扩展：" + info.adaptedExts.join('、') : ""}
</p>`;
