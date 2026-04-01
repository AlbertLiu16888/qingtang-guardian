# 青塘園守護者 — 美術資源清單 (Asset Manifest)

## 統一美術風格定義

**風格**: 奇幻水彩卡通風 (Fantasy Watercolor Cartoon)
- 暗色調為主、帶有神秘光暈的生態奇幻風格
- 角色設計偏向可愛 (Q版/chibi)、但帶有魔法光效
- 背景以台灣都市公園生態為基底，加入魔法/暗影元素
- 配色：主色 #0a0a1a(深夜藍)、#00f2fe(青光)、#b4ec51(自然綠)、#ff6b35(暖橘警告)
- 所有角色圖需透明背景 (PNG)
- UI 圖示風格統一為扁平化 + 微光暈 (flat + subtle glow)

---

## 1. 守護動物 (Guardian Animals) — `assets/animals/`

| 檔名 | 尺寸 | 角色 | 用途 |
|------|------|------|------|
| `a01_egret.png` | 256×256 | 白鷺鷥 | 圖鑑/戰鬥/隊伍 |
| `a02_grebe.png` | 256×256 | 小鸊鷉 | 圖鑑/戰鬥/隊伍 |
| `a03_mallard.png` | 256×256 | 綠頭鴨 | 圖鑑/戰鬥/隊伍 |
| `a04_turtle.png` | 256×256 | 烏龜爺爺 | 圖鑑/戰鬥/隊伍 |
| `a05_squirrel.png` | 256×256 | 松鼠 | 圖鑑/戰鬥/隊伍 |
| `a06_koi.png` | 256×256 | 錦鯉 | 圖鑑/戰鬥/隊伍 |
| `a07_butterfly.png` | 256×256 | 蝴蝶 | 圖鑑/戰鬥/隊伍 |
| `a08_frog.png` | 256×256 | 青蛙 | 圖鑑/戰鬥/隊伍 |
| `a09_dragonfly.png` | 256×256 | 蜻蜓 | 圖鑑/戰鬥/隊伍 |
| `a10_firefly.png` | 256×256 | 螢火蟲 | 圖鑑/戰鬥/隊伍 |
| `a11_fishschool.png` | 256×256 | 小魚群 | 圖鑑/戰鬥/隊伍 |
| `a12_eagle.png` | 256×256 | 老鷹 | 圖鑑/戰鬥/隊伍 |
| `a13_rainbow_bird.png` | 256×256 | 彩虹鳥 | 圖鑑/戰鬥/隊伍 |
| `a14_otter.png` | 256×256 | 水獺 | 圖鑑/戰鬥/隊伍 |

## 2. 暗影怪物 (Shadow Monsters) — `assets/monsters/`

| 檔名 | 尺寸 | 角色 | 類型 |
|------|------|------|------|
| `m01_shadow_bug.png` | 320×320 | 暗影小蟲 | minion |
| `m02_shadow_spider.png` | 320×320 | 暗影蜘蛛 | elite |
| `m03_shadow_raven.png` | 320×320 | 暗影烏鴉群 | elite |
| `m04_shadow_mole_king.png` | 384×384 | 暗影地鼠王 | boss |
| `m05_shadow_jellyfish.png` | 320×320 | 暗影水母 | elite |
| `m06_shadow_storm.png` | 384×384 | 暗影風暴獸 | boss |
| `m07_shadow_lotus.png` | 320×320 | 暗影蓮妖 | elite |
| `m08_shadow_illusionist.png` | 384×384 | 暗影幻影師 | boss |
| `m09_shadow_mist.png` | 320×320 | 暗影迷霧獸 | elite |
| `m10_shadow_serpent.png` | 512×512 | 暗影巨蛇 | worldboss |
| `m11_shadow_sludge.png` | 320×320 | 暗影汙泥怪 | elite |
| `m12_shadow_bats.png` | 320×320 | 暗影蝙蝠群 | elite |
| `m13_shadow_colorblind.png` | 384×384 | 暗影色盲獸 | boss |
| `m14_shadow_rustbug.png` | 320×320 | 暗影鏽蝕蟲 | elite |
| `m15_abyss_overlord.png` | 512×512 | 湖底深淵領主 | hidden |

## 3. 背景圖 (Backgrounds) — `assets/backgrounds/`

### 畫面背景 `assets/backgrounds/screens/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `bg_splash.jpg` | 1080×1920 | 開場/啟動畫面 |
| `bg_story.jpg` | 1080×1920 | 故事序章背景 |
| `bg_battle_field.jpg` | 1080×1080 | 草地/陸地戰鬥背景 |
| `bg_battle_water.jpg` | 1080×1080 | 湖邊/水域戰鬥背景 |
| `bg_battle_dark.jpg` | 1080×1080 | 暗影空間戰鬥背景 |
| `bg_battle_boss.jpg` | 1080×1080 | Boss 戰鬥背景 |
| `bg_victory.jpg` | 1080×1080 | 勝利結算畫面 |
| `bg_defeat.jpg` | 1080×1080 | 戰敗畫面 |

### 地圖元素 `assets/backgrounds/map/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `map_overlay_dark.png` | 512×512 | 暗影區域覆蓋層 (可 tile) |
| `map_overlay_light.png` | 512×512 | 淨化區域光效 (可 tile) |

## 4. UI 介面圖示 (UI Icons)

### 導航列 `assets/ui/nav/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `nav_map.png` | 64×64 | 地圖 Tab |
| `nav_map_active.png` | 64×64 | 地圖 Tab (啟用) |
| `nav_quest.png` | 64×64 | 任務 Tab |
| `nav_quest_active.png` | 64×64 | 任務 Tab (啟用) |
| `nav_inventory.png` | 64×64 | 背包 Tab |
| `nav_inventory_active.png` | 64×64 | 背包 Tab (啟用) |
| `nav_codex.png` | 64×64 | 圖鑑 Tab |
| `nav_codex_active.png` | 64×64 | 圖鑑 Tab (啟用) |
| `nav_settings.png` | 64×64 | 更多 Tab |
| `nav_settings_active.png` | 64×64 | 更多 Tab (啟用) |

### HUD 介面 `assets/ui/hud/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `hud_avatar_frame.png` | 96×96 | 玩家頭像框 |
| `hud_hp_bar.png` | 320×32 | HP 血條底框 |
| `hud_exp_bar.png` | 320×32 | 經驗值條底框 |
| `hud_gold.png` | 32×32 | 金幣圖示 |
| `hud_diamond.png` | 32×32 | 鑽石圖示 |
| `hud_shield_logo.png` | 128×128 | 守護者盾牌 Logo |

### 戰鬥介面 `assets/ui/battle/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `btn_attack.png` | 64×64 | 攻擊按鈕圖示 |
| `btn_skill.png` | 64×64 | 技能按鈕圖示 |
| `btn_item.png` | 64×64 | 道具按鈕圖示 |
| `btn_flee.png` | 64×64 | 逃跑按鈕圖示 |
| `fx_hit.png` | 128×128 | 打擊特效 |
| `fx_heal.png` | 128×128 | 治療特效 |
| `fx_skill_fire.png` | 128×128 | 火焰技能特效 |
| `fx_skill_water.png` | 128×128 | 水系技能特效 |
| `fx_critical.png` | 128×128 | 暴擊特效 |

### 設定/選單 `assets/ui/settings/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `menu_profile.png` | 48×48 | 個人檔案 |
| `menu_ranking.png` | 48×48 | 排行榜 |
| `menu_shop.png` | 48×48 | 商店 |
| `menu_friends.png` | 48×48 | 好友 |
| `menu_sound.png` | 48×48 | 音效 |
| `menu_notification.png` | 48×48 | 通知 |
| `menu_location.png` | 48×48 | 定位 |
| `menu_account.png` | 48×48 | 帳號 |

### 狀態/指示 `assets/ui/status/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `icon_locked.png` | 48×48 | 鎖定狀態 |
| `icon_unknown.png` | 48×48 | 未知/問號 |
| `icon_star.png` | 32×32 | 評等星星 |
| `icon_star_empty.png` | 32×32 | 空星 |
| `icon_gps.png` | 48×48 | GPS 任務圖示 |
| `icon_camera.png` | 48×48 | 相機任務圖示 |
| `icon_shake.png` | 48×48 | 搖晃任務圖示 |
| `icon_audio.png` | 48×48 | 音量任務圖示 |
| `icon_tilt.png` | 48×48 | 傾斜任務圖示 |

## 5. 道具圖示 (Items) — `assets/items/`

| 檔名 | 尺寸 | 道具 |
|------|------|------|
| `item_potion_hp.png` | 96×96 | 光明藥劑 (HP) |
| `item_potion_light.png` | 96×96 | 光明藥劑 (光明值) |
| `item_revive.png` | 96×96 | 復活種子 |
| `item_gold_bag_s.png` | 96×96 | 金幣袋（小） |
| `item_gold_bag_m.png` | 96×96 | 金幣袋（中） |
| `item_gold_bag_l.png` | 96×96 | 金幣袋（大） |
| `item_rare_box.png` | 96×96 | 稀有裝備箱 |
| `item_legend_box.png` | 96×96 | 傳說裝備箱 |
| `item_exp_scroll.png` | 96×96 | 經驗卷軸 |
| `item_compass.png` | 96×96 | 探索指南針 |
| `item_shield.png` | 96×96 | 防禦護符 |
| `item_attack_charm.png` | 96×96 | 攻擊護符 |
| `item_capture_net.png` | 96×96 | 捕獲網 |
| `item_dark_crystal.png` | 96×96 | 暗影結晶 (材料) |
| `item_light_shard.png` | 96×96 | 光明碎片 (材料) |
| `item_feather.png` | 96×96 | 守護羽毛 (材料) |

## 6. 地點標記 (Location Markers) — `assets/locations/`

| 檔名 | 尺寸 | 地點 |
|------|------|------|
| `loc_marker_default.png` | 64×64 | 預設地點標記 |
| `loc_marker_active.png` | 64×64 | 啟用中地點標記 |
| `loc_marker_cleared.png` | 64×64 | 已淨化地點標記 |
| `loc_marker_locked.png` | 64×64 | 未解鎖地點標記 |
| `loc_marker_shop.png` | 64×64 | 商店標記 |
| `loc_marker_player.png` | 48×48 | 玩家位置標記 |

## 7. 特效動畫 (Effects) — `assets/effects/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `fx_levelup.png` | 256×256 | 升級光效 |
| `fx_capture.png` | 256×256 | 捕獲成功光效 |
| `fx_reward_glow.png` | 192×192 | 獎勵光暈 |
| `fx_dark_aura.png` | 256×256 | 暗影侵蝕效果 |
| `fx_purify.png` | 256×256 | 淨化光效 |

## 8. PWA 應用圖示 — `assets/icons/`

| 檔名 | 尺寸 | 用途 |
|------|------|------|
| `icon-72x72.png` | 72×72 | PWA Icon |
| `icon-96x96.png` | 96×96 | PWA Icon |
| `icon-128x128.png` | 128×128 | PWA Icon |
| `icon-144x144.png` | 144×144 | PWA Icon |
| `icon-152x152.png` | 152×152 | PWA Icon |
| `icon-192x192.png` | 192×192 | PWA / Apple Touch |
| `icon-384x384.png` | 384×384 | PWA Icon |
| `icon-512x512.png` | 512×512 | PWA Splash |

---

## 總計

| 分類 | 數量 |
|------|------|
| 守護動物 | 14 |
| 暗影怪物 | 15 |
| 背景圖 | 10 |
| UI 導航 | 10 |
| UI HUD | 6 |
| UI 戰鬥 | 9 |
| UI 設定 | 8 |
| UI 狀態 | 9 |
| 道具圖示 | 16 |
| 地點標記 | 6 |
| 特效 | 5 |
| PWA 圖示 | 8 |
| **總計** | **116 張** |
