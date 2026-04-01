/**
 * 青塘園守護者 - 地圖系統
 * Leaflet地圖、GPS定位、地理圍欄、據點互動
 */
import { LOCATIONS } from './data/locations.js';
import { SHOPS } from './data/shops.js';
import { player, haversine } from './player.js';
import { ui } from './ui.js';

const PARK_CENTER = [25.00556, 121.20610];
const DEFAULT_ZOOM = 17;

// 據點類型對應圖標
const TYPE_ICONS = {
  core: { emoji: '🏛️', color: '#ffd700' },
  function: { emoji: '🏠', color: '#22c55e' },
  explore: { emoji: '🔍', color: '#00f2fe' },
  activity: { emoji: '⚔️', color: '#ff6b35' },
  route: { emoji: '🚶', color: '#a855f7' },
  special: { emoji: '✨', color: '#ff69b4' },
  shop: { emoji: '🏪', color: '#f59e0b' },
};

class MapManager {
  constructor() {
    this.map = null;
    this.markers = {};
    this.playerMarker = null;
    this.playerCircle = null;
    this.watchId = null;
    this.nearbyLocation = null;
    this._onEnterCallbacks = [];
    this._onLeaveCallbacks = [];
  }

  init() {
    // 初始化 Leaflet 地圖
    this.map = L.map('map-container', {
      center: PARK_CENTER,
      zoom: DEFAULT_ZOOM,
      maxZoom: 19,
      minZoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    // 使用 OpenStreetMap 暗色風格
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // 添加園區範圍圓圈
    L.circle(PARK_CENTER, {
      radius: 250,
      color: '#00f2fe',
      fillColor: '#00f2fe',
      fillOpacity: 0.03,
      weight: 1,
      dashArray: '5,10',
    }).addTo(this.map);

    // 添加據點標記
    this._addLocationMarkers();
    this._addShopMarkers();

    // 添加玩家標記
    this._createPlayerMarker();

    // 開始 GPS 追蹤
    this.startTracking();

    // 地圖尺寸修正
    setTimeout(() => this.map.invalidateSize(), 100);
  }

  _addLocationMarkers() {
    LOCATIONS.forEach(loc => {
      const typeInfo = TYPE_ICONS[loc.type] || TYPE_ICONS.explore;
      const isUnlocked = player.data.level >= loc.unlockLevel;
      const light = player.getLight(loc.id);
      const lightPct = Math.round(light / loc.maxLight * 100);

      // 自定義圖標
      const icon = L.divIcon({
        className: 'map-marker-container',
        html: `
          <div class="map-marker ${isUnlocked ? '' : 'locked'}" style="--marker-color: ${typeInfo.color}">
            <div class="marker-icon">${isUnlocked ? typeInfo.emoji : '🔒'}</div>
            <div class="marker-light-ring" style="--light-pct: ${lightPct}%"></div>
          </div>
          <div class="marker-label">${isUnlocked ? loc.name : '???'}</div>
        `,
        iconSize: [60, 70],
        iconAnchor: [30, 70],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(this.map);
      marker.on('click', () => this._onLocationClick(loc));

      // 地理圍欄圓圈
      L.circle([loc.lat, loc.lng], {
        radius: loc.radius,
        color: isUnlocked ? typeInfo.color : '#333',
        fillColor: isUnlocked ? typeInfo.color : '#333',
        fillOpacity: isUnlocked ? 0.08 : 0.03,
        weight: 1,
      }).addTo(this.map);

      this.markers[loc.id] = marker;
    });
  }

  _addShopMarkers() {
    SHOPS.forEach(shop => {
      const icon = L.divIcon({
        className: 'map-marker-container',
        html: `
          <div class="map-marker" style="--marker-color: ${TYPE_ICONS.shop.color}">
            <div class="marker-icon">🏪</div>
          </div>
          <div class="marker-label marker-label-shop">${shop.name}</div>
        `,
        iconSize: [50, 60],
        iconAnchor: [25, 60],
      });

      L.marker([shop.lat, shop.lng], { icon }).addTo(this.map);
    });
  }

  _createPlayerMarker() {
    const icon = L.divIcon({
      className: 'player-marker-container',
      html: `
        <div class="player-marker">
          <div class="player-pulse"></div>
          <div class="player-dot">🧙</div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    this.playerMarker = L.marker(PARK_CENTER, { icon, zIndexOffset: 1000 }).addTo(this.map);
    this.playerCircle = L.circle(PARK_CENTER, {
      radius: 15,
      color: '#00f2fe',
      fillColor: '#00f2fe',
      fillOpacity: 0.15,
      weight: 2,
    }).addTo(this.map);
  }

  // ── GPS 追蹤 ──
  startTracking() {
    if (!navigator.geolocation) {
      ui.toast('您的裝置不支援GPS定位', 'error');
      return;
    }

    // 先取得一次位置
    navigator.geolocation.getCurrentPosition(
      pos => this._updatePosition(pos),
      err => {
        console.warn('[Map] GPS error:', err);
        ui.toast('無法取得定位，使用模擬位置', 'warning');
        this._simulatePosition();
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );

    // 持續追蹤
    this.watchId = navigator.geolocation.watchPosition(
      pos => this._updatePosition(pos),
      err => console.warn('[Map] Watch error:', err),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    );
  }

  _updatePosition(pos) {
    const { latitude: lat, longitude: lng } = pos.coords;

    // 更新玩家標記
    this.playerMarker.setLatLng([lat, lng]);
    this.playerCircle.setLatLng([lat, lng]);

    // 更新玩家資料
    player.updatePosition(lat, lng);

    // 檢查地理圍欄
    this._checkGeofences(lat, lng);
  }

  _simulatePosition() {
    // 開發用：模擬在青塘園中心
    const lat = PARK_CENTER[0] + (Math.random() - 0.5) * 0.0005;
    const lng = PARK_CENTER[1] + (Math.random() - 0.5) * 0.0005;
    this.playerMarker.setLatLng([lat, lng]);
    this.playerCircle.setLatLng([lat, lng]);
    player.updatePosition(lat, lng);
    this._checkGeofences(lat, lng);
  }

  // ── 地理圍欄 ──
  _checkGeofences(lat, lng) {
    let closest = null;
    let closestDist = Infinity;

    LOCATIONS.forEach(loc => {
      if (player.data.level < loc.unlockLevel) return;
      const dist = haversine(lat, lng, loc.lat, loc.lng);
      if (dist < loc.radius && dist < closestDist) {
        closest = loc;
        closestDist = dist;
      }
    });

    if (closest && (!this.nearbyLocation || this.nearbyLocation.id !== closest.id)) {
      // 進入新據點
      this.nearbyLocation = closest;
      this._onEnterCallbacks.forEach(fn => fn(closest, closestDist));
      ui.toast(`📍 進入 ${closest.name}`, 'info');
    } else if (!closest && this.nearbyLocation) {
      // 離開據點
      const left = this.nearbyLocation;
      this.nearbyLocation = null;
      this._onLeaveCallbacks.forEach(fn => fn(left));
    }
  }

  // ── 據點點擊 ──
  _onLocationClick(loc) {
    const isUnlocked = player.data.level >= loc.unlockLevel;
    const light = player.getLight(loc.id);
    const lightPct = Math.round(light / loc.maxLight * 100);
    const dist = player.data.lat
      ? haversine(player.data.lat, player.data.lng, loc.lat, loc.lng).toFixed(0)
      : '---';

    document.getElementById('location-detail-name').textContent =
      isUnlocked ? `${loc.name}` : '??? 未解鎖';
    document.getElementById('location-detail-desc').textContent =
      isUnlocked ? loc.description : `需要等級 ${loc.unlockLevel} 才能探索`;

    const info = document.getElementById('location-detail-info');
    info.innerHTML = isUnlocked ? `
      <div class="location-info-row">
        <span>📍 實際地點</span><span>${loc.realName}</span>
      </div>
      <div class="location-info-row">
        <span>📏 距離</span><span>${dist}m</span>
      </div>
      <div class="location-info-row">
        <span>💡 光明值</span>
        <span>${light}/${loc.maxLight} (${lightPct}%)</span>
      </div>
      <div class="location-info-row">
        <span>🐾 守護動物</span>
        <span>${loc.guardian || '無'}</span>
      </div>
      <div class="location-light-bar">
        <div class="bar bar-light">
          <div class="bar-fill" style="width:${lightPct}%;background:linear-gradient(90deg,#ffd700,#ff6b35)"></div>
        </div>
      </div>
    ` : `<p class="locked-text">🔒 需要 Lv.${loc.unlockLevel} 解鎖</p>`;

    const navBtn = document.getElementById('location-detail-navigate');
    navBtn.textContent = isUnlocked ? '前往探索' : '尚未解鎖';
    navBtn.disabled = !isUnlocked;
    navBtn.onclick = () => {
      ui.hideModal('modal-location-detail');
      this.map.flyTo([loc.lat, loc.lng], 18);
    };

    ui.showModal('modal-location-detail');
  }

  // ── 更新據點標記 ──
  refreshMarker(locationId) {
    const loc = LOCATIONS.find(l => l.id === locationId);
    if (!loc || !this.markers[locationId]) return;
    // 簡化：重新建立marker太複雜，只更新光明值顯示
    const light = player.getLight(locationId);
    const lightPct = Math.round(light / loc.maxLight * 100);
    const markerEl = this.markers[locationId].getElement();
    if (markerEl) {
      const ring = markerEl.querySelector('.marker-light-ring');
      if (ring) ring.style.setProperty('--light-pct', `${lightPct}%`);
    }
  }

  // ── 事件回呼 ──
  onEnterLocation(callback) {
    this._onEnterCallbacks.push(callback);
  }

  onLeaveLocation(callback) {
    this._onLeaveCallbacks.push(callback);
  }

  // ── 公開方法 ──
  centerOnPlayer() {
    if (player.data.lat && player.data.lng) {
      this.map.flyTo([player.data.lat, player.data.lng], 18);
    }
  }

  centerOnPark() {
    this.map.flyTo(PARK_CENTER, DEFAULT_ZOOM);
  }

  getDistanceTo(lat, lng) {
    if (!player.data.lat) return Infinity;
    return haversine(player.data.lat, player.data.lng, lat, lng);
  }

  // 開發用：模擬走到特定據點
  devTeleport(locationId) {
    const loc = LOCATIONS.find(l => l.id === locationId);
    if (!loc) return;
    this._updatePosition({
      coords: { latitude: loc.lat, longitude: loc.lng }
    });
    this.map.flyTo([loc.lat, loc.lng], 18);
  }
}

export const gameMap = new MapManager();
