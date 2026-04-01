/**
 * 青塘園守護者 - 等級與成長資料
 * 等級 1-30，含經驗需求、稱號、解鎖內容、屬性成長
 */
export const LEVELS = [
  {
    level: 1,
    title: "見習守護者",
    expRequired: 0,
    totalExp: 0,
    unlocks: ["基本移動", "GPS定位", "守護者基地（P05）", "光輝雙塔（P01）"],
    stats: { hp: 100, atk: 10, def: 5, bagSlots: 20, animalSlots: 1 }
  },
  {
    level: 2,
    title: "初階守護者",
    expRequired: 100,
    totalExp: 100,
    unlocks: ["翠綠戰場（P07）", "組隊功能"],
    stats: { hp: 120, atk: 12, def: 6, bagSlots: 22, animalSlots: 1 }
  },
  {
    level: 3,
    title: "初階守護者",
    expRequired: 150,
    totalExp: 250,
    unlocks: ["祝福鳥巢（P02）", "AR相機功能", "主線Q002"],
    stats: { hp: 140, atk: 14, def: 7, bagSlots: 24, animalSlots: 1 }
  },
  {
    level: 4,
    title: "巡邏守護者",
    expRequired: 220,
    totalExp: 470,
    unlocks: ["北境巡邏路（P09）", "每日任務系統"],
    stats: { hp: 165, atk: 17, def: 8, bagSlots: 26, animalSlots: 1 }
  },
  {
    level: 5,
    title: "巡邏守護者",
    expRequired: 300,
    totalExp: 770,
    unlocks: ["夢想飛船（P03）", "主線Q003", "感測器：搖晃", "特殊任務QS02/QS06"],
    stats: { hp: 190, atk: 20, def: 10, bagSlots: 28, animalSlots: 2 }
  },
  {
    level: 6,
    title: "資深守護者",
    expRequired: 400,
    totalExp: 1170,
    unlocks: ["南境守望路（P10）"],
    stats: { hp: 220, atk: 23, def: 11, bagSlots: 30, animalSlots: 2 }
  },
  {
    level: 7,
    title: "資深守護者",
    expRequired: 500,
    totalExp: 1670,
    unlocks: ["漣漪聖泉（P04）", "主線Q004", "感測器：傾斜", "特殊任務QS08/QS09"],
    stats: { hp: 250, atk: 26, def: 13, bagSlots: 32, animalSlots: 2 }
  },
  {
    level: 8,
    title: "精銳守護者",
    expRequired: 620,
    totalExp: 2290,
    unlocks: ["英雄舞台（P08）", "特殊任務QS04"],
    stats: { hp: 285, atk: 30, def: 15, bagSlots: 34, animalSlots: 2 }
  },
  {
    level: 9,
    title: "精銳守護者",
    expRequired: 750,
    totalExp: 3040,
    unlocks: ["淨水祭壇（P11）"],
    stats: { hp: 320, atk: 34, def: 17, bagSlots: 36, animalSlots: 2 }
  },
  {
    level: 10,
    title: "守護者隊長",
    expRequired: 900,
    totalExp: 3940,
    unlocks: ["蓮華結界（P06）", "主線Q005", "守護動物覺醒系統", "特殊任務QS07"],
    stats: { hp: 360, atk: 38, def: 19, bagSlots: 40, animalSlots: 3 }
  },
  {
    level: 11,
    title: "守護者隊長",
    expRequired: 1100,
    totalExp: 5040,
    unlocks: ["瞭望高塔（P12）", "特殊任務QS10"],
    stats: { hp: 400, atk: 42, def: 21, bagSlots: 42, animalSlots: 3 }
  },
  {
    level: 12,
    title: "高階守護者",
    expRequired: 1300,
    totalExp: 6340,
    unlocks: ["時光水道（P14）", "特殊任務QS05"],
    stats: { hp: 440, atk: 46, def: 23, bagSlots: 44, animalSlots: 3 }
  },
  {
    level: 13,
    title: "高階守護者",
    expRequired: 1500,
    totalExp: 7840,
    unlocks: ["裝備強化系統"],
    stats: { hp: 480, atk: 50, def: 25, bagSlots: 46, animalSlots: 3 }
  },
  {
    level: 14,
    title: "高階守護者",
    expRequired: 1750,
    totalExp: 9590,
    unlocks: ["守護動物二階進化"],
    stats: { hp: 525, atk: 55, def: 28, bagSlots: 48, animalSlots: 3 }
  },
  {
    level: 15,
    title: "守護者指揮官",
    expRequired: 2000,
    totalExp: 11590,
    unlocks: ["創意聖殿（P13）", "世界Boss參與資格"],
    stats: { hp: 570, atk: 60, def: 30, bagSlots: 50, animalSlots: 4 }
  },
  {
    level: 16,
    title: "守護者指揮官",
    expRequired: 2300,
    totalExp: 13890,
    unlocks: ["PVP對戰系統"],
    stats: { hp: 620, atk: 65, def: 33, bagSlots: 52, animalSlots: 4 }
  },
  {
    level: 17,
    title: "守護者指揮官",
    expRequired: 2600,
    totalExp: 16490,
    unlocks: ["裝備附魔系統"],
    stats: { hp: 670, atk: 70, def: 35, bagSlots: 54, animalSlots: 4 }
  },
  {
    level: 18,
    title: "守護者長老",
    expRequired: 3000,
    totalExp: 19490,
    unlocks: ["公會系統"],
    stats: { hp: 725, atk: 76, def: 38, bagSlots: 56, animalSlots: 4 }
  },
  {
    level: 19,
    title: "守護者長老",
    expRequired: 3400,
    totalExp: 22890,
    unlocks: ["守護動物三階進化"],
    stats: { hp: 780, atk: 82, def: 41, bagSlots: 58, animalSlots: 4 }
  },
  {
    level: 20,
    title: "守護者大師",
    expRequired: 4000,
    totalExp: 26890,
    unlocks: ["暗影巨蛇挑戰", "大師級裝備鍛造"],
    stats: { hp: 840, atk: 88, def: 44, bagSlots: 60, animalSlots: 5 }
  },
  {
    level: 21,
    title: "守護者大師",
    expRequired: 4600,
    totalExp: 31490,
    unlocks: ["排行榜系統"],
    stats: { hp: 900, atk: 94, def: 47, bagSlots: 62, animalSlots: 5 }
  },
  {
    level: 22,
    title: "守護者大師",
    expRequired: 5300,
    totalExp: 36790,
    unlocks: ["傳說裝備鍛造"],
    stats: { hp: 965, atk: 100, def: 50, bagSlots: 64, animalSlots: 5 }
  },
  {
    level: 23,
    title: "光之守護者",
    expRequired: 6000,
    totalExp: 42790,
    unlocks: ["光之試煉副本"],
    stats: { hp: 1030, atk: 107, def: 54, bagSlots: 66, animalSlots: 5 }
  },
  {
    level: 24,
    title: "光之守護者",
    expRequired: 7000,
    totalExp: 49790,
    unlocks: ["守護動物覺醒進化"],
    stats: { hp: 1100, atk: 114, def: 57, bagSlots: 68, animalSlots: 5 }
  },
  {
    level: 25,
    title: "光之守護者",
    expRequired: 8000,
    totalExp: 57790,
    unlocks: ["SSR裝備覺醒"],
    stats: { hp: 1175, atk: 122, def: 61, bagSlots: 70, animalSlots: 6 }
  },
  {
    level: 26,
    title: "傳說守護者",
    expRequired: 9500,
    totalExp: 67290,
    unlocks: ["傳說守護者外觀"],
    stats: { hp: 1250, atk: 130, def: 65, bagSlots: 72, animalSlots: 6 }
  },
  {
    level: 27,
    title: "傳說守護者",
    expRequired: 11000,
    totalExp: 78290,
    unlocks: ["全域光明強化"],
    stats: { hp: 1330, atk: 138, def: 69, bagSlots: 74, animalSlots: 6 }
  },
  {
    level: 28,
    title: "傳說守護者",
    expRequired: 13000,
    totalExp: 91290,
    unlocks: ["深淵副本入場券"],
    stats: { hp: 1415, atk: 147, def: 74, bagSlots: 76, animalSlots: 6 }
  },
  {
    level: 29,
    title: "神話守護者",
    expRequired: 15000,
    totalExp: 106290,
    unlocks: ["神話守護者外觀", "深淵領主線索"],
    stats: { hp: 1500, atk: 156, def: 78, bagSlots: 78, animalSlots: 6 }
  },
  {
    level: 30,
    title: "青塘園守護神",
    expRequired: 18000,
    totalExp: 124290,
    unlocks: ["湖底深淵領主挑戰", "守護神稱號", "最終覺醒系統", "全技能樹解鎖"],
    stats: { hp: 1600, atk: 166, def: 83, bagSlots: 80, animalSlots: 7 }
  }
];
