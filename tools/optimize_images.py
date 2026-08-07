from pathlib import Path
import re
import sys
from PIL import Image, ImageOps, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "source"
OUT = ROOT / "assets" / "images"

sizes = {
    "logo": 420,
    "hero": 1600,
    "card": 900,
    "portrait": 760,
    "thumb": 520,
}

mapping = {
    "nutranexa-logo.jpg": ("logo-nutranexa.webp", sizes["logo"]),
    "ip-specialist.jpg": ("ip-specialist.webp", sizes["portrait"]),
    "generated/brand-product-lab.png": ("brand-product-lab.webp", sizes["hero"]),
    "generated/dietary-supplement-application.png": ("dietary-supplement-application.webp", sizes["hero"]),
    "generated/functional-food-application.png": ("functional-food-application.webp", sizes["hero"]),
    "generated/quality-document-review.png": ("quality-document-review.webp", sizes["hero"]),
    "documents/coa-ps-20-sunflower.jpg": ("doc-coa-ps-20-sunflower.webp", sizes["card"]),
    "documents/coa-ps-50.jpg": ("doc-coa-ps-50.webp", sizes["card"]),
    "documents/business-license.jpg": ("doc-business-license.webp", sizes["card"]),
    "documents/food-production-license.jpg": ("doc-food-production-license.webp", sizes["card"]),
    "documents/food-additive-license-details.jpg": ("doc-food-additive-license-details.webp", sizes["card"]),
    "documents/fda-food-facility-registration.jpg": ("doc-fda-food-facility-registration.webp", sizes["card"]),
    "documents/kosher-certificate.jpg": ("doc-kosher-certificate.webp", sizes["card"]),
    "documents/halal-certificate.jpg": ("doc-halal-certificate.webp", sizes["card"]),
    "products/soy-product-ingredient-banner.jpg": ("hero-ps-ingredients.webp", sizes["hero"]),
    "products/soy-phosphatidylserine-powder-bowl.jpg": ("product-soy-ps.webp", sizes["card"]),
    "products/sunflower-phosphatidylserine-powder.jpg": ("product-sunflower-ps.webp", sizes["card"]),
    "products/soybean-powder-product.jpg": ("product-ssp.webp", sizes["card"]),
    "products/product-powder-spoon.jpg": ("product-powder-spoon.webp", sizes["card"]),
    "products/soybean-ingredient-background.jpg": ("soybean-ingredient-bg.webp", sizes["hero"]),
    "factory/factory-aerial-wide.png": ("factory-aerial-wide.webp", sizes["hero"]),
    "factory/factory-aerial.jpg": ("factory-aerial.webp", sizes["hero"]),
    "factory/factory-campus-aerial.png": ("factory-campus.webp", sizes["hero"]),
    "factory/factory-building.png": ("factory-building.webp", sizes["card"]),
    "factory/factory-gate.jpg": ("factory-gate.webp", sizes["card"]),
    "equipment/cleanroom-production-01.jpg": ("equipment-cleanroom-production.webp", sizes["card"]),
    "equipment/cleanroom-workshop.jpg": ("equipment-cleanroom-workshop.webp", sizes["card"]),
    "equipment/workshop-equipment-01.jpg": ("equipment-workshop-01.webp", sizes["card"]),
    "equipment/workshop-equipment-02.jpg": ("equipment-workshop-02.webp", sizes["card"]),
    "equipment/workshop-equipment-03.jpg": ("equipment-workshop-03.webp", sizes["card"]),
    "equipment/workshop-equipment-04.jpg": ("equipment-workshop-04.webp", sizes["card"]),
    "equipment/workshop-equipment-05.jpg": ("equipment-workshop-05.webp", sizes["card"]),
    "proof/cphi-exhibition-booth.jpg": ("proof-cphi-exhibition.webp", sizes["card"]),
    "proof/east-china-university-cooperation.jpg": ("proof-university-cooperation.webp", sizes["card"]),
    "proof/rd-quality-banner.jpg": ("proof-rd-quality.webp", sizes["hero"]),
}

OUT.mkdir(parents=True, exist_ok=True)

if "--performance-only" not in sys.argv:
    for rel, (name, max_width) in mapping.items():
        src = SRC / rel
        if not src.exists():
            continue
        with Image.open(src) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            if image.width > max_width:
                ratio = max_width / image.width
                image = image.resize((max_width, int(image.height * ratio)), Image.Resampling.LANCZOS)
            image.save(OUT / name, "WEBP", quality=82, method=6)
            print(f"{rel} -> {name} ({image.width}x{image.height})")


def save_derivative(source_name, output_name, width, quality=82, lossless=False):
    source = OUT / source_name
    output = OUT / output_name
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        ratio = min(1, width / image.width)
        target = (round(image.width * ratio), round(image.height * ratio))
        if target != image.size:
            image = image.resize(target, Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(output, "WEBP", quality=quality, method=6, lossless=lossless)
        print(f"{source_name} -> {output_name} ({image.width}x{image.height}, {output.stat().st_size} bytes)")


# PageSpeed-focused derivatives. Keep the source masters for social sharing and
# high-density fallbacks while serving correctly sized assets to the homepage.
performance_derivatives = [
    ("hero-ps-banner-v4.png", "hero-ps-banner-v4.webp", 1942, 80, False),
    ("hero-ps-composite-v3.png", "hero-ps-composite-v3-1100.webp", 1100, 80, False),
    ("hero-ps-composite-v3.png", "hero-ps-composite-v3.webp", 1672, 80, False),
    ("brand-product-lab.webp", "brand-product-lab-480.webp", 480, 80, False),
    ("product-soy-ps.webp", "product-soy-ps-480.webp", 480, 80, False),
    ("product-sunflower-ps.webp", "product-sunflower-ps-480.webp", 480, 80, False),
    ("science-phosphatidylserine-lab-v2.webp", "science-phosphatidylserine-lab-v2-560.webp", 560, 80, False),
    ("logo-nutranexa.webp", "logo-nutranexa-260.webp", 260, 84, False),
    ("logo-nutranexa.webp", "logo-nutranexa-520.webp", 520, 84, False),
]

for args in performance_derivatives:
    save_derivative(*args)

for source in sorted((OUT / "claims").glob("claim-*.webp")):
    if re.search(r"-(48|96|112|224)$", source.stem):
        continue
    for width in (48, 96, 112, 224):
        output = source.with_name(f"{source.stem}-{width}.webp")
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert("RGBA")
            image.thumbnail((width, width), Image.Resampling.LANCZOS)
            image.save(output, "WEBP", method=6, lossless=True)
            print(f"{source.name} -> {output.name} ({image.width}x{image.height}, {output.stat().st_size} bytes)")
