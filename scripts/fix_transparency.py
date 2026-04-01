"""
Fix AI-generated PNG transparency: remove baked-in checkerboard pattern.
The Gemini model renders a gray/white checkerboard where transparency should be.
This script detects and replaces checkerboard pixels with true alpha transparency.
"""
import sys
from pathlib import Path
from PIL import Image
import numpy as np

PROJECT = Path(__file__).resolve().parent.parent
ASSETS = PROJECT / "assets"

def fix_checkerboard(img_path):
    """Remove checkerboard pattern and replace with transparency."""
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img)

    # Checkerboard pattern typically alternates between two similar light colors
    # Common patterns: (204,204,204) / (255,255,255) or (238,238,238) / (255,255,255)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

    # Detect near-white and near-light-gray pixels (checkerboard colors)
    # These are pixels where R≈G≈B and they're in the light range
    is_gray = (np.abs(r.astype(int) - g.astype(int)) < 10) & \
              (np.abs(g.astype(int) - b.astype(int)) < 10) & \
              (r > 180)

    # Make detected checkerboard pixels transparent
    data[is_gray, 3] = 0

    # Also soften edges: pixels near the boundary get partial transparency
    # Simple approach: if a pixel is somewhat light and gray, reduce alpha
    is_semi = (np.abs(r.astype(int) - g.astype(int)) < 15) & \
              (np.abs(g.astype(int) - b.astype(int)) < 15) & \
              (r > 160) & (r <= 180)
    data[is_semi, 3] = (data[is_semi, 3] * 0.3).astype(np.uint8)

    result = Image.fromarray(data)
    result.save(img_path)
    return True

def main():
    targets = []
    for folder in ["animals", "monsters"]:
        folder_path = ASSETS / folder
        if folder_path.exists():
            targets.extend(folder_path.glob("*.png"))

    print(f"🔧 Fixing transparency for {len(targets)} images...")

    for img_path in sorted(targets):
        print(f"  Processing {img_path.name}...", end="", flush=True)
        try:
            fix_checkerboard(img_path)
            print(" ✅")
        except Exception as e:
            print(f" ❌ {e}")

    print("Done!")

if __name__ == "__main__":
    main()
