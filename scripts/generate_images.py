"""
美容室 LUMIÈRE ホームページ用画像生成スクリプト
Gemini API (Imagen 4 Fast) を使用

使い方:
  python scripts/generate_images.py
  python scripts/generate_images.py --usage
"""

import os
import sys
import io
import json
import base64
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.join(SCRIPT_DIR, "..")
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "images")

# Shortmaker の .env から API キーを読み込む
SHORTMAKER_ENV = r"C:\repos\Shortmaker\.env"
USAGE_LOG_PATH = os.path.join(PROJECT_DIR, ".api_usage.json")

MAX_REQUESTS_PER_RUN = 30
request_count = 0


def load_env():
    if os.path.exists(SHORTMAKER_ENV):
        with open(SHORTMAKER_ENV, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()


def get_api_key():
    load_env()
    key = os.environ.get("GEMINI_API_KEY", "")
    if not key:
        print("ERROR: GEMINI_API_KEY が見つかりません")
        sys.exit(1)
    return key


def _load_usage():
    if os.path.exists(USAGE_LOG_PATH):
        with open(USAGE_LOG_PATH, "r") as f:
            return json.load(f)
    return {"total": 0, "total_cost_usd": 0.0, "daily": {}}


def _save_usage(usage):
    with open(USAGE_LOG_PATH, "w") as f:
        json.dump(usage, f, indent=2)


def record_request():
    global request_count
    request_count += 1
    if request_count > MAX_REQUESTS_PER_RUN:
        print(f"1回の実行上限 {MAX_REQUESTS_PER_RUN} 枚に到達。停止します。")
        sys.exit(0)
    usage = _load_usage()
    today = datetime.now().strftime("%Y-%m-%d")
    usage["total"] += 1
    usage["total_cost_usd"] = round(usage["total"] * 0.02, 2)
    usage["daily"][today] = usage["daily"].get(today, 0) + 1
    _save_usage(usage)
    print(f"   [使用量] 今回:{request_count}枚 累計:{usage['total']}枚 ${usage['total_cost_usd']}")


def generate_image(api_key: str, prompt: str, output_path: str, aspect_ratio: str = "1:1") -> bool:
    """Imagen 4 Fast APIで画像を生成"""
    import requests

    url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key={api_key}"

    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": aspect_ratio,
        }
    }

    try:
        record_request()
        resp = requests.post(url, json=payload, timeout=120)
        resp.raise_for_status()
        data = resp.json()

        predictions = data.get("predictions", [])
        if predictions:
            img_b64 = predictions[0].get("bytesBase64Encoded", "")
            if img_b64:
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                img_data = base64.b64decode(img_b64)
                with open(output_path, "wb") as f:
                    f.write(img_data)
                return True

        for candidate in data.get("candidates", []):
            for part in candidate.get("content", {}).get("parts", []):
                if "inlineData" in part:
                    os.makedirs(os.path.dirname(output_path), exist_ok=True)
                    img_data = base64.b64decode(part["inlineData"]["data"])
                    with open(output_path, "wb") as f:
                        f.write(img_data)
                    return True

        print(f"  画像データが見つかりませんでした: {list(data.keys())}")
        return False
    except Exception as e:
        print(f"  ERROR: {e}")
        return False


# ═══════════════════════════════════════
# 画像定義
# ═══════════════════════════════════════

IMAGES = [
    {
        "name": "hero/hero-main.png",
        "aspect": "16:9",
        "prompt": "Professional photography of a luxury Japanese beauty salon interior, wide 16:9 format. Elegant minimalist space with warm natural lighting streaming through large windows. White marble counters, gold accents, fresh flowers in vases, mirrors reflecting soft light. Beige and cream color palette with subtle gold touches. No people visible. Architectural photography style, high-end editorial quality, shallow depth of field. Clean, sophisticated, Japanese aesthetic with Western luxury influence."
    },
    {
        "name": "hero/hero-mobile.png",
        "aspect": "9:16",
        "prompt": "Professional photography of a luxury beauty salon styling station, 9:16 vertical format. Close-up of an elegant mirror station with warm lighting, fresh white roses in a gold vase. Soft natural light, beige tones, minimalist Japanese luxury aesthetic. Professional editorial photography, shallow depth of field, no people."
    },
    {
        "name": "concept/concept-1.png",
        "aspect": "1:1",
        "prompt": "Minimalist luxury shampoo area in a Japanese beauty salon, 1:1 square format. Warm natural light, white towels neatly arranged, botanical elements. Clean beige and white palette, premium spa atmosphere. No people. Professional interior photography, soft shadows."
    },
    {
        "name": "concept/concept-2.png",
        "aspect": "1:1",
        "prompt": "Elegant waiting area of a premium Japanese beauty salon, 1:1 square format. Designer chairs, curated art on walls, fresh green plants, warm pendant lighting. Coffee table books and herbal tea set visible. Beige, cream, gold palette. No people. High-end editorial interior photography."
    },
    {
        "name": "concept/interior.png",
        "aspect": "16:9",
        "prompt": "Panoramic interior of a luxury Japanese beauty salon, wide 16:9 format. Multiple styling stations with large round mirrors, warm pendant lights. Fresh flowers, wooden accents, white and beige color scheme with gold details. Natural light from floor-to-ceiling windows. No people. Professional architectural photography."
    },
    {
        "name": "staff/staff-1.png",
        "aspect": "1:1",
        "prompt": "Professional portrait photograph of a stylish Japanese female hairstylist in her 30s. Wearing an elegant black apron over a white blouse. Warm, confident smile. Soft studio lighting, clean beige background. Square 1:1 format. High-end fashion portrait style, shallow depth of field."
    },
    {
        "name": "staff/staff-2.png",
        "aspect": "1:1",
        "prompt": "Professional portrait photograph of a trendy Japanese male hairstylist in his late 20s. Modern hairstyle, wearing a minimalist black outfit. Friendly professional expression. Soft studio lighting, clean beige background. Square 1:1 format. High-end fashion portrait style."
    },
    {
        "name": "staff/staff-3.png",
        "aspect": "1:1",
        "prompt": "Professional portrait photograph of a creative Japanese female hair colorist in her mid-20s. Subtle highlights in her own hair, wearing a stylish gray apron. Warm approachable smile. Soft studio lighting, clean beige background. Square 1:1 format. High-end fashion portrait style."
    },
    {
        "name": "gallery/style-1.png",
        "aspect": "1:1",
        "prompt": "Professional hair salon photography of a soft layered bob with caramel highlights, 1:1 square format. Beautiful Japanese woman showing hairstyle from side angle. Soft natural lighting, clean background, editorial quality. Focus on hair texture and color. Premium salon result."
    },
    {
        "name": "gallery/style-2.png",
        "aspect": "1:1",
        "prompt": "Professional hair salon photography of sleek long straight black hair with glossy finish, 1:1 square format. Beautiful Japanese woman showing hairstyle from behind. Soft natural lighting, clean background, editorial quality. Focus on hair shine and smoothness. Premium salon result."
    },
    {
        "name": "gallery/style-3.png",
        "aspect": "1:1",
        "prompt": "Professional hair salon photography of an elegant updo with loose curls for special occasion, 1:1 square format. Beautiful Japanese woman showing hairstyle from three-quarter angle. Soft natural lighting, clean background, editorial quality. Premium salon result."
    },
    {
        "name": "gallery/style-4.png",
        "aspect": "1:1",
        "prompt": "Professional hair salon photography of a trendy short pixie cut with ash gray color, 1:1 square format. Stylish Japanese woman showing modern hairstyle. Soft natural lighting, clean background, editorial quality. Focus on hair texture. Premium salon result."
    },
    {
        "name": "gallery/style-5.png",
        "aspect": "1:1",
        "prompt": "Professional hair salon photography of flowing medium-length waves with pink beige hair color, 1:1 square format. Beautiful Japanese woman showing hairstyle from side. Soft natural lighting, clean background, editorial quality. Focus on hair color and movement. Premium salon result."
    },
    {
        "name": "gallery/style-6.png",
        "aspect": "1:1",
        "prompt": "Professional hair salon photography of natural curly perm with warm brown tones, 1:1 square format. Beautiful Japanese woman showing bouncy curly hairstyle. Soft natural lighting, clean background, editorial quality. Focus on curl definition. Premium salon result."
    },
    {
        "name": "instagram/insta-1.png",
        "aspect": "1:1",
        "prompt": "Close-up of hair coloring process in luxury salon, gloved hands applying color to foils. Warm tones, professional atmosphere, editorial quality. Square 1:1 format."
    },
    {
        "name": "instagram/insta-2.png",
        "aspect": "1:1",
        "prompt": "Flat lay of premium hair care products arranged aesthetically on white marble surface. Gold caps, botanical ingredients visible. Minimalist luxury. Square 1:1 format."
    },
    {
        "name": "instagram/insta-3.png",
        "aspect": "1:1",
        "prompt": "Beautiful finished hairstyle at salon, Japanese woman touching her flowing hair with joy, natural light from window. Warm, happy moment. Square 1:1 format. Editorial quality."
    },
    {
        "name": "instagram/insta-4.png",
        "aspect": "1:1",
        "prompt": "Interior detail of luxury beauty salon - fresh white roses and professional styling tools arranged artfully on marble counter. Gold accents, warm lighting. Square 1:1 format."
    },
    {
        "name": "instagram/insta-5.png",
        "aspect": "1:1",
        "prompt": "Behind-the-scenes of hair styling, professional scissors and comb in action creating a beautiful cut. Cinematic shallow depth of field. Square 1:1 format."
    },
    {
        "name": "instagram/insta-6.png",
        "aspect": "1:1",
        "prompt": "Seasonal spring decoration at beauty salon entrance, cherry blossom branches in elegant vase, welcoming and sophisticated. Beige and pink tones. Square 1:1 format."
    },
]


def main():
    if "--usage" in sys.argv:
        usage = _load_usage()
        print(f"累計: {usage['total']}枚 / ${usage['total_cost_usd']}")
        print(f"日別: {json.dumps(usage.get('daily', {}), indent=2)}")
        return

    api_key = get_api_key()
    print(f"画像生成開始 (全{len(IMAGES)}枚)")
    print(f"出力先: {OUTPUT_DIR}\n")

    success = 0
    skip = 0
    fail = 0

    for i, img in enumerate(IMAGES):
        output_path = os.path.join(OUTPUT_DIR, img["name"])
        if os.path.exists(output_path):
            print(f"[{i+1}/{len(IMAGES)}] SKIP (既存): {img['name']}")
            skip += 1
            continue

        print(f"[{i+1}/{len(IMAGES)}] 生成中: {img['name']} ({img['aspect']})")
        ok = generate_image(api_key, img["prompt"], output_path, img["aspect"])
        if ok:
            print(f"   OK")
            success += 1
        else:
            print(f"   FAILED")
            fail += 1

    print(f"\n完了: 成功={success} スキップ={skip} 失敗={fail}")


if __name__ == "__main__":
    main()
