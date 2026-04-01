/**
 * 青塘園守護者 - 戰鬥系統
 * 回合制戰鬥、技能、道具使用、掉落物
 */
import { MONSTERS } from './data/monsters.js';
import { ANIMALS } from './data/animals.js';
import { player } from './player.js';
import { ui } from './ui.js';

class BattleManager {
  constructor() {
    this.active = false;
    this.enemy = null;
    this.enemyHp = 0;
    this.enemyMaxHp = 0;
    this.animal = null;
    this.animalHp = 0;
    this.animalMaxHp = 0;
    this.turn = 'player';
    this.skillCooldown = 0;
    this.log = [];
    this._onEndCallback = null;
  }

  // ── 開始戰鬥 ──
  start(monsterId, onEnd) {
    const monsterDef = MONSTERS.find(m => m.id === monsterId);
    if (!monsterDef) return;

    this._onEndCallback = onEnd;
    this.active = true;

    // 怪物初始化（根據等級範圍隨機）
    const level = Math.floor(
      Math.random() * (monsterDef.levelRange[1] - monsterDef.levelRange[0] + 1)
    ) + monsterDef.levelRange[0];
    const scale = 1 + (level - monsterDef.levelRange[0]) * 0.1;

    this.enemy = {
      ...monsterDef,
      level,
      currentHp: Math.round(monsterDef.hp * scale),
      maxHp: Math.round(monsterDef.hp * scale),
      currentAtk: Math.round(monsterDef.attack * scale),
      currentDef: Math.round((monsterDef.defense || 0) * scale),
    };
    this.enemyHp = this.enemy.currentHp;
    this.enemyMaxHp = this.enemy.maxHp;

    // 動物夥伴初始化
    const animalDef = ANIMALS.find(a => a.id === player.data.activeAnimal);
    const pStats = player.getCurrentLevelData().stats;
    this.animalMaxHp = pStats.hp;
    this.animalHp = player.data.hp;
    this.animal = animalDef;
    this.skillCooldown = 0;
    this.turn = 'player';
    this.log = [];

    // 更新戰鬥UI
    this._updateBattleUI();
    this._addLog(`遭遇了 ${this.enemy.name} (Lv.${this.enemy.level})！`);
    this._addLog(`${this.animal ? this.animal.name : '守護者'}，準備戰鬥！`);

    // 顯示戰鬥畫面
    ui.showScreen('screen-battle');
    this._bindActions();

    // 解鎖怪物圖鑑
    player.unlockCodex('monsters', monsterId);
  }

  // ── 綁定戰鬥按鈕 ──
  _bindActions() {
    const actions = document.querySelector('.battle-actions');
    // 清除舊的事件
    const clone = actions.cloneNode(true);
    actions.parentNode.replaceChild(clone, actions);

    clone.querySelector('[data-action="attack"]').addEventListener('click', () => this.playerAttack());
    clone.querySelector('[data-action="skill"]').addEventListener('click', () => this.playerSkill());
    clone.querySelector('[data-action="item"]').addEventListener('click', () => this.playerItem());
    clone.querySelector('[data-action="flee"]').addEventListener('click', () => this.playerFlee());
  }

  // ── 玩家行動 ──
  playerAttack() {
    if (this.turn !== 'player' || !this.active) return;

    const atk = player.data.atk + (this.animal ? 5 : 0);
    const def = this.enemy.currentDef;
    const damage = Math.max(1, atk - def + Math.floor(Math.random() * 5));

    this.enemyHp = Math.max(0, this.enemyHp - damage);
    this._addLog(`⚔️ 攻擊！造成 ${damage} 點傷害`);
    this._shakeEnemy();
    this._showDamageNumber(damage, 'enemy');

    if (this.enemyHp <= 0) {
      this._victory();
      return;
    }

    this.skillCooldown = Math.max(0, this.skillCooldown - 1);
    this._endPlayerTurn();
  }

  playerSkill() {
    if (this.turn !== 'player' || !this.active) return;
    if (!this.animal) {
      ui.toast('沒有守護動物！', 'warning');
      return;
    }
    if (this.skillCooldown > 0) {
      ui.toast(`技能冷卻中 (${this.skillCooldown}回合)`, 'warning');
      return;
    }

    const skill = this.animal.activeSkill;
    let damage = 0;

    // 根據技能類型產生效果
    if (skill.desc.includes('傷害') || skill.desc.includes('攻擊')) {
      damage = Math.round(player.data.atk * 2.5);
      this.enemyHp = Math.max(0, this.enemyHp - damage);
      this._addLog(`✨ ${skill.name}！造成 ${damage} 點傷害`);
      this._shakeEnemy();
      this._showDamageNumber(damage, 'enemy');
    } else if (skill.desc.includes('回復') || skill.desc.includes('治癒')) {
      const heal = Math.round(this.animalMaxHp * 0.3);
      this.animalHp = Math.min(this.animalMaxHp, this.animalHp + heal);
      player.data.hp = this.animalHp;
      this._addLog(`💚 ${skill.name}！回復 ${heal} HP`);
    } else if (skill.desc.includes('防禦') || skill.desc.includes('護盾')) {
      this._addLog(`🛡️ ${skill.name}！防禦提升`);
      player.data.def += 5; // 暫時提升
    } else {
      // 預設為攻擊型
      damage = Math.round(player.data.atk * 2);
      this.enemyHp = Math.max(0, this.enemyHp - damage);
      this._addLog(`✨ ${skill.name}！造成 ${damage} 點傷害`);
      this._shakeEnemy();
    }

    this.skillCooldown = this.animal.activeSkill.cooldown || 3;

    if (this.enemyHp <= 0) {
      this._victory();
      return;
    }

    this._endPlayerTurn();
  }

  playerItem() {
    if (this.turn !== 'player' || !this.active) return;

    // 檢查是否有藥水
    const potionCount = player.getItemCount('I002');
    if (potionCount <= 0) {
      ui.toast('沒有可使用的道具', 'warning');
      return;
    }

    const heal = Math.round(this.animalMaxHp * 0.5);
    this.animalHp = Math.min(this.animalMaxHp, this.animalHp + heal);
    player.data.hp = this.animalHp;
    player.removeItem('I002', 1);

    this._addLog(`🧪 使用聖光藥水！回復 ${heal} HP`);
    this._endPlayerTurn();
  }

  playerFlee() {
    if (this.turn !== 'player' || !this.active) return;

    const chance = this.enemy.type === 'boss' ? 0.2 : 0.6;
    if (Math.random() < chance) {
      this._addLog('💨 成功逃跑了！');
      this._endBattle(false, 'fled');
    } else {
      this._addLog('💨 逃跑失敗！');
      this._endPlayerTurn();
    }
  }

  // ── 敵人回合 ──
  _enemyTurn() {
    if (!this.active) return;
    this.turn = 'enemy';
    this._updateTurnIndicator();
    this._setActionsEnabled(false);

    setTimeout(() => {
      // 隨機選擇技能或普攻
      const useSkill = this.enemy.skills && this.enemy.skills.length > 0 && Math.random() < 0.3;

      let damage;
      if (useSkill) {
        const skill = this.enemy.skills[Math.floor(Math.random() * this.enemy.skills.length)];
        damage = Math.max(1, Math.round(this.enemy.currentAtk * 1.5) - player.data.def);
        this._addLog(`🔥 ${this.enemy.name} 使用了 ${skill.name}！造成 ${damage} 點傷害`);
      } else {
        damage = Math.max(1, this.enemy.currentAtk - player.data.def + Math.floor(Math.random() * 3));
        this._addLog(`👊 ${this.enemy.name} 攻擊！造成 ${damage} 點傷害`);
      }

      this.animalHp = Math.max(0, this.animalHp - damage);
      player.data.hp = this.animalHp;
      this._shakePlayer();
      this._showDamageNumber(damage, 'player');

      if (this.animalHp <= 0) {
        this._defeat();
        return;
      }

      this._updateBattleUI();
      this.turn = 'player';
      this._updateTurnIndicator();
      this._setActionsEnabled(true);
    }, 1200);
  }

  _endPlayerTurn() {
    this._updateBattleUI();
    this._enemyTurn();
  }

  // ── 戰鬥結果 ──
  _victory() {
    this._addLog(`🎉 擊敗了 ${this.enemy.name}！`);
    this._updateBattleUI();

    player.data.stats.battlesWon++;
    player.data.stats.monstersDefeated++;
    if (this.enemy.type === 'boss' || this.enemy.type === 'worldboss') {
      player.data.stats.bossesDefeated++;
    }

    // 計算獎勵
    const expReward = this.enemy.level * 20 + (this.enemy.type === 'boss' ? 200 : 50);
    const goldReward = this.enemy.level * 10 + Math.floor(Math.random() * 50);

    // 掉落物
    const drops = [];
    if (this.enemy.drops) {
      this.enemy.drops.forEach(drop => {
        if (Math.random() < (drop.chance || 0.5)) {
          drops.push({ name: drop.name, qty: drop.quantity || 1, id: drop.itemId });
        }
      });
    }

    setTimeout(async () => {
      const rewards = {
        exp: expReward,
        gold: goldReward,
        items: drops,
      };

      const levelUps = player.addExp(expReward);
      player.addGold(goldReward);
      drops.forEach(d => { if (d.id) player.addItem(d.id, d.qty); });

      await ui.showReward(rewards);

      for (const lvl of levelUps) {
        await ui.showLevelUp(lvl);
      }

      this._endBattle(true, 'victory');
    }, 1000);
  }

  _defeat() {
    this._addLog('💀 守護者倒下了...');
    this._updateBattleUI();

    setTimeout(() => {
      // 復活但扣金幣
      const penalty = Math.min(player.data.gold, 50);
      player.data.gold -= penalty;
      player.data.hp = Math.round(player.data.maxHp * 0.3);
      player.save();

      ui.toast(`守護者倒下了，損失 ${penalty} 金幣`, 'error');
      this._endBattle(false, 'defeat');
    }, 1500);
  }

  _endBattle(won, reason) {
    this.active = false;
    player.save();

    setTimeout(() => {
      ui.showScreen('screen-map');
      if (this._onEndCallback) {
        this._onEndCallback(won, reason);
      }
    }, 500);
  }

  // ── UI 更新 ──
  _updateBattleUI() {
    // 敵人
    const el = (id) => document.getElementById(id);
    el('enemy-name').textContent = this.enemy.name;
    el('enemy-level').textContent = `Lv.${this.enemy.level}`;
    if (this.enemy.image) {
      el('enemy-sprite').innerHTML = `<img src="${this.enemy.image}" alt="${this.enemy.name}" style="width:100%;height:100%;object-fit:contain;">`;
    } else {
      el('enemy-sprite').textContent = this.enemy.sprite;
    }
    el('enemy-hp-fill').style.width = `${(this.enemyHp / this.enemyMaxHp * 100)}%`;

    // 玩家動物
    if (this.animal) {
      if (this.animal.image) {
        el('player-animal-sprite').innerHTML = `<img src="${this.animal.image}" alt="${this.animal.name}" style="width:100%;height:100%;object-fit:contain;">`;
      } else {
        el('player-animal-sprite').textContent = this.animal.sprite;
      }
      el('player-animal-name').textContent = this.animal.name;
    }
    el('player-animal-hp-fill').style.width = `${(this.animalHp / this.animalMaxHp * 100)}%`;
    el('player-animal-hp-text').textContent = `${this.animalHp}/${this.animalMaxHp}`;

    // 戰鬥日誌
    const logEl = el('battle-log');
    logEl.innerHTML = this.log.map(l => `<p>${l}</p>`).join('');
    logEl.scrollTop = logEl.scrollHeight;

    // 技能按鈕冷卻顯示
    const skillBtn = document.querySelector('[data-action="skill"]');
    if (skillBtn) {
      skillBtn.textContent = this.skillCooldown > 0
        ? `✨ 技能 (${this.skillCooldown})`
        : '✨ 技能';
    }
  }

  _updateTurnIndicator() {
    const el = document.getElementById('battle-turn');
    el.textContent = this.turn === 'player' ? '你的回合' : '敵人回合';
    el.className = `battle-turn ${this.turn === 'enemy' ? 'enemy-turn' : ''}`;
  }

  _setActionsEnabled(enabled) {
    document.querySelectorAll('.battle-actions .btn').forEach(btn => {
      btn.disabled = !enabled;
    });
  }

  _addLog(text) {
    this.log.push(text);
    if (this.log.length > 20) this.log.shift();
  }

  _shakeEnemy() {
    const sprite = document.getElementById('enemy-sprite');
    sprite.classList.add('shake');
    setTimeout(() => sprite.classList.remove('shake'), 500);
  }

  _shakePlayer() {
    const sprite = document.getElementById('player-animal-sprite');
    sprite.classList.add('shake');
    setTimeout(() => sprite.classList.remove('shake'), 500);
  }

  _showDamageNumber(damage, target) {
    const container = target === 'enemy'
      ? document.querySelector('.battle-enemy')
      : document.querySelector('.battle-player');
    if (!container) return;

    const dmgEl = document.createElement('div');
    dmgEl.className = 'damage-number';
    dmgEl.textContent = `-${damage}`;
    container.appendChild(dmgEl);
    setTimeout(() => dmgEl.remove(), 1000);
  }

  // ── 隨機遭遇 ──
  getRandomEncounter(locationId) {
    const locationMonsters = MONSTERS.filter(m =>
      (m.locationId === locationId || m.locationId === 'all') &&
      m.type !== 'worldboss' && m.type !== 'hidden' &&
      player.data.level >= m.levelRange[0]
    );
    if (locationMonsters.length === 0) return null;

    // 遭遇率：小怪60%、精英25%、Boss 15%
    const roll = Math.random();
    let pool;
    if (roll < 0.6) {
      pool = locationMonsters.filter(m => m.type === 'minion');
    } else if (roll < 0.85) {
      pool = locationMonsters.filter(m => m.type === 'elite');
    } else {
      pool = locationMonsters.filter(m => m.type === 'boss');
    }
    if (pool.length === 0) pool = locationMonsters;

    return pool[Math.floor(Math.random() * pool.length)].id;
  }
}

export const battle = new BattleManager();
