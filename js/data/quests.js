/**
 * 青塘園守護者 - 任務資料
 * 主線任務、每日任務、每週任務、特殊感測器任務
 *
 * 雙模式系統：
 * - GPS定位觸發：獎勵 2x（到現場挑戰）
 * - 直接挑戰：獎勵 1x（遠端直接玩）
 */

// 主線任務
const MAIN_QUESTS = [
  {
    id: "Q001",
    name: "光輝雙塔的呼喚",
    type: "main",
    locationId: "P01",
    trigger: { type: "level", value: 1 },
    sensorType: "gps",
    directPlay: true,  // 允許直接挑戰
    description: "前往青塘橋啟動守護者之力，擊敗暗影小蟲。\n💡 到現場挑戰獎勵加倍！",
    objectives: [
      { desc: "啟動守護者印記", type: "interact", target: "guardian_seal", current: 0 },
      { desc: "擊敗3隻暗影小蟲", type: "kill", target: "M01", count: 3, current: 0 }
    ],
    rewards: { exp: 100, gold: 50, light: 10, items: [{ id: "I030", name: "守護者初心徽章", qty: 1 }] },
    gpsBonus: { exp: 100, gold: 50, light: 10 },
    difficulty: 1,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "Q002",
    name: "祝福鳥巢的危機",
    type: "main",
    locationId: "P02",
    trigger: { type: "quest", value: "Q001" },
    sensorType: "camera",
    directPlay: true,
    description: "暗影烏鴉群正在偷取祝福之蛋！用相機找出隱藏的烏鴉並擊敗牠們。\n📷 拍攝任何動物即可完成拍照任務",
    objectives: [
      { desc: "用相機拍攝動物（拍攝即成功）", type: "camera_detect", target: "shadow_crow", count: 1, current: 0 },
      { desc: "擊敗暗影烏鴉群", type: "kill", target: "M03", count: 1, current: 0 },
      { desc: "將祝福之蛋歸還鳥巢", type: "interact", target: "blessing_egg", current: 0 }
    ],
    rewards: { exp: 200, gold: 100, light: 20, items: [{ id: "I031", name: "祝福羽毛", qty: 1 }] },
    gpsBonus: { exp: 200, gold: 100, light: 20 },
    difficulty: 2,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "Q003",
    name: "夢想飛船的引擎",
    type: "main",
    locationId: "P03",
    trigger: { type: "quest", value: "Q002" },
    sensorType: "shake",
    directPlay: true,
    description: "飛船引擎被暗影風暴獸癱瘓了！搖動手機或點擊按鈕為引擎充能。",
    objectives: [
      { desc: "為引擎充能（搖晃或點擊20次）", type: "shake", target: "engine_charge", count: 20, current: 0 },
      { desc: "擊敗暗影風暴獸", type: "kill", target: "M06", count: 1, current: 0 },
      { desc: "啟動夢想飛船", type: "interact", target: "dream_ship", current: 0 }
    ],
    rewards: { exp: 500, gold: 250, light: 30, items: [{ id: "I032", name: "飛船引擎碎片", qty: 1 }] },
    gpsBonus: { exp: 500, gold: 250, light: 30 },
    difficulty: 4,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "Q004",
    name: "漣漪聖泉的淨化",
    type: "main",
    locationId: "P04",
    trigger: { type: "quest", value: "Q003" },
    sensorType: "tilt",
    directPlay: true,
    description: "暗影水母正在污染聖泉。傾斜手機或點擊按鈕引導淨化之水。",
    objectives: [
      { desc: "引導水流完成淨化（傾斜或點擊3次）", type: "tilt", target: "purify_path", count: 3, current: 0 },
      { desc: "擊敗5隻暗影水母", type: "kill", target: "M05", count: 5, current: 0 },
      { desc: "完成聖泉淨化儀式", type: "interact", target: "purify_ritual", current: 0 }
    ],
    rewards: { exp: 800, gold: 400, light: 50, items: [{ id: "I033", name: "聖泉水晶", qty: 1 }] },
    gpsBonus: { exp: 800, gold: 400, light: 50 },
    difficulty: 5,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "Q005",
    name: "封印的覺醒",
    type: "main",
    locationId: "P01",
    trigger: { type: "quest", value: "Q004" },
    sensorType: "gesture",
    directPlay: true,
    description: "在雙塔啟動最終封印！點擊繪製守護者紋章，擊敗暗影巨蛇！",
    objectives: [
      { desc: "繪製守護者紋章", type: "gesture", target: "guardian_emblem", current: 0 },
      { desc: "擊敗暗影巨蛇", type: "kill", target: "M10", count: 1, current: 0 },
      { desc: "啟動雙塔封印", type: "interact", target: "twin_tower_seal", current: 0 }
    ],
    rewards: { exp: 2000, gold: 1000, light: 100, items: [{ id: "I034", name: "封印守護者稱號", qty: 1 }, { id: "I021", name: "傳說裝備箱", qty: 1 }] },
    gpsBonus: { exp: 2000, gold: 1000, light: 100 },
    difficulty: 8,
    repeatable: false,
    timeLimit: null
  }
];

// 每日任務（每日重置，可直接挑戰）
const DAILY_QUESTS = [
  {
    id: "QD01",
    name: "晨間巡邏",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: null },
    sensorType: "gps",
    directPlay: true,
    description: "清除暗影小蟲維護青塘園安全。\n⚔️ 直接開打！到現場獎勵加倍",
    objectives: [
      { desc: "擊敗5隻暗影小蟲", type: "kill", target: "M01", count: 5, current: 0 }
    ],
    rewards: { exp: 50, gold: 30, light: 5, items: [{ id: "I040", name: "每日寶箱", qty: 1 }] },
    gpsBonus: { exp: 50, gold: 30, light: 5 },
    difficulty: 1,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD02",
    name: "生態攝影師",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: null },
    sensorType: "camera",
    directPlay: true,
    description: "用相機拍攝任何畫面即可完成。\n📷 開啟相機 → 對準任何物體 → 拍攝",
    objectives: [
      { desc: "拍攝1張照片（任何畫面皆可）", type: "camera_detect", target: "animal", count: 1, current: 0 }
    ],
    rewards: { exp: 40, gold: 25, light: 3, items: [{ id: "I041", name: "攝影師勳章碎片", qty: 1 }] },
    gpsBonus: { exp: 40, gold: 25, light: 3 },
    difficulty: 1,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD03",
    name: "暗影清掃",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: null },
    sensorType: "gps",
    directPlay: true,
    description: "清除各處殘留的暗影能量，擊敗10隻怪物。",
    objectives: [
      { desc: "擊敗任意10隻怪物", type: "kill_any", target: "any", count: 10, current: 0 }
    ],
    rewards: { exp: 70, gold: 40, light: 10, items: [{ id: "I001", name: "暗影碎片", qty: 5 }] },
    gpsBonus: { exp: 70, gold: 40, light: 10 },
    difficulty: 2,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD04",
    name: "引擎充能",
    type: "daily",
    locationId: "P03",
    trigger: { type: "daily", value: null },
    sensorType: "shake",
    directPlay: true,
    description: "搖晃手機或點擊按鈕為夢想飛船充能！",
    objectives: [
      { desc: "搖晃或點擊充能15次", type: "shake", target: "engine_charge", count: 15, current: 0 }
    ],
    rewards: { exp: 40, gold: 30, light: 5, items: [{ id: "I103", name: "生命藥水（小）", qty: 2 }] },
    gpsBonus: { exp: 40, gold: 30, light: 5 },
    difficulty: 1,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD05",
    name: "精英挑戰",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: null },
    sensorType: "gps",
    directPlay: true,
    description: "挑戰精英怪物，獲得稀有掉落！",
    objectives: [
      { desc: "擊敗1隻精英怪物", type: "kill_type", target: "elite", count: 1, current: 0 }
    ],
    rewards: { exp: 100, gold: 60, light: 8, items: [{ id: "I010", name: "精英徽章", qty: 1 }] },
    gpsBonus: { exp: 100, gold: 60, light: 8 },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  }
];

// 每週任務
const WEEKLY_QUESTS = [
  {
    id: "QW01",
    name: "暗影獵人",
    type: "weekly",
    locationId: "all",
    trigger: { type: "weekly", value: null },
    sensorType: "gps",
    directPlay: true,
    description: "一週內擊敗大量暗影怪物，證明你的實力。",
    objectives: [
      { desc: "擊敗30隻任意怪物", type: "kill_any", target: "any", count: 30, current: 0 },
      { desc: "擊敗2隻精英怪物", type: "kill_type", target: "elite", count: 2, current: 0 },
      { desc: "參與1次Boss戰", type: "kill_type", target: "boss", count: 1, current: 0 }
    ],
    rewards: { exp: 800, gold: 500, light: 50, items: [{ id: "I045", name: "暗影獵人徽章", qty: 1 }, { id: "I020", name: "稀有裝備箱", qty: 1 }] },
    gpsBonus: { exp: 400, gold: 250, light: 25 },
    difficulty: 5,
    repeatable: true,
    timeLimit: "weekly"
  },
  {
    id: "QW02",
    name: "攝影大師",
    type: "weekly",
    locationId: "all",
    trigger: { type: "weekly", value: null },
    sensorType: "camera",
    directPlay: true,
    description: "本週拍攝5張照片，記錄守護者的冒險日常。",
    objectives: [
      { desc: "拍攝5張照片", type: "camera_detect", target: "any", count: 5, current: 0 }
    ],
    rewards: { exp: 300, gold: 200, light: 20, items: [{ id: "I041", name: "攝影師勳章碎片", qty: 3 }] },
    gpsBonus: { exp: 150, gold: 100, light: 10 },
    difficulty: 2,
    repeatable: true,
    timeLimit: "weekly"
  },
  {
    id: "QW03",
    name: "光明守衛",
    type: "weekly",
    locationId: "all",
    trigger: { type: "weekly", value: null },
    sensorType: "gps",
    directPlay: true,
    description: "透過戰鬥和任務維持青塘園的光明值。",
    objectives: [
      { desc: "完成5個每日任務", type: "complete_daily", target: 5, current: 0 },
      { desc: "擊敗50隻怪物", type: "kill_any", target: "any", count: 50, current: 0 }
    ],
    rewards: { exp: 600, gold: 400, light: 80, items: [{ id: "I046", name: "光明守衛之冠", qty: 1 }] },
    gpsBonus: { exp: 300, gold: 200, light: 40 },
    difficulty: 4,
    repeatable: true,
    timeLimit: "weekly"
  }
];

// 特殊感測器任務（使用各種不同感測器）
const SPECIAL_QUESTS = [
  {
    id: "QS01",
    name: "追光者",
    type: "special",
    locationId: "P10",
    trigger: { type: "level", value: 3 },
    sensorType: "camera",
    directPlay: true,
    description: "用相機捕捉光跡！\n📷 開啟相機 → 對準任何發光物體 → 拍攝\n（拍攝任何畫面即可完成）",
    objectives: [
      { desc: "用相機捕捉3道光跡", type: "camera_detect", target: "firefly_trail", count: 3, current: 0 },
      { desc: "擊敗暗影螢火蟲", type: "kill", target: "M01", count: 2, current: 0 }
    ],
    rewards: { exp: 300, gold: 150, light: 25, items: [{ id: "I047", name: "螢光瓶", qty: 1 }] },
    gpsBonus: { exp: 150, gold: 75, light: 12 },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS02",
    name: "風之共鳴",
    type: "special",
    locationId: "P03",
    trigger: { type: "level", value: 3 },
    sensorType: "shake",
    directPlay: true,
    description: "搖晃手機或點擊按鈕為風帆充能！",
    objectives: [
      { desc: "充能30次（搖晃或點擊）", type: "shake", target: "wind_charge", count: 30, current: 0 },
      { desc: "擊敗暗影風暴獸", type: "kill", target: "M06", count: 1, current: 0 }
    ],
    rewards: { exp: 200, gold: 100, light: 15, items: [{ id: "I048", name: "風之結晶", qty: 1 }] },
    gpsBonus: { exp: 100, gold: 50, light: 8 },
    difficulty: 2,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS03",
    name: "大地之歌",
    type: "special",
    locationId: "P07",
    trigger: { type: "level", value: 3 },
    sensorType: "audio",
    directPlay: true,
    description: "用麥克風收集環境音或直接點擊模擬按鈕。\n🎤 對著麥克風發出聲音，或直接點擊完成",
    objectives: [
      { desc: "收集自然之聲（偵測或點擊3次）", type: "audio", target: "nature_sound", count: 3, current: 0 },
      { desc: "擊敗2隻暗影怪物", type: "kill_any", target: "any", count: 2, current: 0 }
    ],
    rewards: { exp: 250, gold: 120, light: 20, items: [{ id: "I049", name: "自然樂譜", qty: 1 }] },
    gpsBonus: { exp: 125, gold: 60, light: 10 },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS04",
    name: "守護者的節奏",
    type: "special",
    locationId: "P08",
    trigger: { type: "level", value: 5 },
    sensorType: "shake",
    directPlay: true,
    description: "跟著節奏搖晃手機或點擊按鈕，用音樂驅散暗影！",
    objectives: [
      { desc: "節奏充能40次", type: "shake", target: "rhythm_charge", count: 40, current: 0 },
      { desc: "擊敗暗影幻影師", type: "kill", target: "M08", count: 1, current: 0 }
    ],
    rewards: { exp: 350, gold: 180, light: 25, items: [{ id: "I050", name: "節奏之心", qty: 1 }] },
    gpsBonus: { exp: 175, gold: 90, light: 12 },
    difficulty: 4,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS05",
    name: "古文解讀",
    type: "special",
    locationId: "P14",
    trigger: { type: "level", value: 5 },
    sensorType: "camera",
    directPlay: true,
    description: "用相機掃描古老石碑文字。\n📷 開啟相機拍攝任何文字即可",
    objectives: [
      { desc: "掃描石碑文字（拍攝2張照片）", type: "camera_detect", target: "stone_tablet", count: 2, current: 0 },
      { desc: "擊敗石碑守衛", type: "kill", target: "M04", count: 1, current: 0 }
    ],
    rewards: { exp: 400, gold: 200, light: 30, items: [{ id: "I051", name: "歷史碎頁", qty: 3 }] },
    gpsBonus: { exp: 200, gold: 100, light: 15 },
    difficulty: 5,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "QS06",
    name: "守護者的決心",
    type: "special",
    locationId: "P01",
    trigger: { type: "level", value: 7 },
    sensorType: "shake",
    directPlay: true,
    description: "搖晃手機繪製守護紋章，召喚光之力量！",
    objectives: [
      { desc: "繪製紋章充能50次", type: "shake", target: "rune_charge", count: 50, current: 0 },
      { desc: "擊敗暗影巨蛇", type: "kill", target: "M10", count: 1, current: 0 }
    ],
    rewards: { exp: 500, gold: 250, light: 40, items: [{ id: "I053", name: "紋章刻印石", qty: 1 }] },
    gpsBonus: { exp: 250, gold: 125, light: 20 },
    difficulty: 5,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "QS07",
    name: "地震探測",
    type: "special",
    locationId: "P04",
    trigger: { type: "level", value: 5 },
    sensorType: "shake",
    directPlay: true,
    description: "搖晃手機啟動地震感測器，偵測暗影水母的位置。",
    objectives: [
      { desc: "偵測搖晃20次", type: "shake", target: "quake_scan", count: 20, current: 0 },
      { desc: "擊敗3隻暗影水母", type: "kill", target: "M05", count: 3, current: 0 }
    ],
    rewards: { exp: 280, gold: 140, light: 20, items: [{ id: "I055", name: "地震感測器", qty: 1 }] },
    gpsBonus: { exp: 140, gold: 70, light: 10 },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  }
];

export const QUESTS = [
  ...MAIN_QUESTS,
  ...DAILY_QUESTS,
  ...WEEKLY_QUESTS,
  ...SPECIAL_QUESTS
];

// 方便分類取用的匯出
export const QUEST_MAIN = MAIN_QUESTS;
export const QUEST_DAILY = DAILY_QUESTS;
export const QUEST_WEEKLY = WEEKLY_QUESTS;
export const QUEST_SPECIAL = SPECIAL_QUESTS;
