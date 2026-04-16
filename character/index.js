import { game } from "../../../noname.js";
import character from "./character.js";
import characterIntro from "./intro.js";
import characterTitle from "./title.js";
import characterSort from "./sort.js";
import skill from "./skill.js";
import translate from "./translate.js";

game.import("character", function () {
	return {
		name: "spr",
		character,
		characterIntro,
		characterTitle,
		characterSort,
		skill,
		translate,
	};
});
