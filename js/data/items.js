/**
 * 青塘園守護者 - 道具與商城資料
 */

export const ITEMS = [
  // === 暗影素材 ===
  { id: "I001", name: "暗影碎片", type: "material", rarity: "N", effect: "暗影怪物掉落的基礎素材，可用於合成與兌換。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I002", name: "金幣袋（小）", type: "consumable", rarity: "N", effect: "使用後獲得10-20金幣。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I003", name: "蛛絲結晶", type: "material", rarity: "R", effect: "暗影蜘蛛掉落，可用於製作減速陷阱。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I004", name: "烏鴉羽毛", type: "material", rarity: "R", effect: "暗影烏鴉群掉落，可用於製作風屬性裝備。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I005", name: "地鼠王冠", type: "material", rarity: "SR", effect: "暗影地鼠王掉落，可用於製作地屬性傳說裝備。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I006", name: "水母凝膠", type: "material", rarity: "R", effect: "暗影水母掉落，可用於製作水屬性藥劑。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I007", name: "風暴核心", type: "material", rarity: "SR", effect: "暗影風暴獸掉落，可用於製作風屬性傳說裝備。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I008", name: "蓮妖花瓣", type: "material", rarity: "R", effect: "暗影蓮妖掉落，可用於製作回復藥劑。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I009", name: "幻影面具", type: "material", rarity: "SR", effect: "暗影幻影師掉落，可用於製作光暗屬性裝備。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I010", name: "精英徽章", type: "material", rarity: "R", effect: "精英怪物掉落，可在商店兌換SR裝備。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I011", name: "Boss結晶", type: "material", rarity: "SR", effect: "Boss怪物掉落，可在商店兌換SSR裝備。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I012", name: "迷霧精華", type: "material", rarity: "R", effect: "暗影迷霧獸掉落，可用於製作隱匿藥劑。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I013", name: "巨蛇鱗片", type: "material", rarity: "SSR", effect: "暗影巨蛇掉落，製作SSR裝備的關鍵素材。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I014", name: "淨化泥土", type: "material", rarity: "R", effect: "暗影汙泥怪掉落，可用於淨化儀式。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I015", name: "蝙蝠翼膜", type: "material", rarity: "R", effect: "暗影蝙蝠群掉落，可用於製作偵察裝備。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I016", name: "彩虹結晶", type: "material", rarity: "SSR", effect: "暗影色盲獸掉落，可用於覺醒守護動物。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I017", name: "古代鐵片", type: "material", rarity: "R", effect: "暗影鏽蝕蟲掉落，可用於修復古代遺跡。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I018", name: "深淵之心", type: "material", rarity: "SSR", effect: "湖底深淵領主掉落，傳說中最強的素材。", goldPrice: 0, diamondPrice: 0, tradeable: false },

  // === 寶箱 ===
  { id: "I020", name: "稀有裝備箱", type: "consumable", rarity: "SR", effect: "開啟後隨機獲得一件SR等級裝備。", goldPrice: 0, diamondPrice: 300, tradeable: false },
  { id: "I021", name: "傳說裝備箱", type: "consumable", rarity: "SSR", effect: "開啟後隨機獲得一件SSR等級裝備。", goldPrice: 0, diamondPrice: 800, tradeable: false },
  { id: "I022", name: "深淵領主稱號", type: "decoration", rarity: "SSR", effect: "稀有稱號：湖底征服者。顯示在玩家名稱旁。", goldPrice: 0, diamondPrice: 0, tradeable: false },

  // === 消耗品 ===
  { id: "I100", name: "光明藥劑（小）", type: "consumable", rarity: "N", effect: "回復指定地點5%光明值。", goldPrice: 50, diamondPrice: 0, tradeable: true },
  { id: "I101", name: "光明藥劑（中）", type: "consumable", rarity: "R", effect: "回復指定地點15%光明值。", goldPrice: 150, diamondPrice: 0, tradeable: true },
  { id: "I102", name: "光明藥劑（大）", type: "consumable", rarity: "SR", effect: "回復指定地點30%光明值。", goldPrice: 0, diamondPrice: 100, tradeable: false },
  { id: "I103", name: "生命藥水（小）", type: "consumable", rarity: "N", effect: "回復20%HP。", goldPrice: 30, diamondPrice: 0, tradeable: true },
  { id: "I104", name: "生命藥水（中）", type: "consumable", rarity: "R", effect: "回復50%HP。", goldPrice: 80, diamondPrice: 0, tradeable: true },
  { id: "I105", name: "生命藥水（大）", type: "consumable", rarity: "SR", effect: "回復100%HP。", goldPrice: 200, diamondPrice: 0, tradeable: false },
  { id: "I106", name: "復活羽毛", type: "consumable", rarity: "SR", effect: "原地復活並回復50%HP。", goldPrice: 0, diamondPrice: 50, tradeable: false },
  { id: "I107", name: "經驗加倍券", type: "consumable", rarity: "R", effect: "30分鐘內經驗值獲取翻倍。", goldPrice: 0, diamondPrice: 80, tradeable: false },
  { id: "I108", name: "金幣加倍券", type: "consumable", rarity: "R", effect: "30分鐘內金幣獲取翻倍。", goldPrice: 0, diamondPrice: 80, tradeable: false },
  { id: "I109", name: "傳送水晶", type: "consumable", rarity: "R", effect: "瞬間傳送至任意已解鎖地點。", goldPrice: 100, diamondPrice: 0, tradeable: true },
  { id: "I110", name: "暗影探測器", type: "consumable", rarity: "R", effect: "顯示500m內所有隱藏怪物和寶箱，持續10分鐘。", goldPrice: 80, diamondPrice: 0, tradeable: true },
  { id: "I111", name: "淨化香爐", type: "consumable", rarity: "SR", effect: "驅散指定區域的暗影迷霧，持續15分鐘。", goldPrice: 200, diamondPrice: 0, tradeable: true },
  { id: "I112", name: "守護結界石", type: "consumable", rarity: "SR", effect: "在當前位置建立守護結界，5分鐘內隊伍免傷。", goldPrice: 0, diamondPrice: 120, tradeable: false },
  { id: "I113", name: "動物餅乾", type: "consumable", rarity: "N", effect: "增加守護動物友好度10點。", goldPrice: 20, diamondPrice: 0, tradeable: true },
  { id: "I114", name: "覺醒石", type: "consumable", rarity: "SSR", effect: "用於守護動物的覺醒進化。", goldPrice: 0, diamondPrice: 500, tradeable: false },

  // === 裝備 ===
  { id: "I200", name: "守護者初始護腕", type: "equipment", rarity: "N", effect: "攻擊力+5、防禦力+3。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I201", name: "光之護盾", type: "equipment", rarity: "R", effect: "防禦力+15，受光屬性攻擊時回復5%HP。", goldPrice: 500, diamondPrice: 0, tradeable: true },
  { id: "I202", name: "疾風之靴", type: "equipment", rarity: "R", effect: "移動速度+10%，風屬性攻擊+10%。", goldPrice: 500, diamondPrice: 0, tradeable: true },
  { id: "I203", name: "大地之鎧", type: "equipment", rarity: "SR", effect: "防禦力+30，HP+200。", goldPrice: 0, diamondPrice: 200, tradeable: true },
  { id: "I204", name: "水流之杖", type: "equipment", rarity: "SR", effect: "攻擊力+25，水屬性技能冷卻-1回合。", goldPrice: 0, diamondPrice: 200, tradeable: true },
  { id: "I205", name: "聖光之翼", type: "equipment", rarity: "SSR", effect: "攻擊力+40、防禦力+20，光明值衰退-10%。", goldPrice: 0, diamondPrice: 500, tradeable: false },
  { id: "I206", name: "深淵克星", type: "equipment", rarity: "SSR", effect: "攻擊力+50，對暗屬性傷害+30%。", goldPrice: 0, diamondPrice: 0, tradeable: false },

  // === 裝飾品 ===
  { id: "I300", name: "守護者斗篷（白）", type: "decoration", rarity: "N", effect: "外觀裝飾，無特殊效果。", goldPrice: 100, diamondPrice: 0, tradeable: true },
  { id: "I301", name: "螢火蟲光環", type: "decoration", rarity: "R", effect: "角色周圍環繞螢火蟲光效。", goldPrice: 300, diamondPrice: 0, tradeable: true },
  { id: "I302", name: "彩虹翅膀", type: "decoration", rarity: "SR", effect: "背上出現彩虹翅膀光效。", goldPrice: 0, diamondPrice: 150, tradeable: true },
  { id: "I303", name: "暗影獵人頭盔", type: "decoration", rarity: "SR", effect: "暗影風格頭盔，附帶微弱發光效果。", goldPrice: 0, diamondPrice: 150, tradeable: true },
  { id: "I304", name: "深淵領主披風", type: "decoration", rarity: "SSR", effect: "擊敗深淵領主後解鎖的稀有披風。", goldPrice: 0, diamondPrice: 0, tradeable: false },

  // === 兌換券 ===
  { id: "I400", name: "合作商店9折券", type: "voucher", rarity: "R", effect: "在合作商店消費可享9折優惠。", goldPrice: 200, diamondPrice: 0, tradeable: false },
  { id: "I401", name: "合作商店85折券", type: "voucher", rarity: "SR", effect: "在合作商店消費可享85折優惠。", goldPrice: 0, diamondPrice: 100, tradeable: false },
  { id: "I402", name: "免費飲品兌換券", type: "voucher", rarity: "SR", effect: "在指定合作飲料店兌換一杯免費飲品。", goldPrice: 500, diamondPrice: 0, tradeable: false },
  { id: "I403", name: "紀念品兌換券", type: "voucher", rarity: "R", effect: "在遊客中心兌換青塘園紀念品。", goldPrice: 300, diamondPrice: 0, tradeable: false },

  // === 任務特殊道具 ===
  { id: "I030", name: "守護者初心徽章", type: "decoration", rarity: "R", effect: "完成第一個主線任務的紀念徽章。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I031", name: "祝福羽毛", type: "material", rarity: "SR", effect: "蘊含祝福力量的羽毛，可用於進階合成。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I032", name: "飛船引擎碎片", type: "material", rarity: "SR", effect: "夢想飛船的引擎零件，集齊可修復飛船。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I033", name: "聖泉水晶", type: "material", rarity: "SR", effect: "淨化聖泉後凝結的水晶，蘊含純淨能量。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I034", name: "封印守護者稱號", type: "decoration", rarity: "SSR", effect: "稀有稱號：封印守護者。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I040", name: "每日寶箱", type: "consumable", rarity: "N", effect: "開啟後隨機獲得少量金幣、經驗和道具。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I041", name: "攝影師勳章碎片", type: "material", rarity: "N", effect: "收集10個可合成攝影師勳章。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I042", name: "健走者印記", type: "material", rarity: "N", effect: "收集7個可合成健走者勳章。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I043", name: "守護者日誌頁", type: "material", rarity: "N", effect: "收集30頁可合成守護者日誌（完整版）。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I044", name: "全域巡守勳章", type: "decoration", rarity: "SR", effect: "證明已巡守全域的勳章。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I045", name: "暗影獵人徽章", type: "decoration", rarity: "SR", effect: "證明暗影獵殺實力的徽章。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I046", name: "光明守衛之冠", type: "decoration", rarity: "SR", effect: "光明守衛的頭冠裝飾。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I047", name: "螢光瓶", type: "consumable", rarity: "R", effect: "收集的螢火蟲光芒，可照亮暗影區域5分鐘。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I048", name: "風之結晶", type: "material", rarity: "R", effect: "凝結的風之力量，可用於風屬性裝備強化。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I049", name: "自然樂譜", type: "material", rarity: "R", effect: "記錄自然之聲的樂譜，可用於特殊合成。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I050", name: "節奏之心", type: "material", rarity: "R", effect: "蘊含節奏力量的結晶，可強化音樂系技能。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I051", name: "歷史碎頁", type: "material", rarity: "R", effect: "古代歷史記錄的碎片，收集可解鎖隱藏故事。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I052", name: "封印密碼本", type: "material", rarity: "SR", effect: "記載封印密碼的古書，解鎖隱藏任務的鑰匙。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I053", name: "紋章刻印石", type: "material", rarity: "SR", effect: "可刻印守護紋章的特殊石材。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I054", name: "表情面具", type: "decoration", rarity: "R", effect: "有趣的表情面具裝飾。", goldPrice: 0, diamondPrice: 0, tradeable: true },
  { id: "I055", name: "地震感測器", type: "consumable", rarity: "R", effect: "增強搖晃感測靈敏度，持續30分鐘。", goldPrice: 0, diamondPrice: 0, tradeable: false },
  { id: "I056", name: "精密望遠鏡", type: "consumable", rarity: "SR", effect: "大幅擴展可視範圍，持續15分鐘。", goldPrice: 0, diamondPrice: 0, tradeable: false }
];

export const PACKAGES = [
  {
    id: "PKG01",
    name: "新手守護者禮包",
    type: "bundle",
    price: "NT$30",
    contents: [
      { itemId: "I103", qty: 10 },
      { itemId: "I100", qty: 5 },
      { itemId: "I109", qty: 3 },
      { itemId: "I113", qty: 10 },
      { itemId: "I300", qty: 1 }
    ],
    description: "專為新手守護者準備的超值禮包，包含基本藥水和傳送水晶。",
    limit: "每帳號限購1次"
  },
  {
    id: "PKG02",
    name: "光明充能禮包",
    type: "bundle",
    price: "NT$99",
    contents: [
      { itemId: "I100", qty: 20 },
      { itemId: "I101", qty: 10 },
      { itemId: "I102", qty: 3 },
      { itemId: "I111", qty: 5 }
    ],
    description: "大量光明藥劑，快速恢復各地點光明值。",
    limit: "每月限購3次"
  },
  {
    id: "PKG03",
    name: "戰鬥強化禮包",
    type: "bundle",
    price: "NT$149",
    contents: [
      { itemId: "I104", qty: 20 },
      { itemId: "I105", qty: 5 },
      { itemId: "I106", qty: 3 },
      { itemId: "I112", qty: 2 },
      { itemId: "I110", qty: 10 }
    ],
    description: "挑戰Boss前的完美準備，包含高級藥水和守護結界。",
    limit: "每月限購5次"
  },
  {
    id: "PKG04",
    name: "探索冒險禮包",
    type: "bundle",
    price: "NT$79",
    contents: [
      { itemId: "I107", qty: 5 },
      { itemId: "I108", qty: 5 },
      { itemId: "I109", qty: 10 },
      { itemId: "I110", qty: 10 }
    ],
    description: "提升探索效率的加倍券和傳送道具組合。",
    limit: "每月限購5次"
  },
  {
    id: "PKG05",
    name: "月光守護者通行證",
    type: "subscription",
    price: "NT$170/月",
    contents: [
      { itemId: "I107", qty: 30 },
      { itemId: "I108", qty: 30 },
      { itemId: "I109", qty: 15 },
      { itemId: "I106", qty: 5 },
      { itemId: "I020", qty: 2 },
      { itemId: "I302", qty: 1 }
    ],
    description: "每月自動發放道具，額外享有每日登入獎勵加倍、專屬裝飾解鎖。道具分30天每日發放。",
    limit: "自動續訂，可隨時取消"
  },
  {
    id: "PKG06",
    name: "鑽石儲值（小）",
    type: "bundle",
    price: "NT$33",
    contents: [
      { itemId: "diamond", qty: 60 }
    ],
    description: "獲得60鑽石。",
    limit: "無限制"
  },
  {
    id: "PKG07",
    name: "鑽石儲值（中）",
    type: "bundle",
    price: "NT$170",
    contents: [
      { itemId: "diamond", qty: 360 }
    ],
    description: "獲得360鑽石（加贈20%）。",
    limit: "無限制"
  },
  {
    id: "PKG08",
    name: "鑽石儲值（大）",
    type: "bundle",
    price: "NT$490",
    contents: [
      { itemId: "diamond", qty: 1200 }
    ],
    description: "獲得1200鑽石（加贈40%）。",
    limit: "無限制"
  },
  {
    id: "PKG09",
    name: "覺醒素材禮包",
    type: "bundle",
    price: "NT$330",
    contents: [
      { itemId: "I114", qty: 1 },
      { itemId: "I011", qty: 5 },
      { itemId: "I020", qty: 3 }
    ],
    description: "包含珍貴的覺醒石，幫助守護動物達到最終進化。",
    limit: "每月限購1次"
  },
  {
    id: "PKG10",
    name: "合作商店福袋",
    type: "bundle",
    price: "NT$50",
    contents: [
      { itemId: "I400", qty: 3 },
      { itemId: "I401", qty: 1 },
      { itemId: "I403", qty: 1 }
    ],
    description: "包含多張合作商店優惠券，到青塘園周邊消費更划算。",
    limit: "每月限購2次"
  }
];
