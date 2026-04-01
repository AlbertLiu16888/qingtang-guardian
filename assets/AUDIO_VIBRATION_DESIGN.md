# 青塘園守護者 — 音效/音樂/震動回饋設計

## 資料夾結構

```
assets/
├── audio/
│   ├── bgm/          # 背景音樂 (Background Music)
│   ├── sfx/          # 音效 (Sound Effects)
│   └── ambient/      # 環境音 (Ambient Sounds)
```

---

## 1. 背景音樂 (BGM) — `assets/audio/bgm/`

| 檔名 | 場景 | 風格描述 | 長度 | Loop |
|------|------|---------|------|------|
| `bgm_title.mp3` | 啟動/標題畫面 | 神秘空靈、鋼琴+弦樂、漸入、帶有希望感 | 60s | ✅ |
| `bgm_story.mp3` | 故事序章 | 敘事感、緩慢弦樂、逐漸緊張、暗影入侵的不安 | 90s | ❌ |
| `bgm_map.mp3` | 地圖探索 | 輕快冒險風、木笛+吉他、自然元素、悠閒探索 | 120s | ✅ |
| `bgm_battle_normal.mp3` | 一般戰鬥 | 緊湊節奏、打擊樂+電子音、中等緊張度 | 90s | ✅ |
| `bgm_battle_boss.mp3` | Boss 戰鬥 | 史詩感、管弦樂+合唱、高緊張度、壓迫感 | 120s | ✅ |
| `bgm_battle_hidden.mp3` | 隱藏 Boss | 詭異+史詩、低音銅管+不協和弦、極高壓迫 | 120s | ✅ |
| `bgm_victory.mp3` | 勝利結算 | 歡快凱旋、銅管+鈴鼓、成就感 | 15s | ❌ |
| `bgm_defeat.mp3` | 戰敗 | 低沉哀傷、大提琴+鋼琴、但尾段帶希望 | 10s | ❌ |
| `bgm_shop.mp3` | 商店介面 | 輕鬆愉快、木琴+手鼓、商業感 | 60s | ✅ |
| `bgm_night.mp3` | 夜間探索 | 安靜神秘、環境音+輕微鋼琴、蟲鳴蛙叫元素 | 120s | ✅ |

---

## 2. 音效 (SFX) — `assets/audio/sfx/`

### 戰鬥音效

| 檔名 | 觸發場景 | 描述 | 長度 |
|------|---------|------|------|
| `sfx_attack.mp3` | 玩家普通攻擊 | 短促斬擊聲、清脆金屬碰撞 | 0.3s |
| `sfx_attack_hit.mp3` | 攻擊命中 | 打擊肉感+輕微回音 | 0.4s |
| `sfx_skill_cast.mp3` | 技能施放 | 魔法蓄力+釋放、光效音 | 0.8s |
| `sfx_skill_fire.mp3` | 火系技能命中 | 火焰爆裂聲 | 0.5s |
| `sfx_skill_water.mp3` | 水系技能命中 | 水流衝擊/濺射聲 | 0.5s |
| `sfx_skill_wind.mp3` | 風系技能命中 | 風暴呼嘯聲 | 0.5s |
| `sfx_skill_earth.mp3` | 地系技能命中 | 碎石/地震聲 | 0.5s |
| `sfx_heal.mp3` | 治療/回復 | 溫暖光效+叮鈴聲 | 0.6s |
| `sfx_critical.mp3` | 暴擊 | 強烈衝擊+閃光音效 | 0.5s |
| `sfx_miss.mp3` | 攻擊未命中 | 空氣切割聲 | 0.3s |
| `sfx_enemy_attack.mp3` | 敵人攻擊 | 陰沉打擊聲+暗影音效 | 0.4s |
| `sfx_enemy_skill.mp3` | 敵人技能 | 暗影能量爆發聲 | 0.6s |
| `sfx_flee_success.mp3` | 逃跑成功 | 快速腳步+風聲 | 0.5s |
| `sfx_flee_fail.mp3` | 逃跑失敗 | 被抓住的頓挫聲 | 0.4s |
| `sfx_battle_start.mp3` | 戰鬥開始 | 警告音+劍拔弩張的緊張音 | 1.0s |

### 系統/UI 音效

| 檔名 | 觸發場景 | 描述 | 長度 |
|------|---------|------|------|
| `sfx_button_tap.mp3` | 一般按鈕點擊 | 柔和按鍵聲 | 0.1s |
| `sfx_button_confirm.mp3` | 確認按鈕 | 明確的確認音 | 0.2s |
| `sfx_button_cancel.mp3` | 取消按鈕 | 退回音效 | 0.2s |
| `sfx_tab_switch.mp3` | 切換分頁 | 輕柔滑動音 | 0.15s |
| `sfx_screen_open.mp3` | 打開新畫面 | 展開/滑入音效 | 0.3s |
| `sfx_screen_close.mp3` | 關閉畫面 | 收合音效 | 0.2s |
| `sfx_toast.mp3` | Toast 通知彈出 | 輕提示音 | 0.2s |
| `sfx_error.mp3` | 操作錯誤 | 短促低音警告 | 0.3s |

### 遊戲進展音效

| 檔名 | 觸發場景 | 描述 | 長度 |
|------|---------|------|------|
| `sfx_levelup.mp3` | 升級 | 華麗的升級音效、漸強的銅管+光效音 | 2.0s |
| `sfx_quest_accept.mp3` | 接受任務 | 羊皮紙展開+印章蓋下 | 0.5s |
| `sfx_quest_complete.mp3` | 完成任務 | 成就感的旋律+叮鈴 | 1.5s |
| `sfx_reward_get.mp3` | 獲得獎勵 | 金幣落袋+閃光音 | 0.8s |
| `sfx_gold_gain.mp3` | 獲得金幣 | 金幣叮噹聲 | 0.3s |
| `sfx_diamond_gain.mp3` | 獲得鑽石 | 水晶共鳴聲 | 0.4s |
| `sfx_item_use.mp3` | 使用道具 | 瓶子開啟+魔法生效音 | 0.5s |
| `sfx_item_get.mp3` | 獲得道具 | 物品入手的清脆音 | 0.3s |
| `sfx_equip.mp3` | 裝備道具 | 金屬扣合音 | 0.3s |

### 動物/收集音效

| 檔名 | 觸發場景 | 描述 | 長度 |
|------|---------|------|------|
| `sfx_animal_capture.mp3` | 捕獲動物 | 光芒收納+可愛叫聲 | 1.2s |
| `sfx_animal_evolve.mp3` | 動物進化 | 能量聚集+蛻變+閃光爆發 | 2.0s |
| `sfx_codex_unlock.mp3` | 圖鑑解鎖 | 書頁翻開+印記浮現 | 0.8s |

### 感測器互動音效

| 檔名 | 觸發場景 | 描述 | 長度 |
|------|---------|------|------|
| `sfx_gps_arrive.mp3` | 到達目標地點 | 定位完成的叮咚提示 | 0.5s |
| `sfx_gps_nearby.mp3` | 接近目標 | 漸強的脈衝提示音 | 0.3s |
| `sfx_shake_detect.mp3` | 搖晃偵測成功 | 能量釋放的震盪聲 | 0.4s |
| `sfx_camera_shutter.mp3` | 拍照快門 | 相機快門聲+魔法濾鏡音 | 0.3s |
| `sfx_camera_analyze.mp3` | 照片分析中 | 掃描光效音、逐漸加速 | 1.0s |
| `sfx_audio_detect.mp3` | 音量偵測達標 | 共鳴回應音 | 0.4s |
| `sfx_tilt_activate.mp3` | 傾斜觸發 | 重力偏移的嗡鳴聲 | 0.3s |

### 地圖/探索音效

| 檔名 | 觸發場景 | 描述 | 長度 |
|------|---------|------|------|
| `sfx_location_enter.mp3` | 進入地點範圍 | 空間轉換的回音+門開 | 0.6s |
| `sfx_location_leave.mp3` | 離開地點範圍 | 空間消散的輕柔音 | 0.4s |
| `sfx_encounter.mp3` | 遭遇敵人 | 緊張警告音+暗影出現 | 0.8s |
| `sfx_purify.mp3` | 地點淨化完成 | 光明能量爆發+自然回歸 | 1.5s |
| `sfx_dark_pulse.mp3` | 暗影侵蝕脈衝 | 低沉的暗影能量波動 | 0.5s |

---

## 3. 環境音 (Ambient) — `assets/audio/ambient/`

| 檔名 | 場景 | 描述 | 長度 |
|------|------|------|------|
| `amb_park_day.mp3` | 白天公園探索 | 鳥鳴+微風+遠處人聲+水流 | 120s |
| `amb_park_night.mp3` | 夜間公園探索 | 蟲鳴蛙叫+夜風+遠處車聲 | 120s |
| `amb_water.mp3` | 湖畔/水域 | 潺潺水聲+魚跳+蓮葉沙沙 | 60s |
| `amb_shadow.mp3` | 暗影區域 | 低沉嗡鳴+不安的風聲+詭異耳語 | 60s |

---

## 4. 震動回饋 (Vibration Patterns) — 程式內定義

使用 `navigator.vibrate()` API，單位為毫秒 (ms)。
格式：`[振動, 間隔, 振動, 間隔, ...]`

### 戰鬥震動

| 事件 | Pattern (ms) | 描述 |
|------|-------------|------|
| 玩家攻擊 | `[50]` | 短促單次 |
| 攻擊命中 | `[30, 20, 60]` | 輕→重兩段 |
| 暴擊 | `[80, 30, 120]` | 強力兩段震動 |
| 技能施放 | `[20, 10, 20, 10, 80]` | 蓄力→釋放 |
| 受到傷害 | `[40, 20, 40]` | 雙重短震 |
| 受到重傷 | `[60, 20, 60, 20, 100]` | 三段加重 |
| 戰鬥勝利 | `[30, 50, 30, 50, 30, 50, 150]` | 節奏慶祝 |
| 戰鬥失敗 | `[200, 100, 300]` | 長沉重震動 |
| 逃跑成功 | `[20, 30, 20, 30, 20]` | 快速輕震 |

### 系統/UI 震動

| 事件 | Pattern (ms) | 描述 |
|------|-------------|------|
| 按鈕點擊 | `[10]` | 極短觸覺回饋 |
| 確認操作 | `[15, 10, 25]` | 輕雙擊 |
| 錯誤提示 | `[50, 30, 50, 30, 50]` | 三次警告震 |
| 切換分頁 | `[8]` | 微觸回饋 |

### 遊戲進展震動

| 事件 | Pattern (ms) | 描述 |
|------|-------------|------|
| 升級 | `[30, 40, 30, 40, 30, 40, 200]` | 漸強節奏+爆發 |
| 任務完成 | `[20, 30, 20, 30, 100]` | 輕快慶祝 |
| 獲得動物 | `[50, 30, 50, 30, 50, 30, 150]` | 興奮節奏 |
| 動物進化 | `[20, 20, 40, 20, 60, 20, 80, 20, 150]` | 逐漸增強→爆發 |
| 圖鑑解鎖 | `[30, 50, 80]` | 翻頁→蓋章 |
| 獲得金幣 | `[15]` | 極輕回饋 |
| 獲得稀有物 | `[30, 20, 60]` | 驚喜感 |

### 感測器互動震動

| 事件 | Pattern (ms) | 描述 |
|------|-------------|------|
| GPS 到達目標 | `[50, 30, 50, 30, 100]` | 定位確認 |
| GPS 接近中 | `[20]` | 脈衝提示 (重複) |
| 搖晃偵測 | `[40, 20, 40]` | 回應震動 |
| 拍照快門 | `[30]` | 快門回饋 |
| 音量達標 | `[20, 10, 50]` | 共鳴回應 |
| 遭遇敵人 | `[100, 50, 100, 50, 200]` | 警戒震動 |
| 地點淨化 | `[20, 20, 30, 20, 40, 20, 50, 20, 150]` | 能量擴散 |
| 暗影脈衝 | `[80, 100, 80]` | 不安的低頻 |

---

## 5. 音量層級管理

| 分類 | 預設音量 | 可調整 | 備註 |
|------|---------|--------|------|
| BGM 背景音樂 | 0.3 | ✅ | 循環播放，場景切換時 fade |
| SFX 音效 | 0.6 | ✅ | 觸發即播，可疊加 |
| Ambient 環境音 | 0.2 | ✅ | 與 BGM 混合，輔助氛圍 |
| 震動 | ON/OFF | ✅ | 設定中開關控制 |

### 音量淡入淡出規則

| 場景轉換 | 效果 |
|---------|------|
| 地圖 → 戰鬥 | BGM: 500ms fadeOut → 戰鬥BGM fadeIn 300ms |
| 戰鬥勝利 | BGM: 即停 → 勝利BGM 播放 |
| 戰鬥失敗 | BGM: 1000ms fadeOut → 失敗BGM 播放 |
| 進入商店 | BGM: 800ms crossfade 到商店BGM |
| 進入暗影區 | Ambient: crossfade 到 amb_shadow |
| 進入水域 | Ambient: 疊加 amb_water (0.15) |

---

## 6. 觸發對照表 (程式整合用)

```javascript
// 音效觸發常數
const AUDIO_EVENTS = {
  // 戰鬥
  BATTLE_START: { sfx: 'sfx_battle_start', bgm: 'bgm_battle_normal', vib: [100, 50, 100, 50, 200] },
  BATTLE_BOSS: { sfx: 'sfx_battle_start', bgm: 'bgm_battle_boss', vib: [100, 50, 100, 50, 200] },
  ATTACK: { sfx: 'sfx_attack', vib: [50] },
  ATTACK_HIT: { sfx: 'sfx_attack_hit', vib: [30, 20, 60] },
  CRITICAL: { sfx: 'sfx_critical', vib: [80, 30, 120] },
  SKILL_CAST: { sfx: 'sfx_skill_cast', vib: [20, 10, 20, 10, 80] },
  HEAL: { sfx: 'sfx_heal', vib: [15, 10, 25] },
  ENEMY_ATTACK: { sfx: 'sfx_enemy_attack', vib: [40, 20, 40] },
  ENEMY_SKILL: { sfx: 'sfx_enemy_skill', vib: [60, 20, 60, 20, 100] },
  FLEE_SUCCESS: { sfx: 'sfx_flee_success', vib: [20, 30, 20, 30, 20] },
  FLEE_FAIL: { sfx: 'sfx_flee_fail', vib: [50, 30, 50, 30, 50] },
  VICTORY: { sfx: 'sfx_reward_get', bgm: 'bgm_victory', vib: [30, 50, 30, 50, 30, 50, 150] },
  DEFEAT: { bgm: 'bgm_defeat', vib: [200, 100, 300] },

  // UI
  BUTTON_TAP: { sfx: 'sfx_button_tap', vib: [10] },
  BUTTON_CONFIRM: { sfx: 'sfx_button_confirm', vib: [15, 10, 25] },
  BUTTON_CANCEL: { sfx: 'sfx_button_cancel', vib: [8] },
  TAB_SWITCH: { sfx: 'sfx_tab_switch', vib: [8] },
  SCREEN_OPEN: { sfx: 'sfx_screen_open' },
  SCREEN_CLOSE: { sfx: 'sfx_screen_close' },
  TOAST: { sfx: 'sfx_toast' },
  ERROR: { sfx: 'sfx_error', vib: [50, 30, 50, 30, 50] },

  // 遊戲進展
  LEVEL_UP: { sfx: 'sfx_levelup', vib: [30, 40, 30, 40, 30, 40, 200] },
  QUEST_ACCEPT: { sfx: 'sfx_quest_accept', vib: [15, 10, 25] },
  QUEST_COMPLETE: { sfx: 'sfx_quest_complete', vib: [20, 30, 20, 30, 100] },
  REWARD_GET: { sfx: 'sfx_reward_get', vib: [30, 20, 60] },
  GOLD_GAIN: { sfx: 'sfx_gold_gain', vib: [15] },
  ITEM_GET: { sfx: 'sfx_item_get', vib: [15] },
  ITEM_USE: { sfx: 'sfx_item_use', vib: [15, 10, 25] },

  // 動物
  ANIMAL_CAPTURE: { sfx: 'sfx_animal_capture', vib: [50, 30, 50, 30, 50, 30, 150] },
  ANIMAL_EVOLVE: { sfx: 'sfx_animal_evolve', vib: [20, 20, 40, 20, 60, 20, 80, 20, 150] },
  CODEX_UNLOCK: { sfx: 'sfx_codex_unlock', vib: [30, 50, 80] },

  // 感測器
  GPS_ARRIVE: { sfx: 'sfx_gps_arrive', vib: [50, 30, 50, 30, 100] },
  GPS_NEARBY: { sfx: 'sfx_gps_nearby', vib: [20] },
  SHAKE_DETECT: { sfx: 'sfx_shake_detect', vib: [40, 20, 40] },
  CAMERA_SHUTTER: { sfx: 'sfx_camera_shutter', vib: [30] },
  AUDIO_DETECT: { sfx: 'sfx_audio_detect', vib: [20, 10, 50] },
  ENCOUNTER: { sfx: 'sfx_encounter', vib: [100, 50, 100, 50, 200] },
  PURIFY: { sfx: 'sfx_purify', vib: [20, 20, 30, 20, 40, 20, 50, 20, 150] },

  // 地圖
  LOCATION_ENTER: { sfx: 'sfx_location_enter', vib: [30, 20, 50] },
  DARK_PULSE: { sfx: 'sfx_dark_pulse', vib: [80, 100, 80] },
};
```

---

## 音效總計

| 分類 | 數量 |
|------|------|
| 背景音樂 BGM | 10 |
| 戰鬥音效 SFX | 15 |
| 系統/UI 音效 | 8 |
| 遊戲進展音效 | 9 |
| 動物/收集音效 | 3 |
| 感測器互動音效 | 7 |
| 地圖/探索音效 | 5 |
| 環境音 Ambient | 4 |
| **總計** | **61 個音檔** |
| 震動模式 | 28 種 |
