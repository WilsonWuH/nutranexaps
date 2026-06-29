from pathlib import Path
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
