/**
 * 青塘園守護者 - 任務資料
 * 主線任務、每日任務、每週任務、特殊感測器任務
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
    description: "前往青塘橋，感受雙塔散發的微弱光芒。暗影正在侵蝕封印，你必須抵達現場啟動守護者之力。",
    objectives: [
      { desc: "前往光輝雙塔（P01）", type: "reach_location", target: "P01", current: 0 },
      { desc: "啟動守護者印記", type: "interact", target: "guardian_seal", current: 0 },
      { desc: "擊敗3隻暗影小蟲", type: "kill", target: "M01", count: 3, current: 0 }
    ],
    rewards: { exp: 100, gold: 50, light: 10, items: [{ id: "I030", name: "守護者初心徽章", qty: 1 }] },
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
    description: "送子鳥裝置藝術附近傳來騷動，暗影烏鴉群正在偷取祝福之蛋！用AR相機找出隱藏的烏鴉。",
    objectives: [
      { desc: "前往祝福鳥巢（P02）", type: "reach_location", target: "P02", current: 0 },
      { desc: "用AR相機找出5隻暗影烏鴉", type: "camera_detect", target: "shadow_crow", count: 5, current: 0 },
      { desc: "擊敗暗影烏鴉群", type: "kill", target: "M03", count: 1, current: 0 },
      { desc: "將祝福之蛋歸還鳥巢", type: "interact", target: "blessing_egg", current: 0 }
    ],
    rewards: { exp: 200, gold: 100, light: 20, items: [{ id: "I031", name: "祝福羽毛", qty: 1 }] },
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
    description: "夢想飛船的引擎被暗影風暴獸癱瘓了。搖動手機來為引擎充能，重新啟動飛船！",
    objectives: [
      { desc: "前往夢想飛船（P03）", type: "reach_location", target: "P03", current: 0 },
      { desc: "搖動手機為引擎充能（累計100次）", type: "shake", target: "engine_charge", count: 100, current: 0 },
      { desc: "擊敗暗影風暴獸", type: "kill", target: "M06", count: 1, current: 0 },
      { desc: "啟動夢想飛船", type: "interact", target: "dream_ship", current: 0 }
    ],
    rewards: { exp: 500, gold: 250, light: 30, items: [{ id: "I032", name: "飛船引擎碎片", qty: 1 }] },
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
    description: "暗影水母正在污染聖泉。傾斜手機來引導淨化之水流向正確的水道，恢復聖泉的純淨。",
    objectives: [
      { desc: "前往漣漪聖泉（P04）", type: "reach_location", target: "P04", current: 0 },
      { desc: "傾斜手機引導水流完成淨化路徑", type: "tilt", target: "purify_path", count: 3, current: 0 },
      { desc: "擊敗5隻暗影水母", type: "kill", target: "M05", count: 5, current: 0 },
      { desc: "完成聖泉淨化儀式", type: "interact", target: "purify_ritual", current: 0 }
    ],
    rewards: { exp: 800, gold: 400, light: 50, items: [{ id: "I033", name: "聖泉水晶", qty: 1 }] },
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
    description: "四大核心地點已被淨化，是時候在雙塔啟動最終封印了。在螢幕上畫出守護者紋章來強化封印！",
    objectives: [
      { desc: "所有核心地點光明值達60%以上", type: "light_check", target: "core_locations", threshold: 60, current: 0 },
      { desc: "前往光輝雙塔（P01）", type: "reach_location", target: "P01", current: 0 },
      { desc: "在螢幕上畫出守護者紋章", type: "gesture", target: "guardian_emblem", current: 0 },
      { desc: "擊敗暗影巨蛇", type: "kill", target: "M10", count: 1, current: 0 },
      { desc: "啟動雙塔封印", type: "interact", target: "twin_tower_seal", current: 0 }
    ],
    rewards: { exp: 2000, gold: 1000, light: 100, items: [{ id: "I034", name: "封印守護者稱號", qty: 1 }, { id: "I021", name: "傳說裝備箱", qty: 1 }] },
    difficulty: 8,
    repeatable: false,
    timeLimit: null
  }
];

// 每日任務
const DAILY_QUESTS = [
  {
    id: "QD01",
    name: "晨間巡邏",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: "06:00-12:00" },
    sensorType: "gps",
    description: "每天早晨巡邏青塘園，確保各地點的安全。",
    objectives: [
      { desc: "造訪任意3個不同地點", type: "visit_locations", target: "any", count: 3, current: 0 },
      { desc: "擊敗5隻暗影小蟲", type: "kill", target: "M01", count: 5, current: 0 }
    ],
    rewards: { exp: 50, gold: 30, light: 5, items: [{ id: "I040", name: "每日寶箱", qty: 1 }] },
    difficulty: 1,
    repeatable: true,
    timeLimit: "06:00-12:00"
  },
  {
    id: "QD02",
    name: "生態攝影師",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: null },
    sensorType: "camera",
    description: "用AR相機拍攝青塘園的守護動物們。",
    objectives: [
      { desc: "拍攝3隻不同的守護動物", type: "camera_capture", target: "animal", count: 3, current: 0 }
    ],
    rewards: { exp: 40, gold: 25, light: 3, items: [{ id: "I041", name: "攝影師勳章碎片", qty: 1 }] },
    difficulty: 1,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD03",
    name: "環湖健走",
    type: "daily",
    locationId: "P09",
    trigger: { type: "daily", value: null },
    sensorType: "gps",
    description: "沿著環湖木棧道步行一圈，強化巡邏路的封印。",
    objectives: [
      { desc: "從P09出發經P10回到P09", type: "walk_route", target: ["P09", "P10", "P09"], current: 0 },
      { desc: "累計步行500步", type: "step_count", target: 500, current: 0 }
    ],
    rewards: { exp: 60, gold: 35, light: 8, items: [{ id: "I042", name: "健走者印記", qty: 1 }] },
    difficulty: 2,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD04",
    name: "暗影清掃",
    type: "daily",
    locationId: "all",
    trigger: { type: "daily", value: null },
    sensorType: "gps",
    description: "清除青塘園各處殘留的暗影能量。",
    objectives: [
      { desc: "擊敗任意10隻怪物", type: "kill_any", target: "any", count: 10, current: 0 },
      { desc: "收集20個暗影碎片", type: "collect", target: "I001", count: 20, current: 0 }
    ],
    rewards: { exp: 70, gold: 40, light: 10, items: [{ id: "I001", name: "暗影碎片", qty: 5 }] },
    difficulty: 2,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QD05",
    name: "守護者日誌",
    type: "daily",
    locationId: "P05",
    trigger: { type: "daily", value: null },
    sensorType: "gps",
    description: "回到守護者基地記錄今天的冒險。",
    objectives: [
      { desc: "完成任意2個其他每日任務", type: "complete_daily", target: 2, current: 0 },
      { desc: "回到守護者基地（P05）", type: "reach_location", target: "P05", current: 0 }
    ],
    rewards: { exp: 100, gold: 50, light: 5, items: [{ id: "I043", name: "守護者日誌頁", qty: 1 }] },
    difficulty: 1,
    repeatable: true,
    timeLimit: null
  }
];

// 每週任務
const WEEKLY_QUESTS = [
  {
    id: "QW01",
    name: "全域巡守",
    type: "weekly",
    locationId: "all",
    trigger: { type: "weekly", value: null },
    sensorType: "gps",
    description: "一週內造訪青塘園所有14個地點。",
    objectives: [
      { desc: "造訪所有14個地點", type: "visit_all_locations", target: 14, current: 0 },
      { desc: "累計步行5000步", type: "step_count", target: 5000, current: 0 }
    ],
    rewards: { exp: 500, gold: 300, light: 30, items: [{ id: "I044", name: "全域巡守勳章", qty: 1 }, { id: "I020", name: "稀有裝備箱", qty: 1 }] },
    difficulty: 3,
    repeatable: true,
    timeLimit: "weekly"
  },
  {
    id: "QW02",
    name: "暗影獵人",
    type: "weekly",
    locationId: "all",
    trigger: { type: "weekly", value: null },
    sensorType: "gps",
    description: "一週內擊敗大量暗影怪物。",
    objectives: [
      { desc: "擊敗50隻任意怪物", type: "kill_any", target: "any", count: 50, current: 0 },
      { desc: "擊敗3隻精英怪物", type: "kill_type", target: "elite", count: 3, current: 0 },
      { desc: "參與1次Boss戰", type: "kill_type", target: "boss", count: 1, current: 0 }
    ],
    rewards: { exp: 800, gold: 500, light: 50, items: [{ id: "I045", name: "暗影獵人徽章", qty: 1 }, { id: "I011", name: "Boss結晶", qty: 2 }] },
    difficulty: 5,
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
    description: "維持青塘園的光明值不墜落。",
    objectives: [
      { desc: "將任意5個地點光明值提升至50%以上", type: "light_maintain", target: 5, threshold: 50, current: 0 },
      { desc: "完成10次地點淨化", type: "purify", target: 10, current: 0 }
    ],
    rewards: { exp: 600, gold: 400, light: 80, items: [{ id: "I046", name: "光明守衛之冠", qty: 1 }] },
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
    trigger: { type: "time", value: "18:00-22:00" },
    sensorType: "camera",
    description: "夜間在南境守望路用相機捕捉螢火蟲的光跡，用AR相機記錄它們的飛行路線。",
    objectives: [
      { desc: "夜間前往南境守望路（P10）", type: "reach_location", target: "P10", current: 0 },
      { desc: "用AR相機捕捉10道螢火蟲光跡", type: "camera_capture", target: "firefly_trail", count: 10, current: 0 },
      { desc: "連接光跡形成淨化符文", type: "camera_trace", target: "purify_rune", current: 0 }
    ],
    rewards: { exp: 300, gold: 150, light: 25, items: [{ id: "I047", name: "螢光瓶", qty: 1 }] },
    difficulty: 3,
    repeatable: true,
    timeLimit: "18:00-22:00"
  },
  {
    id: "QS02",
    name: "風之共鳴",
    type: "special",
    locationId: "P03",
    trigger: { type: "level", value: 5 },
    sensorType: "blow",
    description: "對著手機麥克風吹氣，模擬風力為夢想飛船的風帆充能。",
    objectives: [
      { desc: "前往夢想飛船（P03）", type: "reach_location", target: "P03", current: 0 },
      { desc: "對麥克風持續吹氣5秒以上（3次）", type: "blow", target: "wind_charge", count: 3, current: 0 },
      { desc: "風帆充能達100%", type: "charge_meter", target: "sail_energy", threshold: 100, current: 0 }
    ],
    rewards: { exp: 200, gold: 100, light: 15, items: [{ id: "I048", name: "風之結晶", qty: 1 }] },
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
    description: "在翠綠戰場聆聽自然之聲，用麥克風收集特定的環境音。",
    objectives: [
      { desc: "前往翠綠戰場（P07）", type: "reach_location", target: "P07", current: 0 },
      { desc: "錄製鳥鳴聲", type: "audio_detect", target: "bird_song", current: 0 },
      { desc: "錄製水流聲", type: "audio_detect", target: "water_sound", current: 0 },
      { desc: "錄製風聲", type: "audio_detect", target: "wind_sound", current: 0 }
    ],
    rewards: { exp: 250, gold: 120, light: 20, items: [{ id: "I049", name: "自然樂譜", qty: 1 }] },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS04",
    name: "守護者的節奏",
    type: "special",
    locationId: "P08",
    trigger: { type: "level", value: 8 },
    sensorType: "rhythm",
    description: "在英雄舞台跟隨節奏點擊螢幕，用音樂的力量驅散暗影幻影師的幻術。",
    objectives: [
      { desc: "前往英雄舞台（P08）", type: "reach_location", target: "P08", current: 0 },
      { desc: "完成節奏遊戲第一關（準確率70%以上）", type: "rhythm_game", target: "stage_1", threshold: 70, current: 0 },
      { desc: "完成節奏遊戲第二關（準確率80%以上）", type: "rhythm_game", target: "stage_2", threshold: 80, current: 0 }
    ],
    rewards: { exp: 350, gold: 180, light: 25, items: [{ id: "I050", name: "節奏之心", qty: 1 }] },
    difficulty: 4,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS05",
    name: "古文解讀",
    type: "special",
    locationId: "P14",
    trigger: { type: "level", value: 12 },
    sensorType: "ocr",
    description: "在時光水道發現古老石碑，用手機相機掃描碑文上的文字來解讀歷史秘密。",
    objectives: [
      { desc: "前往時光水道（P14）", type: "reach_location", target: "P14", current: 0 },
      { desc: "掃描第一塊石碑文字", type: "ocr_scan", target: "stone_tablet_1", current: 0 },
      { desc: "掃描第二塊石碑文字", type: "ocr_scan", target: "stone_tablet_2", current: 0 },
      { desc: "將碑文組合成完整歷史記錄", type: "puzzle", target: "history_record", current: 0 }
    ],
    rewards: { exp: 400, gold: 200, light: 30, items: [{ id: "I051", name: "歷史碎頁", qty: 3 }] },
    difficulty: 5,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "QS06",
    name: "封印QR密碼",
    type: "special",
    locationId: "all",
    trigger: { type: "level", value: 5 },
    sensorType: "qr",
    description: "青塘園各處隱藏著封印QR碼，掃描它們來獲取守護者密碼。",
    objectives: [
      { desc: "在P01掃描QR碼", type: "qr_scan", target: "qr_p01", current: 0 },
      { desc: "在P05掃描QR碼", type: "qr_scan", target: "qr_p05", current: 0 },
      { desc: "在P07掃描QR碼", type: "qr_scan", target: "qr_p07", current: 0 },
      { desc: "在P13掃描QR碼", type: "qr_scan", target: "qr_p13", current: 0 }
    ],
    rewards: { exp: 300, gold: 150, light: 20, items: [{ id: "I052", name: "封印密碼本", qty: 1 }] },
    difficulty: 3,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "QS07",
    name: "守護者的決心",
    type: "special",
    locationId: "P01",
    trigger: { type: "level", value: 10 },
    sensorType: "gesture",
    description: "在光輝雙塔前用手指在螢幕上繪製守護者紋章，召喚光之力量。",
    objectives: [
      { desc: "前往光輝雙塔（P01）", type: "reach_location", target: "P01", current: 0 },
      { desc: "繪製光之紋章（圓形）", type: "gesture_draw", target: "circle_rune", current: 0 },
      { desc: "繪製護盾紋章（三角形）", type: "gesture_draw", target: "triangle_rune", current: 0 },
      { desc: "繪製封印紋章（五角星）", type: "gesture_draw", target: "star_rune", current: 0 }
    ],
    rewards: { exp: 500, gold: 250, light: 40, items: [{ id: "I053", name: "紋章刻印石", qty: 1 }] },
    difficulty: 5,
    repeatable: false,
    timeLimit: null
  },
  {
    id: "QS08",
    name: "表情守護術",
    type: "special",
    locationId: "P05",
    trigger: { type: "level", value: 7 },
    sensorType: "face",
    description: "用臉部表情來啟動守護者基地的防禦系統。微笑能充能光明，嚴肅能強化防禦。",
    objectives: [
      { desc: "前往守護者基地（P05）", type: "reach_location", target: "P05", current: 0 },
      { desc: "微笑啟動光明充能（維持3秒）", type: "face_detect", target: "smile", duration: 3, current: 0 },
      { desc: "嚴肅表情啟動防禦模式（維持3秒）", type: "face_detect", target: "serious", duration: 3, current: 0 },
      { desc: "驚訝表情啟動偵測模式（維持3秒）", type: "face_detect", target: "surprised", duration: 3, current: 0 }
    ],
    rewards: { exp: 250, gold: 130, light: 20, items: [{ id: "I054", name: "表情面具", qty: 1 }] },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS09",
    name: "地震探測",
    type: "special",
    locationId: "P04",
    trigger: { type: "level", value: 7 },
    sensorType: "shake",
    description: "暗影水母群正從地底接近聖泉。搖晃手機來啟動地震感測器，偵測它們的位置。",
    objectives: [
      { desc: "前往漣漪聖泉（P04）", type: "reach_location", target: "P04", current: 0 },
      { desc: "輕搖手機偵測表層（搖晃10次）", type: "shake", target: "surface_scan", count: 10, current: 0 },
      { desc: "用力搖晃偵測深層（搖晃20次）", type: "shake", target: "deep_scan", count: 20, current: 0 },
      { desc: "標記所有暗影水母位置", type: "interact", target: "mark_jellyfish", current: 0 }
    ],
    rewards: { exp: 280, gold: 140, light: 20, items: [{ id: "I055", name: "地震感測器", qty: 1 }] },
    difficulty: 3,
    repeatable: true,
    timeLimit: null
  },
  {
    id: "QS10",
    name: "水平儀校準",
    type: "special",
    locationId: "P12",
    trigger: { type: "level", value: 11 },
    sensorType: "tilt",
    description: "瞭望高塔的偵測儀器需要校準。傾斜手機來調整天線角度，對準暗影能量源。",
    objectives: [
      { desc: "前往瞭望高塔（P12）", type: "reach_location", target: "P12", current: 0 },
      { desc: "傾斜手機將天線對準北方（維持5秒）", type: "tilt_hold", target: "north", duration: 5, current: 0 },
      { desc: "傾斜手機將天線對準東方（維持5秒）", type: "tilt_hold", target: "east", duration: 5, current: 0 },
      { desc: "傾斜手機將天線對準南方（維持5秒）", type: "tilt_hold", target: "south", duration: 5, current: 0 },
      { desc: "完成全方位掃描", type: "interact", target: "full_scan", current: 0 }
    ],
    rewards: { exp: 350, gold: 180, light: 30, items: [{ id: "I056", name: "精密望遠鏡", qty: 1 }] },
    difficulty: 4,
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
