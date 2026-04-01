/**
 * 青塘園守護者 - UI 系統
 * 畫面切換、HUD更新、Modal、Toast
 */
import { player } from './player.js';

class UIManager {
  constructor() {
    this.currentScreen = 'screen-splash';
    this.screenHistory = [];
    this._bound = false;
  }

  init() {
    if (this._bound) return;
    this._bound = true;

    // 底部導覽列
    document.querySelectorAll('.nav-item[data-screen]').forEach(btn => {
      btn.addEventListener('click', () => this.showScreen(btn.dataset.screen));
    });

    // 返回按鈕
    document.querySelectorAll('.btn-back[data-back]').forEach(btn => {
      btn.addEventListener('click', () => this.showScreen(btn.dataset.back));
    });

    // Tab 切換
    document.querySelectorAll('.tab-bar').forEach(bar => {
      bar.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
          bar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const parent = bar.parentElement;
          parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          const target = parent.querySelector(`#${tab.dataset.tab}`);
          if (target) target.classList.add('active');
        });
      });
    });

    // 更多選單項目
    document.querySelectorAll('.menu-item[data-screen]').forEach(item => {
      item.addEventListener('click', () => this.showScreen(item.dataset.screen));
    });

    // Modal 關閉
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', () => {
        backdrop.closest('.modal').classList.remove('active');
      });
    });
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
      });
    });

    // 玩家資料更新監聽
    player.on((type) => {
      if (['exp', 'hp', 'gold', 'diamonds', 'inventory', 'animals'].includes(type)) {
        this.updateHUD();
      }
    });
  }

  // ── 畫面切換 ──
  showScreen(screenId) {
    const current = document.querySelector('.screen.active');
    const next = document.getElementById(screenId);
    if (!next || (current && current.id === screenId)) return;

    if (current) {
      this.screenHistory.push(current.id);
      current.classList.remove('active');
    }
    next.classList.add('active');
    this.currentScreen = screenId;

    // 更新底部nav active狀態
    const mainScreens = ['screen-map', 'screen-quest', 'screen-inventory', 'screen-codex', 'screen-settings'];
    if (mainScreens.includes(screenId)) {
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenId);
      });
    }
  }

  goBack() {
    const prev = this.screenHistory.pop();
    if (prev) this.showScreen(prev);
  }

  // ── HUD 更新 ──
  updateHUD() {
    if (!player.data) return;
    const d = player.data;

    // 等級
    this._setText('hud-level', `Lv.${d.level}`);

    // HP
    const hpPct = (d.hp / d.maxHp * 100).toFixed(0);
    this._setBar('hud-hp-fill', hpPct);
    this._setText('hud-hp-text', `${d.hp}/${d.maxHp}`);

    // EXP
    const expPct = (player.getExpProgress() * 100).toFixed(0);
    this._setBar('hud-exp-fill', expPct);
    const next = player.getNextLevelData();
    if (next) {
      const current = player.getCurrentLevelData();
      const expInLevel = d.exp - current.totalExp;
      const expNeeded = next.totalExp - current.totalExp;
      this._setText('hud-exp-text', `${expInLevel}/${expNeeded}`);
    } else {
      this._setText('hud-exp-text', 'MAX');
    }

    // 貨幣
    this._setText('hud-gold', this._formatNumber(d.gold));
    this._setText('hud-diamonds', this._formatNumber(d.diamonds));

    // 商店頁面貨幣
    this._setText('shop-gold', this._formatNumber(d.gold));
    this._setText('shop-diamonds', this._formatNumber(d.diamonds));
  }

  // ── Modal 系統 ──
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }

  // 通用對話框
  dialog(title, body, onConfirm, onCancel) {
    this._setText('dialog-title', title);
    document.getElementById('dialog-body').innerHTML = body;
    this.showModal('modal-dialog');

    const confirmBtn = document.getElementById('dialog-confirm');
    const cancelBtn = document.getElementById('dialog-cancel');

    const cleanup = () => {
      this.hideModal('modal-dialog');
      confirmBtn.replaceWith(confirmBtn.cloneNode(true));
      cancelBtn.replaceWith(cancelBtn.cloneNode(true));
    };

    document.getElementById('dialog-confirm').addEventListener('click', () => {
      cleanup();
      if (onConfirm) onConfirm();
    }, { once: true });

    document.getElementById('dialog-cancel').addEventListener('click', () => {
      cleanup();
      if (onCancel) onCancel();
    }, { once: true });
  }

  // 獎勵彈窗
  showReward(rewards) {
    const container = document.getElementById('reward-items');
    container.innerHTML = '';

    if (rewards.exp) {
      container.innerHTML += `<div class="reward-item"><span class="reward-icon">⭐</span><span>經驗值 +${rewards.exp}</span></div>`;
    }
    if (rewards.gold) {
      container.innerHTML += `<div class="reward-item"><span class="reward-icon">🪙</span><span>金幣 +${rewards.gold}</span></div>`;
    }
    if (rewards.light) {
      container.innerHTML += `<div class="reward-item"><span class="reward-icon">💡</span><span>光明值 +${rewards.light}</span></div>`;
    }
    if (rewards.items) {
      rewards.items.forEach(item => {
        container.innerHTML += `<div class="reward-item"><span class="reward-icon">🎁</span><span>${item.name} x${item.qty}</span></div>`;
      });
    }

    this.showModal('modal-reward');

    return new Promise(resolve => {
      document.getElementById('reward-confirm').addEventListener('click', () => {
        this.hideModal('modal-reward');
        resolve();
      }, { once: true });
    });
  }

  // 升級彈窗
  showLevelUp(levelData) {
    document.getElementById('levelup-level').textContent = `Lv.${levelData.level}`;
    const unlocks = document.getElementById('levelup-unlocks');
    unlocks.innerHTML = `<p class="levelup-title-text">${levelData.title}</p>`;
    if (levelData.unlocks && levelData.unlocks.length) {
      unlocks.innerHTML += levelData.unlocks
        .map(u => `<div class="levelup-unlock-item">🔓 ${u}</div>`)
        .join('');
    }
    this.showModal('modal-levelup');

    return new Promise(resolve => {
      document.getElementById('levelup-confirm').addEventListener('click', () => {
        this.hideModal('modal-levelup');
        resolve();
      }, { once: true });
    });
  }

  // ── Toast 通知 ──
  toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-text">${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('active'));

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ── 載入畫面 ──
  showLoading(text = '載入中...') {
    const overlay = document.getElementById('loading-overlay');
    overlay.querySelector('.loading-text').textContent = text;
    overlay.classList.remove('hidden');
  }

  hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
  }

  // ── 工具方法 ──
  _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  _setBar(id, percent) {
    const el = document.getElementById(id);
    if (el) el.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }

  _formatNumber(n) {
    if (n >= 10000) return (n / 10000).toFixed(1) + '萬';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n.toString();
  }
}

export const ui = new UIManager();
