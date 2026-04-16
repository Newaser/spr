import { lib, game, ui, get, ai, _status } from "../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skill = {
  spr_liezhi: {
    audio: 'ext:☆SPR/audio/spr_shenpei:2',
    enable: 'phaseUse',
    usable: 1,
    viewAs: {
      name: 'wanjian',
      isCard: true,
    },
    filterCard() {
      return false
    },
    selectCard: -1,
    log: false,
    init(player) {
      player.addMark('spr_liezhi', 1, false)
    },
    precontent() {
      player.logSkill('spr_liezhi')
      player.damage(player.countMark('spr_liezhi'), 'nosource')
      player.addMark('spr_liezhi', 1, false)
    },
    intro: {
      'name2': '烈直',
      content(storage, player) {
        return '下次烈直的伤害：' + player.countMark('spr_liezhi')
      },
    },
    ai: {
      wuxie(target, card, player, viewer) {
        if (
          get.attitude(viewer, target) > 0 &&
          target.countCards('h', 'shan')
        ) {
          if (
            !target.countCards('h') ||
            target.hp == 1 ||
            Math.random() < 0.7
          )
            return 0
        }
      },
      basic: {
        order: 9,
        useful: 1,
        value: 5,
      },
      result: {
        player(player) {
          const saveCards = player.countCards('h', i =>
            get.tag(i, 'save')
          )
          const damage = player
            .getEquips(2)
            .some(i => i.name == 'baiyin')
            ? 1
            : player.countMark('spr_liezhi')
          if (damage >= player.hp + saveCards) return -Infinity
          if (
            player.hasSkill('spr_shouye') &&
            !player.storage.spr_shouye
          )
            return Math.min(player.getDamagedHp(true), 2 - damage) * 2
          return -damage * 2
        },
        'target_use'(player, target) {
          if (player.hasUnknown(2) && get.mode() != 'guozhan') return 0
          var nh = target.countCards('h')
          if (get.mode() == 'identity') {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100
          }
          if (nh == 0) return -2
          if (nh == 1) return -1.7
          return -1.5
        },
        target(player, target) {
          var nh = target.countCards('h')
          if (get.mode() == 'identity') {
            if (target.isZhu && nh <= 2 && target.hp <= 1) return -100
          }
          if (nh == 0) return -2
          if (nh == 1) return -1.7
          return -1.5
        },
      },
      tag: {
        respond: 1,
        respondShan: 1,
        damage: 1,
        multitarget: 1,
        multineg: 1,
      },
    },
  },
  spr_shouye: {
    audio: 'ext:☆SPR/audio/spr_shenpei/integrated:4',
    mark: true,
    locked: false,
    zhuanhuanji: true,
    marktext: '☯',
    intro: {
      content(storage, player, skill) {
        return storage
          ? '当你造成伤害后，你可以弃置至多两名角色各一张牌。'
          : '当你受到伤害后，你可以回复2点体力。'
      },
    },
    group: ['spr_shouye_1', 'spr_shouye_2'],
    subSkill: {
      '1': {
        audio: 'ext:☆SPR/audio/spr_shenpei:2',
        trigger: {
          player: 'damageEnd',
        },
        filter(event, player) {
          return !player.storage.spr_shouye && player.isDamaged()
        },
        'prompt2': '当你受到伤害后，你可以回复2点体力。',
        check(event, player) {
          return player.maxHp < 3 || player.getDamagedHp() >= 2
        },
        content() {
          player.changeZhuanhuanji('spr_shouye')
          player.recover(2)
        },
        ai: {
          tag: {
            'maixie_defend': true,
          },
          skillTagFilter(player, tag, arg) {
            return !player.storage.spr_shouye
          },
          threaten(player) {
            if (player.storage.spr_shouye)
              return
            return 0.9
          },
        },
        sub: true,
        sourceSkill: 'spr_shouye',
      },
      '2': {
        audio: 'ext:☆SPR/audio/spr_shenpei:2',
        trigger: {
          source: 'damageSource',
        },
        filter(event, player) {
          return player.storage.spr_shouye
        },
        direct: true,
        content() {
          'step 0'
          player
            .chooseTarget(
              [1, 2],
              get.prompt('spr_shouye'),
              '当你造成伤害后，你可以弃置至多两名角色各一张牌。',
              (card, player, target) => {
                return target.countCards('he') > 0
              }
            )
            .set('ai', target => {
              return 1 - get.attitude(get.player(), target)
            })
          'step 1'
          if (result.bool) {
            player.changeZhuanhuanji('spr_shouye')
            result.targets.sortBySeat(_status.currentPhase)
            event.targets = result.targets
            player.line(result.targets, 'green')
            player.logSkill('spr_shouye_2', result.targets)
          } else event.finish()
          'step 2'
          event.current = targets.shift()
          player.discardPlayerCard(event.current, 'he', true)
          if (targets.length) event.redo()
        },
        sub: true,
        sourceSkill: 'spr_shouye',
      },
    },
  },
};

export default skill;