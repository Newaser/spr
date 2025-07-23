import { lib, game, ui, get, ai, _status } from '../../noname.js'
const INFO = {
  author: 'Newaser',
  version: '2.2.1',
  groupId: '929407593',
  lastUpdated: '2025-05-03',
  minNoname: '1.10.5',
  adaptedExts: ['千幻聆音', '十周年UI'],
}
const TEXTS = {
  intro:
    `
    <style>
      .clickable {
          cursor: pointer;
      }
    </style>
    <span style="text-align: center;">
      <h3 style="color: darkKhaki;">
        始于对☆SP系列武将进行重置，但不止于此。
      </h3>
      <h4 style="color: cyan;">
        扩展交流群：
        <u class="clickable" onclick="window.sprCopyGroupId()", title="复制群号">
          ${INFO.groupId}
        </u>
      </h4>
    </span>
    <hr>
    <h3 style="text-align: center;">版本信息</h3>
    <p>
      扩展版本：v${INFO.version}
      <br>更新日期：${INFO.lastUpdated}
      <br>支持的无名杀最低版本：v${INFO.minNoname}
      <br>适配的其他扩展：${INFO.adaptedExts.join('、')}
    </p>
    <hr>
    <h3 style="text-align: center;">设置</h3>
    `,
  characterIntro: {
    spr_zhugeliang:
      `字孔明，号卧龙，琅琊阳都人，蜀汉丞相。
      诸葛亮只身随鲁肃过江、游说东吴群臣。
      诸葛亮以其超人的胆识同东吴群儒展开舌战，
      并以其滔滔辩才使对手一个个皆成“口”下败将，
      并最终说服了孙权，使孙刘联盟共抗曹操的局面得以形成。`,
    spr_xvyou:
      `字子远，南阳人。本为袁绍帐下谋士，官渡之战时投曹。
      曹操取得冀州后，许攸立有功劳，于是自恃功高，
      屡次轻慢曹操，每次出席，不分场合，直呼曹操小名。
      曹操表面上嘻笑，但心里颇有芥蒂。
      一次，许攸从行出邺城东门时口出狂言，
      有人向曹操告发，于是许攸被收捕。
      最终，许攸因“恃旧不虔”而被曹操诛杀。`,
    spr_guanyv:
      `字云长，河东郡解县人。跟从刘备起兵，镇压黄巾起义。
      刘备夺取徐州后，行下邳太守。建安五年，曹操东征刘备，
      关羽兵败被俘，暂时投靠曹操。参加官渡之战，诛杀颜良，
      解白马之围，受封汉寿亭侯。得知刘备下落后，前往投奔。`,
    spr_ganning:
      `字兴霸，巴郡临江人，三国时期孙吴名将。
      少年时在地方上为非作歹，组成渠师抢夺船只财物，崇尚奢华，人称锦帆贼。`,
    spr_chenwudongxi:
      `陈武，东吴将领，孙策攻打刘繇，陈武前来相助，孙策非常喜爱陈武，
      拜为校尉，使作先锋。陈武以十数骑兵力杀敌五十余人。
      后于赤壁等战役屡立功勋。董袭献上严虎的人头来降孙策。
      赤壁之战，董袭受周瑜命，分兵去汉阳，合肥会战时接应太史慈，
      逍遥津支援孙权。濡须口之战时，董袭在船上督战，船覆董袭坚守殉职。`,
    spr_wangtaowangyue:
      `王桃是在《花关索传》中登场的虚拟人物，
      盗贼王令公的两个女儿之一，王悦的姐姐，与妹妹都是关索之妻。
      姐妹俩原为卢塘寨山贼，以武艺与美貌而闻名，被众多男性求婚却皆不与理睬。
      她们在关索回西川认父途中与关索交手时不敌，因意气投合而一齐下嫁。
      虽为架空之人物，但四川省内有记述夫妻三人共同守护葭萌关一事，
      民间亦流传如夫妻三人曾共同参与诸葛亮之南蛮征伐等轶事。`,
  },
  characterTitle: {
    spr_machao: '杵枪摧敌',
    spr_zhugeliang: '过江说盟',
    spr_guanyv: '单骑千里',
    spr_xvyou: '居功自傲',
    spr_shenpei: '正南义北',
    spr_caozhang: '神勇壮猛',
    spr_guohuai: '垂问秦淮',
    spr_zoushi: '醉琴卧花',
    spr_zhangliao: '踏锋饮血',
    spr_luoxian: '介然毕命',
    spr_chendao: '白毦督',
    spr_chengui: '弄辞成掇',
    spr_chenwudongxi: '殒身不恤',
    spr_caochun: '锐兵坚甲',
    spr_wangtaowangyue: '春悦桃秾',
  },
  skininfo: {
    spr_machao: {
      name: 'spr_machao',
      origin: {
        skill: {
          die: {
            content: '血仇无报，坎坷一生，唉……'
          },
          spr_jinzi: {
            content: '让你们看看，我西凉健儿的雄姿！'
          },
          spr_mengjin: {
            content: '休想跑！<br>趁锐气正盛，擒敌军之将！'
          },
          spr_yingzi: {
            content: '鸾铃到处，敌皆破胆！'
          },
          spr_shichou: {
            content:
              `父仇在胸，国恨在目，西凉马超，誓杀曹贼！
              <br>不枭曹贼之首祀于父前，吾枉为人子！`
          },
        }
      },
    },
    spr_zhugeliang: {
      name: 'spr_zhugeliang',
      origin: {
        skill: {
          die: {
            content: '可恨，未能助君成业……'
          },
          spr_qvnbian: {
            content:
              `可笑汝错漏百出，却仍不自知。
              <br>哼！班门弄斧。`
          },
          spr_zhijve: {
            content: `已有胜算七成，此策当再添三分。
              <br>以今日之时局，唯以此策解之。
              <br>尽料敌计，使其无计可施。`
          },
        }
      },
    },
    spr_guanyv: {
      name: 'spr_guanyv',
      origin: {
        skill: {
          die: {
            content: '大哥，三弟，云长去矣……'
          },
          wusheng: {
            content:
              `可知关某之威！
              <br>关某既出，敌将定皆披靡！`
          },
          spr_nuzhan: {
            content:
              `狂妄贼子，速来领死！
              <br>汝等若不早降，顷刻便为吾刀下之鬼！
              <br>触关某之逆鳞者，杀无赦！
              <br>天下碌碌之辈，安敢小觑关某！
              <br>喝啊！！！`
          },
          spr_nianen: {
            content:
              `单骑护嫂千里，只为桃园之义。
              <br>心念桃园兄弟义，不背屯土忠君誓！`
          },
        }
      },
    },
    spr_xvyou: {
      name: 'spr_xvyou',
      origin: {
        skill: {
          die: {
            content: '大胆许褚，便是你家主公也……啊！！'
          },
          spr_qingman: {
            content:
              `贪而不治，那又如何？
              <br>我若自比管乐，亦可算是谦辞。
              <br>孟德尚且敬我，汝意欲何为？
              <br>你也配姓许？！`
          },
          spr_shigong: {
            content:
              `此战，难道不全凭我计策精妙？
              <br>阿瞒帐下谋臣如云，哪个有我这般功绩？`
          },
          spr_siyan: {
            content:
              `若不是我许子远，阿瞒焉能进这邺城？
              <br>阿瞒若是无我，定是寸步也难行！`
          },
        }
      },
    },
    spr_shenpei: {
      name: 'spr_shenpei',
      origin: {
        skill: {
          die: {
            content: '吾君在北，但求面北而亡。'
          },
          spr_liezhi: {
            content:
              `只恨箭支太少，不能射杀汝等！
              <br>身殒事小，秉节事大。`
          },
          spr_shouye: {
            content:
              `敌军攻势渐殆，还望诸位依策坚守。
              <br>袁幽州不日便至，当行策建功以报之。
              <br>今伐曹氏，譬如覆手之举。
              <br>十，则围之；五，则攻之。`
          },
        }
      },
    },
    spr_caozhang: {
      name: 'spr_caozhang',
      origin: {
        skill: {
          die: {
            content: '黄须金甲，也难敌骨肉毒心……'
          },
          spr_jiangchi: {
            content:
              `策马扬鞭，奔驰万里！
              <br>掩敌不备，一鼓而擒！
              <br>见可而进，知难而退。
              <br>知不可为，遵时养晦。
              <br>率师而行，所向皆破！`
          },
        }
      },
    },
    spr_guohuai: {
      name: 'spr_guohuai',
      origin: {
        skill: {
          die: {
            content: '五子哀母，不惜其身，淮又安能坐视……'
          },
          spr_jingce: {
            content:
              `思我之薄弱，知敌之计谋。
              <br>精细入微，策敌制胜。
              <br>兵非贵益多，料敌取人而已。
              <br>料敌取胜，于吾不过易事。
              <br>此一举两全之策，吾等何不用之？
              <br>两城皆加防备，不可顾此失彼。
              <br>哈哈哈哈哈哈，若长此以往，蜀贼可平！
              <br>敌计尽料，蜀军何可越境？
              <br>有此一失，功败垂成啊！
              <br>棋差一招，棋差一招啊！`
          },
          spr_juyv: {
            content:
              `知汝必将攻此，吾已早设防备。
              <br>有淮御蜀，必保魏境无虞。`
          },
        }
      },
    },
    spr_zoushi: {
      name: 'spr_zoushi',
      origin: {
        skill: {
          die: {
            content: '世间的成败得失，都要怪红颜祸水吗……'
          },
          spr_xvnxin: {
            content:
              `一笑倾城，再笑倾国。
              <br>汉有游女，不可求思。
              <br>红颜催人醉，你就别醒了吧。`
          },
          spr_zhenxia: {
            content:
              `青衣沾赤，金莲染尘……
              <br>生逢乱世，身何由己……`
          },
          spr_huoshui: {
            content:
              `君爱一时欢，烽烟作良辰。
              <br>须臾刀兵起，君恩何处寻？`
          },
        }
      },
    },
    spr_zhangliao: {
      name: 'spr_zhangliao',
      origin: {
        skill: {
          die: {
            content: '一生驰骋，早料到会如此……'
          },
          spr_cuorui: {
            content:
              `广散惧意，尽懈敌之斗志！
              <br>哼哼，若尔等惧我，自当卷甲以降！`
          },
          spr_tafeng: {
            content:
              `横戈跃马，敌军自惧！
              <br>一与一，勇者得前耳！`
          },
        }
      },
    },
    spr_luoxian: {
      name: 'spr_luoxian',
      origin: {
        skill: {
          die: {
            content: '国朝用命之时，奈何无计可施……'
          },
          spr_yongan: {
            content:
              `长河如衣带，高山如砥石，国可得久安！
              <br>今指山河为誓，此生不过江南，不从吴狗！`
          },
          spr_jvxi: {
            content: '国朝倾覆，吾宁当为降虏乎？！'
          },
          spr_xvzhong: {
            content: '弃百姓之所养，君子不为也。'
          },
        }
      },
    },
    spr_chendao: {
      name: 'spr_chendao',
      origin: {
        skill: {
          die: {
            content: '征南厚重，忠心后土……'
          },
          spr_wanglie: {
            content:
              `猛将之烈，统帅之所往。
              <br>与子龙忠勇相往，猛烈相合。
              <br>击敌百里，一往无前！
              <br>此城非朝夕可取，诚如是也。`
          },
          spr_baier: {
            content:
              `精锐之师，何人能挡！
              <br>扬大汉之英气，无往而不利！`
          },
        }
      },
    },
    spr_chengui: {
      name: 'spr_chengui',
      origin: {
        skill: {
          die: {
            content: '终日戏虎，竟为虎所噬……'
          },
          spr_guimou: {
            content:
              `不过略施小计，聊戏莽夫耳。
              <br>栖虎狼之侧，安能不图存身？`
          },
          spr_congshi: {
            content:
              `阁下奉天子以令诸侯，珪自当相从。
              <br>将军率六师以伐不臣，珪何敢相抗？`
          },
        }
      },
    },
    spr_chenwudongxi: {
      name: 'spr_chenwudongxi',
      origin: {
        skill: {
          die: {
            content: '杀身为主，死而无憾……'
          },
          spr_shangjia: {
            content:
              `吾等十万军，岂会败你八百众！
              <br>杀敌建功，卫我家国！`
          },
          spr_duanxie: {
            content:
              `区区绳索，就想挡住吾等去路！
              <br>以身索敌，何惧同伤！`
          },
          spr_fenming: {
            content:
              `江东尽铁血男儿，可死不可退也！
              <br>合肥一役，吾等必拼死效力！`
          },
        }
      },
    },
    spr_caochun: {
      name: 'spr_caochun',
      origin: {
        skill: {
          die: {
            content: '纯……终不负众望……'
          },
          spr_shanjia: {
            content:
              `不备不虞，不可以师！
            <br>缮五方之兵，得攻敌之胜！`
          },
        },
      },
    },
    spr_wangtaowangyue: {
      name: 'spr_wangtaowangyue',
      origin: {
        skill: {
          die: {
            content: '妹妹，何时能再赏此景……姐姐，此景桃花似汝颜……'
          },
          spr_shuangbi: {
            content:
              `赠君瑶佩，佑君安好。
              <br>此战虽险，悦亦可助之！`
          },
          spr_tongzheng: {
            content:
              `长刀系红缨，身伴千军万马，情随万水千山。
              <br>与君共进退，何处皆可栖！`
          },
        }
      },
    },
  },
  translate: {
    character: {
      id: {
        spr_machao: '星马超',
        spr_zhugeliang: '星诸葛亮',
        spr_guanyv: '星关羽',
        spr_xvyou: '星许攸',
        spr_shenpei: '星审配',
        spr_caozhang: '星曹彰',
        spr_guohuai: '星郭淮',
        spr_zoushi: '星邹氏',
        spr_zhangliao: '星张辽',
        spr_luoxian: '星罗宪',
        spr_chendao: '星陈到',
        spr_chengui: '星陈珪',
        spr_chenwudongxi: '星陈武董袭',
        spr_caochun: '星曹纯',
        spr_wangtaowangyue: '星王桃王悦',
      },
      skill: {
        // 星马超 | spr_machao
        spr_jinzi: '锦姿',
        spr_jinzi_info:
          `<b>锁定技</b>，回合开始时，你展示手牌并执行前X项（X为手牌花色数）：
          本回合获得〖<b>马术</b>/<b>猛进</b>/<b>英姿</b>〗；本回合上述技能的效果翻倍。`,

        spr_mashu: '马术',
        spr_mashu_info:
          '<b>锁定技</b>，你计算与其他角色的距离-1。',

        spr_mengjin: '猛进',
        spr_mengjin_info:
          '当你使用的【杀】被【闪】抵消时，你可以弃置目标角色的一张牌。',

        spr_yingzi: '英姿',
        spr_yingzi_info:
          '摸牌阶段，你可以多摸一张牌。',

        spr_shichou: '誓仇',
        spr_shichou_info:
          `你可以将一种颜色的所有手牌当无次数限制的普通【杀】使用（须先展示手牌）。
          此【杀】可指定的目标数改为转化牌数。`,


        // 星诸葛亮 | spr_zhugeliang
        spr_qvnbian: '群辩',
        spr_qvnbian_info:
          `当你成为其他角色使用锦囊牌的目标后，若你<b>为</b>/<b>不为</b>唯一目标，
          你可以令此牌的<b>使用者</b>/<b>至多两个其他目标</b>选择一项：
          交给你一张牌；你弃置其一张牌。`,

        spr_zhijve: '智绝',
        spr_zhijve_info:
          '每回合每种智囊各限一次，你可以将一张牌当任意智囊使用。',


        // 星关羽 | spr_guanyv
        spr_nuzhan: '怒斩',
        spr_nuzhan_info:
          `<b>蓄力技（0/3）</b>，出牌阶段限一次或当你受到伤害后，
          你可以弃置一张牌并获得1点蓄力点。当你使用♥【杀】时，你消耗所有蓄力点，
          令此【杀】视为火属性、基础伤害+X、且需使用X张【闪】才能抵消（X为你消耗的蓄力点数）。`,

        spr_nianen: '念恩',
        spr_nianen_info:
          '<b>锁定技</b>，当你使用或打出基本牌时（使用【杀】除外），若你的手牌中仅有基本牌，你摸一张牌。',


        // 星许攸 | spr_xvyou
        spr_qingman: '轻慢',
        spr_qingman_info:
          `每轮限一次，你可以视为使用一张【酒】，然后令一名其他角色视为对你使用一张【决斗】。
          <p>
          <details style="color: silver;">
            <summary style="color: slateblue; cursor: pointer; text-decoration: underline;">
              ※注意
            </summary>
            <small>
              若你因此技能使用【酒】后，你仍处于濒死状态，
              则改为本回合你下一次脱离濒死状态时再指定其他角色视为对你使用【决斗】，
              否则会有插入结算的问题。
            </small>
          </details>
          </p>`,

        spr_shigong: '恃功',
        spr_shigong_info:
          `<b>转换技</b>，阳：当你使用基本牌指定目标后，你可以摸一张牌。
          阴：当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。`,

        spr_siyan: '肆言',
        spr_siyan_info:
          '当你受到伤害后，你可以将一张牌当【无中生有】使用。若如此做，你横置或翻面。',


        // 星审配 | spr_shenpei
        spr_liezhi: '烈直',
        spr_liezhi_info:
          '出牌阶段限一次，你可以受到X点无来源伤害（X为你发动此技能的次数），然后视为使用一张【万箭齐发】。',
        spr_shouye: '守邺',
        spr_shouye_info:
          `<b>转换技，</b>阳：当你受到伤害后，你可以回复2点体力。
          阴：当你造成伤害后，你可以弃置至多两名角色各一张牌。`,


        // 星曹彰 | spr_caozhang
        spr_jiangchi: '将驰',
        spr_jiangchi_info:
          `出牌阶段限两次，你可以使用一张牌（无距离和次数限制）或摸一张牌。
          当你杀死一名角色后，你视为未发动此技能。`,


        // 星郭淮 | spr_guohuai
        spr_jingce: '精策',
        spr_jingce_info:
          `出牌阶段开始时，你可以进行任意次“整肃”。若如此做，
          弃牌阶段结束后，若这些整肃均未失败，你依次获得这些整肃的奖励，
          然后获得〖拒御〗直到你的下回合开始。`,

        spr_juyv: '拒御',
        spr_juyv_info:
          '每回合限一次，当其他角色使用伤害类卡牌时，你可以弃置一张相同牌名的牌，令此牌无效。',


        // 星邹氏 | spr_zoushi
        spr_xvnxin: '熏心',
        spr_xvnxin_info:
          `出牌阶段限一次，你可以令一名其他角色视为使用一张不能被响应的【火攻】。
          若此【火攻】未造成伤害，你观看其手牌，获得其两张红色牌。`,

        spr_zhenxia: '贞瑕',
        spr_zhenxia_info:
          '<b>觉醒技</b>，当男性角色对你造成伤害后，你与其各回复1点体力，然后你获得〖祸水〗。',

        spr_huoshui: '祸水',
        spr_huoshui_info:
          '<b>锁定技</b>，伤害过你的男性角色受到黑色牌造成的伤害+1。',


        // 星张辽 | spr_zhangliao
        spr_cuorui: '挫锐',
        spr_cuorui_info:
          `每回合限两次，当你对其他角色造成伤害后，你可以弃置你与其各一张牌：
          若其被弃置的牌不为【杀】，你获得之；否则，你对其造成1点伤害。`,

        spr_tafeng: '踏锋',
        spr_tafeng_info:
          `准备阶段，你可以失去1点体力并摸一张牌，然后将一张牌当【出其不意】使用。
          <p>
            <details>
              <summary>
                【
                <span cursor: pointer;">
                  <u>※出其不意</u>
                </span>
                】
              </summary>
              <small>
                <p>锦囊牌</p>
                出牌阶段，对一名有手牌的其他角色使用。你展示其一张手牌，若此牌与【出其不意】的花色不同，则你对其造成1点伤害。
              </small>
            </details>
          </p>`,


        // 星罗宪 | spr_luoxian
        spr_yongan: '永安',
        spr_yongan_info:
          `<b>锁定技</b>，每回合限三次，当其他角色于其回合内
          （摸牌阶段除外）获得牌时，你摸等量的牌。
          每回合结束时，你将手牌弃至体力值。`,

        spr_jvxi: '拒袭',
        spr_jvxi_info:
          '<b>蜀势力技</b>，你可以将所有非【杀】基本牌当无次数限制的普通【杀】使用（须先展示手牌）。',

        spr_xvzhong: '恤众',
        spr_xvzhong_info:
          '<b>魏势力技</b>，当其他角色受到伤害后，若其手牌数与体力值均小于你，你可以交给其一张牌。',


        // 星陈到 | spr_chendao
        spr_wanglie: '往烈',
        spr_wanglie_info:
          `出牌阶段限一次，你可以展示任意张相同牌名的手牌并令一名角色获得之，
          然后其可以使用一张牌（无距离限制且不可被响应）。`,

        spr_baier: '白毦',
        spr_baier_info:
          '每回合限一次，当一张造成过伤害的【杀】结算结束后，其使用者可以令你获得之。',


        // 星陈珪 | spr_chengui
        spr_guimou: '诡谋',
        spr_guimou_info:
          `每回合限一次，当一名角色受到你造成的伤害时，你可以选择一项：
          转移此伤害；摸两张牌。<i>背水：本回合你不能对其他角色使用牌。</i>
          然后该角色执行未被选择的项。`,

        spr_congshi: '从势',
        spr_congshi_info:
          '每回合限一次，当你受到伤害后，你可以令伤害来源获得造成此伤害的牌，然后你回复1点体力。',


        // 星陈武董袭 | spr_chenwudongxi
        spr_shangjia: '上甲',
        spr_shangjia_info:
          `<b>锁定技</b>，当你使用与你装备区内的牌花色相同的伤害类卡牌时，
          你摸一张牌或令此牌不可被响应。`,

        spr_duanxie: '断绁',
        spr_duanxie_info:
          `出牌阶段限一次，你可以将一张牌当【铁索连环】使用，
          然后对因此被重置的角色各造成1点伤害。`,

        spr_fenming: '奋命',
        spr_fenming_info:
          `当你对其他角色造成伤害后，你可以失去1点体力或
          武将牌上的一个其他技能，然后获得其一张牌。`,


        // 星曹纯 | spr_caochun
        spr_shanjia: '缮甲',
        spr_shanjia_info:
          `每名角色的结束阶段，你摸一张牌并选择一项：弃置一张牌；使用一张装备牌。
          若你因此失去了装备区内的牌，你可以视为使用一张无距离限制的【杀】。`,


        // 星王桃王悦 | spr_wangtaowangyue
        spr_shuangbi: '双璧',
        spr_shuangbi_info:
          `每回合限一次，当其他角色于其出牌阶段内使用【杀】时，你可以交给其两张牌。
          若如此做，本回合其使用【杀】的次数上限+2。`,

        spr_tongzheng: '同征',
        spr_tongzheng_info:
          '每回合限一次，当一名角色进入濒死状态时，当前回合角色可以令你摸两张牌并回复1点体力。',
      },
      other: {
        spr1: '☆SPR·其一',
        spr2: '☆SPR·其二',
        sprTest: '测试武将',
      },
    },
    card: {
    },
  },
}
game.import('extension', function (lib, game, ui, get, ai, _status) {
  return {
    name: '☆SPR',
    editable: false,

    package: {
      intro: TEXTS.intro,
      author: `<span class="bluetext">${INFO.author}</span>`,
      version: INFO.version,
    },

    config: {
      illustrationStyle: {
        name: '露头样式',
        intro: '设置此扩展中武将原画的露头样式',
        init: 'standard',
        item: {
          standard: '不露头',
          shousha: '手杀露头',
        },
        onclick(item) {
          game.saveExtensionConfig('☆SPR', 'illustrationStyle', item)
          if (confirm('是否重启游戏以应用露头样式？')) game.reload()
        }
      },
      hr: {
        name: '<hr>',
        clear: true,
        nopointer: true,
      }
    },

    precontent() {
      // dynamic translate
      {
        window.sprCopyGroupId = function () {
          navigator.clipboard.writeText(INFO.groupId)
            .then(function () {
              alert("群号复制成功");
            })
            .catch(function (error) {
              alert("复制失败：" + error);
            });
        }
        const textsToBeProcessed = [
          TEXTS.characterIntro,
          TEXTS.translate.character.skill,
          TEXTS.translate.card
        ]
        for (let chunk of textsToBeProcessed) {
          for (let id in chunk) {
            chunk[id] = chunk[id].replace(/\s*\n\s*/g, '')
          }
        }
      }
      // set name prefix style
      lib.namePrefix.set('星', { color: '#FFECB3', nature: 'soilmm' })

      /*-----create characters-----*/
      {
        const SPR_CHARS = {
          name: 'spr',
          character: {
            spr_machao: [
              'male',
              'qun',
              4,
              ['spr_jinzi', 'spr_shichou'],
            ],
            spr_zhugeliang: [
              'male',
              'shu',
              3,
              ['spr_qvnbian', 'spr_zhijve'],
            ],
            spr_guanyv: [
              'male',
              'wei',
              4,
              ['wusheng', 'spr_nuzhan', 'spr_nianen'],
            ],
            spr_xvyou: [
              'male',
              'wei',
              3,
              ['spr_qingman', 'spr_shigong', 'spr_siyan'],
            ],
            spr_shenpei: [
              'male',
              'qun',
              '2/3/0',
              ['spr_liezhi', 'spr_shouye'],
            ],
            spr_caozhang: [
              'male',
              'wei',
              4,
              ['spr_jiangchi'],
            ],
            spr_guohuai: [
              'male',
              'wei',
              4,
              ['spr_jingce'],
            ],
            spr_zoushi: [
              'female',
              'qun',
              3,
              ['spr_xvnxin', 'spr_zhenxia'],
            ],
            spr_zhangliao: [
              'male',
              'qun',
              4,
              ['spr_cuorui', 'spr_tafeng'],
            ],
            spr_luoxian: [
              'male',
              'shu',
              4,
              ['spr_yongan', 'spr_jvxi', 'spr_xvzhong'],
              ['doublegroup:shu:wei'],
            ],
            spr_chendao: [
              'male',
              'shu',
              4,
              ['spr_wanglie', 'spr_baier'],
            ],
            spr_chengui: [
              'male',
              'qun',
              3,
              ['spr_guimou', 'spr_congshi'],
            ],
            spr_chenwudongxi: [
              'male',
              'wu',
              4,
              ['spr_shangjia', 'spr_duanxie', 'spr_fenming'],
            ],
            spr_caochun: [
              'male',
              'wei',
              4,
              ['spr_shanjia'],
            ],
            spr_wangtaowangyue: [
              'female',
              'shu',
              3,
              ['spr_shuangbi', 'spr_tongzheng'],
            ],
          },
          characterIntro: TEXTS.characterIntro,
          characterTitle: TEXTS.characterTitle,
          characterSort: {
            spr: {
              spr1: [
                'spr_machao', 'spr_zhugeliang', 'spr_guanyv', 'spr_xvyou',
                'spr_shenpei', 'spr_caozhang', 'spr_guohuai', 'spr_zoushi',
              ],
              spr2: [
                'spr_zhangliao', 'spr_luoxian', 'spr_chendao', 'spr_chengui',
                'spr_chenwudongxi', 'spr_caochun', 'spr_wangtaowangyue',
              ],
              sprTest: [],
            }
          },
          skill: {
            // 星马超 | spr_machao
            spr_jinzi: {
              audio: 'ext:☆SPR/audio/spr_machao:1',
              forced: true,
              trigger: {
                player: 'phaseBegin',
              },
              filter(event, player) {
                return player.countCards('h')
              },
              content() {
                'step 0'
                const
                  hs = player.getCards('h'),
                  suits = new Set(hs.map(i => get.suit(i, player))),
                  prompt = `${get.translation(player)}展示了手牌的花色数：${get.cnNumber(suits.size, true)}`,
                  msgs = [
                    '仅有一色，但也不用灰心...',
                    '尚有双色，可出击直取敌营！',
                    '已有三色，西凉锦马超在此！',
                    '四色俱全，今日便是雪恨之时！',
                  ]
                player.showCards(hs, prompt)
                player.chat(msgs[suits.size - 1])
                event.suitNum = suits.size
                'step 1'
                if (event.suitNum >= 4) {
                  player.addTempSkill('spr_jinzi_double')
                }
                'step 2'
                for (let i = 0; i < Math.min(event.suitNum, 3); i++) {
                  player.addTempSkill(lib.skill['spr_jinzi'].derivation[i])
                }
                'step 3'
                game.delay(3)
              },
              subSkill: {
                double: {
                  mark: true,
                  marktext: '翻倍',
                  intro: {
                    content: () => `本回合〖${lib.skill['spr_jinzi'].derivation.map(i => get.translation(i)).join('〗、〖')}〗的效果翻倍`,
                  },
                  sub: true,
                  sourceSkill: 'spr_jinzi',
                },
              },
              derivation: ['spr_mashu', 'spr_mengjin', 'spr_yingzi'],
            },
            spr_mashu: {
              locked: true,
              mod: {
                globalFrom(from, to, distance) {
                  const v = from.hasSkill('spr_jinzi_double') ? 2 : 1
                  return distance - v
                },
              },
            },
            spr_mengjin: {
              audio: 'ext:☆SPR/audio/spr_machao:2',
              trigger: {
                player: 'shaMiss',
              },
              filter(event) {
                return event.target.countCards('he')
              },
              check(event, player) {
                return get.attitude(player, event.target) < 0
              },
              logTarget: 'target',
              content() {
                const v = player.hasSkill('spr_jinzi_double') ? 2 : 1
                player.discardPlayerCard(trigger.target, v, true)
              },
              prompt2(event, player) {
                const info = get.skillInfoTranslation('spr_mengjin')
                return player.hasSkill('spr_jinzi_double') ?
                  info.replace('一', '<span class="bluetext">两</span>') :
                  info
              }
            },
            spr_yingzi: {
              audio: 'ext:☆SPR/audio/spr_machao:1',
              trigger: {
                player: 'phaseDrawBegin2',
              },
              filter(event, player) {
                return !event.numFixed
              },
              content() {
                const v = player.hasSkill('spr_jinzi_double') ? 2 : 1
                trigger.num += v
              },
              prompt2(event, player) {
                const info = get.skillInfoTranslation('spr_yingzi')
                return player.hasSkill('spr_jinzi_double') ?
                  info.replace('一', '<span class="bluetext">两</span>') :
                  info
              }
            },
            spr_shichou: {
              audio: 'ext:☆SPR/audio/spr_machao:2',
              enable: 'chooseToUse',
              filter(event, player) {
                return (
                  event.filterCard(
                    {
                      name: 'sha',
                      storage: {
                        spr_shichou: true,
                      },
                    },
                    player,
                    event
                  ) && player.countCards('h')
                )
              },
              hiddenCard(player, name) {
                return name == 'sha'
              },
              getColoredShaEff(player, cards, color) {
                const useEffSum = cards.reduce((acc, cur) => {
                  const info = get.info(cur)
                  const eff =
                    (info && !info.notarget) ?
                      player.getUseValue(cur)
                      :
                      get.useful(cur, player)
                  return acc + eff
                }, 0)
                const shaEff = player.getUseValue({
                  name: 'sha',
                  storage: {
                    spr_shichou: true,
                    spr_shichou_cardlen: cards.length,
                  },
                  color: color,
                })
                return shaEff - useEffSum
              },
              getNextColoredEffs(player, cards, color) {
                const nextEffs = []
                for (let i = 0; i < cards.length; i++) {
                  const thisEff = player.getUseValue(cards[i])
                  if (thisEff <= 0) continue
                  const nextCards = cards.slice(0, i).concat(cards.slice(i + 1))
                  const nextEff =
                    nextCards.length ?
                      lib.skill.spr_shichou
                        .getColoredShaEff(player, nextCards, color)
                      :
                      0
                  // game.log(
                  //   '[getNextColoredEffs]<br>thisEff: ' + thisEff.toFixed(4) +
                  //   '<br>nextEff: ' + nextEff.toFixed(4)
                  // )
                  nextEffs.push(thisEff + nextEff)
                }
                return nextEffs
              },
              getOpt(player) {
                const colorShaEffs = {}
                for (let color of ['red', 'black']) {
                  const cards = player.getCards('h', { color: color })
                  if (cards.length)
                    colorShaEffs[color] = lib.skill.spr_shichou.getColoredShaEff(player, cards, color)
                }
                const opt = Object.entries(colorShaEffs).reduce((max, cur) => {
                  return cur[1] > max[1] ? cur : max
                })
                return opt
              },
              getNextOptEff(player) {
                const nextEffs = []
                for (let color of ['red', 'black']) {
                  const cards = player.getCards('h', { color: color })
                  if (cards.length)
                    nextEffs.push(...lib.skill.spr_shichou.getNextColoredEffs(player, cards, color))
                }
                return Math.max(...nextEffs)
              },
              chooseButton: {
                dialog() {
                  return ui.create.dialog(
                    '###' +
                    get.prompt('spr_shichou') +
                    '###将一种颜色的所有手牌当【杀】使用'
                  )
                },
                chooseControl(event, player) {
                  var hand = player.getCards('h')
                  var colors = new Set()
                  for (var card of hand) colors.add(get.color(card))
                  var options = Array.from(colors)
                  options.push('cancel2')
                  return options
                },
                check(button, player) {
                  const [color, eff] = lib.skill.spr_shichou.getOpt(player)
                  return color
                },
                backup(result, player) {
                  return {
                    audio: 'spr_shichou',
                    filterCard(card, player) {
                      return get.color(card) == result.control
                    },
                    selectCard: -1,
                    position: 'h',
                    viewAs(cards, player) {
                      return {
                        name: 'sha',
                        storage: {
                          spr_shichou: true,
                          cardsLength: cards.length,
                        },
                      }
                    },
                    precontent() {
                      'step 0'
                      event.name = 'spr_shichou'
                      const name = player == game.me ? '你' : get.translation(player)
                      player.showHandcards(get.translation('spr_shichou') + '展示' + name + '的手牌')
                      'step 1'
                      game.delay(2)
                    },
                  }
                },
                prompt: () => '请选择【杀】的目标',
              },
              mod: {
                cardUsable(card, player) {
                  if (card.storage && card.storage.spr_shichou) return Infinity
                },
                selectTarget(card, player, range) {
                  if (card.storage && card.storage.spr_shichou && range[1] != -1)
                    range[1] += card.storage.cardsLength - 1
                },
              },
              ai: {
                order: Infinity,
                threaten: 1.3,
                result: {
                  player(player) {
                    const [color, eff] = lib.skill.spr_shichou.getOpt(player)
                    const nextOptEff = lib.skill.spr_shichou.getNextOptEff(player)
                    // game.log(
                    //   '[result]<br>opt: ' + color + ', ' + eff.toFixed(4) +
                    //   '<br>nextEff: ' + nextOptEff.toFixed(4)
                    // )
                    return (eff > 0 && eff >= nextOptEff) ? 1 : -1
                  },
                },
                tag: {
                  respondSha: true,
                },
                skillTagFilter(player) {
                  return player.countCards('h')
                },
              },
            },

            // 星诸葛亮 | spr_zhugeliang
            spr_qvnbian: {
              audio: 'ext:☆SPR/audio/spr_zhugeliang:2',
              trigger: {
                target: 'useCardToTargeted',
              },
              getTargets(event, player) {
                var targets =
                  event.targets.length == 1 ?
                    [event.player] : event.targets
                targets = game.filterPlayer(i =>
                  targets.includes(i) &&
                  i != player &&
                  i.countCards('he')
                )
                targets.sortBySeat(_status.currentPhase)
                return targets
              },
              filter(event, player) {
                return (
                  event.player != player &&
                  event.card &&
                  get.type2(event.card) == 'trick' &&
                  lib.skill['spr_qvnbian']
                    .getTargets(event, player).length
                )
              },
              direct: true,
              content() {
                'step 0'
                event.targets =
                  lib.skill['spr_qvnbian']
                    .getTargets(trigger, player)
                if (event.targets.length == 1) {
                  player
                    .chooseBool(
                      `###${get.prompt('spr_qvnbian', event.targets[0])}###
                    令其选择交给你牌或者被你弃牌`
                    )
                    .set('ai', () => {
                      const player = get.player()
                      return get.effect(
                        _status.event.targetx,
                        { name: 'shunshou', isCard: true },
                        player,
                        player
                      )
                    })
                    .set('targetx', event.targets[0])
                } else {
                  player
                    .chooseTarget(
                      [1, 2],
                      `###${get.prompt('spr_qvnbian')}###
                    令${event.targets.map(get.translation).join('、')}
                    中的至多两名依次选择交给你牌或者被你弃牌`
                    )
                    .set('filterTarget', (card, player, target) => {
                      return _status.event.targetsx.includes(target)
                    })
                    .set('ai', target => {
                      const player = get.player()
                      return get.effect(
                        target,
                        { name: 'shunshou', isCard: true },
                        player,
                        player
                      )
                    })
                    .set('targetsx', event.targets)
                }
                'step 1'
                if (!result.bool) {
                  event.finish()
                  return
                }
                if (event.targets.length > 1) {
                  event.targets = result.targets.sortBySeat(_status.currentPhase)
                }
                player.logSkill('spr_qvnbian', event.targets)
                'step 2'
                if (!event.targets.length) {
                  event.finish()
                  return
                }
                event.cur = event.targets.shift()
                const playerName = get.translation(player)
                event.cur
                  .chooseCard(
                    'he',
                    `###${playerName}的
                  【${get.translation('spr_qvnbian')}】发动###
                  选择一张牌交给${playerName}，
                  或点“取消”被${playerName}弃置一张牌`
                  )
                  .set('ai', card => {
                    const
                      player = get.player(),
                      source = _status.event.sourcex
                    if (get.attitude(player, source) > 0) return 1
                    return 3 - get.value(card)
                  })
                  .set('sourcex', player)
                'step 3'
                if (result.bool) {
                  event.cur.give(result.cards, player)
                } else {
                  player.discardPlayerCard(event.cur, 'he', true)
                }
                event.goto(2)
              },
              ai: {
                effect: {
                  target(card, player, target) {
                    if (
                      get.type(card) != 'trick' ||
                      get.tag(card, 'multitarget') ||
                      get.attitude(player, target) > 0
                    ) return
                    const hasZhijveWuxie =
                      target.hasSkill('spr_zhijve') &&
                      !target.storage.spr_zhijve_used.includes('wuxie')
                    const hasLowValueCard = Boolean(
                      player.countCards('he', i => get.value(i) < 3)
                    )
                    const results = {
                      true: {
                        true: [0, 0.5, 1, -1],
                        false: [0, -0.5, 1, -1.5],
                      },
                      false: {
                        true: [1, 1, 1, -1],
                        false: [1, 0, 1, -1.5],
                      },
                    }
                    const ret = results[hasZhijveWuxie][hasLowValueCard]
                    return ret
                  },
                },
              },
            },
            spr_zhijve: {
              audio: 'ext:☆SPR/audio/spr_zhugeliang:3',
              enable: 'chooseToUse',
              init(player) {
                player.storage.spr_zhijve_used = []
              },
              hiddenCard(player, name) {
                return (
                  player.countCards('he') &&
                  !player.storage.spr_zhijve_used.includes('wuxie') &&
                  name == 'wuxie'
                )
              },
              filter(event, player) {
                if (!player.countCards('he')) return false
                for (var zhinang of get.zhinangs()) {
                  if (
                    !player.storage.spr_zhijve_used.includes(zhinang) &&
                    event.filterCard({ name: zhinang }, player, event)
                  ) {
                    return true
                  }
                }
                return false
              },
              chooseButton: {
                dialog(event, player) {
                  var list = []
                  for (var zhinang of get.zhinangs()) {
                    if (
                      !player.storage.spr_zhijve_used.includes(zhinang) &&
                      event.filterCard({ name: zhinang }, player, event)
                    ) {
                      list.push(zhinang)
                    }
                  }
                  return ui.create.dialog([list, 'vcard'])
                },
                check(button) {
                  if (_status.event.getParent().type != 'phase') return 1
                  const player = get.player()
                  return player.getUseValue(button.link[2])
                },
                backup(links, player) {
                  return {
                    audio: true,
                    selectCard: 1,
                    filterCard: true,
                    position: 'hes',
                    popname: true,
                    ai1(card) {
                      return 7 - get.value(card)
                    },
                    viewAs: {
                      name: links[0][2],
                    },
                    onuse(result, player) {
                      player.storage.spr_zhijve_used.push(links[0][2])
                      const idx = ['wuzhong', 'guohe', 'wuxie'].indexOf(links[0][2]) + 1
                      game.broadcastAll(() => {
                        if (lib.config.background_speak)
                          game.playAudio(`ext:☆SPR/audio/spr_zhugeliang/spr_zhijve${idx}.mp3`)
                      })
                    },
                  }
                },
                prompt(links, player) {
                  return '将一张牌当作' + get.translation(links[0][2]) + '使用'
                },
              },
              group: 'spr_zhijve_reset',
              subSkill: {
                reset: {
                  direct: true,
                  trigger: {
                    global: 'phaseAfter',
                  },
                  content() {
                    player.storage.spr_zhijve_used = []
                  },
                  sub: true,
                  sourceSkill: 'spr_zhijve',
                },
              },
              ai: {
                order: 7,
                threaten: 2,
                result: {
                  player: 1,
                },
              },
            },

            // 星关羽 | spr_guanyv
            spr_wusheng: {
              audio: 'ext:☆SPR/audio/spr_guanyv:2',
            },
            spr_nuzhan: {
              audio: 'ext:☆SPR/audio/spr_guanyv/integrated:5',
              chargeSkill: true,
              init(player) {
                if (!player.storage.maxCharge) {
                  player.storage.maxCharge = 0
                }
                player.storage.maxCharge += 3
              },
              group: [
                'spr_nuzhan_phaseUse',
                'spr_nuzhan_onDamage',
                'spr_nuzhan_enchant',
                'spr_nuzhan_wushuang',
              ],
              subSkill: {
                phaseUse: {
                  audio: 'ext:☆SPR/audio/spr_guanyv:2',
                  enable: 'phaseUse',
                  usable: 1,
                  filter(event, player) {
                    return player.countCards('he') &&
                      player.countMark('charge') < player.storage.maxCharge
                  },
                  filterCard: true,
                  position: 'he',
                  prompt: '弃置一张牌并获得1点蓄力点',
                  check(card) {
                    return 7 - get.value(card)
                  },
                  content() {
                    player.addMark('charge')
                  },
                  ai: {
                    order() { return get.order({ name: 'jiu' }) - 0.1 },
                    result: {
                      player: 1,
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_nuzhan',
                },
                onDamage: {
                  audio: 'ext:☆SPR/audio/spr_guanyv:2',
                  trigger: {
                    player: 'damageEnd',
                  },
                  direct: true,
                  filter: (event, player) => lib.skill['spr_nuzhan_phaseUse'].filter(event, player),
                  content() {
                    'step 0'
                    player
                      .chooseToDiscard('he', `###${get.prompt('spr_nuzhan')}###弃置一张牌并获得1点蓄力点`)
                      .set('ai', card => {
                        if (player.countMark('charge') >= player.storage.maxCharge) return -1
                        return 7 - get.useful(card)
                      })
                    'step 1'
                    if (result.bool) {
                      player.logSkill('spr_nuzhan_onDamage')
                      player.addMark('charge')
                    }
                  },
                  sub: true,
                  sourceSkill: 'spr_nuzhan',
                },
                enchant: {
                  audio: 'ext:☆SPR/audio/spr_guanyv:1',
                  trigger: {
                    player: 'useCard1',
                  },
                  forced: true,
                  filter(event, player) {
                    return (
                      event.card.name == 'sha' &&
                      get.suit(event.card) == 'heart' &&
                      player.hasMark('charge')
                    )
                  },
                  content() {
                    const X = player.countMark('charge')
                    player.removeMark('charge', X)
                    game.setNature(trigger.card, 'fire')
                    trigger.baseDamage += X
                    if (X > 1) {
                      if (!trigger.card.storage) trigger.card.storage = {}
                      trigger.card.storage.spr_nuzhan = X - 1
                    }
                  },
                  ai: {
                    fireAttack: true,
                    damageBonus: true,
                    effect: {
                      player(card, player) {
                        if (
                          card.name == 'sha' &&
                          get.suit(card) == 'heart' &&
                          player.hasMark('charge')
                        ) return player.countMark('charge')
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_nuzhan',
                },
                wushuang: {
                  trigger: {
                    player: 'useCardToPlayered',
                  },
                  direct: true,
                  filter(event, player) {
                    return (
                      event.card.storage &&
                      event.card.storage.spr_nuzhan &&
                      !event.getParent().directHit.includes(event.target)
                    )
                  },
                  content() {
                    const id = trigger.target.playerid,
                      map = trigger.getParent().customArgs,
                      X = trigger.card.storage.spr_nuzhan
                    if (!map[id]) map[id] = {}
                    if (typeof map[id].shanRequired == 'number') {
                      map[id].shanRequired += X
                    } else {
                      map[id].shanRequired = X + 1
                    }
                  },
                  ai: {
                    directHit_ai: true,
                    skillTagFilter(player, tag, arg) {
                      const st = arg.card.storage
                      if (
                        !st ||
                        !st.spr_nuzhan ||
                        arg.target.mayHaveShan(arg.target, 'use', null, 'count') > st.spr_nuzhan
                      ) return false
                    },
                  },
                },
              },
            },
            spr_nianen: {
              audio: 'ext:☆SPR/audio/spr_guanyv:2',
              forced: true,
              trigger: {
                player: ['useCard', 'respond'],
              },
              filter(event, player) {
                if (
                  event.name == 'useCard' &&
                  event.card.name == 'sha'
                ) return false
                return (
                  get.type(event.card) == 'basic' &&
                  player.countCards('h') &&
                  player.getCards('h').every(i => get.type(i) == 'basic')
                )
              },
              content() {
                player.draw()
              },
            },

            // 星许攸 | spr_xvyou
            spr_qingman: {
              audio: 'ext:☆SPR/audio/spr_xvyou/integrated:4',
              group: 'spr_qingman_implement',
              subSkill: {
                implement: {
                  enable: 'chooseToUse',
                  usable: 1,
                  log: false,
                  hiddenCard(player, name) {
                    return !player.countSkill('spr_qingman') && name == 'jiu'
                  },
                  filter(event, player) {
                    return (
                      !player.hasSkill('spr_qingman_used') &&
                      event.filterCard({ name: 'jiu' }, player, event)
                    )
                  },
                  prompt() {
                    return '视为使用一张【酒】，然后其他角色视为对你使用【决斗】'
                  },
                  content() {
                    'step 0'
                    player.addTempSkill('spr_qingman_used', 'roundStart')
                    player.logSkill('spr_qingman_jiu')
                    player.useCard({ name: 'jiu', isCard: true }, player)

                    if (player.isDying()) {
                      player.addTempSkill('spr_qingman_deferred')
                      event.finish()
                    } else {
                      player
                        .chooseTarget(
                          true,
                          '【轻慢】效果发动',
                          '须令一名其他角色视为对你使用一张【决斗】',
                          (card, player, target) => {
                            return target != player
                          }
                        )
                        .set('ai', target => {
                          const player = get.player()
                          return get.effect(
                            player,
                            { name: 'juedou', isCard: true },
                            target,
                            player
                          )
                        })
                    }

                    'step 1'
                    if (result.bool) {
                      player.logSkill('spr_qingman_jvedou', result.targets[0])
                      result.targets[0].useCard(
                        { name: 'juedou', isCard: true },
                        player
                      )
                    } else {
                      event.finish()
                    }
                  },
                  ai: {
                    order: 8,
                    result: {
                      player(player) {
                        if (player.isDying()) return 1
                        if (
                          player.hasSkill('spr_shigong') &&
                          !player.storage.spr_shigong
                        )
                          player.storage.gettingSpr_qingmanResult = true
                        const jiuEff = get.effect(
                          player,
                          { name: 'jiu', isCard: true },
                          player,
                          player
                        )
                        const maxJuedouEff = Math.max(
                          ...game.players
                            .filter((i) => i != player)
                            .map((cur) =>
                              get.effect(
                                player,
                                { name: 'juedou', isCard: true },
                                cur,
                                player
                              )
                            )
                        )
                        delete player.storage.gettingSpr_qingmanResult
                        const res = jiuEff + maxJuedouEff
                        // game.log(
                        //   'jiuEff: ' + jiuEff.toFixed(4) +
                        //   '<br>maxJuedouEff: ' + maxJuedouEff.toFixed(4) +
                        //   '<br>spr_qingman result to player: ' + res.toFixed(4)
                        // )
                        return res
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_qingman',
                },
                deferred: {
                  charlotte: true,
                  direct: true,
                  trigger: {
                    player: 'dyingAfter',
                  },
                  content() {
                    'step 0'
                    player
                      .chooseTarget(
                        true,
                        '【轻慢】效果发动',
                        '须令一名其他角色视为对你使用一张【决斗】',
                        (card, player, target) => {
                          return target != player
                        }
                      )
                      .set('ai', target => {
                        const player = get.player()
                        return get.effect(
                          player,
                          { name: 'juedou', isCard: true },
                          target,
                          player
                        )
                      })
                    'step 1'
                    if (result.bool) {
                      player.logSkill('spr_qingman_jvedou', result.targets[0])
                      result.targets[0].useCard(
                        { name: 'juedou', isCard: true },
                        player
                      )
                    }
                    player.removeSkill('spr_qingman_deferred')
                  },
                  sub: true,
                  sourceSkill: 'spr_qingman',
                },
                jiu: {
                  audio: 'ext:☆SPR/audio/spr_xvyou:2',
                  sub: true,
                  sourceSkill: 'spr_qingman',
                },
                jvedou: {
                  audio: 'ext:☆SPR/audio/spr_xvyou:2',
                  sub: true,
                  sourceSkill: 'spr_qingman',
                },
                used: {
                  mark: true,
                  intro: {
                    content: '本轮已发动',
                  },
                  sub: true,
                  sourceSkill: 'spr_qingman',
                },
              },
            },
            spr_shigong: {
              audio: 'ext:☆SPR/audio/spr_xvyou/integrated:2',
              mark: true,
              locked: false,
              zhuanhuanji: true,
              marktext: '☯',
              intro: {
                content(storage, player, skill) {
                  return storage
                    ? '当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。'
                    : '当你使用基本牌指定目标后，你可以摸一张牌。'
                },
              },
              group: ['spr_shigong_1', 'spr_shigong_2'],
              subSkill: {
                '1': {
                  audio: 'ext:☆SPR/audio/spr_xvyou:1',
                  trigger: {
                    player: 'useCardToPlayered',
                  },
                  filter(event, player) {
                    return (
                      !player.storage.spr_shigong &&
                      get.type(event.card) == 'basic'
                    )
                  },
                  'prompt2': '当你使用基本牌指定目标后，你可以摸一张牌。',
                  content() {
                    player.changeZhuanhuanji('spr_shigong')
                    player.draw()
                  },
                  ai: {
                    effect: {
                      player(card, player, target) {
                        if (player.storage.spr_shigong) return
                        if (get.type(card) == 'basic')
                          return [1, 1]
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_shigong',
                },
                '2': {
                  audio: 'ext:☆SPR/audio/spr_xvyou:1',
                  trigger: {
                    target: 'useCardToTargeted',
                  },
                  filter(event, player) {
                    return (
                      player.storage.spr_shigong &&
                      get.type(event.card) == 'trick' &&
                      event.player.countCards('he')
                    )
                  },
                  'prompt2': '当你成为普通锦囊牌的目标后，你可以令其使用者弃置一张牌。',
                  logTarget: 'player',
                  line: 'green',
                  check(event, player) {
                    return get.attitude(player, event.player) <= 0
                  },
                  content() {
                    player.changeZhuanhuanji('spr_shigong')
                    trigger.player.chooseToDiscard('he', true)
                  },
                  ai: {
                    expose: 0.3,
                    effect: {
                      target(card, player, target) {
                        if (
                          !target.storage.spr_shigong &&
                          !target.storage.gettingSpr_qingmanResult
                        ) return
                        if (get.type(card) == 'trick')
                          return [1, 0, 1, -1]
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_shigong',
                },
              },
            },
            spr_siyan: {
              audio: 'ext:☆SPR/audio/spr_xvyou:2',
              direct: true,
              trigger: {
                player: 'damageEnd',
              },
              filter(event, player) {
                return player.countCards('he')
              },
              content() {
                'step 0'
                player
                  .chooseCard('he')
                  .set('prompt', get.prompt('spr_siyan'))
                  .set('prompt2', get.skillInfoTranslation('spr_siyan'))
                  .set('ai', card => {
                    if (player.isLinked() && !player.isTurnedOver()) return -1
                  })
                'step 1'
                if (result.bool) {
                  player.useCard(
                    { name: 'wuzhong' },
                    result.cards,
                    'spr_siyan',
                    player
                  )
                  if (!player.isLinked()) {
                    player
                      .chooseControl(['横置', '翻面'])
                      .set('prompt', '【肆言】效果发动')
                      .set('prompt2', '请选择一项并执行')
                      .set('ai', () => {
                        if (get.player().isTurnedOver()) return '翻面'
                        return '横置'
                      })
                  } else {
                    player.turnOver()
                    event.finish()
                  }
                } else {
                  event.finish()
                }

                'step 2'
                if (result.control == '横置') {
                  player.link(true)
                } else if (result.control == '翻面') {
                  player.turnOver()
                }
              },
              ai: {
                maixie: true,
                skillTagFilter(player, tag, arg) {
                  if (tag == 'maixie' && player.isLinked() && !player.isTurnedOver())
                    return false
                },
                effect: {
                  target(card, player, target) {
                    if (
                      !get.tag(card, 'damage') ||
                      player.skills.includes('jueqing') ||
                      !target.hasFriend() ||
                      player.isLinked() && !player.isTurnedOver()
                    ) return
                    return [1, 1.5]
                  },
                },
              },
            },

            // 星审配 | spr_shenpei
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

            // 星曹彰 | spr_caozhang
            spr_jiangchi: {
              audio: 'ext:☆SPR/audio/spr_caozhang/integrated:5',
              enable: 'phaseUse',
              direct: true,
              delay: false,
              filter(event, player) {
                return player.hasMark('spr_jiangchi_count')
              },
              content() {
                'step 0'
                player
                  .chooseControl(['使用牌', '摸一张牌', 'cancel2'])
                  .set('prompt', '将驰：使用一张牌（无距离和次数限制）或摸一张牌')
                  .set('ai', () => {
                    const
                      player = get.player(),
                      worthUsing = player.hasCard(card => {
                        const
                          // effect of using the card restrictedly
                          rEff = player.getUseValue(card, true, true),
                          // effect of using the card unrestrictedly
                          unrEff = player.getUseValue(card, false, false),
                          // effect of drawing a card
                          drawEff = get.effect(player, { name: 'draw' }, player, player),
                          // the weight of effect increase
                          incWeight = 0.15

                        // for versions earlier than commit 601a858
                        if (rEff) {
                          var evt = _status.event.getParent('chooseToUse')
                          if (get.itemtype(evt) !== 'event')
                            evt = undefined
                          if (!lib.filter.cardUsable(card, player, evt))
                            rEff = 0
                        }

                        // effect of using the card
                        const useEff =
                          (1 - incWeight) * unrEff +
                          incWeight * (unrEff - rEff)

                        // for test
                        // game.log(
                        //   'card: ', get.translation(card),
                        //   '<br>rEff: ', rEff.toFixed(4),
                        //   '<br>unrEff: ', unrEff.toFixed(4),
                        //   '<br>incWeight: ', incWeight.toFixed(4),
                        //   '<br>useEff: ', useEff.toFixed(4),
                        //   '<br>drawEff: ', drawEff.toFixed(4),
                        // )

                        if (unrEff <= rEff) return false
                        return useEff > drawEff
                      }, 'h')
                    if (worthUsing) return '使用牌'
                    return '摸一张牌'
                  })
                'step 1'
                switch (result.control) {
                  case '使用牌':
                    player.useSkill('spr_jiangchi_advance')
                    break
                  case '摸一张牌':
                    player.useSkill('spr_jiangchi_retreat')
                    break
                }
              },
              ai: {
                order() { return get.order({ name: 'sha' }) - 0.1 },
                result: {
                  player: 1,
                },
              },
              group: [
                'spr_jiangchi_start',
                'spr_jiangchi_onKill',
              ],
              subSkill: {
                start: {
                  charlotte: true,
                  direct: true,
                  trigger: {
                    player: 'phaseUseBegin',
                  },
                  content() {
                    player.addTempSkill('spr_jiangchi_count', 'phaseUseAfter')
                  },
                  sub: true,
                  sourceSkill: 'spr_jiangchi',
                },
                count: {
                  charlotte: true,
                  init(player, skill) {
                    player.setMark(skill, 2, false)
                  },
                  onremove: true,
                  mark: true,
                  intro: {
                    name: '将驰',
                    markcount(storage) {
                      return storage.toString()
                    },
                    content: '本阶段剩余发动次数：#',
                  },
                  sub: true,
                  sourceSkill: 'spr_jiangchi',
                },
                advance: {
                  audio: 'ext:☆SPR/audio/spr_caozhang:2',
                  direct: true,
                  delay: false,
                  content() {
                    player
                      .chooseToUse('将驰：选择一张牌并使用（无距离与次数限制）')
                      .set('targetRequired', true)
                      .set('filterTarget', function (card, player, target) {
                        return lib.filter.targetEnabled.apply(this, arguments)
                      })
                      .set('logSkill', 'spr_jiangchi_advance')
                      .set('oncard', (card, player) => {
                        player.removeMark('spr_jiangchi_count', 1, false)
                      })
                      .set('ai1', card => {
                        const
                          player = get.player(),
                          // effect of using the card restrictedly
                          rEff = player.getUseValue(card, true, true),
                          // effect of using the card unrestrictedly
                          unrEff = player.getUseValue(card, false, false),
                          // the weight of effect increase
                          incWeight = 0.15

                        // for versions earlier than commit 601a858
                        if (rEff) {
                          var evt = _status.event.getParent('chooseToUse')
                          if (get.itemtype(evt) !== 'event')
                            evt = undefined
                          if (!lib.filter.cardUsable(card, player, evt))
                            rEff = 0
                        }

                        if (unrEff <= rEff) return -1
                        return (1 - incWeight) * unrEff + incWeight * (unrEff - rEff)
                      })
                  },
                  sub: true,
                  sourceSkill: 'spr_jiangchi',
                },
                retreat: {
                  audio: 'ext:☆SPR/audio/spr_caozhang:2',
                  content() {
                    player.removeMark('spr_jiangchi_count', 1, false)
                    player.draw()
                  },
                  sub: true,
                  sourceSkill: 'spr_jiangchi',
                },
                onKill: {
                  audio: 'ext:☆SPR/audio/spr_caozhang:1',
                  trigger: {
                    source: 'dieAfter',
                  },
                  forced: true,
                  locked: false,
                  filter(event, player) {
                    return player.hasSkill('spr_jiangchi_count')
                  },
                  content() {
                    const skillName = 'spr_jiangchi_count'
                    lib.skill[skillName].init(player, skillName)
                  },
                  sub: true,
                  sourceSkill: 'spr_jiangchi',
                },
              },
            },

            // 星郭淮 | spr_guohuai
            spr_jingce: {
              audio: 'ext:☆SPR/audio/spr_guohuai/integrated:10',
              group: ['spr_jingce_recorder', 'spr_jingce_zhengsu'],
              derivation: 'spr_juyv',
              subSkill: {
                recorder: {
                  charlotte: true,
                  direct: true,
                  init(player) {
                    player.storage.spr_jingce_recorder = []
                  },
                  trigger: {
                    player: ['phaseDiscardAfter', 'phaseAfter'],
                  },
                  content() {
                    lib.skill.spr_jingce_recorder.init(player)
                  },
                  sub: true,
                  sourceSkill: 'spr_jingce',
                },
                zhengsu: {
                  audio: 'ext:☆SPR/audio/spr_guohuai:2',
                  trigger: {
                    player: 'phaseUseBegin',
                  },
                  filter(event, player) {
                    return [
                      'zhengsu_leijin',
                      'zhengsu_bianzhen',
                      'zhengsu_mingzhi',
                    ].some(i => !player.hasSkill(i))
                  },
                  direct: true,
                  content() {
                    'step 0'
                    event.sgn = 1
                    'step 1'
                    if (!lib.skill.spr_jingce_zhengsu.filter(trigger, player)) {
                      event.finish()
                      return
                    }
                    player
                      .chooseButton([
                        get.prompt('spr_jingce'),
                        [
                          [
                            'zhengsu_leijin',
                            'zhengsu_bianzhen',
                            'zhengsu_mingzhi',
                          ].filter(i => !player.hasSkill(i)),
                          'vcard',
                        ],
                      ])
                      .set('ai', () => event.sgn * Math.random())
                    'step 2'
                    if (result.bool) {
                      player.logSkill('spr_jingce_zhengsu', player)
                      var name = result.links[0][2]
                      player.addTempSkill('spr_jingce_share', {
                        player: ['phaseDiscardAfter', 'phaseAfter'],
                      })
                      player.addTempSkill(name, {
                        player: ['phaseDiscardAfter', 'phaseAfter'],
                      })
                      player.storage.spr_jingce_recorder.push(name)
                      player.popup(name, 'thunder')
                      game.delayx()
                      event.sgn = get.sgn(Math.random() - 0.5)
                      event.goto(1)
                    }
                  },
                  sub: true,
                  sourceSkill: 'spr_jingce',
                },
                share: {
                  charlotte: true,
                  trigger: {
                    player: 'phaseDiscardEnd',
                  },
                  forced: true,
                  popup: false,
                  content() {
                    'step 0'
                    const rand = n => {
                      return Math.floor(Math.random() * n) + 1
                    }
                    var num = 0
                    var zhengsu_options = [
                      'zhengsu_leijin',
                      'zhengsu_bianzhen',
                      'zhengsu_mingzhi',
                    ]
                    for (var i = 0; i < zhengsu_options.length; i++) {
                      var zhengsu_option = zhengsu_options[i]
                      if (
                        !player.storage.spr_jingce_recorder.contains(
                          zhengsu_option
                        )
                      )
                        continue
                      if (!player.storage[zhengsu_option]) {
                        game.broadcastAll(function () {
                          if (lib.config.background_speak)
                            game.playAudio(
                              `ext:☆SPR/audio/spr_guohuai/spr_jingce_fail${rand(2)}.mp3`
                            )
                        })
                        player.popup('整肃失败', 'fire')
                        game.log(player, '整肃失败')
                        event.finish()
                        return
                      } else {
                        num++
                      }
                    }
                    var term = ['single', 'double', 'triple'][num - 1]
                    game.broadcastAll(function () {
                      if (lib.config.background_speak)
                        game.playAudio(
                          `ext:☆SPR/audio/spr_guohuai/spr_jingce_${term}${rand(2)}.mp3`
                        )
                    })
                    player.popup('整肃成功', 'wood')
                    game.log(player, '整肃成功' + get.cnNumber(num) + '次')
                    event.award_count = num
                    'step 1'
                    player.chooseDrawRecover(2, '整肃奖励：摸两张牌或回复1点体力')
                    'step 2'
                    if (--event.award_count > 0) event.goto(1)
                    else {
                      player.addTempSkill('spr_juyv', { player: 'phaseBefore' })
                      game.log(
                        player,
                        '获得<span class="greentext">【',
                        get.translation('spr_juyv'),
                        '】</span>直到其下回合开始'
                      )
                    }
                  },
                  sub: true,
                  sourceSkill: 'spr_jingce',
                },
              },
            },
            spr_juyv: {
              audio: 'ext:☆SPR/audio/spr_guohuai:2',
              trigger: {
                global: 'useCard',
              },
              filter(event, player) {
                return (
                  !player.hasSkill('spr_juyv_blocker') &&
                  event.player != player &&
                  (get.tag({ name: event.card.name }, 'damage') || event.card.name == 'shandian') &&
                  player.hasCard(event.card.name, 'h')
                )
              },
              direct: true,
              content() {
                'step 0'
                player.chooseCard(
                  `###${get.prompt('spr_juyv')}###弃置一张` +
                  `【${get.translation(trigger.card.name)}】，` +
                  `令${get.translation(trigger.player)}的` +
                  `${get.translation(trigger.card.name)}无效`,
                  (card, player) => {
                    return (
                      card.name == trigger.card.name &&
                      lib.filter.cardDiscardable(card, player)
                    )
                  }
                ).set('ai', card => {
                  if (lib.skill.sbkanpo.subSkill.kanpo.check(trigger, player))
                    return Infinity - get.value(card, player)
                  return -1
                })
                'step 1'
                if (!result.bool) {
                  event.finish()
                  return
                }
                player.addTempSkill('spr_juyv_blocker')
                player.logSkill('spr_juyv')
                player.discard(result.cards[0])
                'step 2'
                trigger.targets.length = 0
                trigger.all_excluded = true
                game.log(trigger.player, '的', trigger.card, '被无效')
              },
              subSkill: {
                blocker: {
                  charlotte: true,
                  sub: true,
                  sourceSkill: 'spr_juyv',
                },
              },
            },

            // 星邹氏 | spr_zoushi
            spr_xvnxin: {
              audio: 'ext:☆SPR/audio/spr_zoushi/integrated:3',
              getHuogongEffect(player, target, thief) {
                const log = Array.from(arguments).some(i => {
                  return typeof i == 'string' && i == 'log'
                })
                // 计算【火攻】命中的收益

                player.storage.spr_xvnxin_gettingHuogongEffect = true
                const damageEff = get.damageEffect(target, player, player, 'fire')
                delete player.storage.spr_xvnxin_gettingHuogongEffect

                const mostUseless = {}
                for (var hand of player.getCards('h')) {
                  const suit = get.suit(hand)
                  if (
                    !mostUseless[suit] ||
                    get.useful(hand) < mostUseless[suit]
                  ) {
                    mostUseless[suit] = get.useful(hand)
                  }
                }
                const uMU = Object.values(mostUseless)
                const avUMU =
                  uMU.reduce((acc, num) => acc + num, 0) /
                  uMU.length
                const muUMU = Math.min(...uMU)
                const hitEff = damageEff - (target == player ? muUMU : avUMU)

                // 计算【火攻】没命中的收益
                if (player.storage.spr_xvnxin_missEff) {
                  var missEff = thief.storage.spr_xvnxin_missEff
                } else {
                  const sgnAttitude = get.sgn(get.attitude(player, thief))
                  const cardStolenEff = (card) => {
                    return (
                      get.value(card, thief) * sgnAttitude
                      - get.useful(card, player)
                    )
                  }
                  var missEff = player
                    .getCards('h', i => get.color(i) === 'red')
                    .sort((a, b) => {
                      return (
                        (cardStolenEff(b) - cardStolenEff(a)) *
                        sgnAttitude
                      )
                    })
                    .slice(0, 2)
                    .reduce((a, b) => {
                      a += cardStolenEff(b)
                      return a
                    }, 0)
                  thief.storage.spr_xvnxin_missEff = missEff
                }

                // 计算【火攻】命中的概率
                const hsSuits = player
                  .getCards('h')
                  .reduce((a, b) => {
                    a.add(b.suit)
                    return a
                  }, []).length
                const probHit = player.canUse('huogong', target) ?
                  (target == player ? 1 : hsSuits / 4) : 0

                // 计算收益值的期望
                const E_Eff = probHit * hitEff + (1 - probHit) * missEff

                // for debug
                if (log) {
                  game.log(
                    'target: ' + get.translation(target) +
                    '<br>discard avUMU: ' + -avUMU.toFixed(2) +
                    '<br>discard muUMU: ' + -muUMU.toFixed(2) +
                    '<br>damageEff: ' + damageEff.toFixed(2) +
                    '<br>hitEff: ' + hitEff.toFixed(2) +
                    '<br>missEff: ' + missEff.toFixed(2) +
                    '<br>probHit: ' + probHit.toFixed(2) +
                    '<br>E_Eff: ' + E_Eff.toFixed(2) + '<br>'
                  )
                }

                return E_Eff
              },
              estimateHuogongEffect(player, target, thief) {
                const log = Array.from(arguments).some(i => {
                  return typeof i == 'string' && i == 'log'
                })

                // 估计值
                const est_avUMU = 3
                const est_muUMU = 1
                const est_avVRed = 3
                const est_avURed = 3

                // 估算【火攻】命中的收益
                const damageEff = get.damageEffect(target, player, player, 'fire')
                const est_hitEff = damageEff - (target == player ? est_muUMU : est_avUMU)

                // 估算【火攻】没命中的收益
                const sgnAttitude = get.sgn(get.attitude(player, thief))
                const avStolenEff = est_avVRed * sgnAttitude - est_avURed
                const E_redHs = player.countCards('h') * 0.5
                const est_missEff = avStolenEff * Math.min(E_redHs, 2)

                // 估算【火攻】命中的概率
                const E_hsSuits = 4 * (1 - 0.75 ** player.countCards('h'))
                const est_probHit = player.canUse('huogong', target) ?
                  (target == player ? 1 : E_hsSuits / 4) : 0

                // 估算收益值的期望
                const est_E_Eff = est_probHit * est_hitEff + (1 - est_probHit) * est_missEff

                // for debug
                if (log) {
                  game.log(
                    'target: ' + get.translation(target) +
                    '<br>damageEff: ' + damageEff.toFixed(2) +
                    '<br>est_hitEff: ' + est_hitEff.toFixed(2) +
                    '<br>est_missEff: ' + est_missEff.toFixed(2) +
                    '<br>est_probHit: ' + est_probHit.toFixed(2) +
                    '<br>est_E_Eff: ' + est_E_Eff.toFixed(2) + '<br>'
                  )
                }

                return est_E_Eff
              },
              group: ['spr_xvnxin_huogong', 'spr_xvnxin_onDamage', 'spr_xvnxin_noDamage'],
              subSkill: {
                huogongai: {
                  onremove(player) {
                    delete player
                      .storage
                      .spr_xvnxin_thief
                      .storage
                      .spr_xvnxin_missEff
                    delete player
                      .storage
                      .spr_xvnxin_thief
                  },
                  ai: {
                    effect: {
                      player(card, player, target, current) {
                        if (
                          card.name !== 'firedamage' ||
                          player.storage
                            .spr_xvnxin_gettingHuogongEffect
                        ) return
                        return [
                          1,
                          -player
                            .storage
                            .spr_xvnxin_thief
                            .storage
                            .spr_xvnxin_missEff
                        ]
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_xvnxin',
                },
                huogong: {
                  audio: 'ext:☆SPR/audio/spr_zoushi:2',
                  enable: 'phaseUse',
                  usable: 1,
                  filterTarget(card, player, target) {
                    return (
                      player !== target &&
                      target.hasUseTarget({ name: 'huogong' })
                    )
                  },
                  content() {
                    'step 0'
                    target.storage.spr_xvnxin_thief = player
                    target.addTempSkill('spr_xvnxin_huogongai', 'useCardAfter')
                    'step 1'
                    target.chooseUseTarget(
                      `###${get.translation(player)}的` +
                      `【${get.translation('spr_xvnxin')}】发动` +
                      '###请你视为使用一张【火攻】（不能被响应）',
                      {
                        name: 'huogong',
                        storage: {
                          spr_xvnxin: true,
                          spr_xvnxin_cardDamaged: false,
                        },
                      },
                      true,
                    ).set('oncard', card => {
                      _status.event.directHit.addArray(game.players)
                    }).set('ai', current => {
                      return (
                        lib
                          .skill
                          .spr_xvnxin
                          .getHuogongEffect(
                            target,
                            current,
                            player,
                            // 'log'
                          )
                      )
                    })
                  },
                  ai: {
                    order: 8,
                    result: {
                      target(player, target) {
                        const ret = Math.max(
                          ...game.players
                            .filter((i) =>
                              target.canUse('huogong', i)
                            )
                            .map((i) =>
                              lib
                                .skill
                                .spr_xvnxin
                                .estimateHuogongEffect(
                                  target,
                                  i,
                                  player,
                                  // 'log'
                                )
                            )
                        )
                        // game.log('ret: ' + ret.toFixed(2))
                        return ret
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_xvnxin',
                },
                onDamage: {
                  trigger: {
                    global: 'damage',
                  },
                  direct: true,
                  charlotte: true,
                  filter(event, player) {
                    return (
                      event.card &&
                      event.card.storage &&
                      event.card.storage.spr_xvnxin
                    )
                  },
                  content() {
                    trigger.card.storage.spr_xvnxin_cardDamaged = true
                  },
                  sub: true,
                  sourceSkill: 'spr_xvnxin',
                },
                noDamage: {
                  audio: 'ext:☆SPR/audio/spr_zoushi:1',
                  trigger: {
                    global: 'useCardAfter',
                  },
                  forced: true,
                  locked: false,
                  logTarget: 'player',
                  filter(event, player) {
                    return (
                      event.card.storage &&
                      event.card.storage.spr_xvnxin &&
                      !event.card.storage.spr_xvnxin_cardDamaged &&
                      (event.player.countCards('h') ||
                        event.player.countCards('e', { color: 'red' }))
                    )
                  },
                  content() {
                    var target = trigger.player
                    var rheNum = target.countCards('he', { color: 'red' })
                    var num = Math.min(2, rheNum)
                    player
                      .gainPlayerCard(target, num, true, 'visible')
                      .set('prompt', '获得两张红色牌（不足则全获得）')
                      .set('filterButton', button => {
                        return get.color(button.link) == 'red'
                      })
                      .set('ai', (card) => {
                        const playerx = _status.event.playerx
                        const playery = _status.event.playery
                        const ret =
                          get.value(card, playerx) -
                          get.useful(card, playery) *
                          get.sgn(get.attitude(playerx, playery))
                        // game.log(
                        //   'card: ' + get.translation(card) +
                        //   '<br>ret: ' + ret + '<br>'
                        // )
                        return ret
                      })
                      .set('playerx', player)
                      .set('playery', target)
                  },
                  sub: true,
                  sourceSkill: 'spr_xvnxin',
                },
              },
            },
            spr_zhenxia: {
              audio: 'ext:☆SPR/audio/spr_zoushi:2',
              trigger: {
                player: 'damageSource',
              },
              filter(event, player) {
                return event.source && event.source.hasSex('male')
              },
              forced: true,
              juexingji: true,
              skillAnimation: true,
              animationColor: 'gray',
              content() {
                player.awakenSkill('spr_zhenxia')
                player.recover(1)
                trigger.source.recover(1)
                if (typeof player.addSkillLog == 'function') {
                  player.addSkillLog('spr_huoshui')
                } else {
                  player.addSkill('spr_huoshui')
                }
              },
              derivation: 'spr_huoshui',
              ai: {
                effect: {
                  target(card, player, target) {
                    if (
                      get.attitude(player, target) >= 0 ||
                      !player.hasSex('male') ||
                      target.awakenedSkills.includes('spr_zhenxia') ||
                      !card.name ||
                      !card.name.endsWith('damage') ||
                      !get.tag({ name: card.name }, 'damage')
                    ) return
                    if (player.hasSkillTag('jueqing', false, target))
                      return [1, -2]
                    return [
                      1,
                      get.recoverEffect(target, target, target),
                      1,
                      get.recoverEffect(player, target, player) - 1.3,
                    ]
                  },
                },
              },
            },
            spr_huoshui: {
              audio: 'ext:☆SPR/audio/spr_zoushi:2',
              trigger: {
                global: 'damageBegin3',
              },
              logTarget: 'player',
              filter(event, player) {
                return (
                  event.player.hasSex('male') &&
                  event.player.getAllHistory(
                    'sourceDamage',
                    evt => evt.player == player
                  ).length &&
                  event.card &&
                  get.color(event.card) == 'black'
                )
              },
              forced: true,
              content() {
                trigger.num++
              },
              mark: true,
              intro: {
                content(storage, player, skill) {
                  const menWhoDamagedU = game.filterPlayer(current => {
                    return (
                      current.isAlive() &&
                      current.hasSex('male') &&
                      current.getAllHistory(
                        'sourceDamage',
                        evt => evt.player == player
                      ).length
                    )
                  })
                  return menWhoDamagedU.length
                    ? '对你造成过伤害的男性角色：' +
                    menWhoDamagedU
                      .map(cur => get.translation(cur.name))
                      .join('、')
                    : '没有存活的男性角色对你造成过伤害'
                },
              },
              ai: {
                threaten: (player, target) => {
                  const friends = player.getFriends(true)
                  // game.log('friends: ' + friends.map((i) => get.translation(i)).join(', '))
                  const marked = (p) => {
                    return p.hasSex('male') &&
                      p.getAllHistory(
                        'sourceDamage',
                        evt => evt.player == p
                      ).length
                  }
                  const markedNum = friends.filter(i => marked(i)).length
                  // game.log('markedNum: ' + markedNum)
                  if (markedNum) {
                    const ret = 0.8 +
                      2.5 * Math.min(markedNum / 4, 1) +
                      0.6 / target.hp
                    // game.log(`threaten for ${get.translation(player)}: ` + ret)
                    return ret
                  }
                },
              },
            },

            // 星张辽 | spr_zhangliao
            spr_cuorui: {
              audio: 'ext:☆SPR/audio/spr_zhangliao:2',
              trigger: {
                source: 'damageSource',
              },
              usable: 2,
              logTarget: 'player',
              filter(event, player) {
                return (
                  event.player != player &&
                  player.countCards('he') &&
                  event.player.countCards('he')
                )
              },
              check(event, player) {
                return get.attitude(player, event.player) <= 0
              },
              content() {
                'step 0'
                player.chooseToDiscard('he', true)
                'step 1'
                player.discardPlayerCard(trigger.player, 'he', true)
                'step 2'
                if (result.bool && result.links && result.links.length) {
                  const card = result.links[0]
                  if (card.name != 'sha') {
                    player.gain(card, 'gain2')
                  } else {
                    trigger.player.damage('nocard')
                  }
                }
              },
            },
            spr_tafeng: {
              audio: 'ext:☆SPR/audio/spr_zhangliao:2',
              trigger: {
                player: 'phaseZhunbei',
              },
              filter(event, player) {
                return (
                  !player.hasSkill('spr_tafeng_used') &&
                  player.hasUseTarget('chuqibuyi')
                )
              },
              check(event, player) {
                return player.hp > 1 &&
                  player.getUseValue('chuqibuyi') > 0
              },
              prompt2: '你可以失去1点体力并摸一张牌，然后将一张牌当【出其不意】使用。',
              content() {
                'step 0'
                player.loseHp()
                player.draw()
                player.chooseCardTarget({
                  position: 'he',
                  filterCard: true,
                  filterTarget(card, player, target) {
                    return player.canUse('chuqibuyi', target)
                  },
                  ai1(card) {
                    return -get.value(card)
                  },
                  ai2(target) {
                    const player = get.player()
                    return get.effect(target, { name: 'chuqibuyi', isCard: true }, player, player)
                  },
                  prompt: `将一张牌当【出其不意】使用`,
                  forced: true,
                })
                'step 1'
                if (result.bool) {
                  player.useCard(
                    result.cards,
                    result.targets,
                    { name: 'chuqibuyi' }
                  )
                }
              },
            },

            // 星罗宪 | spr_luoxian
            spr_yongan: {
              audio: 'ext:☆SPR/audio/spr_luoxian/integrated:2',
              forced: true,
              direct: true,
              usable: 3,
              trigger: {
                global: 'gainAfter',
              },
              filter(event, player) {
                const num = event.getg(event.player).length
                return event.player == _status.currentPhase &&
                  event.getParent('phaseDraw').name != 'phaseDraw' &&
                  event.player != player &&
                  num > 0
              },
              content() {
                player.logSkill('spr_yongan_draw')
                const num = trigger.getg(trigger.player).length
                player.draw(num)
              },
              group: 'spr_yongan_discard',
              subSkill: {
                draw: {
                  audio: 'ext:☆SPR/audio/spr_luoxian:1',
                  sub: true,
                  sourceSkill: 'spr_yongan',
                },
                discard: {
                  audio: 'ext:☆SPR/audio/spr_luoxian:1',
                  forced: true,
                  trigger: {
                    global: 'phaseEnd',
                  },
                  filter(event, player) {
                    return player.countCards('h') > player.hp
                  },
                  content() {
                    player
                      .chooseToDiscard(player.countCards('h') - player.hp, 'h', true)
                      .set(ai, card => {
                        const player = get.player()
                        const enemies =
                          game.players
                            .sortBySeat(_status.currentPhase)
                            .slice(1)
                            .filter(i => get.attitude(i, player) < 0 && i.inRange(player))
                        if (enemies.length == 0)
                          return -get.value(card, player)
                      })
                  },
                  sub: true,
                  sourceSkill: 'spr_yongan',
                },
              },
            },
            spr_jvxi: {
              audio: 'ext:☆SPR/audio/spr_luoxian:1',
              enable: 'chooseToUse',
              filter(event, player) {
                return player.group == 'shu' &&
                  player.countCards('h', lib.skill.spr_jvxi.filterCard)
              },
              position: 'h',
              selectCard: -1,
              filterCard(card) {
                return get.type(card) == 'basic' && card.name != 'sha'
              },
              viewAs: {
                name: 'sha',
                storage: {
                  spr_jvxi: true,
                },
              },
              precontent() {
                'step 0'
                event.name = 'spr_jvxi'
                const name = player == game.me ? '你' : get.translation(player)
                player.showHandcards(get.translation('spr_jvxi') + '展示' + name + '的手牌')
                'step 1'
                game.delay(3)
              },
              mod: {
                cardUsable(card) {
                  if (card.storage && card.storage.spr_jvxi) return Infinity
                },
              },
              prompt: '将所有非【杀】基本牌当无次数限制的普通【杀】使用',
              ai: {
                order() {
                  return get.order({ name: 'tao' }) - 0.1
                },
                result: {
                  player(player) {
                    const cards = player.getCards('h', lib.skill.spr_jvxi.filterCard)
                    return player.getUseValue({ name: 'sha', cards: cards })
                  },
                },
                tag: {
                  respondSha: true,
                },
                skillTagFilter(player) {
                  return lib.skill.spr_jvxi.filter(player)
                },
              },
            },
            spr_xvzhong: {
              audio: 'ext:☆SPR/audio/spr_luoxian:1',
              trigger: {
                global: 'damageEnd',
              },
              logTarget: 'player',
              filter(event, player) {
                return (
                  player.group == 'wei' &&
                  event.player.isIn() &&
                  event.player != player &&
                  event.player.hp < player.hp &&
                  event.player.countCards('h') < player.countCards('h')
                )
              },
              check(event, player) {
                return get.attitude(player, event.player) > 0
              },
              content() {
                'step 0'
                player
                  .chooseCard(
                    `交给${get.translation(trigger.player)}一张牌`,
                    'he',
                    true
                  )
                  .set('ai', card => get.value(card, trigger.player))
                'step 1'
                player.line(trigger.player)
                player.give(result.cards, trigger.player)
              },
            },

            // 星陈到 | spr_chendao
            spr_wanglie: {
              audio: 'ext:☆SPR/audio/spr_chendao/integrated:4',
              group: 'spr_wanglie_main',
              subSkill: {
                main: {
                  audio: 'ext:☆SPR/audio/spr_chendao:2',
                  enable: 'phaseUse',
                  usable: 1,
                  filter(event, player) {
                    return player.countCards('h')
                  },
                  selectCard: [1, Infinity],
                  filterCard(card) {
                    if (!ui.selected.cards.length) return true
                    return card.name == ui.selected.cards[0].name
                  },
                  complexCard: true,
                  discard: false,
                  lose: false,
                  delay: false,
                  filterTarget: true,
                  check(card) {
                    return ui.selected.cards.length > 1 ? 0 : 10 - get.value(card)
                  },
                  content() {
                    'step 0'
                    player.showCards(cards)
                    if (player != target) {
                      target.gain(player, cards, 'gain2', true)
                    }
                    target.addTempSkill('spr_wanglie_enchanter')
                    target.storage['spr_wanglie_enchanter'] = player
                    'step 1'
                    target
                      .chooseToUse('往烈：你可以使用一张牌（无距离限制且不可被响应）')
                      .set('filterCard', (card, player) => {
                        return player.hasUseTarget(card, false, true) &&
                          lib.filter.cardUsable(card, player, _status.event.getParent('chooseToUse'))
                      })
                    'step 2'
                    if (!result.bool) {
                      game.broadcastAll(() => {
                        if (lib.config.background_speak)
                          game.playAudio('ext:☆SPR/audio/spr_chendao', 'spr_wanglie_giveUp.mp3')
                      })
                      target.popup('取消用牌', 'fire')
                      target.removeSkill('spr_wanglie_enchanter')
                    }
                  },
                  prompt: '展示任意张相同牌名的手牌并令一名角色获得之',
                  ai: {
                    order() {
                      return get.order({ name: 'sha' }) + 0.1
                    },
                    expose: 0.4,
                    result: {
                      target(player, target) {
                        return player == target ? 1 : 2
                      },
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_wanglie',
                },
                enchanter: {
                  audio: 'ext:☆SPR/audio/spr_chendao:1',
                  trigger: {
                    player: 'useCard',
                  },
                  forced: true,
                  locked: false,
                  log: false,
                  onremove: true,
                  charlotte: true,
                  content() {
                    trigger.directHit.addArray(game.players)
                    player.storage['spr_wanglie_enchanter'].line(player)
                    player.removeSkill('spr_wanglie_enchanter')
                  },
                  mod: {
                    targetInRange: () => true,
                    aiOrder(player, card, num) {
                      if (get.tag(card, 'damage')) return num + 10
                    },
                  },
                  sub: true,
                  sourceSkill: 'spr_wanglie',
                },
              },
            },
            spr_baier: {
              audio: 'ext:☆SPR/audio/spr_chendao:2',
              trigger: {
                global: 'useCardAfter',
              },
              filter(event, player) {
                return (
                  !player.isTempBanned('spr_baier') &&
                  event.card.name == 'sha' &&
                  event.cards.filterInD().length &&
                  event.player.isIn() &&
                  event.player.hasHistory('sourceDamage', evt => evt.card == event.card)
                )
              },
              direct: true,
              content() {
                'step 0'
                var prompt = '令'
                prompt += player == trigger.player ? '你' : get.translation(player)
                prompt += '获得' + get.translation(trigger.cards)
                trigger.player
                  .chooseBool(get.prompt('spr_baier'), prompt)
                  .set('choice', get.attitude(trigger.player, player) > 0)
                'step 1'
                if (result.bool) {
                  player.logSkill('spr_baier', trigger.player)
                  player.tempBanSkill('spr_baier', null, false)
                  player.gain(trigger.cards.filterInD(), 'gain2')
                }
              },
            },

            // 星陈珪 | spr_chengui
            spr_guimou: {
              audio: 'ext:☆SPR/audio/spr_chengui:2',
              trigger: {
                source: 'damageBegin4',
              },
              usable: 1,
              filter(event, player) {
                return game.hasPlayer(i => i != event.player)
              },
              isUsable(player) {
                if (!player.hasSkill('spr_guimou')) return false
                const info = get.info('spr_guimou')
                if (
                  player.hasSkill('counttrigger') &&
                  player.storage.counttrigger &&
                  player.storage.counttrigger['spr_guimou'] >= info.usable
                ) return false
                return true
              },
              check(event, player) {
                if (
                  get.attitude(player, event.player) <= 0 &&
                  game.hasPlayer(i =>
                    get.damageEffect(i, player, player) <
                    get.damageEffect(event.player, player, player)
                  )
                ) return false
                return true
              },
              content() {
                'step 0'
                player
                  .chooseControl(['转移此伤害', '摸两张牌', '背水'])
                  .set('ai', () => {
                    const controls = ['摸两张牌', '背水']
                    if (get.attitude(get.player(), trigger.player) > 0)
                      controls.unshift('转移此伤害')
                    return controls[Math.floor(Math.random() * controls.length)]
                  })
                'step 1'
                if (result.control == '转移此伤害') {
                  event.transferor = player
                  event.drawer = trigger.player
                } else if (result.control == '摸两张牌') {
                  player.draw(2)
                  event.transferor = trigger.player
                  event.drawn = true
                } else if (result.control == '背水') {
                  event.transferor = player
                  event.drawer = player
                  player.addTempSkill('spr_guimou_beishui')
                }
                'step 2'
                const evt = event
                evt.transferor
                  .chooseTarget(
                    `诡谋：转移对${get.translation(trigger.player)}造成的伤害`,
                    (card, player, target) => target != trigger.player,
                    true
                  )
                  .set('ai', target => {
                    const deltaDamageEff =
                      get.damageEffect(target, evt.transferor, evt.transferor) -
                      get.damageEffect(trigger.player, evt.transferor, evt.transferor)
                    return deltaDamageEff
                  })
                'step 3'
                const target = result.targets[0]
                game.log(event.transferor, '将对', trigger.player, '造成的伤害转移给了', target)
                trigger.player = target
                if (!event.drawn) {
                  event.drawer.addTempSkill('spr_guimou_draw')
                  event.drawer.storage.spr_guimou_draw = target
                }
              },
              group: 'spr_guimou_directHitAI',
              subSkill: {
                draw: {
                  trigger: {
                    global: ['damageAfter', 'damageCancelled', 'damageZero', 'dieAfter'],
                  },
                  filter(event, player) {
                    return player.isIn() && event.player == player.storage.spr_guimou_draw
                  },
                  onremove: true,
                  direct: true,
                  vanish: true,
                  charlotte: true,
                  content() {
                    player.popup('spr_guimou_draw')
                    player.draw(2)
                    player.removeSkill('spr_guimou_draw')
                  },
                  sub: true,
                  sourceSkill: 'spr_guimou',
                },
                beishui: {
                  mod: {
                    playerEnabled(card, player, target) {
                      if (player != target) return false
                    },
                  },
                  mark: true,
                  marktext: '诡谋 背水',
                  intro: {
                    name2: '诡谋',
                    content: '本回合不能对其他角色使用牌',
                  },
                  charlotte: true,
                  sub: true,
                  sourceSkill: 'spr_guimou',
                },
                directHitAI: {
                  trigger: {
                    player: 'useCardToPlayered',
                  },
                  filter(event, player) {
                    return (
                      get.tag({ name: event.card.name }, 'damage') &&
                      lib.skill['spr_guimou'].isUsable(player) &&
                      get.attitude(event.target, player) > 0
                    )
                  },
                  direct: true,
                  charlotte: true,
                  firstDo: true,
                  content() {
                    trigger.target.addTempSkill('spr_guimou_goodDamage')
                  },
                },
                goodDamage: {
                  trigger: {
                    global: ['damageAfter', 'damageCancelled', 'damageZero', 'dieAfter', 'useCardAfter'],
                  },
                  direct: true,
                  firstDo: true,
                  content() {
                    player.removeSkill('spr_guimou_goodDamage')
                  },
                  ai: {
                    effect: {
                      target(card, player, target) {
                        if (
                          card.name &&
                          card.name.endsWith('damage') &&
                          lib.skill['spr_guimou'].isUsable(player) &&
                          get.attitude(target, player) > 0
                        ) {
                          return [0, 3.5]
                        }
                      },
                    },
                  },
                },
              },
              ai: {
                effect: {
                  player(card, player, target) {
                    if (!card.name || card.name.endsWith('damage')) return
                    const conditions =
                      card.name &&
                      get.tag({ name: card.name }, 'damage') &&
                      get.attitude(target, player) > 0 &&
                      lib.skill['spr_guimou'].isUsable(player) &&
                      game.hasPlayer(i => {
                        const deltaDamageEff =
                          get.damageEffect(i, player, player) -
                          get.damageEffect(target, player, player)
                        return deltaDamageEff > 0
                      })
                    if (conditions) {
                      const damageEffs = game.players.filter(i => i != target).map(i => get.damageEffect(i, player, player))
                      return [0, Math.max(...damageEffs) + 2]
                    }
                  },
                },
              },
            },
            spr_congshi: {
              audio: 'ext:☆SPR/audio/spr_chengui:2',
              trigger: {
                player: 'damageEnd',
              },
              usable: 1,
              logTarget: 'source',
              filter(event, player) {
                return get.itemtype(event.cards) == 'cards'
                  && get.position(event.cards[0], true) == 'o'
                  && event.source
                  && event.source.isIn()
              },
              content() {
                trigger.source.gain(trigger.cards, 'gain2')
                player.recover()
              },
              prompt2(event, player) {
                return `令${get.translation(event.source)}获得${get.translation(event.card)}，然后你回复1点体力`
              },
              ai: {
                maixie_defend: true,
                threaten: 0.9,
              },
            },

            // 星陈武董袭 | spr_chenwudongxi
            spr_shangjia: {
              audio: 'ext:☆SPR/audio/spr_chenwudongxi:2',
              trigger: {
                player: 'useCard',
              },
              forced: true,
              filter(event, player) {
                return (
                  (
                    get.tag(event.card, 'damage') ||
                    event.card.name == 'shandian'
                  )
                  &&
                  player
                    .getCards('e')
                    .some(i =>
                      get.suit(i, player) ==
                      get.suit(event.card, player)
                    )
                )
              },
              content() {
                'step 0'
                player
                  .chooseControl([
                    '摸一张牌',
                    `令${get.translation(trigger.card.name)}不可响应`
                  ])
                  .set('prompt', '上甲：你须选择一项')
                'step 1'
                if (result.control == '摸一张牌') {
                  player.draw()
                } else {
                  trigger.directHit.addArray(game.players)
                }
              },
              mod: {
                aiOrder(player, card, num) {
                  if (get.type(card) == 'equip')
                    return num + 10
                },
              },
            },
            spr_duanxie: {
              audio: 'ext:☆SPR/audio/spr_chenwudongxi:2',
              enable: 'phaseUse',
              usable: 1,
              filter(event, player) {
                return player.countCards('he', i => {
                  return lib.skill['spr_duanxie'].filterCard(i, player)
                })
              },
              delay: false,
              lose: false,
              discard: false,
              position: 'he',
              selectCard: 1,
              filterCard(card, player) {
                const tiesuo = get.autoViewAs({ name: 'tiesuo' }, [card])
                return player.hasUseTarget(tiesuo)
              },
              selectTarget: [1, 2],
              filterTarget(card, player, target) {
                const tiesuo = get.autoViewAs({ name: 'tiesuo' }, [card])
                return player.canUse(tiesuo, target)
              },
              multitarget: true,
              line: false,
              prompt: '将一张牌当【铁索连环】使用，然后对因此被重置的角色各造成1点伤害',
              content() {
                'step 0'
                event.targets = targets.sortBySeat(_status.currentPhase)
                'step 1'
                event.preLinked = []
                event.targets.forEach(i => {
                  if (i.isLinked())
                    event.preLinked.push(i)
                })
                player.useCard(
                  cards,
                  event.targets,
                  { name: 'tiesuo' }
                ).audio = false
                'step 2'
                event.targets.forEach(i => {
                  if (!i.isLinked() && event.preLinked.includes(i))
                    i.damage('nocard')
                })
              },
              ai: {
                order: 7.2,
                result: {
                  target(player, target, card) {
                    if (target.hasSkill('nzry_jieying'))
                      return 0
                    return target.isLinked() ? -2 : -1
                  },
                },
              }
            },
            spr_fenming: {
              audio: 'ext:☆SPR/audio/spr_chenwudongxi:2',
              trigger: {
                source: 'damageEnd',
              },
              direct: true,
              getOtherSkills(player, currentSkill) {
                var
                  list = [],
                  listm = [],
                  listv = []
                if (player.name1 != undefined)
                  listm = lib.character[player.name1][3]
                else
                  listm = lib.character[player.name][3]
                if (player.name2 != undefined)
                  listv = lib.character[player.name2][3]
                listm = listm.concat(listv)
                var isValid = skill => {
                  var info = get.info(skill)
                  return (
                    skill != currentSkill &&
                    info &&
                    !info.charlotte &&
                    !info.persevereSkill
                  )
                }
                listm.forEach(i => {
                  if (isValid(i) && player.hasSkill(i))
                    list.add(i)
                })
                return list
              },
              filter(event, player) {
                return (
                  event.player != player &&
                  event.player.countGainableCards(player, 'he')
                )
              },
              content() {
                'step 0'
                event.otherSkills =
                  lib.skill['spr_fenming'].getOtherSkills(player, 'spr_fenming')
                if (!event.otherSkills.length) {
                  player
                  .chooseBool(
                    `###${get.prompt('spr_fenming')}###` +
                    '你可以失去1点体力，然后获得' +
                    get.translation(trigger.player) +
                    '一张牌'
                  )
                  .set('ai', () => {
                    return get.attitude(get.player(), trigger.player) < 0
                  })
                }
                'step 1'
                if (typeof result.bool == 'boolean') {
                  if (result.bool) {
                    player.logSkill('spr_fenming', trigger.player)
                    player.loseHp()
                    event.goto(4)
                  } else {
                    event.finish()
                  }
                  return
                }
                const controls = ['失去体力']
                controls.push('失去' +
                  (
                    event.otherSkills.length == 1 ?
                      get.translation(event.otherSkills[0]) : '技能'
                  )
                )
                controls.push('cancel2')
                player
                  .chooseControl(controls)
                  .set('prompt', get.prompt('spr_fenming'))
                  .set(
                    'prompt2',
                    '你可以失去1点体力或武将牌上的一个其他技能，' +
                    `然后获得${get.translation(trigger.player)}一张牌`
                  )
                  .set('ai', () => {
                    if (get.player().hp <= 1)
                      return controls[1]
                    return controls[0]
                  })
                'step 2'
                if (result.control == 'cancel2') {
                  event.finish()
                  return
                }
                else if (result.control == '失去体力') {
                  player.logSkill('spr_fenming', trigger.player)
                  player.loseHp()
                  event.goto(4)
                } else {
                  if (event.otherSkills.length == 1) {
                    player.logSkill('spr_fenming', trigger.player)
                    player.removeSkill(event.otherSkills[0])
                    event.goto(4)
                  } else {
                    player
                      .chooseControl(event.otherSkills.concat('返回'))
                      .set('prompt', '奋命：选择失去一个技能')
                      .set('ai', () => {
                        return Math.floor(Math.random() * event.otherSkills.length)
                      })
                  }
                }
                'step 3'
                if (result.control == '返回') {
                  event.goto(1)
                }
                else {
                  player.logSkill('spr_fenming', trigger.player)
                  player.removeSkill(result.control)
                }
                'step 4'
                player.gainPlayerCard(trigger.player, true)
              },
            },

            // 星曹纯 | spr_caochun
            spr_shanjia: {
              audio: 'ext:☆SPR/audio/spr_caochun:2',
              trigger: {
                global: 'phaseJieshuBegin',
              },
              forced: true,
              locked: false,
              content() {
                'step 0'
                player.draw()
                player.storage.spr_shanjia = true
                'step 1'
                if (!player.countCards('h', i => get.type(i) == 'equip'))
                  event.hsNoEquip = true
                else {
                  player
                    .chooseToUse('缮甲：请使用一张装备牌，或点“取消”改为弃置一张牌')
                    .set('filterCard', function (card, player, event) {
                      if (get.type(card) != 'equip') return false
                      return lib.filter.filterCard.apply(this, arguments)
                    })
                }
                'step 2'
                if (event.hsNoEquip === true || !result.bool) {
                  player
                    .chooseToDiscard(true, 'he')
                    .set('ai', card => {
                      const player = get.player()
                      var ret = 1000 - get.value(card, player)

                      const valueSha = get
                        .inpileVCardList(info => info[2] === 'sha')
                        .some(info => {
                          const card = new lib.element.VCard({ name: 'sha', nature: info[3] })
                          return player.hasValueTarget(card, false)
                        })
                      if (player.getCards('e').includes(card) && valueSha)
                        ret += 100
                      return ret
                    })
                }
                'step 3'
                delete player.storage.spr_shanjia
              },
              group: 'spr_shanjia_sha',
              subSkill: {
                sha: {
                  audio: 'ext:☆SPR/audio/spr_caochun:1',
                  trigger: {
                    player: 'loseAfter',
                    global: [
                      'equipAfter',
                      'addJudgeAfter',
                      'gainAfter',
                      'loseAsyncAfter',
                      'addToExpansionAfter',
                    ],
                  },
                  filter(event, player) {
                    if (player.storage.spr_shanjia !== true)
                      return false
                    const canUseSha = get
                      .inpileVCardList(info => info[2] === 'sha')
                      .some(info => {
                        const card = new lib.element.VCard({ name: 'sha', nature: info[3] })
                        return player.hasUseTarget(card, false)
                      })
                    if (!canUseSha) return false
                    const evt = event.getl(player)
                    return (
                      evt &&
                      evt.player == player &&
                      evt.es &&
                      evt.es.length
                    )
                  },
                  direct: true,
                  content() {
                    'step 0'
                    delete player.storage.spr_shanjia
                    const vcards = get
                      .inpileVCardList(info => info[2] === 'sha')
                      .filter(info => {
                        const card = new lib.element.VCard({ name: 'sha', nature: info[3] })
                        return player.hasUseTarget(card, false)
                      })
                    if (vcards.length == 1)
                      event.singleVcard = vcards[0]
                    else {
                      player
                        .chooseButton(
                          [
                            '缮甲：你可以视为使用【杀】',
                            '<div class="text center">无距离限制</div>',
                            [vcards, 'vcard']
                          ]
                        )
                        .set('ai', button => {
                          const
                            player = get.player(),
                            card = new lib.element.VCard({ name: 'sha', nature: button.link[3] })
                          return player.getUseValue(card, false)
                        })
                    }
                    'step 1'
                    if (result.bool) {
                      const card = event.singleVcard || new lib.element.VCard({ name: 'sha', nature: result.links[0][3] })
                      player.chooseUseTarget(card, true, false, 'nodistance').logSkill = 'spr_shanjia_sha'
                    }
                  },
                },
                slient: {
                  sub: true,
                  sourceSkill: 'spr_shanjia',
                },
              },
            },

            // 星王桃王悦 | spr_wangtaowangyue
            spr_shuangbi: {
              audio: 'ext:☆SPR/audio/spr_wangtaowangyue:2',
              trigger: {
                global: 'useCard',
              },
              filter(event, player) {
                return (
                  event.player != player &&
                  event.player.isPhaseUsing() &&
                  event.card.name == 'sha' &&
                  player.countCards('he') >= 2
                )
              },
              usable: 1,
              logTarget: 'player',
              prompt2: '交给其两张牌，令其本阶段使用【杀】的次数上限+2',
              check(event, player) {
                return get.attitude(player, event.player) > 0
              },
              content() {
                'step 0'
                player
                  .chooseCard(
                    2,
                    true,
                    'he',
                    `双璧：请选择两张牌交给${get.translation(trigger.player)}`
                  )
                'step 1'
                player.give(result.cards, trigger.player)
                trigger.player.addTempSkill('spr_shuangbi_shaPlus')
              },
              subSkill: {
                shaPlus: {
                  mod: {
                    cardUsable(card, player, num) {
                      if (card.name == 'sha') return num + 2
                    },
                  },
                  mark: true,
                  marktext: '杀次数+2',
                  intro: {
                    name: '双璧',
                    content: '本回合使用【杀】的次数上限+2',
                  },
                },
              },
              ai: {
                expose: 0.8,
              },
            },
            spr_tongzheng: {
              audio: 'ext:☆SPR/audio/spr_wangtaowangyue:2',
              trigger: {
                global: 'dying',
              },
              filter(event, player) {
                return !player.isTempBanned('spr_tongzheng')
              },
              direct: true,
              content() {
                'step 0'
                const name =
                  (player == _status.currentPhase) ?
                    '自己' : get.translation(player)
                _status.currentPhase
                  .chooseBool(
                    get.prompt('spr_tongzheng'),
                    `令${name}摸两张牌并回复1点体力`
                  )
                  .set('ai', () => {
                    const sourcex = get.event().sourcex
                    return get.attitude(_status.currentPhase, sourcex) > 0
                  })
                  .set('sourcex', player)
                'step 1'
                if (result.bool) {
                  player.logSkill('spr_tongzheng')
                  player.tempBanSkill('spr_tongzheng')
                  _status.currentPhase.line(player)
                  player.draw(2)
                  player.recover()
                }
              },
              ai: {
                threaten: 1.2,
                effect: {
                  target(card, player, target) {
                    if (
                      (
                        get.tag(card, 'damage') ||
                        (card.name && card.name.endsWith('damage'))
                      ) &&
                      get.attitude(player, target) > 0 &&
                      get.attitude(_status.currentPhase, target) > 0 &&
                      !player.hasSkillTag('damageBonus') &&
                      target.hp == 1 &&
                      target.hasSkill('spr_tongzheng') &&
                      !target.isTempBanned('spr_tongzheng')
                    ) return [0, 2]
                  },
                },
              },
            },
          },
          translate: {
            ...TEXTS.translate.character.id,
            ...TEXTS.translate.character.skill,
            ...TEXTS.translate.character.other,
          },
        }

        // set extra attributes of character
        const characters = SPR_CHARS.character
        for (let id in characters) {
          // name prefix
          SPR_CHARS.translate[id + '_prefix'] = '星'

          if (!characters[id][4]) characters[id][4] = []
          // image
          const illustrationStyle = game.getExtensionConfig(this.name, 'illustrationStyle')
          characters[id][4].push(`ext:☆SPR/image/character/${illustrationStyle}/${id}.jpg`)
          // die audio
          characters[id][4].push(`die:ext:${this.name}/audio/die/${id}.mp3`)
        }

        game.import('character', function () {
          return SPR_CHARS
        })
        lib.config.all.characters.push('spr')
        if (!lib.config.characters.contains('spr'))
          lib.config.characters.push('spr')
        lib.translate['spr_character_config'] = '☆SPR'
      }
      /*-----create cards-----*/
      {
        const SPR_CARDS = {
          name: 'spr',
          card: {
          },
          skill: {
          },
          translate: TEXTS.translate.card,
          list: [],
        }
        game.import('card', function () {
          return SPR_CARDS
        })
        lib.config.all.cards.push('spr')
        if (!lib.config.cards.contains('spr'))
          lib.config.cards.push('spr')
        lib.translate['spr_card_config'] = '☆SPR'
      }
      /*-----QHLY-----*/
      {
        const QHLY = '千幻聆音'
        game.getFileList('extension/', (dirs, files) => {
          for (let dir of dirs) {
            if (dir == QHLY && lib.config[`extension_${QHLY}_enable`]) {
              if (
                game.getExtensionConfig(
                  QHLY,
                  'qhly_funcLoadInPrecontent'
                ) == false
              ) {
                game.saveExtensionConfig(
                  QHLY,
                  'qhly_funcLoadInPrecontent',
                  true
                )
                if (confirm(`是否重启游戏以启用${this.name}的千幻皮肤设置？`))
                  game.reload()
              } else {
                // original skin
                if (!lib.qhlypkg)
                  lib.qhlypkg = []
                lib.qhlypkg.push({
                  isExt: true,
                  fromExt: true,
                  filterCharacter(name) {
                    return name.startsWith('spr_')
                  },
                  skin: {
                    origin: `extension/${this.name}/image/character/origin/`,
                  },
                })
                // skin info
                if (!lib.qhly_dirskininfo)
                  lib.qhly_dirskininfo = {}
                Object.assign(lib.qhly_dirskininfo, TEXTS.skininfo)
              }
              break
            }
          }
        })
      }
      /*-----十周年UI-----*/
      {
        const
          checkExtension = function (extName, callback) {
            game.getFileList('extension/', (dirs, files) => {
              let enabled = false;
              for (let dir of dirs) {
                if (dir === extName && lib.config[`extension_${extName}_enable`]) {
                  enabled = true;
                  break;
                }
              }
              callback(enabled); // 异步返回结果
            }, (err) => {
              alert('获取扩展列表失败: ' + err.message);
              callback(false); // 出错默认返回 false
            });
          },
          copyFile = function (sourcePath, targetDir) {
            const filename = sourcePath.split('/').pop() // 提取文件名

            // 先确保目标目录存在
            game.ensureDirectory(targetDir, () => {
              // 读取源文件内容（为保证写入稳定性用 arraybuffer 方式）
              game.readFile(sourcePath, (data) => {
                // 写入到目标目录
                game.writeFile(data, targetDir, filename, (err) => {
                  if (err) {
                    // alert(`写入文件 ${filename} 失败: ${err.message}`)
                  }
                });
              }, (err) => {
                alert(`读取文件 ${filename} 失败: ${err.message}`)
              })
            }, false) // false 表示是目录
          },
          copyDirectory = function (sourceDir, targetDir) {
            game.ensureDirectory(targetDir, () => {
              game.getFileList(sourceDir, (folders, files) => {
                files.forEach(file => {
                  const sourceFile = sourceDir + file
                  const targetFileDir = targetDir

                  game.readFile(sourceFile, (data) => {
                    game.writeFile(data, targetFileDir, file, (err) => {
                      if (err) {
                        // alert(`写入文件 ${file} 失败: ${err.message}`)
                      }
                    })
                  }, (err) => {
                    alert(`读取文件 ${file} 失败: ${err.message}`)
                  })
                })

                folders.forEach(folder => {
                  const sourceSubDir = sourceDir + folder + '/'
                  const targetSubDir = targetDir + folder + '/'
                  copyDirectory(sourceSubDir, targetSubDir)
                })
              }, (err) => {
                alert('获取文件列表失败: ' + err.message)
              })
            }, false)
          }
        checkExtension('十周年UI', check1 => {
          if (check1) {
            const skillUIs = [
              'spr_shigong_yang.png',
              'spr_shigong_ying.png',
              'spr_shouye_yang.png',
              'spr_shouye_ying.png',
            ]
            for (let skillUI of skillUIs) {
              copyFile(
                `extension/${this.name}/image/ui/${skillUI}`,
                'extension/十周年UI/skill/images/'
              )
            }
            checkExtension('千幻聆音', check2 => {
              if (check2) {
                copyDirectory(
                  `extension/${this.name}/image/character/origin/`,
                  'extension/千幻聆音/sanguoyuanhua/'
                )
              }
            })
          }
        })

      }
    },

    content(config, pack) {
      /*-----add additional cards-----*/
      if (!('draw' in lib.card)) {
        lib.card.draw = {
          ai: {
            result: {
              target: 1,
            },
            tag: {
              draw: 1,
            },
          },
        }
      }

      /*-----character rank-----*/
      // 炎龙
      lib.rank.rarity.legend.addArray([
        'spr_zhugeliang',
        'spr_xvyou',
        'spr_caochun',
      ])
      // 玉龙
      lib.rank.rarity.epic.addArray([
        'spr_guanyv',
        'spr_guohuai',
        'spr_zoushi',
        'spr_zhangliao',
        'spr_luoxian',
        'spr_chengui',
        'spr_chenwudongxi',
        'spr_wangtaowangyue',
      ])
      // 金龙
      lib.rank.rarity.rare.addArray([
        'spr_shenpei',
        'spr_caozhang',
      ])
      /** 默认是银龙
       * 'spr_machao',
       * 'spr_chendao',
       */
      // 无龙
      lib.rank.rarity.junk.addArray([
      ])

      /*-----custom skill audio-----*/
      if (!lib.skill['wusheng'].audioname2) {
        lib.skill['wusheng'].audioname2 = {}
      }
      lib.skill['wusheng'].audioname2['spr_guanyv'] = 'spr_wusheng'
    },
  }
})