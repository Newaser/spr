const translates = {
  spr_shenpei: "星审配",

  spr_liezhi: "烈直",
  spr_liezhi_info: "出牌阶段限一次，你可以受到X点无来源伤害（X为你发动此技能的次数），然后视为使用一张【万箭齐发】。",
  spr_shouye: "守邺",
  spr_shouye_info: "<b>转换技</b>，阳：当你受到伤害后，你可以回复2点体力。阴：当你造成伤害后，你可以弃置至多两名角色各一张牌。",
};

const voices = {
  "#ext:☆SPR/audio/spr_shenpei/spr_liezhi1": "只恨箭支太少，不能射杀汝等！",
  "#ext:☆SPR/audio/spr_shenpei/spr_liezhi2": "身殒事小，秉节事大。",
  "#ext:☆SPR/audio/spr_shenpei/integrated/spr_shouye1": "敌军攻势渐殆，还望诸位依策坚守。",
  "#ext:☆SPR/audio/spr_shenpei/integrated/spr_shouye2": "袁幽州不日便至，当行策建功以报之。",
  "#ext:☆SPR/audio/spr_shenpei/integrated/spr_shouye3": "今伐曹氏，譬如覆手之举。",
  "#ext:☆SPR/audio/spr_shenpei/integrated/spr_shouye4": "十，则围之；五，则攻之。",
  // "#ext:☆SPR/audio/die/spr_shenpei:die": "吾君在北，但求面北而亡。",
  "#spr_shenpei:die": "吾君在北，但求面北而亡。",
};

const characterSortTranslate = {
  spr1: "☆SPR·其一",
  spr2: "☆SPR·其二",
};

export default { ...translates, ...voices, ...characterSortTranslate };