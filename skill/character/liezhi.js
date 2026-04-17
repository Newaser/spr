import { SkillData } from "../../import/structs.js";
import { lib, game, ui, get, ai, _status } from "../../../../noname.js";

export default new SkillData("spr_liezhi|烈直", {
  description:
    "出牌阶段限一次，你可以受到X点无来源伤害（X为你发动此技能的次数），然后视为使用一张【万箭齐发】。",
  voices: [
    "只恨箭支太少，不能射杀汝等！",
    "身殒事小，秉节事大。",
  ],
  skill: {
    audio: "ext:☆SPR/audio/skill:2",
    init(player, skill) {
      player.addMark("spr_liezhi", 1, false);
    },
    log: false,
    enable: "phaseUse",
    usable: 1,
    async precontent(event, trigger, player) {
      player.logSkill("spr_liezhi");
      await player.damage({ num: player.countMark("spr_liezhi"), nosource: true });
      player.addMark("spr_liezhi", 1, false);
    },
    selectCard: -1,
    filterCard: (card, player) => false,
    viewAs: {
      name: "wanjian",
      isCard: true,
    },
    intro: {
      name2: "烈直",
      content(storage, player, skill) {
        return "下次烈直的伤害：" + player.countMark("spr_liezhi");
      },
    },
    ai: {
      result: {
        target(player, target, card) {
          const nh = target.countCards("h");
          if (get.mode() == "identity") {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
          }
          if (nh == 0) return -2;
          if (nh == 1) return -1.7;
          return -1.5;
        },
        target_use(player, target) {
          if (player.hasUnknown(2) && get.mode() != "guozhan") return 0;
          const nh = target.countCards("h");
          if (get.mode() == "identity") {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
          }
          if (nh == 0) return -2;
          if (nh == 1) return -1.7;
          return -1.5;
        },
        player(player) {
          const saveCards = player.countCards("h", i =>
            get.tag(i, "save")
          );
          const damage = player
            .getEquips(2)
            .some(i => i.name == "baiyin")
            ? 1
            : player.countMark("spr_liezhi");
          if (damage >= player.hp + saveCards) return -Infinity;
          if (
            player.hasSkill("spr_shouye") &&
            !player.storage.spr_shouye
          )
            return Math.min(player.getDamagedHp(true), 2 - damage) * 2;
          return -damage * 2;
        },
      },
      basic: {
        order: 9,
        useful: 1,
        value: 5,
      },
      tag: {
        respond: 1,
        respondShan: 1,
        damage: 1,
        multitarget: 1,
        multineg: 1,
      },
      /**
       * 
       * @param {Player} target 
       * @param {Card} card 
       * @param {Player} player 
       * @param {Player} viewer 
       * @param {number} status 
       * @returns {number|void}
       */
      wuxie(target, card, player, viewer, status) {
        if (
          get.attitude(viewer, target) > 0 &&
          target.countCards("h", "shan")
        ) {
          if (
            !target.countCards("h") ||
            target.hp == 1 ||
            Math.random() < 0.7
          )
            return 0;
        }
      },
    },
  },
});
