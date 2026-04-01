/**
 * 青塘園守護者 - 任務系統
 * 任務接取、追蹤、完成、獎勵發放
 */
import { QUESTS } from './data/quests.js';
import { LOCATIONS } from './data/locations.js';
import { player, haversine } from './player.js';
import { ui } from './ui.js';
import { sensors } from './sensors.js';
import { battle } from './battle.js';
import { gameMap } from './map.js';

class QuestManager {
  constructor() {
    this.currentQuest = null;     // 正在進行中的任務資料
    this.currentProgress = null;  // 玩家進度
    this._sensorCleanup = null;   // 感測器清理函式
    this._intervalId = null;
  }

  // ── 取得可用任務 ──
  getAvailableQuests(type) {
    return QUESTS.filter(q => {
      if (q.type !== type) return false;
      if (player.isQuestCompleted(q.id) && !q.repeatable) return false;
      if (player.isQuestActive(q.id)) return false;

      // 觸發條件檢查
      if (q.trigger) {
        if (q.trigger.type === 'level' && player.data.level < q.trigger.value) return false;
        if (q.trigger.type === 'quest' && !player.isQuestCompleted(q.trigger.value)) return false;
      }
      return true;
    });
  }

  getActiveQuests() {
    return player.data.activeQuests.map(aq => {
      const quest = QUESTS.find(q => q.id === aq.questId);
      return quest ? { ...quest, progress: aq } : null;
    }).filter(Boolean);
  }

  // ── 任務列表渲染 ──
  renderQuestList(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const available = this.getAvailableQuests(type);
    const active = this.getActiveQuests().filter(q => q.type === type);
    const completed = QUESTS.filter(q => q.type === type && player.isQuestCompleted(q.id));

    let html = '';

    // 進行中的任務
    active.forEach(q => {
      html += this._renderQuestCard(q, 'active');
    });

    // 可接取的任務
    available.forEach(q => {
      html += this._renderQuestCard(q, 'available');
    });

    // 已完成
    completed.slice(0, 5).forEach(q => {
      html += this._renderQuestCard(q, 'completed');
    });

    if (!html) {
      html = '<div class="empty-state"><p>目前沒有可用的任務</p></div>';
    }

    container.innerHTML = html;

    // 綁定點擊事件
    container.querySelectorAll('.quest-card').forEach(card => {
      card.addEventListener('click', () => {
        const questId = card.dataset.questId;
        const status = card.dataset.status;
        if (status === 'available') {
          this.acceptQuest(questId);
        } else if (status === 'active') {
          this.startQuest(questId);
        }
      });
    });
  }

  _renderQuestCard(quest, status) {
    const statusMap = {
      active: { label: '進行中', class: 'quest-active', icon: '▶️' },
      available: { label: '可接取', class: 'quest-available', icon: '❗' },
      completed: { label: '已完成', class: 'quest-completed', icon: '✅' },
    };
    const s = statusMap[status];
    const sensorIcon = this._getSensorIcon(quest.sensorType);
    const diffLevel = typeof quest.difficulty === 'number' ? quest.difficulty : 1;
    const difficultyClass = diffLevel >= 4 ? 'hard' : diffLevel >= 2 ? 'normal' : 'easy';
    const difficultyLabel = diffLevel >= 4 ? '困難' : diffLevel >= 2 ? '普通' : '簡單';

    return `
      <div class="quest-card ${s.class}" data-quest-id="${quest.id}" data-status="${status}">
        <div class="quest-card-header">
          <span class="quest-status-icon">${s.icon}</span>
          <span class="quest-name">${quest.name}</span>
          <span class="quest-difficulty ${difficultyClass}">${difficultyLabel}</span>
        </div>
        <p class="quest-desc">${quest.description.slice(0, 50)}...</p>
        <div class="quest-card-footer">
          <span class="quest-sensor">${sensorIcon} ${quest.sensorType}</span>
          <span class="quest-reward">⭐${quest.rewards.exp} 🪙${quest.rewards.gold}</span>
        </div>
      </div>
    `;
  }

  _getSensorIcon(type) {
    const map = {
      gps: '📍', camera: '📷', shake: '📳', audio: '🎤',
      tilt: '📐', ocr: '🔤', qr: '📱', gesture: '🤚',
      face: '😀', rhythm: '🎵', blow: '💨', compass: '🧭',
      'gps+shake': '📍📳', 'gps+camera': '📍📷',
      'gps+walk': '📍🚶', 'camera+color': '📷🎨',
      'camera+object': '📷🔍',
    };
    return map[type] || '📡';
  }

  // ── 接取任務 ──
  acceptQuest(questId) {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return;

    if (player.startQuest(questId, quest.objectives)) {
      ui.toast(`接取任務：${quest.name}`, 'info');
      // 重新渲染任務列表
      this.renderAllLists();
    }
  }

  // ── 開始執行任務 ──
  startQuest(questId) {
    const quest = QUESTS.find(q => q.id === questId);
    const progress = player.getActiveQuest(questId);
    if (!quest || !progress) return;

    this.currentQuest = quest;
    this.currentProgress = progress;

    // 更新任務畫面
    document.getElementById('active-quest-title').textContent = quest.name;
    document.getElementById('quest-objective').innerHTML = `
      <h4>${quest.name}</h4>
      <p class="quest-objective-text">${quest.description}</p>
      <div class="quest-objectives-list">
        ${quest.objectives.map((obj, i) => `
          <div class="objective-item ${progress.objectives[i].current >= (obj.count || 1) ? 'done' : ''}">
            <span class="objective-check">${progress.objectives[i].current >= (obj.count || 1) ? '✅' : '⬜'}</span>
            <span>${obj.desc}</span>
            ${obj.count ? `<span class="objective-count">${progress.objectives[i].current}/${obj.count}</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    // 設置互動區域
    this._setupInteraction(quest);
    this._updateProgress();

    ui.showScreen('screen-quest-active');

    // 綁定按鈕
    document.getElementById('btn-quest-cancel').onclick = () => this.cancelQuest();
    document.getElementById('btn-quest-complete').onclick = () => this.completeQuest();
  }

  // ── 設置感測器互動 ──
  _setupInteraction(quest) {
    const area = document.getElementById('quest-interaction');
    this._cleanupSensors();

    const sensor = quest.sensorType;

    // GPS 任務
    if (sensor === 'gps' || sensor.includes('gps')) {
      const loc = LOCATIONS.find(l => l.id === quest.locationId);
      if (loc) {
        area.innerHTML = `
          <div class="interaction-gps">
            <span class="interaction-icon">📍</span>
            <p>前往 <strong>${loc.name}</strong></p>
            <p class="gps-distance" id="gps-distance">計算中...</p>
            <div class="gps-compass" id="gps-compass"></div>
          </div>
        `;
        this._intervalId = setInterval(() => {
          const dist = gameMap.getDistanceTo(loc.lat, loc.lng);
          const distEl = document.getElementById('gps-distance');
          if (distEl) {
            distEl.textContent = dist < Infinity ? `距離：${Math.round(dist)}m` : '等待定位...';
          }
          // 自動完成GPS目標
          if (dist < loc.radius) {
            const objIdx = quest.objectives.findIndex(o => o.type === 'reach_location');
            if (objIdx >= 0) {
              this.currentProgress.objectives[objIdx].current = 1;
              player.updateQuestObjective(quest.id, objIdx, 1);
              this._updateProgress();
              ui.toast(`📍 到達 ${loc.name}！`, 'success');
            }
          }
        }, 2000);
      }
    }

    // 搖晃任務
    if (sensor === 'shake' || sensor.includes('shake')) {
      const target = quest.objectives.find(o => o.type === 'shake')?.count || 10;
      area.innerHTML += `
        <div class="interaction-shake">
          <div class="shake-icon" id="shake-icon">📳</div>
          <p>搖晃手機！</p>
          <div class="shake-counter">
            <span id="shake-count">0</span> / ${target}
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-simulate-shake">模擬搖晃</button>
        </div>
      `;

      sensors.startShakeDetection((count) => {
        const el = document.getElementById('shake-count');
        if (el) el.textContent = count;
        const icon = document.getElementById('shake-icon');
        if (icon) { icon.classList.add('shake'); setTimeout(() => icon.classList.remove('shake'), 300); }
        sensors.vibrate([50]);

        const objIdx = quest.objectives.findIndex(o => o.type === 'shake');
        if (objIdx >= 0) {
          this.currentProgress.objectives[objIdx].current = count;
          player.updateQuestObjective(quest.id, objIdx, count);
          this._updateProgress();
        }
      });

      // 模擬按鈕（桌面測試用）
      setTimeout(() => {
        const btn = document.getElementById('btn-simulate-shake');
        if (btn) btn.addEventListener('click', () => sensors.simulateShake());
      }, 100);
    }

    // 拍照任務
    if (sensor === 'camera' || sensor.includes('camera')) {
      area.innerHTML += `
        <div class="interaction-camera">
          <span class="interaction-icon">📷</span>
          <p>拍攝指定目標</p>
          <button class="btn btn-primary" id="btn-open-camera">開啟相機</button>
          <div id="photo-result" class="photo-result hidden">
            <img id="captured-photo" alt="captured">
            <p id="photo-analysis"></p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const btn = document.getElementById('btn-open-camera');
        if (btn) {
          btn.addEventListener('click', async () => {
            const ok = await sensors.startCamera();
            if (ok) {
              ui.showModal('modal-camera');
              document.getElementById('camera-capture').onclick = () => this._handleCapture(quest);
              document.getElementById('camera-close').onclick = () => {
                sensors.stopCamera();
                ui.hideModal('modal-camera');
              };
            } else {
              // 桌面替代：直接判定成功
              ui.toast('相機不可用，以模擬模式完成', 'info');
              this._completePhotoObjective(quest);
            }
          });
        }
      }, 100);
    }

    // 音量任務
    if (sensor === 'audio') {
      area.innerHTML += `
        <div class="interaction-audio">
          <div class="audio-meter">
            <div class="audio-bar" id="audio-bar" style="height:0%"></div>
          </div>
          <p>大聲喊叫！</p>
          <p class="audio-db" id="audio-db">0 dB</p>
          <button class="btn btn-primary" id="btn-start-audio">開始偵測</button>
        </div>
      `;

      setTimeout(() => {
        const btn = document.getElementById('btn-start-audio');
        if (btn) {
          btn.addEventListener('click', async () => {
            btn.disabled = true;
            btn.textContent = '偵測中...';
            const detector = await sensors.startAudioDetection((db) => {
              const bar = document.getElementById('audio-bar');
              const text = document.getElementById('audio-db');
              if (bar) bar.style.height = `${Math.min(100, db)}%`;
              if (text) text.textContent = `${db} dB`;

              if (db > 70) {
                const objIdx = quest.objectives.findIndex(o => o.type === 'audio');
                if (objIdx >= 0 && this.currentProgress.objectives[objIdx].current < 1) {
                  this.currentProgress.objectives[objIdx].current = 1;
                  player.updateQuestObjective(quest.id, objIdx, 1);
                  this._updateProgress();
                  ui.toast('🎤 聲音偵測成功！', 'success');
                }
              }
            });
            this._sensorCleanup = () => { if (detector) detector.stop(); };
          });
        }
      }, 100);
    }

    // 戰鬥目標 — 新增按鈕
    const killObj = quest.objectives.find(o => o.type === 'kill');
    if (killObj) {
      area.innerHTML += `
        <div class="interaction-battle">
          <button class="btn btn-danger" id="btn-encounter">⚔️ 搜索敵人</button>
        </div>
      `;
      setTimeout(() => {
        const btn = document.getElementById('btn-encounter');
        if (btn) {
          btn.addEventListener('click', () => {
            const monsterId = killObj.target || battle.getRandomEncounter(quest.locationId);
            if (monsterId) {
              battle.start(monsterId, (won) => {
                if (won) {
                  const objIdx = quest.objectives.indexOf(killObj);
                  if (objIdx >= 0) {
                    this.currentProgress.objectives[objIdx].current++;
                    player.updateQuestObjective(quest.id, objIdx, this.currentProgress.objectives[objIdx].current);
                    this._updateProgress();
                    // 返回任務畫面
                    setTimeout(() => this.startQuest(quest.id), 500);
                  }
                }
              });
            }
          });
        }
      }, 100);
    }
  }

  _handleCapture(quest) {
    const photoData = sensors.capturePhoto();
    if (!photoData) return;

    const analysis = sensors.analyzePhoto();
    sensors.stopCamera();
    ui.hideModal('modal-camera');

    // 顯示結果
    const resultDiv = document.getElementById('photo-result');
    const img = document.getElementById('captured-photo');
    const text = document.getElementById('photo-analysis');
    if (resultDiv && img) {
      resultDiv.classList.remove('hidden');
      img.src = photoData;
      if (text) text.textContent = `偵測到顏色: ${analysis.colors.join(', ') || '無明顯色彩'}`;
    }

    this._completePhotoObjective(quest);
  }

  _completePhotoObjective(quest) {
    const objIdx = quest.objectives.findIndex(o =>
      o.type === 'photo' || o.type === 'camera' || o.type === 'detect_object' || o.type === 'detect_color'
    );
    if (objIdx >= 0) {
      this.currentProgress.objectives[objIdx].current = 1;
      player.updateQuestObjective(quest.id, objIdx, 1);
      this._updateProgress();
      ui.toast('📷 拍攝成功！', 'success');
    }
  }

  // ── 進度更新 ──
  _updateProgress() {
    if (!this.currentQuest || !this.currentProgress) return;

    const quest = this.currentQuest;
    const completedObjs = quest.objectives.filter((obj, i) => {
      const target = obj.count || 1;
      return this.currentProgress.objectives[i].current >= target;
    }).length;

    const total = quest.objectives.length;
    const pct = Math.round(completedObjs / total * 100);

    document.getElementById('quest-progress-fill').style.width = `${pct}%`;
    document.getElementById('quest-progress-text').textContent = `${pct}%`;

    const completeBtn = document.getElementById('btn-quest-complete');
    if (completeBtn) {
      completeBtn.disabled = completedObjs < total;
    }

    // 更新目標核取
    document.querySelectorAll('.objective-item').forEach((el, i) => {
      if (i < quest.objectives.length) {
        const target = quest.objectives[i].count || 1;
        const done = this.currentProgress.objectives[i].current >= target;
        el.classList.toggle('done', done);
        el.querySelector('.objective-check').textContent = done ? '✅' : '⬜';
        const countEl = el.querySelector('.objective-count');
        if (countEl) countEl.textContent = `${this.currentProgress.objectives[i].current}/${target}`;
      }
    });
  }

  // ── 完成任務 ──
  async completeQuest() {
    if (!this.currentQuest) return;

    const quest = this.currentQuest;
    this._cleanupSensors();

    // 發放獎勵
    const rewards = quest.rewards;
    if (rewards.gold) player.addGold(rewards.gold);
    if (rewards.light && quest.locationId) {
      player.addLight(quest.locationId, rewards.light);
      gameMap.refreshMarker(quest.locationId);
    }
    if (rewards.items) {
      rewards.items.forEach(item => player.addItem(item.id, item.qty));
    }

    player.completeQuest(quest.id);

    // 顯示獎勵
    await ui.showReward(rewards);

    // 經驗值（可能升級）
    if (rewards.exp) {
      const levelUps = player.addExp(rewards.exp);
      for (const lvl of levelUps) {
        await ui.showLevelUp(lvl);
      }
    }

    player.save();
    this.currentQuest = null;
    this.currentProgress = null;

    ui.toast('任務完成！', 'success');
    ui.showScreen('screen-quest');
    this.renderAllLists();
  }

  // ── 放棄任務 ──
  cancelQuest() {
    if (!this.currentQuest) return;

    ui.dialog('放棄任務', '確定要放棄這個任務嗎？進度將會遺失。', () => {
      this._cleanupSensors();
      const questId = this.currentQuest.id;
      player.data.activeQuests = player.data.activeQuests.filter(q => q.questId !== questId);
      player.save();
      this.currentQuest = null;
      this.currentProgress = null;
      ui.showScreen('screen-quest');
      this.renderAllLists();
    });
  }

  // ── 渲染所有列表 ──
  renderAllLists() {
    this.renderQuestList('main', 'quest-list-main');
    this.renderQuestList('daily', 'quest-list-daily');
    this.renderQuestList('weekly', 'quest-list-weekly');
    this.renderQuestList('special', 'quest-list-special');
  }

  // ── 清理感測器 ──
  _cleanupSensors() {
    sensors.stopShakeDetection();
    sensors.stopCamera();
    if (this._sensorCleanup) {
      this._sensorCleanup();
      this._sensorCleanup = null;
    }
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
}

export const quests = new QuestManager();
