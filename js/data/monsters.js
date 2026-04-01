/**
 * 青塘園守護者 - 怪物資料
 * 15 隻暗影怪物，從小怪到隱藏Boss
 */
export const MONSTERS = [
  {
    id: "M01",
    name: "暗影小蟲",
    type: "minion",
    element: "暗",
    locationId: "all",
    levelRange: [1, 5],
    hp: 100,
    attack: 10,
    defense: 3,
    sprite: "🪲",
    skills: [
      { name: "暗蝕", desc: "對目標造成少量暗屬性傷害。", chance: 1.0 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 1, chance: 0.8 },
      { itemId: "I002", name: "金幣袋（小）", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "任何地點隨機出現，每5分鐘刷新。"
  },
  {
    id: "M02",
    name: "暗影蜘蛛",
    type: "elite",
    element: "暗",
    locationId: "P09",
    levelRange: [4, 8],
    hp: 500,
    attack: 35,
    defense: 15,
    sprite: "🕷️",
    skills: [
      { name: "暗網纏繞", desc: "用暗影絲線束縛目標，降低移動速度50%持續2回合。", chance: 0.6 },
      { name: "毒牙突擊", desc: "咬擊造成傷害並附加中毒效果，每回合損失5%HP。", chance: 0.4 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 3, chance: 0.9 },
      { itemId: "I003", name: "蛛絲結晶", quantity: 1, chance: 0.3 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P09北境巡邏路，每15分鐘刷新，同時最多2隻。"
  },
  {
    id: "M03",
    name: "暗影烏鴉群",
    type: "elite",
    element: "暗/風",
    locationId: "P02",
    levelRange: [3, 7],
    hp: 400,
    attack: 40,
    defense: 12,
    sprite: "🐦‍⬛",
    skills: [
      { name: "暗羽風暴", desc: "群體攻擊，對所有玩家造成風屬性傷害。", chance: 0.5 },
      { name: "偷蛋", desc: "嘗試偷取祝福之蛋，若成功則P02光明值降低5%。", chance: 0.3 },
      { name: "黑霧遮蔽", desc: "製造黑霧降低玩家命中率30%持續2回合。", chance: 0.4 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 2, chance: 0.85 },
      { itemId: "I004", name: "烏鴉羽毛", quantity: 1, chance: 0.4 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P02祝福鳥巢，每20分鐘刷新，黃昏時段（17:00-19:00）出現率翻倍。"
  },
  {
    id: "M04",
    name: "暗影地鼠王",
    type: "boss",
    element: "暗/地",
    locationId: "P07",
    levelRange: [5, 10],
    hp: 2000,
    attack: 80,
    defense: 30,
    sprite: "🐀",
    skills: [
      { name: "地裂衝擊", desc: "重擊地面造成範圍地屬性傷害。", chance: 0.4 },
      { name: "鑽地迴避", desc: "鑽入地下迴避所有攻擊1回合。", chance: 0.3 },
      { name: "召喚小地鼠", desc: "召喚3隻暗影小地鼠助戰。", chance: 0.2 },
      { name: "震盪波", desc: "全體攻擊，有30%機率使目標暈眩1回合。", chance: 0.3 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 10, chance: 1.0 },
      { itemId: "I005", name: "地鼠王冠", quantity: 1, chance: 0.15 },
      { itemId: "I011", name: "Boss結晶", quantity: 1, chance: 0.8 },
      { itemId: "I020", name: "稀有裝備箱", quantity: 1, chance: 0.1 }
    ],
    spawnCondition: "P07翠綠戰場，需3人以上組隊觸發，每小時刷新一次。"
  },
  {
    id: "M05",
    name: "暗影水母",
    type: "elite",
    element: "暗/水",
    locationId: "P04",
    levelRange: [7, 12],
    hp: 600,
    attack: 45,
    defense: 18,
    sprite: "🪼",
    skills: [
      { name: "毒觸手", desc: "觸手攻擊造成傷害並附加麻痺效果1回合。", chance: 0.5 },
      { name: "污染擴散", desc: "污染聖泉水域，P04光明值降低3%。", chance: 0.2 },
      { name: "水幕防護", desc: "自身防禦力提升30%持續2回合。", chance: 0.4 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 4, chance: 0.9 },
      { itemId: "I006", name: "水母凝膠", quantity: 1, chance: 0.35 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P04漣漪聖泉，每15分鐘刷新，雨天出現率增加。"
  },
  {
    id: "M06",
    name: "暗影風暴獸",
    type: "boss",
    element: "暗/風",
    locationId: "P03",
    levelRange: [8, 15],
    hp: 3000,
    attack: 100,
    defense: 40,
    sprite: "🌪️",
    skills: [
      { name: "暗影龍捲", desc: "製造暗影龍捲風，對全體造成大量風屬性傷害。", chance: 0.35 },
      { name: "亂流護體", desc: "周身亂流使近戰攻擊者受到反彈傷害。", chance: 0.3 },
      { name: "引擎破壞", desc: "嘗試破壞夢想飛船引擎，若成功P03光明值降低8%。", chance: 0.15 },
      { name: "風刃連射", desc: "連續發射5道風刃，各自隨機攻擊一名玩家。", chance: 0.3 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 15, chance: 1.0 },
      { itemId: "I007", name: "風暴核心", quantity: 1, chance: 0.2 },
      { itemId: "I011", name: "Boss結晶", quantity: 1, chance: 0.8 },
      { itemId: "I020", name: "稀有裝備箱", quantity: 1, chance: 0.15 }
    ],
    spawnCondition: "P03夢想飛船，需4人以上組隊觸發，每2小時刷新一次。"
  },
  {
    id: "M07",
    name: "暗影蓮妖",
    type: "elite",
    element: "暗/水",
    locationId: "P06",
    levelRange: [10, 15],
    hp: 800,
    attack: 55,
    defense: 22,
    sprite: "🌸",
    skills: [
      { name: "蓮華幻術", desc: "偽裝成普通荷花，被識破前先發攻擊造成額外50%傷害。", chance: 0.4 },
      { name: "吸取精華", desc: "吸取目標生命值回復自身HP。", chance: 0.5 },
      { name: "花粉迷惑", desc: "釋放迷惑花粉，使目標攻擊隊友1回合。", chance: 0.2 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 5, chance: 0.9 },
      { itemId: "I008", name: "蓮妖花瓣", quantity: 1, chance: 0.3 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P06蓮華結界，每20分鐘刷新，夏季荷花盛開期出現率增加。"
  },
  {
    id: "M08",
    name: "暗影幻影師",
    type: "boss",
    element: "暗/光",
    locationId: "P08",
    levelRange: [12, 18],
    hp: 4000,
    attack: 120,
    defense: 50,
    sprite: "🎭",
    skills: [
      { name: "幻影分身", desc: "製造3個分身，分身擁有30%本體戰鬥力。", chance: 0.3 },
      { name: "光暗逆轉", desc: "反轉光暗屬性，使光屬性攻擊回復Boss血量。", chance: 0.15 },
      { name: "精神干擾", desc: "干擾玩家操作，隨機交換技能按鈕位置3回合。", chance: 0.25 },
      { name: "終幕演出", desc: "HP低於30%時發動，造成全體巨額傷害。", chance: 0.2 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 20, chance: 1.0 },
      { itemId: "I009", name: "幻影面具", quantity: 1, chance: 0.15 },
      { itemId: "I011", name: "Boss結晶", quantity: 2, chance: 0.7 },
      { itemId: "I020", name: "稀有裝備箱", quantity: 1, chance: 0.2 }
    ],
    spawnCondition: "P08英雄舞台，需5人以上組隊觸發，每3小時刷新一次。"
  },
  {
    id: "M09",
    name: "暗影迷霧獸",
    type: "elite",
    element: "暗",
    locationId: "P10",
    levelRange: [6, 11],
    hp: 700,
    attack: 50,
    defense: 20,
    sprite: "🌫️",
    skills: [
      { name: "迷霧籠罩", desc: "製造濃霧，降低所有玩家視野範圍80%。", chance: 0.5 },
      { name: "暗影突襲", desc: "從迷霧中突然攻擊，必定暴擊。", chance: 0.3 },
      { name: "迷路詛咒", desc: "使目標迷失方向，GPS定位暫時失效30秒。", chance: 0.2 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 4, chance: 0.9 },
      { itemId: "I012", name: "迷霧精華", quantity: 1, chance: 0.3 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P10南境守望路，僅夜間（18:00-06:00）出現，每10分鐘刷新。"
  },
  {
    id: "M10",
    name: "暗影巨蛇",
    type: "worldboss",
    element: "暗/水",
    locationId: "P01",
    levelRange: [20, 30],
    hp: 10000,
    attack: 200,
    defense: 80,
    sprite: "🐍",
    skills: [
      { name: "暗流漩渦", desc: "製造巨大暗影漩渦，對全體造成持續傷害3回合。", chance: 0.3 },
      { name: "蛇瞳催眠", desc: "催眠一名玩家，使其沉睡2回合。", chance: 0.2 },
      { name: "纏繞絞殺", desc: "纏繞HP最高的玩家，每回合造成最大HP10%的傷害。", chance: 0.25 },
      { name: "暗影吐息", desc: "噴出暗影氣息，全體傷害並降低光明值5%。", chance: 0.2 },
      { name: "蛻皮再生", desc: "脫去外皮回復20%HP，每場戰鬥限用2次。", chance: 0.1 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 50, chance: 1.0 },
      { itemId: "I013", name: "巨蛇鱗片", quantity: 1, chance: 0.25 },
      { itemId: "I011", name: "Boss結晶", quantity: 5, chance: 1.0 },
      { itemId: "I021", name: "傳說裝備箱", quantity: 1, chance: 0.05 },
      { itemId: "I020", name: "稀有裝備箱", quantity: 1, chance: 0.3 }
    ],
    spawnCondition: "P01光輝雙塔，每週六、日14:00及19:00各出現一次，需10人以上參與。"
  },
  {
    id: "M11",
    name: "暗影汙泥怪",
    type: "elite",
    element: "暗/地",
    locationId: "P11",
    levelRange: [9, 14],
    hp: 750,
    attack: 60,
    defense: 25,
    sprite: "🫠",
    skills: [
      { name: "汙泥噴射", desc: "噴射汙泥造成傷害並降低目標攻擊力20%持續3回合。", chance: 0.5 },
      { name: "腐蝕黏液", desc: "腐蝕玩家裝備，暫時降低防禦力30%。", chance: 0.3 },
      { name: "汙染擴散", desc: "汙染淨水祭壇，P11光明值降低3%。", chance: 0.2 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 5, chance: 0.9 },
      { itemId: "I014", name: "淨化泥土", quantity: 1, chance: 0.35 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P11淨水祭壇，每15分鐘刷新，雨天出現率增加50%。"
  },
  {
    id: "M12",
    name: "暗影蝙蝠群",
    type: "elite",
    element: "暗/風",
    locationId: "P12",
    levelRange: [11, 16],
    hp: 650,
    attack: 65,
    defense: 22,
    sprite: "🦇",
    skills: [
      { name: "超音波干擾", desc: "發出超音波干擾玩家感測器，技能冷卻增加2回合。", chance: 0.4 },
      { name: "吸血噬咬", desc: "吸取目標生命值回復自身HP。", chance: 0.5 },
      { name: "暗翼遮天", desc: "群聚遮蔽天空，降低全體玩家命中率20%。", chance: 0.3 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 4, chance: 0.9 },
      { itemId: "I015", name: "蝙蝠翼膜", quantity: 1, chance: 0.3 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P12瞭望高塔，傍晚及夜間（17:00-05:00）每15分鐘刷新。"
  },
  {
    id: "M13",
    name: "暗影色盲獸",
    type: "boss",
    element: "暗/光",
    locationId: "P13",
    levelRange: [15, 22],
    hp: 5000,
    attack: 150,
    defense: 60,
    sprite: "👾",
    skills: [
      { name: "色彩抹消", desc: "抹除區域色彩，所有玩家攻擊力降低25%持續3回合。", chance: 0.3 },
      { name: "灰階領域", desc: "將戰場變為灰色，光屬性技能效果減半。", chance: 0.2 },
      { name: "暗影射線", desc: "發射高能暗影射線，對直線上所有玩家造成巨額傷害。", chance: 0.25 },
      { name: "彩虹吞噬", desc: "吞噬一名玩家的守護動物技能色彩，封印其主動技能2回合。", chance: 0.2 },
      { name: "黑白爆裂", desc: "HP低於25%時發動，大範圍爆裂攻擊。", chance: 0.15 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 30, chance: 1.0 },
      { itemId: "I016", name: "彩虹結晶", quantity: 1, chance: 0.2 },
      { itemId: "I011", name: "Boss結晶", quantity: 3, chance: 0.8 },
      { itemId: "I020", name: "稀有裝備箱", quantity: 1, chance: 0.25 },
      { itemId: "I021", name: "傳說裝備箱", quantity: 1, chance: 0.03 }
    ],
    spawnCondition: "P13創意聖殿，需6人以上組隊觸發，每4小時刷新一次。"
  },
  {
    id: "M14",
    name: "暗影鏽蝕蟲",
    type: "elite",
    element: "暗/地",
    locationId: "P14",
    levelRange: [12, 17],
    hp: 700,
    attack: 55,
    defense: 20,
    sprite: "🪳",
    skills: [
      { name: "鏽蝕侵蝕", desc: "侵蝕玩家裝備耐久度，降低裝備效果20%。", chance: 0.5 },
      { name: "金屬啃咬", desc: "啃咬攻擊造成穿透傷害，無視30%防禦。", chance: 0.4 },
      { name: "時光腐蝕", desc: "腐蝕水道設施，P14光明值降低2%。", chance: 0.2 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 4, chance: 0.9 },
      { itemId: "I017", name: "古代鐵片", quantity: 1, chance: 0.35 },
      { itemId: "I010", name: "精英徽章", quantity: 1, chance: 0.5 }
    ],
    spawnCondition: "在P14時光水道，每15分鐘刷新，同時最多3隻。"
  },
  {
    id: "M15",
    name: "湖底深淵領主",
    type: "hidden",
    element: "暗",
    locationId: "P01",
    levelRange: [30, 50],
    hp: 50000,
    attack: 500,
    defense: 150,
    sprite: "🐙",
    skills: [
      { name: "深淵觸手", desc: "8條觸手同時攻擊不同玩家，各造成大量傷害。", chance: 0.3 },
      { name: "黑暗吞噬", desc: "吞噬一名玩家進入異空間，需隊友破壞觸手救援。", chance: 0.15 },
      { name: "暗影洪流", desc: "釋放暗影洪水，全體持續傷害並降低所有地點光明值2%。", chance: 0.2 },
      { name: "深淵凝視", desc: "凝視使全體玩家恐懼，攻擊力和防禦力各降低40%持續2回合。", chance: 0.15 },
      { name: "湖底地震", desc: "引發湖底地震，隨機使3個地點光明值降低5%。", chance: 0.1 },
      { name: "暗影再生", desc: "每3回合回復5%最大HP，只有將所有觸手切斷才能阻止。", chance: 0.2 }
    ],
    drops: [
      { itemId: "I001", name: "暗影碎片", quantity: 200, chance: 1.0 },
      { itemId: "I018", name: "深淵之心", quantity: 1, chance: 0.1 },
      { itemId: "I011", name: "Boss結晶", quantity: 10, chance: 1.0 },
      { itemId: "I021", name: "傳說裝備箱", quantity: 1, chance: 0.2 },
      { itemId: "I022", name: "深淵領主稱號", quantity: 1, chance: 1.0 }
    ],
    spawnCondition: "隱藏Boss：需全部14個地點光明值達到80%以上，且擊敗M10暗影巨蛇3次後，在P01觸發隱藏劇情。僅限滿月之夜（遊戲內事件）出現。"
  }
];
