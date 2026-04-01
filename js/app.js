/**
 * 青塘園守護者：光明之戰
 * 主應用程式控制器 — 初始化、事件綁定、遊戲循環
 */
import { player } from './player.js';
import { ui } from './ui.js';
import { gameMap } from './map.js';
import { battle } from './battle.js';
import { quests } from './quest.js';
import { sensors } from './sensors.js';
import { renderInventory, renderCodex, renderShop, renderRanking, renderProfile } from './screens.js';

// 故事文本
const STORY_LINES = [
  '在桃園青埔的心臟地帶，有一座名為「青塘園」的生態公園...',
  '千百年來，湖底深處封印著一個通往暗影世界的裂隙——「黑暗破洞」。',
  '白鷺鷥的祝福、雙塔的光束、桃機一號的夢想能量...共同維持著封印。',
  '然而，封印正在鬆動。暗影怪物已經開始從裂隙中竄出...',
  '青塘園裡的小動物們——烏龜爺爺、錦鯉、蝴蝶、螢火蟲——正面臨前所未有的威脅。',
  '你，被選中的「光明守護者」，必須前往青塘園的每一個角落...',
  '完成守護任務，恢復光明值，重新點亮封印，驅趕暗影力量！',
  '拿起你的手機，走出門，真正的冒險就在這座公園裡等著你。',
];

class App {
  constructor() {
    this.storyIndex = 0;
    this.initialized = false;
  }

  async boot() {
    console.log('[App] 青塘園守護者 v1.0.0 啟動');

    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('[App] SW registered:', reg.scope))
        .catch(err => console.warn('[App] SW failed:', err));
    }

    // 初始化 UI
    ui.init();

    // 檢查存檔
    if (player.hasSave()) {
      document.getElementById('btn-continue').classList.remove('hidden');
    }

    // 綁定啟動畫面按鈕
    document.getElementById('btn-start').addEventListener('click', () => this.startNewGame());
    document.getElementById('btn-continue').addEventListener('click', () => this.continueGame());

    // 綁定故事畫面按鈕
    document.getElementById('btn-story-skip').addEventListener('click', () => this.skipStory());
    document.getElementById('btn-story-next').addEventListener('click', () => this.nextStoryLine());

    // FAB 按鈕
    document.getElementById('fab-action').addEventListener('click', () => this.quickAction());

    console.log('[App] 初始化完成');
  }

  // ── 新遊戲 ──
  startNewGame() {
    player.newGame();
    this.storyIndex = 0;
    ui.showScreen('screen-story');
    this.typeStoryLine();
  }

  // ── 繼續遊戲 ──
  continueGame() {
    player.load();
    this.enterGame();
  }

  // ── 故事 ──
  typeStoryLine() {
    const line = STORY_LINES[this.storyIndex];
    if (!line) {
      this.skipStory();
      return;
    }

    const textEl = document.querySelector('#story-text .typewriter');
    textEl.textContent = '';
    let i = 0;

    const nextBtn = document.getElementById('btn-story-next');
    const skipBtn = document.getElementById('btn-story-skip');
    nextBtn.classList.add('hidden');
    skipBtn.classList.remove('hidden');

    const typeTimer = setInterval(() => {
      if (i < line.length) {
        textEl.textContent += line[i];
        i++;
      } else {
        clearInterval(typeTimer);
        if (this.storyIndex < STORY_LINES.length - 1) {
          nextBtn.classList.remove('hidden');
          nextBtn.textContent = '繼續 ›';
        } else {
          nextBtn.classList.remove('hidden');
          nextBtn.textContent = '開始冒險！';
        }
      }
    }, 50);

    // 點擊跳過打字效果
    skipBtn.onclick = () => {
      if (i < line.length) {
        clearInterval(typeTimer);
        textEl.textContent = line;
        if (this.storyIndex < STORY_LINES.length - 1) {
          nextBtn.classList.remove('hidden');
          nextBtn.textContent = '繼續 ›';
        } else {
          nextBtn.classList.remove('hidden');
          nextBtn.textContent = '開始冒險！';
        }
      } else {
        this.skipStory();
      }
    };
  }

  nextStoryLine() {
    this.storyIndex++;
    if (this.storyIndex >= STORY_LINES.length) {
      this.skipStory();
    } else {
      this.typeStoryLine();
    }
  }

  skipStory() {
    this.enterGame();
  }

  // ── 進入遊戲主畫面 ──
  enterGame() {
    if (!this.initialized) {
      this.initialized = true;
      this._initGameSystems();
    }

    ui.showScreen('screen-map');
    ui.updateHUD();
    ui.toast(`歡迎回來，${player.data.title} ${player.data.name}！`, 'info');

    // 渲染各頁面
    quests.renderAllLists();
    renderCodex();
    renderShop();
    renderRanking();
    renderProfile();
    renderInventory();
  }

  _initGameSystems() {
    // 初始化地圖
    setTimeout(() => gameMap.init(), 100);

    // 地圖事件：進入據點時觸發
    gameMap.onEnterLocation((location) => {
      // 解鎖據點圖鑑
      player.unlockCodex('locations', location.id);

      // 隨機遭遇戰鬥 (30% 機率)
      if (Math.random() < 0.3 && !battle.active) {
        const monsterId = battle.getRandomEncounter(location.id);
        if (monsterId) {
          setTimeout(() => {
            ui.dialog(
              '遭遇敵人！',
              `暗影怪物出現在 ${location.name}！要迎戰嗎？`,
              () => {
                battle.start(monsterId, (won) => {
                  if (won) {
                    player.addLight(location.id, 20);
                    gameMap.refreshMarker(location.id);
                  }
                });
              }
            );
          }, 1000);
        }
      }

      // 自動完成相關任務的 GPS 目標
      player.data.activeQuests.forEach(aq => {
        const quest = null; // Quests module handles this internally
      });
    });

    // 玩家資料變動時更新畫面
    player.on((type, detail) => {
      if (type === 'quest') {
        quests.renderAllLists();
      }
      if (type === 'light') {
        renderCodex();
      }
      if (type === 'animals') {
        renderCodex();
        renderProfile();
      }
      if (type === 'inventory') {
        renderInventory();
      }
    });

    // 定期自動存檔
    setInterval(() => {
      player.save();
    }, 30000);

    // 光明值緩慢衰退（每5分鐘衰退1%）
    setInterval(() => {
      Object.keys(player.data.lightValues).forEach(locId => {
        const current = player.data.lightValues[locId];
        if (current > 0) {
          player.data.lightValues[locId] = Math.max(0, current - Math.ceil(current * 0.01));
        }
      });
      player.save();
    }, 300000);

    // 請求通知權限
    sensors.requestNotificationPermission();

    // 開發用全局函式
    window.devTeleport = (locId) => gameMap.devTeleport(locId);
    window.devAddExp = (exp) => { player.addExp(exp); ui.updateHUD(); };
    window.devAddGold = (gold) => { player.addGold(gold); ui.updateHUD(); };
    window.devAddAnimal = (id) => { player.addAnimal(id); renderCodex(); };
    window.devBattle = (mId) => battle.start(mId, () => {});
    console.log('[App] 開發工具已載入: devTeleport, devAddExp, devAddGold, devAddAnimal, devBattle');
  }

  // ── 快速行動 (FAB) ──
  quickAction() {
    if (gameMap.nearbyLocation) {
      const loc = gameMap.nearbyLocation;
      ui.dialog(
        `⚡ ${loc.name}`,
        `<div style="text-align:left">
          <p>💡 光明值：${player.getLight(loc.id)}/${loc.maxLight}</p>
          <p>📍 你正在此據點範圍內</p>
          <p>選擇行動：</p>
        </div>`,
        () => {
          // 搜索敵人
          const monsterId = battle.getRandomEncounter(loc.id);
          if (monsterId) {
            battle.start(monsterId, (won) => {
              if (won) {
                player.addLight(loc.id, 20);
                gameMap.refreshMarker(loc.id);
              }
            });
          } else {
            ui.toast('附近沒有發現敵人', 'info');
          }
        }
      );
    } else {
      ui.toast('請靠近一個據點才能行動', 'warning');
      gameMap.centerOnPark();
    }
  }
}

// ── 啟動 ──
const app = new App();
document.addEventListener('DOMContentLoaded', () => app.boot());
