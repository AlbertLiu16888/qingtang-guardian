/**
 * 青塘園守護者 - 玩家系統
 * 狀態管理、等級成長、存讀檔、背包
 */
import { LEVELS } from './data/levels.js';

const SAVE_KEY = 'qingtang_guardian_save';

function createDefaultPlayer() {
  return {
    name: '守護者',
    level: 1,
    exp: 0,
    hp: 100,
    maxHp: 100,
    atk: 10,
    def: 5,
    gold: 200,
    diamonds: 50,
    bagSlots: 20,
    animalSlots: 1,
    title: '見習守護者',

    // 位置
    lat: 0,
    lng: 0,
    totalDistance: 0,

    // 動物夥伴
    animals: ['A05'], // 初始松鼠
    activeAnimal: 'A05',
    animalAffection: { A05: 10 },

    // 背包: [{itemId, quantity}]
    inventory: [
      { itemId: 'I002', quantity: 5 },
      { itemId: 'I008', quantity: 3 },
    ],

    // 裝備
    equipment: { weapon: null, armor: null, accessory: null },

    // 任務狀態
    completedQuests: [],
    activeQuests: [],         // [{questId, objectives: [{current}], startedAt}]
    dailyQuestResets: null,
    weeklyQuestResets: null,

    // 據點光明值: {locationId: currentLight}
    lightValues: {},

    // 統計
    stats: {
      questsCompleted: 0,
      battlesWon: 0,
      animalsCollected: 1,
      totalSteps: 0,
      totalDistance: 0,
      monstersDefeated: 0,
      bossesDefeated: 0,
      loginDays: 1,
      lastLoginDate: new Date().toISOString().slice(0, 10),
    },

    // 圖鑑解鎖
    codex: {
      animals: ['A05'],
      monsters: [],
      locations: ['P01', 'P05'],
    },

    // 設定
    settings: {
      sound: true,
      notifications: true,
      location: true,
    },

    createdAt: Date.now(),
    lastSaved: Date.now(),
  };
}

class PlayerManager {
  constructor() {
    this.data = null;
    this._listeners = [];
  }

  // ── 存讀檔 ──
  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        this.data = JSON.parse(raw);
        this._checkDailyReset();
        return true;
      }
    } catch (e) {
      console.warn('[Player] Load failed:', e);
    }
    return false;
  }

  newGame() {
    this.data = createDefaultPlayer();
    this.save();
  }

  save() {
    if (!this.data) return;
    this.data.lastSaved = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
  }

  hasSave() {
    return !!localStorage.getItem(SAVE_KEY);
  }

  // ── 每日重置 ──
  _checkDailyReset() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.data.stats.lastLoginDate !== today) {
      this.data.stats.loginDays++;
      this.data.stats.lastLoginDate = today;
      this.data.dailyQuestResets = today;
      // 清除已完成的每日任務讓它們可重新接取
      this.data.completedQuests = this.data.completedQuests.filter(
        qid => !qid.startsWith('QD')
      );
    }
    const week = this._getWeekNumber();
    if (this.data.weeklyQuestResets !== week) {
      this.data.weeklyQuestResets = week;
      this.data.completedQuests = this.data.completedQuests.filter(
        qid => !qid.startsWith('QW')
      );
    }
  }

  _getWeekNumber() {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
  }

  // ── 經驗值與升級 ──
  addExp(amount) {
    if (!this.data) return [];
    this.data.exp += amount;
    const levelUps = [];

    while (true) {
      const nextLevel = LEVELS.find(l => l.level === this.data.level + 1);
      if (!nextLevel) break;
      if (this.data.exp < nextLevel.totalExp) break;

      this.data.level = nextLevel.level;
      this.data.title = nextLevel.title;
      this.data.maxHp = nextLevel.stats.hp;
      this.data.hp = nextLevel.stats.hp; // 升級滿血
      this.data.atk = nextLevel.stats.atk;
      this.data.def = nextLevel.stats.def;
      this.data.bagSlots = nextLevel.stats.bagSlots;
      this.data.animalSlots = nextLevel.stats.animalSlots;
      levelUps.push(nextLevel);
    }

    this.save();
    this._notify('exp', { amount, levelUps });
    return levelUps;
  }

  // ── 貨幣 ──
  addGold(amount) {
    this.data.gold += amount;
    this.save();
    this._notify('gold', amount);
  }

  spendGold(amount) {
    if (this.data.gold < amount) return false;
    this.data.gold -= amount;
    this.save();
    this._notify('gold', -amount);
    return true;
  }

  addDiamonds(amount) {
    this.data.diamonds += amount;
    this.save();
    this._notify('diamonds', amount);
  }

  spendDiamonds(amount) {
    if (this.data.diamonds < amount) return false;
    this.data.diamonds -= amount;
    this.save();
    this._notify('diamonds', -amount);
    return true;
  }

  // ── HP ──
  heal(amount) {
    this.data.hp = Math.min(this.data.hp + amount, this.data.maxHp);
    this.save();
    this._notify('hp');
  }

  takeDamage(amount) {
    const actual = Math.max(1, amount - this.data.def);
    this.data.hp = Math.max(0, this.data.hp - actual);
    this.save();
    this._notify('hp');
    return actual;
  }

  isDead() {
    return this.data.hp <= 0;
  }

  // ── 背包 ──
  addItem(itemId, quantity = 1) {
    const existing = this.data.inventory.find(i => i.itemId === itemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      if (this.data.inventory.length >= this.data.bagSlots) return false;
      this.data.inventory.push({ itemId, quantity });
    }
    this.save();
    this._notify('inventory');
    return true;
  }

  removeItem(itemId, quantity = 1) {
    const existing = this.data.inventory.find(i => i.itemId === itemId);
    if (!existing || existing.quantity < quantity) return false;
    existing.quantity -= quantity;
    if (existing.quantity <= 0) {
      this.data.inventory = this.data.inventory.filter(i => i.itemId !== itemId);
    }
    this.save();
    this._notify('inventory');
    return true;
  }

  getItemCount(itemId) {
    const item = this.data.inventory.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  }

  // ── 動物夥伴 ──
  addAnimal(animalId) {
    if (this.data.animals.includes(animalId)) return false;
    this.data.animals.push(animalId);
    this.data.animalAffection[animalId] = 0;
    this.data.stats.animalsCollected = this.data.animals.length;
    if (!this.data.codex.animals.includes(animalId)) {
      this.data.codex.animals.push(animalId);
    }
    this.save();
    this._notify('animals');
    return true;
  }

  setActiveAnimal(animalId) {
    if (!this.data.animals.includes(animalId)) return false;
    this.data.activeAnimal = animalId;
    this.save();
    this._notify('animals');
    return true;
  }

  // ── 光明值 ──
  addLight(locationId, amount) {
    const current = this.data.lightValues[locationId] || 0;
    this.data.lightValues[locationId] = Math.min(current + amount, 1000);
    this.save();
    this._notify('light', { locationId, amount });
  }

  getLight(locationId) {
    return this.data.lightValues[locationId] || 0;
  }

  getTotalLight() {
    return Object.values(this.data.lightValues).reduce((a, b) => a + b, 0);
  }

  // ── 任務 ──
  isQuestCompleted(questId) {
    return this.data.completedQuests.includes(questId);
  }

  isQuestActive(questId) {
    return this.data.activeQuests.some(q => q.questId === questId);
  }

  startQuest(questId, objectives) {
    if (this.isQuestActive(questId) || this.isQuestCompleted(questId)) return false;
    this.data.activeQuests.push({
      questId,
      objectives: objectives.map(() => ({ current: 0 })),
      startedAt: Date.now(),
    });
    this.save();
    return true;
  }

  updateQuestObjective(questId, objectiveIndex, value) {
    const quest = this.data.activeQuests.find(q => q.questId === questId);
    if (!quest) return;
    quest.objectives[objectiveIndex].current = value;
    this.save();
  }

  completeQuest(questId) {
    this.data.activeQuests = this.data.activeQuests.filter(q => q.questId !== questId);
    if (!this.data.completedQuests.includes(questId)) {
      this.data.completedQuests.push(questId);
    }
    this.data.stats.questsCompleted++;
    this.save();
    this._notify('quest', questId);
  }

  getActiveQuest(questId) {
    return this.data.activeQuests.find(q => q.questId === questId);
  }

  // ── 圖鑑 ──
  unlockCodex(type, id) {
    if (!this.data.codex[type].includes(id)) {
      this.data.codex[type].push(id);
      this.save();
    }
  }

  // ── 位置更新 ──
  updatePosition(lat, lng) {
    if (this.data.lat && this.data.lng) {
      const dist = haversine(this.data.lat, this.data.lng, lat, lng);
      if (dist > 1 && dist < 100) { // 過濾GPS跳動 (1m-100m)
        this.data.totalDistance += dist;
        this.data.stats.totalDistance += dist;
        this.data.stats.totalSteps += Math.round(dist / 0.7); // 約0.7m一步
      }
    }
    this.data.lat = lat;
    this.data.lng = lng;
  }

  // ── 事件系統 ──
  on(callback) {
    this._listeners.push(callback);
  }

  _notify(type, detail) {
    this._listeners.forEach(fn => fn(type, detail));
  }

  // ── 取得當前等級資料 ──
  getCurrentLevelData() {
    return LEVELS.find(l => l.level === this.data.level) || LEVELS[0];
  }

  getNextLevelData() {
    return LEVELS.find(l => l.level === this.data.level + 1);
  }

  getExpProgress() {
    const current = this.getCurrentLevelData();
    const next = this.getNextLevelData();
    if (!next) return 1;
    const expInLevel = this.data.exp - current.totalExp;
    const expNeeded = next.totalExp - current.totalExp;
    return Math.min(1, expInLevel / expNeeded);
  }
}

// Haversine 距離計算 (公尺)
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export { haversine };
export const player = new PlayerManager();
