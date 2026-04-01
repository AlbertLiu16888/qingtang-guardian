"""
青塘園守護者 — Gemini API 圖片批量生成
使用 Claw Project API Key (Tier 1 Postpay)
"""
import os
import sys
import time
import json
import base64
from pathlib import Path

from google import genai
from google.genai import types

API_KEY = "AIzaSyDwLrwlBX3HwinUpATQ9Ua6v_XZasVuys0"
PROJECT = Path(__file__).resolve().parent.parent
ASSETS = PROJECT / "assets"

client = genai.Client(api_key=API_KEY)

STYLE_LIGHT = (
    "Fantasy watercolor chibi illustration, dark mystical park theme, "
    "soft glowing magical aura, transparent PNG background, game asset, "
    "high quality, clean edges, centered composition. "
)
STYLE_DARK = (
    "Fantasy watercolor dark illustration, shadowy mystical theme, "
    "ominous glowing aura, transparent PNG background, game enemy asset, "
    "high quality, clean edges, centered composition. "
)

TASKS = [
    # === 守護動物 (animals) ===
    ("animals", "a01_egret.png", "light",
     "A cute chibi white egret guardian spirit, elegant long neck, pure white feathers with subtle golden glow, standing gracefully in a mystical wetland, small blue magic orb floating nearby, adorable large eyes, soft cyan aura"),
    ("animals", "a02_grebe.png", "light",
     "A cute chibi little grebe bird guardian, small round body with brown-black plumage, floating on magical water, tiny green magic sparkles around it, adorable expression, nature spirit vibe"),
    ("animals", "a03_mallard.png", "light",
     "A cute chibi mallard duck guardian, iridescent green head, orange feet, wearing a tiny magical leaf cape, water droplets glowing with blue energy, cheerful adventurous expression"),
    ("animals", "a04_turtle.png", "light",
     "A wise chibi ancient turtle guardian elder, large shell covered with glowing moss and tiny crystals, long white beard, kind old eyes with wisdom, holding a small wooden staff, earth-toned magical aura"),
    ("animals", "a05_squirrel.png", "light",
     "A cute chibi squirrel guardian, fluffy reddish-brown tail, holding a glowing acorn of light, bright curious eyes, tiny green scarf, sitting on a magical tree branch, warm golden aura, playful expression"),
    ("animals", "a06_koi.png", "light",
     "A cute chibi koi fish guardian, red and white scales with golden magical glow, swimming through floating water bubbles, trailing sparkles, elegant flowing fins, serene mystical water aura"),
    ("animals", "a07_butterfly.png", "light",
     "A cute chibi magical butterfly guardian, large iridescent wings in purple and cyan gradients, tiny body with fairy-like features, leaving a trail of sparkling dust, ethereal rainbow glow"),
    ("animals", "a08_frog.png", "light",
     "A cute chibi frog guardian, bright green skin with magical blue spots, sitting on a glowing lily pad, small crown of tiny flowers on head, bubbles floating around, cheerful expression, nature magic aura"),
    ("animals", "a09_dragonfly.png", "light",
     "A cute chibi dragonfly guardian, translucent wings with rainbow refraction, slender body with cyan and green markings, hovering with magical wind trails, swift and agile pose, air element aura"),
    ("animals", "a10_firefly.png", "light",
     "A cute chibi firefly guardian, softly glowing golden-green abdomen, tiny lantern-like body emitting warm light particles, dancing in the dark, gentle dreamy expression, warm bioluminescent aura"),
    ("animals", "a11_fishschool.png", "light",
     "A cute chibi school of small colorful fish guardians, 5-6 tiny fish swimming in a spiral formation, each a different pastel color, connected by glowing water trails, playful synchronized movement, aqua blue aura"),
    ("animals", "a12_eagle.png", "light",
     "A majestic chibi eagle guardian, powerful wings spread with golden feather tips, fierce but adorable eyes, crown of wind energy around head, SSR-level grandeur, powerful wind aura"),
    ("animals", "a13_rainbow_bird.png", "light",
     "A mythical chibi rainbow phoenix-like bird guardian, feathers shifting through all rainbow colors, ethereal glowing tail feathers, surrounded by prismatic light, legendary aura, rainbow sparkle effects"),
    ("animals", "a14_otter.png", "light",
     "A cute chibi otter guardian, sleek brown fur, playfully floating on its back in magical water, holding a glowing shell, whiskers twitching, joyful mischievous expression, water magic aura"),

    # === 暗影怪物 (monsters) ===
    ("monsters", "m01_shadow_bug.png", "dark",
     "A menacing shadow beetle monster, dark purple-black exoskeleton, glowing red eyes, dark mist emanating from body, small but threatening, corrupted insect, dark shadow aura, minion-level"),
    ("monsters", "m02_shadow_spider.png", "dark",
     "A sinister shadow spider monster, eight glowing purple legs, dark web patterns, multiple red eyes, shadowy silk threads trailing, corrupted arachnid, dark purple shadow aura"),
    ("monsters", "m03_shadow_raven.png", "dark",
     "A flock of shadow ravens forming a menacing swarm, 3-5 dark birds merging into a shadowy mass, glowing red eyes scattered throughout, dark feathers dissolving into smoke, ominous dark cloud aura"),
    ("monsters", "m04_shadow_mole_king.png", "dark",
     "A large shadow mole king boss monster, massive claws dripping with dark energy, crown of corrupted earth crystals, one glowing red eye, bursting from dark ground, imposing earth-shadow aura, boss-level"),
    ("monsters", "m05_shadow_jellyfish.png", "dark",
     "A haunting shadow jellyfish monster, translucent dark purple bell, trailing tentacles made of dark energy, bioluminescent spots pulsing with corrupted light, floating ominously, eerie deep-sea shadow aura"),
    ("monsters", "m06_shadow_storm.png", "dark",
     "A powerful shadow storm beast boss, wolf-like body made of dark thunderclouds, lightning crackling through its form, fierce glowing yellow eyes, dark tornado around legs, devastating storm-shadow aura, boss-level"),
    ("monsters", "m07_shadow_lotus.png", "dark",
     "A corrupted shadow lotus spirit, beautiful but sinister lotus flower face, dark vine tendrils, petals dripping with shadow essence, seductive but dangerous, dark floral-shadow aura"),
    ("monsters", "m08_shadow_illusionist.png", "dark",
     "A mysterious shadow illusionist boss, cracked theatrical mask half comedy half tragedy, flowing dark robes made of shadow, multiple phantom hands, floating mirror fragments, reality-warping shadow aura"),
    ("monsters", "m09_shadow_mist.png", "dark",
     "A formless shadow mist beast, amorphous body of dark fog, multiple ghostly eyes appearing and disappearing, cold blue-purple wisps, creeping fog-shadow aura, unsettling formless horror"),
    ("monsters", "m10_shadow_serpent.png", "dark",
     "A colossal shadow serpent world boss, massive dark scaled body coiling upward, glowing crimson eyes, dark energy crown on head, shadow flames along spine, ancient terrifying presence, overwhelming dark aura, legendary threat"),
    ("monsters", "m11_shadow_sludge.png", "dark",
     "A shadow sludge monster, amorphous blob of dark toxic ooze, bubbling surface with glowing toxic green spots, dripping and corroding, angry face forming in the slime, toxic shadow aura"),
    ("monsters", "m12_shadow_bats.png", "dark",
     "A swarm of shadow bats forming a menacing cloud, dozens of tiny dark bats with glowing red eyes, swooping in chaotic formation, dark wing trails, swarming darkness aura"),
    ("monsters", "m13_shadow_colorblind.png", "dark",
     "A bizarre shadow colorblind beast boss, creature that absorbs all color, pixelated glitchy appearance mixing dark and chromatic aberration, multiple eyes seeing different spectrums, surreal alien, reality-glitch shadow aura"),
    ("monsters", "m14_shadow_rustbug.png", "dark",
     "A shadow rust bug monster, mechanical-organic hybrid insect, rusty metal plates fused with dark organic matter, dripping corrosive dark fluid, grinding mandibles, corrosive rust-shadow aura"),
    ("monsters", "m15_abyss_overlord.png", "dark",
     "An ancient abyss overlord hidden boss, massive Cthulhu-like tentacle creature rising from dark waters, multiple glowing eyes, dark crown of corrupted coral and bones, ancient runes on tentacles, abyssal darkness aura, extremely detailed"),

    # === 背景圖 (backgrounds) ===
    ("backgrounds/screens", "bg_splash.jpg", "bg",
     "A mysterious dark park at night, moonlight filtering through trees, a glowing shield emblem floating in the center, fireflies and magical particles in the air, dark blue and cyan color palette, fantasy watercolor landscape, mobile splash screen"),
    ("backgrounds/screens", "bg_battle_field.jpg", "bg",
     "A grassy park clearing at twilight for RPG battle, walking paths and trees, magical energy lines on the ground forming a battle arena, soft purple-blue lighting, fantasy watercolor landscape"),
    ("backgrounds/screens", "bg_battle_water.jpg", "bg",
     "A lakeside battle scene at night, pond with lotus, moonlight reflecting on dark water, magical ripples and glowing lily pads, misty atmosphere, fantasy watercolor landscape, deep blue-purple color palette"),
    ("backgrounds/screens", "bg_battle_boss.jpg", "bg",
     "An epic boss arena in corrupted ancient ruin within a park, massive dark pillars with pulsing red runes, ground cracked with shadow energy, dramatic red and purple lighting, fantasy watercolor dark landscape"),
    ("backgrounds/screens", "bg_victory.jpg", "bg",
     "A triumphant scene with golden light breaking through dark clouds, magical sparkles and celebration particles, warm golden and cyan color palette, nature reclaiming from shadow, fantasy watercolor landscape, victory screen"),

    # === PWA Icon ===
    ("icons", "icon-512x512.png", "icon",
     "A game app icon, dark blue shield with glowing cyan energy sword cross in center, small nature elements leaf and water drop on corners, rounded square format, dark midnight blue background, professional mobile game icon, clean crisp design"),
]

PROGRESS_FILE = PROJECT / "scripts" / ".api_progress.json"

def load_progress():
    if PROGRESS_FILE.exists():
        return json.loads(PROGRESS_FILE.read_text())
    return []

def save_progress(done):
    PROGRESS_FILE.write_text(json.dumps(done, ensure_ascii=False))


def generate_one(category, filename, style, prompt):
    prefix = STYLE_LIGHT if style == "light" else STYLE_DARK if style == "dark" else ""
    full_prompt = f"Generate an image: {prefix}{prompt}"

    target_dir = ASSETS / category
    target_dir.mkdir(parents=True, exist_ok=True)
    target_path = target_dir / filename

    if target_path.exists():
        print(f"  ⏭️  已存在，跳過: {target_path.name}")
        return True

    print(f"  🎨 生成中: {filename} ...", end="", flush=True)

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )

        # 從回應中提取圖片
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                img_bytes = part.inline_data.data
                target_path.write_bytes(img_bytes)
                size_kb = len(img_bytes) / 1024
                print(f" ✅ ({size_kb:.0f} KB)")
                return True

        print(f" ❌ 回應中沒有圖片")
        # Print text response for debugging
        for part in response.candidates[0].content.parts:
            if part.text:
                print(f"     回應: {part.text[:100]}")
        return False

    except Exception as e:
        print(f" ❌ {e}")
        return False


def main():
    done = load_progress()
    total = len(TASKS)
    success = 0
    fail = 0

    print(f"🎮 青塘園守護者 — API 圖片批量生成")
    print(f"📊 總共 {total} 張，已完成 {len(done)} 張")
    print(f"🔑 使用 Claw Project API Key")
    print(f"📁 輸出: {ASSETS}\n")

    for i, (cat, fname, style, prompt) in enumerate(TASKS):
        tag = f"[{i+1}/{total}]"
        if fname in done:
            print(f"{tag} ⏭️  {fname} (已完成)")
            success += 1
            continue

        print(f"{tag} {cat}/{fname}")
        ok = generate_one(cat, fname, style, prompt)
        if ok:
            done.append(fname)
            save_progress(done)
            success += 1
        else:
            fail += 1

        # Rate limit: 等一下再繼續
        time.sleep(3)

    print(f"\n{'='*50}")
    print(f"📊 結果: ✅ {success} 成功 / ❌ {fail} 失敗 / 共 {total}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
