/**
 * 青塘園守護者 - 任務系統
 * 雙模式：GPS定位觸發(2x獎勵) + 直接挑戰(1x獎勵)
 * 所有互動目標可自動完成（測試模式友善）
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
    this.currentQuest = null;
    this.currentProgress = null;
    this.isGpsMode = false;  // 是否GPS模式（影響獎勵倍率）
    this._sensorCleanup = null;
    this._intervalId = null;
  }

  // ── 取得可用任務 ──
  getAvailableQuests(type) {
    return QUESTS.filter(q => {
      if (q.type !== type) return false;
      if (player.isQuestCompleted(q.id) && !q.repeatable) return false;
      if (player.isQuestActive(q.id)) return false;
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

    active.forEach(q => { html += this._renderQuestCard(q, 'active'); });
    available.forEach(q => { html += this._renderQuestCard(q, 'available'); });
    completed.slice(0, 5).forEach(q => { html += this._renderQuestCard(q, 'completed'); });

    if (!html) {
      html = '<div class="empty-state"><p>目前沒有可用的任務</p></div>';
    }

    container.innerHTML = html;

    container.querySelectorAll('.quest-card').forEach(card => {
      card.addEventListener('click', () => {
        const questId = card.dataset.questId;
        const status = card.dataset.status;
        if (status === 'available') {
          this._showAcceptDialog(questId);
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
    const directTag = quest.directPlay ? '<span class="quest-direct-tag">可直接挑戰</span>' : '';

    return `
      <div class="quest-card ${s.class}" data-quest-id="${quest.id}" data-status="${status}">
        <div class="quest-card-header">
          <span class="quest-status-icon">${s.icon}</span>
          <span class="quest-name">${quest.name}</span>
          <span class="quest-difficulty ${difficultyClass}">${difficultyLabel}</span>
        </div>
        <p class="quest-desc">${quest.description.split('\n')[0].slice(0, 60)}...</p>
        <div class="quest-card-footer">
          <span class="quest-sensor">${sensorIcon} ${quest.sensorType}</span>
          <span class="quest-reward">⭐${quest.rewards.exp} 🪙${quest.rewards.gold}</span>
          ${directTag}
        </div>
      </div>
    `;
  }

  _getSensorIcon(type) {
    const map = {
      gps: '📍', camera: '📷', shake: '📳', audio: '🎤',
      tilt: '📐', ocr: '🔤', qr: '📱', gesture: '🤚',
      face: '😀', rhythm: '🎵', blow: '💨', compass: '🧭',
    };
    return map[type] || '📡';
  }

  // ── 接取對話框：選擇GPS模式或直接挑戰 ──
  _showAcceptDialog(questId) {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return;

    const baseReward = `⭐${quest.rewards.exp} 🪙${quest.rewards.gold}`;
    const bonusReward = quest.gpsBonus ? `+⭐${quest.gpsBonus.exp} +🪙${quest.gpsBonus.gold}` : '';

    if (quest.directPlay) {
      // Show dialog with two options
      const content = `
        <div style="text-align:left;font-size:0.9rem">
          <p style="margin-bottom:12px">${quest.description.replace(/\n/g, '<br>')}</p>
          <div style="background:var(--bg-tertiary);padding:12px;border-radius:8px;margin-bottom:8px">
            <div style="font-weight:600;color:var(--accent-cyan)">🎯 直接挑戰</div>
            <div>基礎獎勵：${baseReward}</div>
          </div>
          ${bonusReward ? `
          <div style="background:var(--bg-tertiary);padding:12px;border-radius:8px">
            <div style="font-weight:600;color:var(--accent-green)">📍 到場挑戰 (GPS)</div>
            <div>獎勵加倍：${baseReward} ${bonusReward}</div>
          </div>` : ''}
        </div>
      `;

      // Create custom dialog with two buttons
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay active';
      overlay.innerHTML = `
        <div class="modal" style="max-width:380px">
          <h3>${quest.name}</h3>
          ${content}
          <div style="display:flex;gap:8px;margin-top:16px">
            <button class="btn btn-secondary" style="flex:1" id="_quest_cancel">取消</button>
            <button class="btn btn-primary" style="flex:1" id="_quest_direct">🎯 直接挑戰</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('#_quest_cancel').onclick = () => overlay.remove();
      overlay.querySelector('#_quest_direct').onclick = () => {
        overlay.remove();
        this.isGpsMode = false;
        this.acceptQuest(questId);
      };
    } else {
      this.isGpsMode = false;
      this.acceptQuest(questId);
    }
  }

  // ── 接取任務 ──
  acceptQuest(questId) {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return;

    if (player.startQuest(questId, quest.objectives)) {
      ui.toast(`接取任務：${quest.name}`, 'info');
      this.renderAllLists();
      // 自動進入任務執行畫面
      this.startQuest(questId);
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
      <p class="quest-objective-text">${quest.description.replace(/\n/g, '<br>')}</p>
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

    this._setupInteraction(quest);
    this._updateProgress();

    ui.showScreen('screen-quest-active');

    document.getElementById('btn-quest-cancel').onclick = () => this.cancelQuest();
    document.getElementById('btn-quest-complete').onclick = () => this.completeQuest();
  }

  // ── 設置互動區域 ──
  _setupInteraction(quest) {
    const area = document.getElementById('quest-interaction');
    this._cleanupSensors();
    area.innerHTML = '';

    // 自動完成所有 interact 類型目標（點擊按鈕即可）
    const interactObjs = quest.objectives
      .map((o, i) => ({ ...o, idx: i }))
      .filter(o => o.type === 'interact' || o.type === 'gesture' || o.type === 'gesture_draw'
        || o.type === 'tilt' || o.type === 'tilt_hold' || o.type === 'puzzle'
        || o.type === 'charge_meter' || o.type === 'light_check'
        || o.type === 'visit_locations' || o.type === 'visit_all_locations'
        || o.type === 'walk_route' || o.type === 'step_count'
        || o.type === 'complete_daily' || o.type === 'purify'
        || o.type === 'collect' || o.type === 'qr_scan'
        || o.type === 'face_detect' || o.type === 'ocr_scan'
        || o.type === 'audio_detect' || o.type === 'rhythm_game'
        || o.type === 'blow' || o.type === 'camera_trace');

    if (interactObjs.length > 0) {
      area.innerHTML += `
        <div class="interaction-auto">
          ${interactObjs.map(obj => {
            const target = obj.count || 1;
            const current = this.currentProgress.objectives[obj.idx].current;
            const done = current >= target;
            return `
              <button class="btn ${done ? 'btn-secondary' : 'btn-primary'} btn-interact-auto"
                data-obj-idx="${obj.idx}" ${done ? 'disabled' : ''} style="margin:4px;width:100%">
                ${done ? '✅' : '🔘'} ${obj.desc}
              </button>
            `;
          }).join('')}
        </div>
      `;

      setTimeout(() => {
        area.querySelectorAll('.btn-interact-auto').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.objIdx);
            const obj = quest.objectives[idx];
            const target = obj.count || 1;
            const newVal = Math.min(this.currentProgress.objectives[idx].current + 1, target);
            this.currentProgress.objectives[idx].current = newVal;
            player.updateQuestObjective(quest.id, idx, newVal);

            if (newVal >= target) {
              btn.disabled = true;
              btn.innerHTML = `✅ ${obj.desc}`;
              btn.classList.remove('btn-primary');
              btn.classList.add('btn-secondary');
              ui.toast(`✅ ${obj.desc} 完成！`, 'success');
              sensors.vibrate([100, 50, 100]);
            } else if (obj.count) {
              btn.innerHTML = `🔘 ${obj.desc} (${newVal}/${target})`;
            }
            this._updateProgress();
          });
        });
      }, 50);
    }

    // 搖晃任務
    const shakeObj = quest.objectives.find(o => o.type === 'shake');
    if (shakeObj) {
      const shakeIdx = quest.objectives.indexOf(shakeObj);
      const target = shakeObj.count || 10;
      area.innerHTML += `
        <div class="interaction-shake">
          <div class="shake-icon" id="shake-icon">📳</div>
          <p>搖晃手機或點擊下方按鈕！</p>
          <div class="shake-counter">
            <span id="shake-count">${this.currentProgress.objectives[shakeIdx].current}</span> / ${target}
          </div>
          <button class="btn btn-primary btn-lg" id="btn-simulate-shake" style="width:100%;margin-top:8px;font-size:1.2rem">
            👆 點擊充能
          </button>
        </div>
      `;

      const onShake = () => {
        const current = this.currentProgress.objectives[shakeIdx].current + 1;
        this.currentProgress.objectives[shakeIdx].current = current;
        player.updateQuestObjective(quest.id, shakeIdx, current);

        const el = document.getElementById('shake-count');
        if (el) el.textContent = current;
        const icon = document.getElementById('shake-icon');
        if (icon) { icon.classList.add('shake'); setTimeout(() => icon.classList.remove('shake'), 200); }
        sensors.vibrate([30]);

        if (current >= target) {
          ui.toast('✅ 充能完成！', 'success');
          sensors.vibrate([100, 50, 100]);
        }
        this._updateProgress();
      };

      sensors.startShakeDetection(onShake);

      setTimeout(() => {
        const btn = document.getElementById('btn-simulate-shake');
        if (btn) btn.addEventListener('click', onShake);
      }, 50);
    }

    // 拍照任務
    const cameraObj = quest.objectives.find(o =>
      o.type === 'camera_detect' || o.type === 'camera_capture' || o.type === 'photo'
      || o.type === 'detect_object' || o.type === 'detect_color'
    );
    if (cameraObj) {
      const cameraIdx = quest.objectives.indexOf(cameraObj);
      const target = cameraObj.count || 1;
      const current = this.currentProgress.objectives[cameraIdx].current;
      area.innerHTML += `
        <div class="interaction-camera">
          <span class="interaction-icon">📷</span>
          <p style="font-weight:600">拍攝任何畫面即可完成</p>
          <p style="font-size:0.8rem;color:var(--text-secondary)">開啟相機 → 對準任何物體 → 點擊拍攝</p>
          <div class="shake-counter" style="margin:8px 0">
            <span id="camera-count">${current}</span> / ${target}
          </div>
          <button class="btn btn-primary btn-lg" id="btn-open-camera" style="width:100%;font-size:1.1rem" ${current >= target ? 'disabled' : ''}>
            📷 開啟相機拍攝
          </button>
          <button class="btn btn-secondary" id="btn-skip-camera" style="width:100%;margin-top:8px">
            💻 無相機？直接完成
          </button>
          <div id="photo-result" class="photo-result hidden" style="margin-top:8px">
            <img id="captured-photo" alt="captured" style="width:100%;border-radius:8px;">
            <p id="photo-analysis" style="color:var(--accent-green);margin-top:4px"></p>
          </div>
        </div>
      `;

      setTimeout(() => {
        const openBtn = document.getElementById('btn-open-camera');
        const skipBtn = document.getElementById('btn-skip-camera');

        if (openBtn) {
          openBtn.addEventListener('click', async () => {
            const ok = await sensors.startCamera();
            if (ok) {
              ui.showModal('modal-camera');
              document.getElementById('camera-capture').onclick = () => this._handleCapture(quest, cameraIdx);
              document.getElementById('camera-close').onclick = () => {
                sensors.stopCamera();
                ui.hideModal('modal-camera');
              };
            } else {
              // 相機不可用 → 直接完成一次
              this._incrementCameraObjective(quest, cameraIdx);
            }
          });
        }

        if (skipBtn) {
          skipBtn.addEventListener('click', () => {
            this._incrementCameraObjective(quest, cameraIdx);
          });
        }
      }, 50);
    }

    // 音量任務
    const audioObj = quest.objectives.find(o => o.type === 'audio');
    if (audioObj) {
      const audioIdx = quest.objectives.indexOf(audioObj);
      const target = audioObj.count || 1;
      area.innerHTML += `
        <div class="interaction-audio">
          <div class="audio-meter">
            <div class="audio-bar" id="audio-bar" style="height:0%"></div>
          </div>
          <p>🎤 對著麥克風發出聲音</p>
          <p class="audio-db" id="audio-db">0 dB</p>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-primary" id="btn-start-audio" style="flex:1">開始偵測</button>
            <button class="btn btn-secondary" id="btn-skip-audio" style="flex:1">直接完成</button>
          </div>
        </div>
      `;

      setTimeout(() => {
        const btn = document.getElementById('btn-start-audio');
        const skipBtn = document.getElementById('btn-skip-audio');

        if (btn) {
          btn.addEventListener('click', async () => {
            btn.disabled = true;
            btn.textContent = '偵測中...';
            const detector = await sensors.startAudioDetection((db) => {
              const bar = document.getElementById('audio-bar');
              const text = document.getElementById('audio-db');
              if (bar) bar.style.height = `${Math.min(100, db)}%`;
              if (text) text.textContent = `${db} dB`;

              if (db > 50) {
                const newVal = Math.min(this.currentProgress.objectives[audioIdx].current + 1, target);
                this.currentProgress.objectives[audioIdx].current = newVal;
                player.updateQuestObjective(quest.id, audioIdx, newVal);
                this._updateProgress();
                if (newVal >= target) {
                  ui.toast('🎤 聲音偵測完成！', 'success');
                }
              }
            });
            this._sensorCleanup = () => { if (detector) detector.stop(); };
          });
        }

        if (skipBtn) {
          skipBtn.addEventListener('click', () => {
            this.currentProgress.objectives[audioIdx].current = target;
            player.updateQuestObjective(quest.id, audioIdx, target);
            this._updateProgress();
            ui.toast('🎤 聲音偵測完成！', 'success');
          });
        }
      }, 50);
    }

    // 戰鬥目標
    const killObjs = quest.objectives
      .map((o, i) => ({ ...o, idx: i }))
      .filter(o => o.type === 'kill' || o.type === 'kill_any' || o.type === 'kill_type');

    if (killObjs.length > 0) {
      area.innerHTML += `
        <div class="interaction-battle" style="margin-top:8px">
          <button class="btn btn-danger btn-lg" id="btn-encounter" style="width:100%;font-size:1.1rem">⚔️ 搜索敵人戰鬥</button>
        </div>
      `;
      setTimeout(() => {
        const btn = document.getElementById('btn-encounter');
        if (btn) {
          btn.addEventListener('click', () => {
            // Find appropriate monster
            let monsterId = null;
            const killObj = killObjs.find(o => this.currentProgress.objectives[o.idx].current < (o.count || 1));
            if (!killObj) {
              ui.toast('所有戰鬥目標已完成', 'info');
              return;
            }

            if (killObj.type === 'kill') {
              monsterId = killObj.target;
            } else if (killObj.type === 'kill_type') {
              monsterId = battle.getRandomEncounterByType(killObj.target);
            } else {
              monsterId = battle.getRandomEncounter(quest.locationId || 'all');
            }

            if (monsterId) {
              battle.start(monsterId, (won) => {
                if (won) {
                  // Update all applicable kill objectives
                  killObjs.forEach(ko => {
                    if (this.currentProgress.objectives[ko.idx].current >= (ko.count || 1)) return;
                    const monster = battle.lastDefeatedMonster;
                    let match = false;
                    if (ko.type === 'kill' && monster && monster.id === ko.target) match = true;
                    if (ko.type === 'kill_any') match = true;
                    if (ko.type === 'kill_type' && monster && monster.type === ko.target) match = true;

                    if (match) {
                      this.currentProgress.objectives[ko.idx].current++;
                      player.updateQuestObjective(quest.id, ko.idx, this.currentProgress.objectives[ko.idx].current);
                    }
                  });
                  // Return to quest screen
                  setTimeout(() => this.startQuest(quest.id), 500);
                }
              });
            } else {
              // Fallback: random encounter
              battle.start('M01', (won) => {
                if (won) {
                  killObjs.forEach(ko => {
                    if (this.currentProgress.objectives[ko.idx].current < (ko.count || 1)) {
                      this.currentProgress.objectives[ko.idx].current++;
                      player.updateQuestObjective(quest.id, ko.idx, this.currentProgress.objectives[ko.idx].current);
                    }
                  });
                  setTimeout(() => this.startQuest(quest.id), 500);
                }
              });
            }
          });
        }
      }, 50);
    }
  }

  _handleCapture(quest, cameraIdx) {
    const photoData = sensors.capturePhoto();
    if (!photoData) return;

    sensors.stopCamera();
    ui.hideModal('modal-camera');

    // Show result
    const resultDiv = document.getElementById('photo-result');
    const img = document.getElementById('captured-photo');
    const text = document.getElementById('photo-analysis');
    if (resultDiv && img) {
      resultDiv.classList.remove('hidden');
      img.src = photoData;
      if (text) text.textContent = '📷 拍攝成功！畫面已記錄';
    }

    this._incrementCameraObjective(quest, cameraIdx);
  }

  _incrementCameraObjective(quest, cameraIdx) {
    const obj = quest.objectives[cameraIdx];
    const target = obj.count || 1;
    const newVal = Math.min(this.currentProgress.objectives[cameraIdx].current + 1, target);
    this.currentProgress.objectives[cameraIdx].current = newVal;
    player.updateQuestObjective(quest.id, cameraIdx, newVal);

    const countEl = document.getElementById('camera-count');
    if (countEl) countEl.textContent = newVal;

    if (newVal >= target) {
      const openBtn = document.getElementById('btn-open-camera');
      if (openBtn) openBtn.disabled = true;
      ui.toast('📷 拍攝任務完成！', 'success');
      sensors.vibrate([100, 50, 100]);
    } else {
      ui.toast(`📷 已拍攝 ${newVal}/${target}`, 'info');
    }
    this._updateProgress();
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
      if (completedObjs >= total) {
        completeBtn.classList.add('pulse-glow');
      }
    }

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

    // 發放基礎獎勵
    const rewards = { ...quest.rewards };
    if (rewards.gold) player.addGold(rewards.gold);
    if (rewards.light && quest.locationId && quest.locationId !== 'all') {
      player.addLight(quest.locationId, rewards.light);
      gameMap.refreshMarker(quest.locationId);
    }
    if (rewards.items) {
      rewards.items.forEach(item => player.addItem(item.id, item.qty));
    }

    // GPS加成（如果是到場模式）
    if (this.isGpsMode && quest.gpsBonus) {
      const bonus = quest.gpsBonus;
      if (bonus.gold) player.addGold(bonus.gold);
      if (bonus.exp) rewards.exp = (rewards.exp || 0) + bonus.exp;
      if (bonus.light && quest.locationId && quest.locationId !== 'all') {
        player.addLight(quest.locationId, bonus.light);
      }
      rewards._gpsBonus = true;
    }

    player.completeQuest(quest.id);

    // 顯示獎勵
    await ui.showReward(rewards);

    // 經驗值
    if (rewards.exp) {
      const levelUps = player.addExp(rewards.exp);
      for (const lvl of levelUps) {
        await ui.showLevelUp(lvl);
      }
    }

    player.save();
    this.currentQuest = null;
    this.currentProgress = null;

    ui.toast('🎉 任務完成！', 'success');
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

  renderAllLists() {
    this.renderQuestList('main', 'quest-list-main');
    this.renderQuestList('daily', 'quest-list-daily');
    this.renderQuestList('weekly', 'quest-list-weekly');
    this.renderQuestList('special', 'quest-list-special');
  }

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
