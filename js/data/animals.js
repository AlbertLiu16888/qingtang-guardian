/**
 * 青塘園守護者 - 守護動物資料
 * 14 隻守護動物，各自駐守一個地點
 */
export const ANIMALS = [
  {
    id: "A01",
    name: "白鷺鷥",
    title: "希望",
    element: "光",
    rarity: "SSR",
    locationId: "P01",
    appearance: "純白羽毛散發金色光芒的白鷺鷥，雙翼展開時形成光之結界。",
    passiveSkill: {
      name: "希望之光",
      desc: "光明值衰退速度降低20%。"
    },
    activeSkill: {
      name: "聖光護盾",
      desc: "為全隊施加光之護盾，持續3回合減少30%傷害。",
      cooldown: 5
    },
    awakenSkill: {
      name: "曙光降臨",
      desc: "全地圖所有地點光明值提升10%。"
    },
    obtainMethod: "完成主線任務Q001「光輝雙塔的呼喚」後於P01自動獲得。",
    evolutionLine: ["小白鷺", "銀鷺", "聖光鷺皇"],
    sprite: "🦢"
  },
  {
    id: "A02",
    name: "小鸊鷉",
    title: "祝福",
    element: "水",
    rarity: "SR",
    locationId: "P02",
    appearance: "小巧的水鳥，頭頂有金色羽冠，潛水時會留下祝福的漣漪。",
    passiveSkill: {
      name: "祝福之羽",
      desc: "獲得的經驗值增加15%。"
    },
    activeSkill: {
      name: "治癒水波",
      desc: "釋放治癒水波，回復全隊30%HP。",
      cooldown: 4
    },
    awakenSkill: {
      name: "生命祝福",
      desc: "復活一名已倒下的隊友並回復至滿血。"
    },
    obtainMethod: "在P02累計餵食送子鳥裝置藝術旁的鳥群3次後觸發劇情獲得。",
    evolutionLine: ["小鸊鷉雛", "祝福鸊鷉", "聖泉鸊鷉"],
    sprite: "🐦"
  },
  {
    id: "A03",
    name: "綠頭鴨",
    title: "旅行",
    element: "風",
    rarity: "SR",
    locationId: "P03",
    appearance: "翠綠色頭部閃耀著風之紋路的鴨子，飛行時會留下綠色軌跡。",
    passiveSkill: {
      name: "旅行者直覺",
      desc: "自動標記周圍200m內的隱藏道具。"
    },
    activeSkill: {
      name: "風之加速",
      desc: "移動速度提升50%，持續5分鐘。",
      cooldown: 10
    },
    awakenSkill: {
      name: "夢想航路",
      desc: "15分鐘內免除所有移動需求，可遠端互動任何地點。"
    },
    obtainMethod: "在P03完成「夢想飛船的引擎」任務後獲得。",
    evolutionLine: ["小綠鴨", "疾風鴨", "翡翠風暴鴨"],
    sprite: "🦆"
  },
  {
    id: "A04",
    name: "烏龜爺爺",
    title: "智慧",
    element: "地",
    rarity: "SSR",
    locationId: "P04",
    appearance: "背殼刻滿古老符文的老烏龜，移動緩慢但眼神充滿智慧。",
    passiveSkill: {
      name: "千年智慧",
      desc: "解謎類任務額外獲得2次提示機會。"
    },
    activeSkill: {
      name: "大地守護",
      desc: "防禦力提升50%，持續10分鐘。",
      cooldown: 8
    },
    awakenSkill: {
      name: "時光倒流",
      desc: "重置一個已失敗的任務，允許重新挑戰。"
    },
    obtainMethod: "在P04連續7天進行冥想小遊戲後，烏龜爺爺認可你的耐心。",
    evolutionLine: ["小石龜", "符文龜", "太古龜仙"],
    sprite: "🐢"
  },
  {
    id: "A05",
    name: "松鼠",
    title: "情報",
    element: "無",
    rarity: "R",
    locationId: "P05",
    appearance: "機靈的小松鼠，總是抱著橡果四處張望，尾巴會隨情報變色。",
    passiveSkill: {
      name: "情報網",
      desc: "顯示附近500m內的玩家位置和可接任務。"
    },
    activeSkill: {
      name: "藏寶嗅覺",
      desc: "偵測500m範圍內所有寶箱位置。",
      cooldown: 15
    },
    awakenSkill: {
      name: "全域掃描",
      desc: "掃描全地圖所有隱藏事件與寶箱，效果持續30分鐘。"
    },
    obtainMethod: "新手教學完成後在守護者基地P05自動獲得。",
    evolutionLine: ["小松鼠", "偵察松鼠", "情報總管松鼠"],
    sprite: "🐿️"
  },
  {
    id: "A06",
    name: "錦鯉",
    title: "繁榮",
    element: "水",
    rarity: "SR",
    locationId: "P06",
    appearance: "金紅色的大錦鯉，鱗片閃耀著財富的光澤，游動時灑落金色粒子。",
    passiveSkill: {
      name: "招財鯉",
      desc: "所有途徑獲得的金幣增加20%。"
    },
    activeSkill: {
      name: "躍龍門",
      desc: "下次完成任務的獎勵翻倍。",
      cooldown: 20
    },
    awakenSkill: {
      name: "黃金時代",
      desc: "全隊金幣獲取量增加50%，持續30分鐘。"
    },
    obtainMethod: "在P06蓮華結界累計釣魚成功10次後觸發。",
    evolutionLine: ["小紅鯉", "錦鯉", "金龍鯉"],
    sprite: "🐟"
  },
  {
    id: "A07",
    name: "蝴蝶",
    title: "自由",
    element: "風",
    rarity: "R",
    locationId: "P07",
    appearance: "翅膀有彩虹紋路的大蝴蝶，飛行時散播治癒花粉。",
    passiveSkill: {
      name: "自由之風",
      desc: "戶外活動類任務可用時間延長10%。"
    },
    activeSkill: {
      name: "花粉治癒",
      desc: "散播花粉，緩慢回復全隊HP，持續5回合。",
      cooldown: 6
    },
    awakenSkill: {
      name: "迷幻鱗粉",
      desc: "所有敵人陷入混亂狀態，持續3回合。"
    },
    obtainMethod: "在P07翠綠戰場完成首次組隊活動後獲得。",
    evolutionLine: ["毛毛蟲", "彩蝶", "幻光蝶皇"],
    sprite: "🦋"
  },
  {
    id: "A08",
    name: "青蛙",
    title: "歌聲",
    element: "水",
    rarity: "R",
    locationId: "P08",
    appearance: "翠綠色的樹蛙，喉囊會發出共鳴音波，叫聲能震碎暗影。",
    passiveSkill: {
      name: "共鳴之聲",
      desc: "音樂/音量相關任務成功率提升25%。"
    },
    activeSkill: {
      name: "雷鳴蛙鼓",
      desc: "發出強力音波攻擊，造成大量傷害。",
      cooldown: 3
    },
    awakenSkill: {
      name: "萬蛙齊鳴",
      desc: "召喚蛙群進行範圍攻擊，對所有敵人造成傷害。"
    },
    obtainMethod: "在P08英雄舞台完成首次音樂節奏挑戰後獲得。",
    evolutionLine: ["小蝌蚪", "翠蛙", "雷鳴蛙王"],
    sprite: "🐸"
  },
  {
    id: "A09",
    name: "蜻蜓",
    title: "巡邏",
    element: "風",
    rarity: "R",
    locationId: "P09",
    appearance: "透明雙翼高速振動的蜻蜓，複眼能偵測到暗影波動。",
    passiveSkill: {
      name: "複眼偵察",
      desc: "提前30秒預警即將出現的怪物。"
    },
    activeSkill: {
      name: "高速衝刺",
      desc: "瞬間傳送至同一路線上的另一端。",
      cooldown: 12
    },
    awakenSkill: {
      name: "全域偵查",
      desc: "偵查全地圖所有怪物的位置和等級。"
    },
    obtainMethod: "在P09北境巡邏路累計步行1000步後遭遇。",
    evolutionLine: ["水蠆", "巡邏蜻蜓", "烈風蜻蜓將軍"],
    sprite: "🪰"
  },
  {
    id: "A10",
    name: "螢火蟲",
    title: "光芒",
    element: "光",
    rarity: "SR",
    locationId: "P10",
    appearance: "尾部發出溫暖金光的螢火蟲群，聚集時能形成光之文字。",
    passiveSkill: {
      name: "夜行者",
      desc: "夜間（18:00-06:00）任務獎勵增加30%。"
    },
    activeSkill: {
      name: "照明彈",
      desc: "照亮周圍區域，發現所有隱藏任務和道具。",
      cooldown: 10
    },
    awakenSkill: {
      name: "淨光結界",
      desc: "大範圍淨化暗影能量，恢復區域光明值。"
    },
    obtainMethod: "夜間在P10南境守望路完成「追光者」任務後獲得。",
    evolutionLine: ["小螢光", "螢火蟲群", "聖光螢皇"],
    sprite: "✨"
  },
  {
    id: "A11",
    name: "小魚群",
    title: "團結",
    element: "水",
    rarity: "R",
    locationId: "P11",
    appearance: "一群閃亮的小魚，行動一致如同一個生命體，能組成各種陣型。",
    passiveSkill: {
      name: "團結之力",
      desc: "組隊時全隊攻擊力增加10%。"
    },
    activeSkill: {
      name: "魚群旋渦",
      desc: "製造水之旋渦困住敵人，持續2回合。",
      cooldown: 5
    },
    awakenSkill: {
      name: "淨水洪流",
      desc: "淨化整個水域區域，移除所有負面狀態。"
    },
    obtainMethod: "在P11淨水祭壇成功完成首次淨化儀式後獲得。",
    evolutionLine: ["魚苗群", "銀鱗魚群", "聖泉魚龍"],
    sprite: "🐠"
  },
  {
    id: "A12",
    name: "老鷹",
    title: "視野",
    element: "風",
    rarity: "SSR",
    locationId: "P12",
    appearance: "展翼超過兩公尺的雄鷹，銳利雙眼能看穿一切偽裝。",
    passiveSkill: {
      name: "鷹眼",
      desc: "地圖可視範圍擴大100%。"
    },
    activeSkill: {
      name: "俯衝攻擊",
      desc: "從高空俯衝而下，對單體造成巨額傷害。",
      cooldown: 6
    },
    awakenSkill: {
      name: "天眼通",
      desc: "標記地圖上所有敵人位置，持續10分鐘。"
    },
    obtainMethod: "在P12瞭望高塔連續3天登頂打卡後觸發。",
    evolutionLine: ["小鷹雛", "獵風鷹", "蒼穹鷹帝"],
    sprite: "🦅"
  },
  {
    id: "A13",
    name: "彩虹鳥",
    title: "創意",
    element: "光",
    rarity: "SSR",
    locationId: "P13",
    appearance: "七色羽毛不斷變幻的神秘鳥類，歌聲能讓枯萎的花朵重新綻放。",
    passiveSkill: {
      name: "創意靈感",
      desc: "拍照類任務成功率提升20%。"
    },
    activeSkill: {
      name: "彩虹畫筆",
      desc: "改變周圍環境屬性，使地形對我方有利。",
      cooldown: 8
    },
    awakenSkill: {
      name: "色彩剝奪",
      desc: "解除所有敵人的增益效果。"
    },
    obtainMethod: "在P13創意聖殿完成AR繪畫創作挑戰後獲得。",
    evolutionLine: ["灰雀", "虹羽鳥", "七彩鳳凰"],
    sprite: "🌈"
  },
  {
    id: "A14",
    name: "水獺",
    title: "玩耍",
    element: "水",
    rarity: "SR",
    locationId: "P14",
    appearance: "毛茸茸的可愛水獺，喜歡在水道中滑行，腹部的石頭是寶物。",
    passiveSkill: {
      name: "早安獎勵",
      desc: "每日首次登入獎勵增加50%。"
    },
    activeSkill: {
      name: "水中滑行",
      desc: "在水域中快速移動，無視水流阻礙。",
      cooldown: 10
    },
    awakenSkill: {
      name: "時光封印",
      desc: "凍結指定地點的光明值，24小時內不會衰退。"
    },
    obtainMethod: "在P14時光水道觀察水獺活動並完成拍攝任務後獲得。",
    evolutionLine: ["小水獺", "河道水獺", "時光水獺長老"],
    sprite: "🦦"
  }
];
