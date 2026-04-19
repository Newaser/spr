import { CharacterPackage } from "../utils/import.js";

import spr1 from "./spr1/index.js";
// import spr2 from "./spr2/index.js";
// import spr3 from "./spr3/index.js";

const pkg = new CharacterPackage();

pkg.addSubpackages([
	spr1,
	// spr2,
	// spr3,
]);

export default pkg;
