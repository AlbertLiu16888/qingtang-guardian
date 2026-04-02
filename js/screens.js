/**
 * 青塘園守護者 - 畫面填充模組
 * 背包、圖鑑、商城、排行榜、個人檔案的渲染
 */
import { ANIMALS } from './data/animals.js';
import { MONSTERS } from './data/monsters.js';
import { LOCATIONS } from './data/locations.js';
import { ITEMS, PACKAGES } from './data/items.js';
import { player } from './player.js';
import { ui } from './ui.js';

// ════════════════════════════════
// 背包
// ════════════════════════════════
export function renderInventory() {
  const types = {
    'inventory-grid-items': ['consumable', 'voucher'],
    'inventory-grid-equip': ['equipment', 'decoration'],
    'inventory-grid-materials': ['material'],
  };

  Object.entries(types).forEach(([containerId, itemTypes]) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = player.data.inventory
      .map(inv => {
        const def = ITEMS.find(i => i.id === inv.itemId);
        return def && itemTypes.includes(def.type) ? { ...def, quantity: inv.quantity } : null;
      })
      .filter(Boolean);

    if (items.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>空空如也</p></div>';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="inv-item rarity-${item.rarity}" data-item-id="${item.id}">
        <div class="inv-icon">${getItemIcon(item)}</div>
        <span class="inv-qty">${item.quantity}</span>
        <span class="inv-name">${item.name}</span>
      </div>
    `).join('');

    container.querySelectorAll('.inv-item').forEach(el => {
      el.addEventListener('click', () => showItemDetail(el.dataset.itemId));
    });
  });
}

function getItemIcon(item) {
  const icons = {
    I001: '🌱', I002: '🧪', I003: '🪶', I004: '📜', I005: '📡',
    I006: '💎', I007: '🔮', I008: '🍖', I009: '💠', I010: '🎫',
    I011: '🎟️', I012: '🌟', I013: '🧥', I014: '⚔️', I015: '🛡️',
    I016: '🏅', I017: '✨', I018: '🎫',
  };
  return icons[item.id] || '📦';
}

function showItemDetail(itemId) {
  const item = ITEMS.find(i => i.id === itemId);
  if (!item) return;

  document.getElementById('item-detail-icon').textContent = getItemIcon(item);
  document.getElementById('item-detail-name').textContent = item.name;
  document.getElementById('item-detail-rarity').textContent = item.rarity;
  document.getElementById('item-detail-rarity').className = `item-detail-rarity rarity-${item.rarity}`;
  document.getElementById('item-detail-desc').textContent = item.effect;
  document.getElementById('item-detail-quantity').textContent = player.getItemCount(itemId);

  const useBtn = document.getElementById('item-detail-use');
  useBtn.style.display = item.type === 'consumable' ? 'block' : 'none';
  useBtn.onclick = () => {
    if (item.id === 'I002') {
      const heal = Math.round(player.data.maxHp * 0.5);
      player.heal(heal);
      player.removeItem(itemId, 1);
      ui.toast(`回復 ${heal} HP`, 'success');
    } else if (item.id === 'I001') {
      player.removeItem(itemId, 1);
      ui.toast('光明種子使用成功', 'success');
    } else {
      player.removeItem(itemId, 1);
      ui.toast(`使用了 ${item.name}`, 'info');
    }
    ui.hideModal('modal-item-detail');
    ui.updateHUD();
    renderInventory();
  };

  document.getElementById('item-detail-discard').onclick = () => {
    player.removeItem(itemId, 1);
    ui.hideModal('modal-item-detail');
    renderInventory();
    ui.toast(`丟棄了 ${item.name}`, 'info');
  };

  ui.showModal('modal-item-detail');
}

// ════════════════════════════════
// 圖鑑
// ════════════════════════════════
export function renderCodex() {
  renderCodexAnimals();
  renderCodexMonsters();
  renderCodexLocations();
}

function renderCodexAnimals() {
  const container = document.getElementById('codex-grid-animals');
  if (!container) return;

  container.innerHTML = ANIMALS.map(animal => {
    const unlocked = player.data.codex.animals.includes(animal.id);
    const owned = player.data.animals.includes(animal.id);
    return `
      <div class="codex-card ${unlocked ? '' : 'locked'} ${owned ? 'owned' : ''}" data-id="${animal.id}" data-type="animal">
        <div class="codex-sprite">${unlocked ? (animal.image ? `<img src="${animal.image}" alt="${animal.name}" style="width:100%;height:100%;object-fit:contain;">` : animal.sprite) : '❓'}</div>
        <div class="codex-name">${unlocked ? animal.name : '???'}</div>
        <div class="codex-rarity rarity-${animal.rarity}">${unlocked ? animal.rarity : ''}</div>
        ${owned ? '<div class="codex-badge">擁有</div>' : ''}
      </div>
    `;
  }).join('');

  container.querySelectorAll('.codex-card[data-type="animal"]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (!player.data.codex.animals.includes(id)) return;
      showAnimalDetail(id);
    });
  });
}

function showAnimalDetail(animalId) {
  const animal = ANIMALS.find(a => a.id === animalId);
  if (!animal) return;

  const detailSprite = document.getElementById('animal-detail-sprite');
  if (animal.image) {
    detailSprite.innerHTML = `<img src="${animal.image}" alt="${animal.name}" style="width:100%;height:100%;object-fit:contain;">`;
  } else {
    detailSprite.textContent = animal.sprite;
  }
  document.getElementById('animal-detail-name').textContent = `${animal.name}・${animal.title}`;

  const rarityEl = document.getElementById('animal-detail-rarity');
  const stars = animal.rarity === 'SSR' ? 3 : animal.rarity === 'SR' ? 2 : 1;
  rarityEl.innerHTML = '★'.repeat(stars);
  rarityEl.className = `detail-rarity rarity-${animal.rarity}`;

  document.getElementById('animal-detail-desc').textContent = animal.appearance;

  const statsEl = document.getElementById('animal-detail-stats');
  statsEl.innerHTML = `
    <div class="detail-stat-row"><span>屬性</span><span>${animal.element}</span></div>
    <div class="detail-stat-row"><span>稀有度</span><span>${animal.rarity}</span></div>
    <div class="detail-stat-row"><span>駐守據點</span><span>${animal.locationId}</span></div>
  `;

  const skillsEl = document.getElementById('animal-detail-skills');
  skillsEl.innerHTML = `
    <div class="skill-item">
      <div class="skill-header"><span class="skill-type">被動</span> ${animal.passiveSkill.name}</div>
      <p class="skill-desc">${animal.passiveSkill.desc}</p>
    </div>
    <div class="skill-item">
      <div class="skill-header"><span class="skill-type">主動</span> ${animal.activeSkill.name}</div>
      <p class="skill-desc">${animal.activeSkill.desc} (CD:${animal.activeSkill.cooldown})</p>
    </div>
    <div class="skill-item">
      <div class="skill-header"><span class="skill-type">覺醒</span> ${animal.awakenSkill.name}</div>
      <p class="skill-desc">${animal.awakenSkill.desc}</p>
    </div>
  `;

  const selectBtn = document.getElementById('animal-detail-select');
  const owned = player.data.animals.includes(animalId);
  const isActive = player.data.activeAnimal === animalId;
  selectBtn.textContent = isActive ? '目前夥伴' : owned ? '選為夥伴' : '尚未獲得';
  selectBtn.disabled = !owned || isActive;
  selectBtn.onclick = () => {
    player.setActiveAnimal(animalId);
    ui.hideModal('modal-animal-detail');
    ui.toast(`${animal.name} 成為你的守護夥伴！`, 'success');
    renderCodex();
  };

  ui.showModal('modal-animal-detail');
}

function renderCodexMonsters() {
  const container = document.getElementById('codex-grid-monsters');
  if (!container) return;

  container.innerHTML = MONSTERS.map(m => {
    const unlocked = player.data.codex.monsters.includes(m.id);
    return `
      <div class="codex-card ${unlocked ? '' : 'locked'}">
        <div class="codex-sprite">${unlocked ? (m.image ? `<img src="${m.image}" alt="${m.name}" style="width:100%;height:100%;object-fit:contain;">` : m.sprite) : '❓'}</div>
        <div class="codex-name">${unlocked ? m.name : '???'}</div>
        <div class="codex-type">${unlocked ? m.type : ''}</div>
      </div>
    `;
  }).join('');
}

function renderCodexLocations() {
  const container = document.getElementById('codex-grid-locations');
  if (!container) return;

  container.innerHTML = LOCATIONS.map(loc => {
    const unlocked = player.data.codex.locations.includes(loc.id);
    const light = player.getLight(loc.id);
    const pct = Math.round(light / loc.maxLight * 100);
    return `
      <div class="codex-card ${unlocked ? '' : 'locked'}">
        <div class="codex-sprite">${unlocked ? '📍' : '🔒'}</div>
        <div class="codex-name">${unlocked ? loc.name : '???'}</div>
        ${unlocked ? `<div class="codex-light">💡 ${pct}%</div>` : ''}
      </div>
    `;
  }).join('');
}

// ════════════════════════════════
// 商城
// ════════════════════════════════
export function renderShop() {
  // 道具商城
  const itemsGrid = document.getElementById('shop-grid-items');
  if (itemsGrid) {
    const shopItems = ITEMS.filter(i => (i.goldPrice > 0 || i.diamondPrice > 0) && i.type === 'consumable');
    itemsGrid.innerHTML = shopItems.map(item => `
      <div class="shop-card" data-item-id="${item.id}">
        <div class="shop-icon">${getItemIcon(item)}</div>
        <div class="shop-name">${item.name}</div>
        <div class="shop-desc">${item.effect.slice(0, 30)}</div>
        <div class="shop-price">
          ${item.goldPrice > 0 ? `<span>🪙 ${item.goldPrice}</span>` : ''}
          ${item.diamondPrice > 0 ? `<span>💎 ${item.diamondPrice}</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm shop-buy">購買</button>
      </div>
    `).join('');

    _bindShopBuy(itemsGrid);
  }

  // 裝備商城
  const equipGrid = document.getElementById('shop-grid-equip');
  if (equipGrid) {
    const equipItems = ITEMS.filter(i => (i.goldPrice > 0 || i.diamondPrice > 0) && i.type === 'equipment');
    equipGrid.innerHTML = equipItems.map(item => `
      <div class="shop-card rarity-border-${item.rarity}" data-item-id="${item.id}">
        <div class="shop-icon">${item.rarity === 'SSR' ? '🌟' : item.rarity === 'SR' ? '⚔️' : '🛡️'}</div>
        <div class="shop-name">${item.name}</div>
        <div class="shop-rarity rarity-${item.rarity}">${item.rarity}</div>
        <div class="shop-desc">${item.effect}</div>
        <div class="shop-price">
          ${item.goldPrice > 0 ? `<span>🪙 ${item.goldPrice}</span>` : ''}
          ${item.diamondPrice > 0 ? `<span>💎 ${item.diamondPrice}</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm shop-buy">購買</button>
      </div>
    `).join('');

    if (equipItems.length === 0) {
      equipGrid.innerHTML = '<div class="empty-state"><p>暫無裝備出售</p></div>';
    }

    _bindShopBuy(equipGrid);
  }

  // 禮包
  const bundlesGrid = document.getElementById('shop-grid-bundles');
  if (bundlesGrid) {
    bundlesGrid.innerHTML = PACKAGES.map(pkg => `
      <div class="shop-card shop-bundle">
        <div class="shop-icon">🎁</div>
        <div class="shop-name">${pkg.name}</div>
        <div class="shop-desc">${pkg.description}</div>
        <div class="shop-price"><span class="real-price">${pkg.price}</span></div>
        <button class="btn btn-primary btn-sm shop-buy" data-pkg-id="${pkg.id}">購買</button>
      </div>
    `).join('');

    bundlesGrid.querySelectorAll('.shop-buy').forEach(btn => {
      btn.addEventListener('click', () => {
        ui.dialog('付費購買', '此功能需要串接金流系統（綠界ECPay），目前為展示模式。', () => {
          ui.toast('金流系統開發中', 'info');
        });
      });
    });
  }

  // 鑽石儲值
  const diamondsGrid = document.getElementById('shop-grid-diamonds');
  if (diamondsGrid) {
    const diamondPacks = [
      { name: '小鑽石包', diamonds: 60, price: 'NT$30' },
      { name: '中鑽石包', diamonds: 330, price: 'NT$150' },
      { name: '大鑽石包', diamonds: 700, price: 'NT$300' },
      { name: '超值鑽石包', diamonds: 1500, price: 'NT$590' },
    ];
    diamondsGrid.innerHTML = diamondPacks.map(p => `
      <div class="shop-card shop-diamond">
        <div class="shop-icon">💎</div>
        <div class="shop-name">${p.name}</div>
        <div class="shop-desc">💎 x${p.diamonds}</div>
        <div class="shop-price"><span class="real-price">${p.price}</span></div>
        <button class="btn btn-primary btn-sm">儲值</button>
      </div>
    `).join('');

    diamondsGrid.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', () => {
        ui.dialog('付費儲值', '金流系統（綠界ECPay）開發中，目前為展示模式。', () => {
          ui.toast('金流系統開發中', 'info');
        });
      });
    });
  }
}

function _bindShopBuy(container) {
  container.querySelectorAll('.shop-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.shop-card');
      const itemId = card.dataset.itemId;
      const item = ITEMS.find(i => i.id === itemId);
      if (!item) return;

      if (item.goldPrice > 0 && player.spendGold(item.goldPrice)) {
        player.addItem(itemId, 1);
        ui.toast(`購買了 ${item.name}`, 'success');
        ui.updateHUD();
        renderInventory();
      } else if (item.diamondPrice > 0 && player.spendDiamonds(item.diamondPrice)) {
        player.addItem(itemId, 1);
        ui.toast(`購買了 ${item.name}`, 'success');
        ui.updateHUD();
        renderInventory();
      } else {
        ui.toast('金幣或鑽石不足', 'error');
      }
    });
  });
}

// ════════════════════════════════
// 排行榜（模擬資料）
// ════════════════════════════════
export function renderRanking() {
  const fakeNames = ['光之使者', '暗影獵人', '湖畔守望者', '翠綠騎士', '漣漪法師',
    '飛翼旅者', '蓮華仙子', '夜行者', '彩虹術士', '大地守護'];
  const types = ['rank-list-level', 'rank-list-battle', 'rank-list-codex', 'rank-list-quest'];

  types.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const rankings = fakeNames.map((name, i) => ({
      rank: i + 1,
      name,
      value: Math.floor(Math.random() * 1000) + 500 - i * 40,
      level: 30 - i * 2,
    })).sort((a, b) => b.value - a.value);

    // 插入玩家
    const playerRank = {
      rank: 0,
      name: player.data.name + ' (你)',
      value: containerId.includes('level') ? player.data.level * 100 + player.data.exp :
             containerId.includes('battle') ? player.data.stats.battlesWon :
             containerId.includes('codex') ? player.data.codex.animals.length + player.data.codex.monsters.length :
             player.data.stats.questsCompleted,
      level: player.data.level,
      isPlayer: true,
    };

    rankings.push(playerRank);
    rankings.sort((a, b) => b.value - a.value);
    rankings.forEach((r, i) => r.rank = i + 1);

    container.innerHTML = rankings.map(r => `
      <div class="rank-card ${r.isPlayer ? 'rank-self' : ''}">
        <span class="rank-position ${r.rank <= 3 ? 'rank-top' : ''}">${r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : `#${r.rank}`}</span>
        <div class="rank-info">
          <span class="rank-name">${r.name}</span>
          <span class="rank-level">Lv.${r.level}</span>
        </div>
        <span class="rank-value">${r.value}</span>
      </div>
    `).join('');
  });
}

// ════════════════════════════════
// 個人檔案
// ════════════════════════════════
export function renderProfile() {
  const d = player.data;

  document.getElementById('profile-name').textContent = d.name;
  document.getElementById('profile-title').textContent = d.title;
  document.getElementById('profile-level').textContent = `Lv.${d.level}`;
  document.getElementById('stat-quests').textContent = d.stats.questsCompleted;
  document.getElementById('stat-battles').textContent = d.stats.battlesWon;
  document.getElementById('stat-animals').textContent = d.stats.animalsCollected;
  document.getElementById('stat-steps').textContent = d.stats.totalSteps.toLocaleString();

  // 動物隊伍
  const teamEl = document.getElementById('profile-animal-team');
  if (teamEl) {
    teamEl.innerHTML = d.animals.map(id => {
      const animal = ANIMALS.find(a => a.id === id);
      if (!animal) return '';
      const isActive = d.activeAnimal === id;
      return `
        <div class="team-animal ${isActive ? 'active' : ''}">
          <span class="team-sprite">${animal.image ? `<img src="${animal.image}" alt="${animal.name}" style="width:100%;height:100%;object-fit:contain;">` : animal.sprite}</span>
          <span class="team-name">${animal.name}</span>
          ${isActive ? '<span class="team-badge">主力</span>' : ''}
        </div>
      `;
    }).join('');
  }

  // 成就
  const achEl = document.getElementById('profile-achievements');
  if (achEl) {
    const achievements = [
      { icon: '🏃', name: '初心冒險者', done: true },
      { icon: '⚔️', name: '首勝之戰', done: d.stats.battlesWon >= 1 },
      { icon: '🐾', name: '動物朋友', done: d.stats.animalsCollected >= 3 },
      { icon: '📜', name: '任務達人', done: d.stats.questsCompleted >= 10 },
      { icon: '🏆', name: '百戰勇者', done: d.stats.battlesWon >= 100 },
      { icon: '💡', name: '光明使者', done: player.getTotalLight() >= 5000 },
      { icon: '👑', name: '青塘之主', done: d.level >= 30 },
      { icon: '📅', name: '七日守護', done: d.stats.loginDays >= 7 },
    ];

    achEl.innerHTML = achievements.map(a => `
      <div class="achievement ${a.done ? 'unlocked' : 'locked'}">
        <span class="achievement-icon">${a.done ? a.icon : '🔒'}</span>
        <span class="achievement-name">${a.name}</span>
      </div>
    `).join('');
  }
}
