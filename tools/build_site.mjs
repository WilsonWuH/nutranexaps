import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const siteUrl = "https://nutranexaps.com";
const phone = "400-138-0635";
const salesEmail = "wh1007209170@gmail.com";
const whatsapp = "+8613645700210";
const address = "Yunhe West Road, Shizilou District, Yanggu County, Liaocheng City, Shandong Province, P.R. China";
const newsItems = JSON.parse(await fs.readFile(path.join(root, "content", "news.json"), "utf8"));

function whatsappButton() {
  return `<a class="whatsapp-float" href="https://wa.me/${whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener noreferrer" aria-label="Contact Nutranexa on WhatsApp"><span>WhatsApp</span><strong>${whatsapp}</strong></a>`;
}

const nav = [
  ["Home", "/"],
  ["Products", "/products/"],
  ["Applications", "/applications/"],
  ["Benefits", "/benefits/"],
  ["Manufacturing", "/manufacturing/"],
  ["Quality & R&D", "/quality-rd/"],
  ["Resources", "/resources/"],
  ["News", "/news/"],
  ["About", "/about/"],
  ["Contact", "/contact/"],
];

const megaNav = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products/",
    columns: [
      {
        title: "Core PS Ingredients",
        links: [
          ["Phosphatidylserine (PS)", "/products/phosphatidylserine/", "Core product page for PS ingredient buyers"],
          ["Soy Phosphatidylserine", "/products/soy-phosphatidylserine/", "Soy-source PS for supplement formulas"],
          ["Sunflower Phosphatidylserine", "/products/sunflower-phosphatidylserine/", "Sunflower-source option for non-soy positioning"],
        ],
      },
      {
        title: "Related Ingredient",
        links: [["Soluble Soybean Polysaccharide", "/products/soluble-soybean-polysaccharide/", "Functional food ingredient portfolio support"]],
      },
      {
        title: "Buyer Actions",
        links: [
          ["Request Specifications", "/contact/", "Ask for specs, COA and certificate files"],
          ["Review Manufacturing", "/manufacturing/", "Factory campus, cleanroom and equipment proof"],
        ],
      },
    ],
  },
  {
    label: "Applications",
    href: "/applications/",
    columns: [
      {
        title: "Use Cases",
        links: [
          ["Dietary Supplements", "/applications/dietary-supplements/", "Capsules, tablets and powder formats"],
          ["Functional Foods", "/applications/functional-foods/", "Milk powder, dairy drinks and nutrition formulas"],
        ],
      },
      {
        title: "Support Pages",
        links: [
          ["Quality & R&D", "/quality-rd/", "R&D cooperation and quality-control workflow"],
          ["Contact Sales", "/contact/", "Share application and annual quantity"],
        ],
      },
    ],
  },
  {
    label: "Benefits",
    href: "/benefits/",
    columns: [
      {
        title: "PS Value Areas",
        links: [
          ["Cognitive wellness", "/benefits/cognitive-wellness/", "PS value area for wellness concepts"],
          ["Brain health positioning", "/benefits/brain-health-positioning/", "Compliant phospholipid nutrition education"],
          ["Natural source options", "/benefits/natural-source-options/", "Soy-source and sunflower-source PS comparison"],
          ["Supplement formats", "/benefits/supplement-formats/", "Capsules, tablets, powders, and nutrition blends"],
          ["Functional foods", "/benefits/functional-foods/", "Milk powder, dairy drinks, and nutrition concepts"],
        ],
      },
      {
        title: "Related Pages",
        links: [
          ["Dietary Supplements", "/applications/dietary-supplements/", "Supplement format planning"],
          ["Functional Foods", "/applications/functional-foods/", "Food and beverage application discussion"],
          ["Request Application Support", "/contact/", "Share your product plan with sales"],
        ],
      },
    ],
  },
  { label: "Manufacturing", href: "/manufacturing/" },
  { label: "Quality & R&D", href: "/quality-rd/" },
  {
    label: "Resources",
    href: "/resources/",
    columns: [
      {
        title: "Buyer Guides",
        links: [
          ["Phosphatidylserine Guide", "/resources/phosphatidylserine-guide/", "Buyer guide for PS sourcing questions"],
          ["Choose a PS Supplier", "/resources/choose-phosphatidylserine-supplier/", "Supplier evaluation checklist"],
          ["Documents for PS Ingredients", "/resources/documents-for-ps-ingredients/", "Spec, COA and certificate request list"],
          ["Supply & Delivery Evidence", "/cases/", "Factory, packaging and dispatch project evidence"],
        ],
      },
      {
        title: "Product Education",
        links: [
          ["What Is Phosphatidylserine?", "/resources/what-is-phosphatidylserine/", "Definition and sourcing context"],
          ["Soy vs Sunflower PS", "/resources/soy-vs-sunflower-phosphatidylserine/", "Source comparison for buyers"],
          ["PS Powder Specifications", "/resources/phosphatidylserine-powder-specifications/", "Common specification questions"],
        ],
      },
    ],
  },
  { label: "News", href: "/news/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

const products = [
  {
    slug: "phosphatidylserine",
    name: "Phosphatidylserine (PS)",
    eyebrow: "Core ingredient page",
    title: "Phosphatidylserine Manufacturer for Supplement and Functional Food Brands",
    description:
      "Source bulk phosphatidylserine (PS) from Nutranexa for dietary supplements, nutrition powders, functional foods, and dairy-based product development.",
    image: "/assets/images/brand-product-lab.webp",
    imageAlt: "Nutranexa phosphatidylserine ingredient samples in a branded laboratory",
    cta: "Request a Quote",
    inquirySource: "General PS",
    inquiryAssay: "To be confirmed",
    moq: "25 kg",
    packaging: "25 kg net per drum",
    quick:
      "Phosphatidylserine (PS) is a functional food ingredient produced from natural lecithin and L-serine through bio-enzymatic conversion. Nutranexa supplies bulk PS ingredients for supplement manufacturers, ingredient distributors, nutrition brands, and functional food developers.",
    source: "Natural lecithin and L-serine; source-specific options include soy and sunflower PS.",
    applications: ["Dietary supplement tablets", "Soft and hard capsules", "Milk powder formulas", "Dairy beverages", "Functional food applications"],
    proof: ["Founded in 2013", "110,000+ m2 production campus", "Cooperation with East China University of Science and Technology", "PS production license obtained by the end of 2015"],
    docs: ["Specification: Available upon request", "COA samples: PS 20% sunflower and PS 50% samples available for buyer review", "Bulk packaging: 25 kg net per drum; MOQ 25 kg", "Certificate files: Halal, Kosher, food production license, FDA food facility registration document supplied"],
    downloads: [
      ["PS 20% English Specification", "/assets/documents/phosphatidylserine-20-specification.docx", "DOCX"],
    ],
    faqs: [
      ["What is phosphatidylserine used for in B2B formulations?", "It is used as a functional food and dietary supplement ingredient in formats such as tablets, capsules, milk powder, dairy drinks, and health food applications."],
      ["Can Nutranexa provide PS from different ingredient sources?", "Nutranexa offers soy phosphatidylserine and sunflower phosphatidylserine options. Final specifications should be confirmed before quotation."],
      ["Are specifications and COA available?", "Yes. Buyers can request current specifications, COA samples, and certificate files from the sales team before quotation or shipment."],
      ["What is the MOQ and packing size for phosphatidylserine?", "The MOQ is 25 kg. Standard bulk packing is 25 kg net per drum, so one drum meets the minimum order quantity."],
    ],
  },
  {
    slug: "soy-phosphatidylserine",
    name: "Soy Phosphatidylserine",
    eyebrow: "Soy-source PS",
    title: "Soy Phosphatidylserine Supplier for Bulk Supplement Ingredients",
    description:
      "Compare soy phosphatidylserine for capsules, tablets, powders, dairy nutrition formulas, and functional food ingredient sourcing.",
    image: "/assets/images/product-soy-ps.webp",
    imageAlt: "Soy phosphatidylserine powder product in a clean ingredient bowl",
    cta: "Request Specs",
    inquirySource: "Soy",
    inquiryAssay: "To be confirmed",
    moq: "25 kg",
    packaging: "25 kg net per drum",
    quick:
      "Soy phosphatidylserine is a PS ingredient made from soy lecithin and L-serine through bio-enzymatic conversion. It is suitable for buyers seeking a soy-source ingredient for supplements, nutrition powders, dairy formulas, and functional food product development.",
    source: "Soy lecithin and L-serine; exact PS content and particle specifications to be confirmed.",
    applications: ["Nutrition powders", "Tablet and capsule products", "Functional dairy formulas", "Private-label supplement development"],
    proof: ["Lead PS product focus", "Production equipment visibility", "R&D cooperation information available", "Quality control details available for buyer review"],
    docs: ["English PS 20% specification: Available for download", "COA sample: Current soy-source COA to be confirmed; reference PS samples are available for buyer review", "Bulk packaging: 25 kg net per drum; MOQ 25 kg"],
    downloads: [
      ["PS 20% English Specification", "/assets/documents/phosphatidylserine-20-specification.docx", "DOCX"],
    ],
    specification: [
      ["Ingredient base", "Soybean lecithin and L-serine"],
      ["PS content", ">= 20%"],
      ["Appearance", "Fine powder; light to brown yellow"],
      ["Moisture", "<= 2.0 g/100g"],
      ["Acetone insoluble", ">= 95 g/100g"],
      ["Residual n-hexane", "<= 25 mg/kg"],
      ["Total plate count", "<= 1,000 CFU/g"],
      ["Salmonella", "Negative / 25g"],
      ["Storage", "Cool, dry, and protected from light"],
      ["Document shelf life", "12 months"],
    ],
    faqs: [
      ["Who should request soy PS specifications?", "Ingredient importers, dietary supplement manufacturers, and food brands comparing source, content, and application fit should request specifications."],
      ["Is soy PS different from sunflower PS?", "Yes. They differ by ingredient source and buyer preference. Use the comparison article and request current specifications before purchasing."],
      ["Can I ask for application support?", "Yes. Use the quote form and include application, annual quantity, and required document needs."],
      ["What is the MOQ for soy phosphatidylserine?", "The MOQ is 25 kg, packed as 25 kg net per drum. Confirm the required drum quantity and shipment destination when requesting a quote."],
    ],
  },
  {
    slug: "sunflower-phosphatidylserine",
    name: "Sunflower Phosphatidylserine",
    eyebrow: "Sunflower-source PS",
    title: "Sunflower Phosphatidylserine Supplier for Non-Soy Nutrition Formulas",
    description:
      "Evaluate sunflower phosphatidylserine for non-soy supplement positioning, nutrition formulas, functional foods, and ingredient distribution.",
    image: "/assets/images/product-sunflower-ps.webp",
    imageAlt: "Sunflower phosphatidylserine powder product in a black bowl with sunflower seeds",
    cta: "Request a Quote",
    inquirySource: "Sunflower",
    inquiryAssay: "20%",
    moq: "25 kg",
    packaging: "25 kg net per drum",
    quick:
      "Sunflower phosphatidylserine is a source-specific PS ingredient for buyers who prefer a sunflower-origin option. Nutranexa supplies sunflower PS for B2B supplement, nutrition, and functional food projects, with current specifications and documents confirmed through sales.",
    source: "Sunflower-source ingredient base; final content, carrier, and test documents to be confirmed.",
    applications: ["Non-soy positioning", "Supplement capsules", "Functional food formulas", "Brand formulations requiring source differentiation"],
    proof: ["Product imagery available", "Manufacturing information available", "Quality and R&D details available", "Document request support prepared"],
    docs: ["Specification: Available upon request", "COA samples: PS 20% and PS 50% sunflower samples available for review", "Bulk packaging: 25 kg net per drum; MOQ 25 kg", "Certificate files: Halal, Kosher, and production documents supplied for buyer review"],
    faqs: [
      ["Why choose sunflower PS?", "Some brands prefer sunflower-source ingredients for positioning or formulation reasons. Buyers should confirm exact specs before quoting."],
      ["Can Nutranexa support supplement applications?", "Nutranexa supports PS ingredient discussions for dietary supplement and functional food applications without making medical treatment claims."],
      ["What details should I send for quotation?", "Share country, product format, application, annual quantity, and document requirements."],
      ["What is the MOQ for sunflower phosphatidylserine?", "The MOQ is 25 kg, packed as 25 kg net per drum. Final shipment and labeling details are confirmed with the quotation."],
    ],
  },
  {
    slug: "soluble-soybean-polysaccharide",
    name: "Soluble Soybean Polysaccharide",
    eyebrow: "Functional food ingredient",
    title: "Soluble Soybean Polysaccharide Supplier for Food and Beverage Applications",
    description:
      "Review soluble soybean polysaccharide for food, beverage, powder, and functional ingredient applications with supplier capability and document support.",
    image: "/assets/images/product-ssp.webp",
    imageAlt: "Soluble soybean polysaccharide powder in a product bowl with soybeans",
    cta: "Request a Quote",
    inquirySource: "Soybean-derived",
    inquiryAssay: "Not applicable",
    packaging: "20 kg net per bag",
    quick:
      "Soluble soybean polysaccharide is a water-soluble dietary fiber and food additive used in food and beverage formulation. The supplied TJ-110 specification describes a low-viscosity powder for acid protein beverage stabilization and related applications.",
    source: "Produced from soybean dietary fiber powder by pretreatment, enzymatic hydrolysis, separation, sterilization, and drying, according to the supplied manufacturer specification.",
    applications: ["Acid protein beverages", "Food and beverage stabilization", "Water-soluble dietary fiber formulations", "Powder and functional food applications"],
    proof: ["English manufacturer specification supplied", "GB 1886.322-2021 implementation standard stated", "Quality indicators and microbiological limits documented", "20 kg packaging and 24-month shelf life stated"],
    docs: ["English factory specification: Available for download", "COA: Request the current batch document", "Self-owned manufacturing entity shown on specification: Shandong Juyuan Biotechnology Co., Ltd."],
    downloads: [
      ["Soluble Soybean Polysaccharide Specification", "/assets/documents/soluble-soybean-polysaccharide-specification.pdf", "PDF"],
    ],
    specification: [
      ["Product model", "TJ-110"],
      ["Implementation standard", "GB 1886.322-2021"],
      ["Soluble polysaccharide", ">= 60.0%"],
      ["Moisture", "<= 7.0%"],
      ["Protein", "<= 8.0%"],
      ["Ash", "<= 10.0%"],
      ["Viscosity", "<= 200 mPa.s (10% aqueous solution, 20 +/- 0.5 C)"],
      ["pH", "5.5 +/- 1.0 (1% aqueous solution)"],
      ["Total plate count", "<= 500 CFU/g"],
      ["Packaging", "20 kg net per bag"],
      ["Shelf life", "24 months in a cool, dry place"],
    ],
    supplierNote: "The downloadable specification is issued by Shandong Juyuan Biotechnology Co., Ltd., a self-owned manufacturing entity in the supplied company materials. Confirm the current controlled specification, batch COA, and destination-market requirements before purchase.",
    faqs: [
      ["Is soluble soybean polysaccharide a main product?", "It is included in Nutranexa's product center and supports the broader functional food ingredient portfolio."],
      ["Are application details available?", "Application details should be confirmed with the sales team and technical documents before use."],
      ["Can I request specs together with PS products?", "Yes. Use the form and list multiple product interests."],
    ],
  },
];

const applications = [
  {
    slug: "dietary-supplements",
    title: "Phosphatidylserine Applications in Dietary Supplements",
    description: "Plan PS ingredient sourcing for tablets, soft capsules, hard capsules, powders, and supplement formats.",
    image: "/assets/images/dietary-supplement-application.webp",
    points: ["Tablet and capsule formulas", "Powder product development", "Source and content comparison", "Specification and COA requests"],
    formats: [
      ["Hard capsules", "Confirm particle profile, bulk density, flow, fill weight, source, and target PS assay before a production trial."],
      ["Tablets", "Evaluate compressibility, excipient compatibility, disintegration, color stability, and assay uniformity in the finished formula."],
      ["Soft capsules", "Confirm the quoted PS form, carrier system, oxidation control, compatibility, and storage requirements with technical documents."],
      ["Powder blends", "Test dispersibility, taste, caking, blend uniformity, moisture control, and packaging under the intended process conditions."],
    ],
  },
  {
    slug: "functional-foods",
    title: "PS Ingredient for Functional Food Applications",
    description: "Evaluate PS and functional food ingredient options for milk powder, dairy drinks, nutrition products, and health food concepts.",
    image: "/assets/images/functional-food-application.webp",
    points: ["Milk powder and nutrition formulas", "Dairy beverage applications", "Functional food ingredient positioning", "Compliance-aware content and document workflow"],
    formats: [
      ["Milk powder", "Evaluate blend uniformity, moisture exposure, flavor impact, target assay, serving format, and shelf-life conditions."],
      ["Dairy drinks", "Run bench tests for dispersion, sedimentation, heat treatment, pH, sensory impact, and processing losses."],
      ["Nutrition powders", "Confirm carrier compatibility, caking control, serving size, packaging barrier, and assay verification in the final blend."],
      ["Functional food concepts", "Define the target country, permitted positioning, process conditions, source preference, and required document package."],
    ],
  },
];

const documentProof = [
  {
    title: "Business License",
    text: "Company registration document for Shandong Baianrui Biopharmaceutical Co., Ltd.; established on Dec 25, 2013.",
    image: "/assets/images/doc-business-license.webp",
  },
  {
    title: "Food Production License",
    text: "Food production license document supplied; license period shown as Dec 10, 2025 to Dec 09, 2030.",
    image: "/assets/images/doc-food-production-license.webp",
  },
  {
    title: "Food Additive License Details",
    text: "Food additive production item details include phosphatidylserine-related product information.",
    image: "/assets/images/doc-food-additive-license-details.webp",
  },
  {
    title: "FDA Food Facility Registration",
    text: "Food facility registration document supplied for 2025-2026; this is not an FDA product endorsement.",
    image: "/assets/images/doc-fda-food-facility-registration.webp",
  },
  {
    title: "Kosher Certificate",
    text: "Kosher certification document supplied for phosphatidylserine, valid until May 31, 2027.",
    image: "/assets/images/doc-kosher-certificate.webp",
  },
  {
    title: "Halal Certificate",
    text: "Halal certificate document supplied for phosphatidylserine under Nutranexa / Shushi brand reference, valid Dec 26, 2024 to Dec 26, 2027.",
    image: "/assets/images/doc-halal-certificate.webp",
  },
];

const coaSamples = [
  {
    title: "PS 20% Sunflower COA Sample",
    image: "/assets/images/doc-coa-ps-20-sunflower.webp",
    rows: [
      ["Product", "Phosphatidylserine (Sunflower)"],
      ["Product model", "PP201"],
      ["Lot No.", "C01520260103"],
      ["Manufacture / test date", "Jan 8, 2026"],
      ["Report date", "Jan 13, 2026"],
      ["Test basis", "QB/T 5821-2023"],
      ["Phosphatidylserine", "23.7 g/100g; standard >= 20"],
      ["Moisture", "0.81 g/100g; standard <= 2.0"],
      ["Peroxide value", "0.65 mmol/kg; standard <= 2.5"],
      ["Acetone insoluble", "98.2 g/100g; standard >= 95.0"],
      ["Pb / As / Hg", "Not detected"],
      ["Cd", "<0.003 mg/kg"],
      ["Salmonella", "Not detected"],
    ],
  },
  {
    title: "PS 50% COA Sample",
    image: "/assets/images/doc-coa-ps-50.webp",
    rows: [
      ["Product", "Phosphatidylserine"],
      ["Product model", "PP501"],
      ["Lot No.", "C00120260302"],
      ["Manufacture / test date", "Mar 26, 2026"],
      ["Report date", "Mar 31, 2026"],
      ["Test basis", "QB/T 5821-2023"],
      ["Phosphatidylserine", "53.2 g/100g; standard 50-60"],
      ["Moisture", "0.89 g/100g; standard <= 2.0"],
      ["Peroxide value", "1.05 mmol/kg; standard <= 2.5"],
      ["Acetone insoluble", "98.1 g/100g; standard >= 95.0"],
      ["Pb / As / Hg", "Not detected"],
      ["Cd", "<0.003 mg/kg"],
      ["Salmonella", "Not detected"],
    ],
  },
  {
    title: "PS 50% Sunflower COA Sample",
    image: "/assets/images/doc-coa-ps-50-sunflower.webp",
    rows: [
      ["Product", "Phosphatidylserine (Sunflower)"],
      ["Product model", "PP501"],
      ["Lot No.", "C01520251002"],
      ["Manufacture / test date", "Oct 11, 2025"],
      ["Report date", "Oct 16, 2025"],
      ["Test basis", "QB/T 5821-2023"],
      ["Phosphatidylserine", "54.2 g/100g; standard >= 50"],
      ["Moisture", "0.69 g/100g; standard <= 2.0"],
      ["Peroxide value", "0.85 mmol/kg; standard <= 2.5"],
      ["Acetone insoluble", "98.2 g/100g; standard >= 95.0"],
      ["Pb / As / Hg", "Not detected"],
      ["Cd", "<0.003 mg/kg"],
      ["Salmonella", "Not detected"],
    ],
  },
];

const psSpecificationMatrix = [
  {
    product: "PS 20% Sunflower",
    source: "Sunflower lecithin",
    assay: ">= 20 g/100g",
    appearance: "Light to brown yellow powder",
    moisture: "<= 2.0 g/100g",
    peroxide: "<= 2.5 mmol/kg",
    acetone: ">= 95.0 g/100g",
    density: ">= 0.40 g/ml",
    shelfLife: "24 months",
    status: "Sample COA available",
  },
  {
    product: "PS 50%",
    source: "Confirm for quoted product",
    assay: "50-60 g/100g",
    appearance: "Light to brown yellow powder",
    moisture: "<= 2.0 g/100g",
    peroxide: "<= 2.5 mmol/kg",
    acetone: ">= 95.0 g/100g",
    density: "To be confirmed",
    shelfLife: "24 months",
    status: "Sample COA available",
  },
  {
    product: "Soy Phosphatidylserine",
    source: "Soy lecithin",
    assay: "Confirm current options",
    appearance: "Confirm current specification",
    moisture: "Confirm current specification",
    peroxide: "Confirm current specification",
    acetone: "Confirm current specification",
    density: "Confirm current specification",
    shelfLife: "To be confirmed",
    status: "Request current specification",
  },
];

const manufacturingSteps = [
  ["1", "Raw material confirmation", "Confirm lecithin source, L-serine, supplier documents, and incoming quality requirements."],
  ["2", "Bio-enzymatic conversion", "Use controlled processing to produce PS from the confirmed ingredient base; commercial process details remain confidential."],
  ["3", "Separation and purification", "Control impurities and process consistency according to the product specification and internal procedures."],
  ["4", "Drying, sieving, and blending", "Prepare the required powder profile and batch uniformity before final quality testing."],
  ["5", "Final QC and release", "Review assay, moisture, peroxide value, insoluble matter, heavy metals, and microbiology as applicable."],
  ["6", "Packaging and shipment review", "Confirm packaging, labels, batch documents, storage, and shipment requirements before dispatch."],
];

const qualityDocumentGroups = [
  ["Company identity", "Business License", "Company registration and legal-entity review."],
  ["Production scope", "Food Production License / Item Details", "Confirm validity, product scope, and applicability to the quoted product."],
  ["Product and batch", "Specification / Current Batch COA", "Match the exact source, target assay, batch, and destination-market requirements."],
  ["Market review", "Halal / Kosher / Facility Registration", "Request current copies and verify scope; facility registration is not product endorsement."],
  ["Technical support", "TDS / SDS", "Availability and current version must be confirmed with sales."],
  ["Label support", "Allergen / GMO Statements", "Request source-specific statements; do not infer allergen-free status from source alone."],
];

const psBenefitItems = [
  {
    title: "Cognitive wellness",
    slug: "cognitive-wellness",
    text: "Used in supplement concepts positioned for cognitive wellness and healthy lifestyle support.",
    pageTitle: "Phosphatidylserine for Cognitive Wellness Concepts",
    pageDescription: "Review how phosphatidylserine can be positioned in cognitive wellness supplement concepts while keeping claims compliant and document-led.",
    buyerValue: "For B2B supplement brands, PS can support product concepts built around cognitive wellness, study-focused lifestyles, and healthy aging positioning. Final wording should always be checked against the target market and finished product category.",
    image: "/assets/images/dietary-supplement-application.webp",
    points: ["Capsules, tablets, and powder blends", "Healthy lifestyle and cognitive wellness positioning", "Specification and COA review before launch", "No disease-treatment or guaranteed effect claims"],
    applications: ["Study and workday supplement concepts", "Healthy aging nutrition portfolios", "Capsule and tablet formulas for daily wellness positioning"],
    recommendedProducts: ["Phosphatidylserine (PS)", "Soy Phosphatidylserine", "Sunflower Phosphatidylserine"],
    buyerQuestions: ["What PS content and source does the target formula require?", "Which health or structure-function wording is permitted in the destination market?", "Will the finished product use capsules, tablets, powder sachets, or blended nutrition formats?"],
    documents: ["Current PS specification", "COA sample or current batch COA", "Source and allergen statement where required", "Label wording review by the buyer's local compliance team"],
    color: "#e88f8a",
    icon: "CW",
  },
  {
    title: "Brain health positioning",
    slug: "brain-health-positioning",
    text: "Supports brand education around phospholipid nutrition without disease-treatment claims.",
    pageTitle: "PS Ingredient for Brain Health Positioning",
    pageDescription: "Use phosphatidylserine in brain-health-oriented product education with careful wording, source confirmation, and verified documents.",
    buyerValue: "PS is often discussed by brands building nutrition products around phospholipid education and brain-health positioning. Supplier documents, label wording, and regional compliance should be confirmed before commercial use.",
    image: "/assets/images/brand-product-lab.webp",
    points: ["Ingredient education around phospholipid nutrition", "Brand positioning without medical claims", "Soy PS and sunflower PS source discussion", "Technical document review for importer confidence"],
    applications: ["Brain-health-oriented brand education", "Nutrition products built around phospholipid ingredient stories", "Distributor catalogs that need clear source and document language"],
    recommendedProducts: ["Phosphatidylserine (PS)", "Sunflower Phosphatidylserine", "Soy Phosphatidylserine"],
    buyerQuestions: ["Does the market allow the intended brain-health wording?", "Should the brand emphasize soy-source or sunflower-source PS?", "Which documents are needed for importer, distributor, or brand review?"],
    documents: ["Specification sheet", "COA sample", "Halal / Kosher files where market requires them", "Food production license or facility registration files for buyer review"],
    color: "#7777c2",
    icon: "BH",
  },
  {
    title: "Natural source options",
    slug: "natural-source-options",
    text: "Soy-source and sunflower-source PS options support label planning and market preferences.",
    pageTitle: "Soy and Sunflower PS Source Options",
    pageDescription: "Compare soy-source and sunflower-source phosphatidylserine options for label positioning, sourcing preference, and buyer document review.",
    buyerValue: "Source preference can affect label positioning, buyer acceptance, and product planning. Nutranexa separates soy phosphatidylserine and sunflower phosphatidylserine so buyers can compare source, specification, and document needs.",
    image: "/assets/images/product-sunflower-ps.webp",
    points: ["Soy-source PS for conventional formulation paths", "Sunflower-source PS for non-soy positioning", "Source-specific specification requests", "COA and certificate review before quotation"],
    applications: ["Non-soy supplement product planning", "Soy-source PS formulas where cost and availability are important", "Ingredient distribution portfolios that need both source options"],
    recommendedProducts: ["Soy Phosphatidylserine", "Sunflower Phosphatidylserine", "Phosphatidylserine (PS)"],
    buyerQuestions: ["Does the target label require non-soy positioning?", "Are allergen, source, or regional buyer preferences important?", "Do COA, specification, and certificate files match the exact source being quoted?"],
    documents: ["Soy-source or sunflower-source specification", "COA matching the quoted product source", "Allergen and source statement where required", "Certificate scope and product applicability confirmation"],
    color: "#99cf00",
    icon: "SO",
  },
  {
    title: "Supplement formats",
    slug: "supplement-formats",
    text: "Suitable for buyer evaluation in capsules, tablets, powders, and nutrition blends.",
    pageTitle: "PS Applications in Supplement Formats",
    pageDescription: "Evaluate phosphatidylserine for capsules, tablets, powder blends, and nutrition supplement formats with specification and application support.",
    buyerValue: "Different supplement formats require different sourcing questions. Buyers should discuss target PS content, source, carrier, particle properties, packaging, annual demand, and COA requirements before sampling.",
    image: "/assets/images/dietary-supplement-application.webp",
    points: ["Hard capsules and soft capsules", "Tablet and powder blend evaluation", "Particle, content, and packaging questions", "Application support before sample request"],
    applications: ["Hard capsule and soft capsule production", "Tablet formulas that need flow and content confirmation", "Powder blends, sachets, and nutrition mix concepts"],
    recommendedProducts: ["Phosphatidylserine (PS)", "Soy Phosphatidylserine", "Sunflower Phosphatidylserine"],
    buyerQuestions: ["What dosage form will be used in production?", "What PS content, carrier, particle profile, and packaging size are required?", "Does the buyer need sample support before bulk quotation?"],
    documents: ["PS powder specification", "COA sample or current batch COA", "Packaging, storage, and shelf-life information", "Sample request and shipment information"],
    color: "#f49b10",
    icon: "SF",
  },
  {
    title: "Functional foods",
    slug: "functional-foods",
    text: "Can be discussed for milk powder, dairy drinks, and other functional food applications.",
    pageTitle: "PS for Functional Food Applications",
    pageDescription: "Discuss phosphatidylserine application value for milk powder, dairy drinks, nutrition products, and functional food development.",
    buyerValue: "Functional food projects need early discussion around format, processing conditions, source preference, document needs, and permitted wording. Nutranexa can support buyer evaluation before formulation and quotation.",
    image: "/assets/images/functional-food-application.webp",
    points: ["Milk powder and nutrition powder concepts", "Dairy beverage application discussion", "Functional food ingredient positioning", "Specification and regulatory wording review"],
    applications: ["Milk powder and nutrition powder concepts", "Dairy beverage and functional drink development", "Functional food formulas that require source and process discussion"],
    recommendedProducts: ["Phosphatidylserine (PS)", "Sunflower Phosphatidylserine", "Soluble Soybean Polysaccharide"],
    buyerQuestions: ["What processing conditions and product format should be considered?", "Is PS used alone or with related functional food ingredients?", "What documents are needed before formulation testing or shipment?"],
    documents: ["Application-related specification", "COA sample or current batch COA", "Packaging and storage information", "Market-specific compliance files where relevant"],
    color: "#ffc12b",
    icon: "FF",
  },
];

const promotedArticleVisuals = {
  "phosphatidylserine-rfq-checklist-importers": "Procurement manager preparing a structured phosphatidylserine RFQ with product sample, source options, quantity, and document checklist",
  "phosphatidylserine-pre-shipment-inspection-checklist": "Quality inspector checking sealed phosphatidylserine drums, labels, packing list, and shipment release records before dispatch",
  "phosphatidylserine-coa-specification-certificate-review": "Quality assurance reviewer comparing a phosphatidylserine specification, certificate of analysis, and supporting document set",
  "phosphatidylserine-moq-packaging-lead-time": "Bulk phosphatidylserine order planning desk with one 25 kilogram drum, packaging plan, calendar, and logistics schedule",
  "soy-vs-sunflower-phosphatidylserine-supplier-selection": "Buyer comparison workspace showing separate soy and sunflower phosphatidylserine samples with supplier evaluation records",
  "phosphatidylserine-repeat-order-document-review": "Repeat-order change control review with current and previous phosphatidylserine specifications, batch records, and packaging references",
  "phosphatidylserine-sample-evaluation-bulk-approval": "Formulation and quality team evaluating a phosphatidylserine sample before approving commercial bulk supply",
  "soluble-soybean-polysaccharide-supplier-selection": "Soluble soybean polysaccharide application trial with beverage samples, powder dispersion, specification, and supplier review notes",
  "phosphatidylserine-functional-food-applications": "Functional food development bench with phosphatidylserine powder, nutrition beverage prototypes, and application review records",
  "phosphatidylserine-incoming-inspection-warehouse-release": "Warehouse receiving team inspecting phosphatidylserine drums, lot labels, delivery records, and quarantine status before release",
  "phosphatidylserine-supplier-onboarding": "Cross-functional procurement and quality meeting reviewing a new phosphatidylserine supplier onboarding file",
  "phosphatidylserine-contract-manufacturer-handoff": "Private-label team handing a phosphatidylserine technical package to a contract manufacturing production specialist",
  "sunflower-phosphatidylserine-supplier-document-review": "European supplement buyer reviewing sunflower phosphatidylserine source documents beside a powder sample and sunflower seeds",
  "phosphatidylserine-annual-supplier-review": "Annual phosphatidylserine supplier review meeting with scorecard, specification revisions, COA records, and source samples",
  "soya-phosphatidylserine-labeling-europe": "European supplement labeling review with soy phosphatidylserine sample, soybeans, blank package mockups, and compliance tools",
  "phosphatidylserine-lot-traceability-checklist": "Phosphatidylserine lot traceability review with sealed drums, barcode scanning tools, and shipment release documents",
  "phosphatidylserine-distributor-document-pack": "North American phosphatidylserine distributor preparing a customer document pack with source-specific files, sealed drum, shipping carton, and warehouse backdrop",
  "sunflower-phosphatidylserine-europe-source-change": "Top-down Europe-focused procurement review comparing soya and sunflower phosphatidylserine source folders, blank change-control notes, soybeans, and sunflower seeds",
  "phosphatidylserine-heavy-metals-review-europe": "European quality-control review of phosphatidylserine heavy-metals data with sample dish, elemental-analysis lab tools, and blank compliance notes",
  "phosphatidylserine-microbiological-review-europe": "European quality specialist reviewing phosphatidylserine microbiological release data beside sterile petri dishes, sealed ingredient drum, and blank QA records",
  "phosphatidylserine-supplier-coa-qualification-us": "US contract manufacturer reviewing phosphatidylserine incoming approval with retain samples, sealed drum, and identity-testing tools",
  "phosphatidylserine-allergen-statement-us-eu": "Side-angle quality and regulatory review of soy and sunflower phosphatidylserine source samples, blank allergen checklist cards, and a sealed bulk drum in a daylight office",
  "phosphatidylserine-gmo-statement-us-eu": "Cross-border phosphatidylserine GMO statement review with soy and sunflower source samples, blank declaration cards, and a sealed 25 kilogram drum in a procurement office",
  "phosphatidylserine-canada-nhp-vs-supplemented-food": "Canadian phosphatidylserine route review showing a capsule bottle dossier beside a supplemented-food can mockup, soy sample dish, and blank compliance cards on a regulatory desk",
  "phosphatidylserine-shelf-life-storage-review-us-eu": "Cross-border phosphatidylserine shelf-life review with a sealed 25 kilogram drum, temperature logger, humidity monitor, pallet wrap sample, and blank storage-control cards in a warehouse office",
  "phosphatidylserine-irradiation-statement-us-eu": "Cross-border phosphatidylserine irradiation-status review with a sealed 25 kilogram drum, amber dosimeter tags, blank compliance cards, and QA reviewers in a daylight technical office",
  "phosphatidylserine-proposition-65-statement-us": "California-facing phosphatidylserine compliance review with a sealed 25 kilogram drum, elemental-analysis display, amber supplement bottle mockup, and QA-procurement team aligning exposure assumptions in a daylight office",
  "phosphatidylserine-gluten-free-statement-us-eu": "Cross-border phosphatidylserine gluten-free review with a sealed 25 kilogram drum, a phosphatidylserine powder dish, wheat and barley grain cues kept outside the approval area, and blank QA cards in a daylight technical office",
  "phosphatidylserine-supplement-facts-label-us": "U.S. supplement label review with a blank amber bottle, clean Supplement Facts layout placeholder, soy and sunflower route cues, a phosphatidylserine powder dish, and a sealed drum edge in a daylight regulatory office",
  "phosphatidylserine-sds-review-us-eu": "Cross-border phosphatidylserine SDS review at a warehouse handoff desk with a sealed 25 kilogram drum, white powder dish, blank section-divider tabs, barcode scanner, safety glasses, and a soft-focus loading bay",
  "phosphatidylserine-eu-customs-clearance-checklist": "European phosphatidylserine customs-clearance preparation with a sealed 25 kilogram drum, powder and source samples, barcode scanner, scale, and a visual classification-to-import-control route board beside a morning container terminal",
};

const promotedSeoTitles = {
  "phosphatidylserine-rfq-checklist-importers": "PS RFQ Checklist for Importers | Nutranexa",
  "phosphatidylserine-pre-shipment-inspection-checklist": "PS Pre-Shipment Inspection Checklist | Nutranexa",
  "phosphatidylserine-coa-specification-certificate-review": "Phosphatidylserine COA Review Guide | Nutranexa",
  "phosphatidylserine-moq-packaging-lead-time": "PS MOQ, Packaging & Lead-Time Guide | Nutranexa",
  "soy-vs-sunflower-phosphatidylserine-supplier-selection": "Soy vs Sunflower PS Supplier Selection | Nutranexa",
  "phosphatidylserine-repeat-order-document-review": "PS Repeat-Order Document Review | Nutranexa",
  "phosphatidylserine-sample-evaluation-bulk-approval": "PS Sample Evaluation Checklist | Nutranexa",
  "soluble-soybean-polysaccharide-supplier-selection": "Soluble Soybean Polysaccharide Supplier Guide | Nutranexa",
  "phosphatidylserine-functional-food-applications": "PS Functional Food Applications Guide | Nutranexa",
  "phosphatidylserine-incoming-inspection-warehouse-release": "PS Incoming Inspection Checklist | Nutranexa",
  "phosphatidylserine-supplier-onboarding": "Phosphatidylserine Supplier Onboarding | Nutranexa",
  "phosphatidylserine-contract-manufacturer-handoff": "PS Contract Manufacturer Handoff | Nutranexa",
  "sunflower-phosphatidylserine-supplier-document-review": "Sunflower PS Document Review for Europe | Nutranexa",
  "phosphatidylserine-annual-supplier-review": "PS Annual Supplier Review | Nutranexa",
  "soya-phosphatidylserine-labeling-europe": "Soya Phosphatidylserine Labeling for Europe | Nutranexa",
  "phosphatidylserine-lot-traceability-checklist": "PS Lot Traceability Checklist | Nutranexa",
  "sunflower-phosphatidylserine-europe-source-change": "Can Sunflower PS Replace Soya PS in Europe? | Nutranexa",
  "phosphatidylserine-heavy-metals-review-europe": "PS Heavy Metals Review for Europe | Nutranexa",
  "phosphatidylserine-microbiological-review-europe": "PS Microbiological Review for Europe | Nutranexa",
  "phosphatidylserine-supplier-coa-qualification-us": "Can US Manufacturers Rely on a PS Supplier COA? | Nutranexa",
  "phosphatidylserine-allergen-statement-us-eu": "Phosphatidylserine Allergen Statement Checklist | Nutranexa",
  "phosphatidylserine-canada-nhp-vs-supplemented-food": "Phosphatidylserine Canada Checklist: NHP vs Supplemented Food | Nutranexa",
  "phosphatidylserine-shelf-life-storage-review-us-eu": "PS Shelf-Life & Storage Review | Nutranexa",
  "phosphatidylserine-proposition-65-statement-us": "PS Proposition 65 Statement Review for US Brands | Nutranexa",
  "phosphatidylserine-gluten-free-statement-us-eu": "PS Gluten-Free Statement Review | Nutranexa",
  "phosphatidylserine-supplement-facts-label-us": "PS Supplement Facts Label Review for US Brands | Nutranexa",
  "phosphatidylserine-sds-review-us-eu": "PS SDS Review for US and EU Buyers | Nutranexa",
};

function conciseMeta(value) {
  if (value.length <= 160) return value;
  return `${value.slice(0, 157).replace(/\s+\S*$/, "").replace(/[,.\s]+$/, "")}.`;
}

function metaValue(markdown, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.match(new RegExp(`^[-*] ${escaped}:\\s*([^\\r\\n]+)`, "mi"))?.[1]?.replace(/`/g, "").trim() || "";
}

function inlineMarkdown(value) {
  return esc(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function markdownTable(lines, start) {
  if (!lines[start]?.includes("|") || !/^\s*\|?\s*:?-{3,}/.test(lines[start + 1] || "")) return null;
  const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
  const headings = cells(lines[start]);
  const rows = [];
  let index = start + 2;
  while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
    rows.push(cells(lines[index]));
    index += 1;
  }
  return {
    next: index,
    html: `<div class="article-table-wrap"><table><thead><tr>${headings.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
  };
}

function renderResourceMarkdown(markdown) {
  const start = markdown.indexOf("## Introduction");
  if (start < 0) return "";
  const stopMarkers = ["## CTA", "## Image Planning", "## Popup / CTA Plan", "## Internal Linking Suggestions"];
  const stops = stopMarkers.map((marker) => markdown.indexOf(marker, start + 1)).filter((index) => index > start);
  const content = markdown.slice(start, stops.length ? Math.min(...stops) : markdown.length);
  const lines = content.split(/\r?\n/);
  const html = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line === "---") { i += 1; continue; }
    if (/^## (Introduction|Main Content)$/i.test(line)) { i += 1; continue; }
    const table = markdownTable(lines, i);
    if (table) { html.push(table.html); i = table.next; continue; }
    const heading = line.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      const level = heading[1] === "##" ? 2 : 3;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      const items = [];
      while (i < lines.length) {
        const match = lines[i].trim().match(/^[-*]\s+(.+)$/);
        if (!match) break;
        items.push(`<li>${inlineMarkdown(match[1])}</li>`);
        i += 1;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      const items = [];
      while (i < lines.length) {
        const match = lines[i].trim().match(/^\d+\.\s+(.+)$/);
        if (!match) break;
        items.push(`<li>${inlineMarkdown(match[1])}</li>`);
        i += 1;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }
    const paragraph = [line];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || /^(##|###)\s+/.test(next) || /^[-*]\s+/.test(next) || /^\d+\.\s+/.test(next) || markdownTable(lines, i)) break;
      paragraph.push(next);
      i += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }
  return html.join("\n");
}

function extractResourceFaqs(markdown) {
  const faqStart = markdown.search(/^## FAQ\s*$/mi);
  if (faqStart < 0) return [];
  const faqBlock = markdown.slice(faqStart + markdown.slice(faqStart).indexOf("\n") + 1);
  const nextH2 = faqBlock.search(/^## (?!#)/m);
  const section = nextH2 >= 0 ? faqBlock.slice(0, nextH2) : faqBlock;
  return [...section.matchAll(/^###\s+(.+)\r?\n([\s\S]*?)(?=^###\s+|(?![\s\S]))/gm)].map((match) => {
    const answer = match[2].replace(/^[-*]\s+/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`#]/g, "").replace(/\s+/g, " ").trim();
    return [match[1].trim(), answer];
  }).filter(([, answer]) => answer);
}

async function loadPromotedArticles() {
  const directory = path.join(root, "content", "resources");
  const entries = (await fs.readdir(directory))
    .filter((name) => name.endsWith(".md"))
    .map(async (name) => ({ name, stat: await fs.stat(path.join(directory, name)) }));
  const names = (await Promise.all(entries))
    .sort((a, b) => {
      const dateCompare = b.name.slice(0, 10).localeCompare(a.name.slice(0, 10));
      if (dateCompare !== 0) return dateCompare;
      const mtimeCompare = b.stat.mtimeMs - a.stat.mtimeMs;
      if (mtimeCompare !== 0) return mtimeCompare;
      return b.name.localeCompare(a.name);
    })
    .map(({ name }) => name);
  return Promise.all(names.map(async (name) => {
    const markdown = await fs.readFile(path.join(directory, name), "utf8");
    const route = metaValue(markdown, "URL Slug");
    const slug = route.replace(/^\/resources\//, "").replace(/\/$/, "");
    const title = metaValue(markdown, "H1") || metaValue(markdown, "SEO Title");
    return {
      slug,
      title,
      seoTitle: promotedSeoTitles[slug] || metaValue(markdown, "SEO Title"),
      description: conciseMeta(metaValue(markdown, "Meta Description")),
      primaryKeyword: metaValue(markdown, "Primary Keyword"),
      published: name.slice(0, 10),
      image: `/assets/images/resource-${slug}.webp`,
      imageAlt: promotedArticleVisuals[slug] || `${title} guide for ingredient buyers`,
      contentHtml: renderResourceMarkdown(markdown),
      faqs: extractResourceFaqs(markdown),
    };
  }));
}

const evergreenArticles = [
  {
    slug: "what-is-phosphatidylserine",
    title: "What Is Phosphatidylserine?",
    description: "A B2B overview of phosphatidylserine as a functional food ingredient for supplement and nutrition product buyers.",
    image: "/assets/images/resource-what-is-phosphatidylserine.webp",
    imageAlt: "Phosphatidylserine powder beside a phospholipid bilayer model in a food science laboratory",
    body: [
      "Phosphatidylserine, often shortened to PS, is a phospholipid ingredient used in functional food and dietary supplement applications. For B2B buyers, the most important sourcing questions are source, specification, document availability, manufacturing capability, and application fit.",
      "Nutranexa positions PS as a lead product developed through cooperation with East China University of Science and Technology. The ingredient is described as being made from natural lecithin and L-serine through bio-enzymatic conversion.",
      "Buyers should request verified specifications, COA, packaging details, and intended application support before placing a purchase order.",
    ],
  },
  {
    slug: "soy-vs-sunflower-phosphatidylserine",
    title: "Soy Phosphatidylserine vs Sunflower Phosphatidylserine",
    description: "Compare soy-source and sunflower-source PS options for formulation and sourcing decisions.",
    image: "/assets/images/resource-soy-vs-sunflower-ps.webp",
    imageAlt: "Soy and sunflower phosphatidylserine powder samples shown with their separate source materials",
    body: [
      "Soy phosphatidylserine and sunflower phosphatidylserine are source-specific PS options. The right choice depends on formulation preference, brand positioning, regional buyer expectations, and available technical documents.",
      "Soy PS is often evaluated by buyers who accept soy-derived ingredients and want a conventional source path. Sunflower PS can be relevant when a brand prefers a non-soy source position.",
      "Before purchase, compare PS content, carrier, particle profile, allergen considerations, packaging, COA, and application support.",
    ],
  },
  {
    slug: "choose-phosphatidylserine-supplier",
    title: "How to Choose a Phosphatidylserine Supplier",
    description: "A sourcing checklist for importers and manufacturers evaluating PS ingredient suppliers.",
    image: "/assets/images/resource-choose-ps-supplier.webp",
    imageAlt: "Ingredient buyer and quality specialist reviewing a phosphatidylserine sample at a manufacturing site",
    body: [
      "A phosphatidylserine supplier should be evaluated on manufacturing capability, quality control, product document readiness, source transparency, and responsiveness to application questions.",
      "Useful proof points include factory imagery, R&D cooperation, production license information, equipment visibility, and clear product information that avoids unsupported claims.",
      "Ask for specifications, COA, packaging options, lead time, MOQ, sample policy, and the intended application before comparing prices.",
    ],
  },
  {
    slug: "phosphatidylserine-dietary-supplements",
    title: "Phosphatidylserine Applications in Dietary Supplements",
    description: "How B2B buyers can evaluate PS for tablets, capsules, powders, and supplement ingredient portfolios.",
    image: "/assets/images/resource-ps-dietary-supplements.webp",
    imageAlt: "Phosphatidylserine powder arranged with capsule softgel tablet and powder supplement formats",
    body: [
      "PS can be evaluated for supplement formats such as tablets, soft capsules, hard capsules, and nutrition powders. The final use should be checked against regional regulations and verified technical documents.",
      "For sourcing, buyers should define product format, target market, annual quantity, and document requirements before requesting a quote.",
      "A clear application brief helps the supplier respond with relevant specification and sampling guidance.",
    ],
  },
  {
    slug: "documents-for-ps-ingredients",
    title: "What Documents Should Buyers Request for PS Ingredients?",
    description: "A practical document checklist for phosphatidylserine ingredient sourcing.",
    image: "/assets/images/resource-ps-documents-checklist.webp",
    imageAlt: "Technical document review desk with a phosphatidylserine sample and quality records",
    body: [
      "For PS ingredient sourcing, buyers commonly request specification sheets, COA, production license evidence, packaging information, test methods, and any market-specific compliance documents.",
      "Documents should be current, tied to the exact product being quoted, and reviewed before samples or bulk purchase.",
      "Buyers should request current files from the sales team and confirm that each document matches the product, source, batch, and destination market.",
    ],
  },
  {
    slug: "phosphatidylserine-powder-specifications",
    title: "Phosphatidylserine Powder: Common Specifications to Confirm",
    description: "Specification questions buyers should clarify before sourcing PS powder.",
    image: "/assets/images/resource-ps-powder-specifications.webp",
    imageAlt: "Phosphatidylserine powder undergoing laboratory balance moisture and particle size checks",
    body: [
      "When sourcing PS powder, buyers should confirm PS content, source, carrier, particle properties, packaging size, shelf life, storage, test method, and COA format.",
      "Specification needs vary by application. A capsule manufacturer may care about flow and content, while a powder formula buyer may also need solubility and blending details.",
      "Do not rely on a generic product name alone. Match each quote to current specifications and intended use.",
    ],
  },
  {
    slug: "functional-food-ingredient-manufacturing",
    title: "Functional Food Ingredient Manufacturing: What Buyers Should Check",
    description: "A factory and quality checklist for buyers sourcing functional food ingredients from China.",
    image: "/assets/images/resource-functional-food-manufacturing.webp",
    imageAlt: "Clean functional food ingredient manufacturing hall with stainless steel process equipment",
    body: [
      "Functional food ingredient buyers should review production capability, quality control, R&D support, documented processes, and visible factory evidence.",
      "Nutranexa provides factory campus, equipment, cleanroom, and R&D-related imagery for supplier capability review.",
      "Before purchase, ask for product-specific documents and verify claims against files supplied by the sales team.",
    ],
  },
  {
    slug: "soluble-soybean-polysaccharide-uses",
    title: "Soluble Soybean Polysaccharide: Uses and Supplier Considerations",
    description: "A B2B introduction to soluble soybean polysaccharide sourcing and application questions.",
    image: "/assets/images/resource-soluble-soybean-polysaccharide-uses.webp",
    imageAlt: "Soluble soybean polysaccharide powder used in beverage and emulsion application testing",
    body: [
      "Soluble soybean polysaccharide is part of Nutranexa's functional food ingredient product range. Buyers should evaluate application fit, specification details, and document availability before sourcing.",
      "Useful sourcing questions include ingredient source, specification, packaging, target application, annual demand, and whether technical support is available.",
      "This product can support a broader ingredient portfolio alongside phosphatidylserine products.",
    ],
  },
  {
    slug: "phosphatidylserine-guide",
    title: "Phosphatidylserine Guide for Ingredient Buyers",
    description: "A buyer-focused guide covering PS definition, sources, applications, documents, and supplier evaluation.",
    image: "/assets/images/resource-phosphatidylserine-buyers-guide.webp",
    imageAlt: "Global phosphatidylserine sourcing guide with source samples documents factory and shipping context",
    body: [
      "This guide summarizes phosphatidylserine for importers, distributors, supplement manufacturers, and functional food brands. PS is a functional food ingredient commonly evaluated by source, specification, documents, and supplier capability.",
      "Nutranexa's PS product line includes soy phosphatidylserine and sunflower phosphatidylserine. Buyers should compare source preference, formulation requirements, and document needs before quotation.",
      "Strong buyer evaluation includes factory proof, R&D cooperation, quality control visibility, production license references, specification review, and clear application communication.",
      "This guide provides concise definitions, source distinctions, buyer checklists, and product links for deeper evaluation.",
    ],
    pillar: true,
  },
];

const promotedArticles = await loadPromotedArticles();
const articles = [...promotedArticles, ...evergreenArticles];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function urlFor(route) {
  return `${siteUrl}${route}`;
}

function routeToFile(route) {
  if (route === "/") return path.join(root, "index.html");
  return path.join(root, route, "index.html");
}

function asset(pathname) {
  return pathname;
}

function breadcrumbJson(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item[0],
      item: urlFor(item[1]),
    })),
  };
}

function organizationJson() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shandong Baianrui Biopharmaceutical Co., Ltd.",
    alternateName: ["Nutranexa", "Baianrui"],
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo-nutranexa.webp`,
    contactPoint: [{ "@type": "ContactPoint", telephone: phone, email: salesEmail, contactType: "sales", areaServed: ["Europe", "North America", "Worldwide"], availableLanguage: ["English", "Chinese"] }],
    address: { "@type": "PostalAddress", streetAddress: address, addressCountry: "CN" },
    foundingDate: "2013",
  };
}

function websiteJson() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nutranexa",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/resources/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function productJson(product, route) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    brand: { "@type": "Brand", name: "Nutranexa" },
    manufacturer: { "@type": "Organization", name: "Shandong Baianrui Biopharmaceutical Co., Ltd." },
    category: "Functional food ingredient",
    url: urlFor(route),
    ...(product.moq ? { additionalProperty: [
      { "@type": "PropertyValue", name: "Minimum order quantity", value: product.moq },
      { "@type": "PropertyValue", name: "Bulk packaging", value: product.packaging },
    ] } : {}),
  };
}

function articleJson(article, route) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${siteUrl}${article.image}`,
    author: { "@type": "Organization", name: "Nutranexa" },
    publisher: { "@type": "Organization", name: "Nutranexa", logo: { "@type": "ImageObject", url: `${siteUrl}/assets/images/logo-nutranexa.webp` } },
    mainEntityOfPage: urlFor(route),
    ...(article.published ? { datePublished: article.published, dateModified: article.published } : {}),
  };
}

function resourceFaqJson(article) {
  if (!article.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function layout({ title, description, route, body, schema = [], image = "/assets/images/factory-aerial-wide.webp" }) {
  const active = route.split("/")[1] || "";
  const canonical = urlFor(route);
  const allSchema = [organizationJson(), websiteJson(), ...schema];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="naver-site-verification" content="c6d0c699471e32f496c25af5be8693ab4c4580e8">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}${image}">
  <link rel="icon" href="/assets/images/logo-nutranexa-icon.png">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(allSchema)}</script>
  <script>
    window.dataLayer = window.dataLayer || [];
    window.NUTRANEXA_ANALYTICS = { ga4: "G-TO-BE-CONFIGURED", ads: "AW-TO-BE-CONFIGURED", clarity: "TO-BE-CONFIGURED" };
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="nav-shell">
      <a class="brand" href="/" aria-label="Nutranexa home">
        <img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa logo" width="260" height="60">
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
        ${renderMegaNav(active)}
      </nav>
      <a class="nav-cta" href="/contact/">Request a Quote</a>
    </div>
  </header>
  <main id="main">${body}</main>
  ${footer()}
  ${whatsappButton()}
  <script src="/assets/site.js" defer></script>
</body>
</html>`;
}

function plainNewsArticleLayout({ title, description, route, body, schema = [], image, imageAlt = "" }) {
  const canonical = urlFor(route);
  const allSchema = [organizationJson(), websiteJson(), ...schema];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="naver-site-verification" content="c6d0c699471e32f496c25af5be8693ab4c4580e8">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}${image}">
  <meta property="og:image:alt" content="${esc(imageAlt)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="800">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${siteUrl}${image}">
  <meta name="twitter:image:alt" content="${esc(imageAlt)}">
  <link rel="icon" href="/assets/images/logo-nutranexa-icon.png">
  <script type="application/ld+json">${JSON.stringify(allSchema)}</script>
</head>
<body>
<main>
${body}
</main>
</body>
</html>`;
}

function isActiveNav(item, active) {
  if (item.href === "/") return active === "";
  return item.href.includes(`/${active}/`) || item.href === `/${active}/`;
}

function renderMegaNav(active) {
  return megaNav
    .map((item) => {
      const activeClass = isActiveNav(item, active) ? "active" : "";
      if (!item.columns) {
        return `<a class="nav-link ${activeClass}" href="${item.href}">${item.label}</a>`;
      }
      return `<div class="nav-item has-mega">
        <a class="nav-link ${activeClass}" href="${item.href}">${item.label}</a>
        <div class="mega-panel" aria-label="${item.label} menu">
          <div class="mega-inner">
            <div class="mega-feature">
              <p class="eyebrow">${item.label}</p>
              <h2>${item.label === "Products" ? "Source PS ingredients with clear buyer paths." : item.label === "Applications" ? "Connect ingredients to compliant applications." : "Build buyer trust before the inquiry."}</h2>
              <a href="${item.href}">View ${item.label}</a>
            </div>
            ${item.columns
              .map(
                (column) => `<div class="mega-column">
                  <h3>${column.title}</h3>
                  ${column.links.map(([label, href, text]) => `<a class="mega-link" href="${href}"><span>${label}</span><small>${text}</small></a>`).join("")}
                </div>`,
              )
              .join("")}
          </div>
        </div>
      </div>`;
    })
    .join("");
}

function footer() {
  return `<footer class="site-footer">
  <div class="footer-grid">
    <div>
      <img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa logo" class="footer-logo">
      <p>Functional food ingredient manufacturer focused on phosphatidylserine and related nutrition ingredient applications.</p>
      <p class="small">Brand: Nutranexa / Baianrui. Product brand references include Shushi PS.</p>
    </div>
    <div>
      <h2>Products</h2>
      <a href="/products/phosphatidylserine/">Phosphatidylserine</a>
      <a href="/products/soy-phosphatidylserine/">Soy Phosphatidylserine</a>
      <a href="/products/sunflower-phosphatidylserine/">Sunflower Phosphatidylserine</a>
      <a href="/products/soluble-soybean-polysaccharide/">Soluble Soybean Polysaccharide</a>
    </div>
    <div>
      <h2>Buyer Paths</h2>
      <a href="/applications/dietary-supplements/">Dietary Supplements</a>
      <a href="/applications/functional-foods/">Functional Foods</a>
      <a href="/manufacturing/">Manufacturing</a>
      <a href="/quality-rd/">Quality & R&D</a>
      <a href="/cases/">Cases & Projects</a>
      <a href="/news/">News</a>
    </div>
    <div>
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${salesEmail}">${salesEmail}</a></p>
      <p>WhatsApp: <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">${whatsapp}</a></p>
      <p>Phone: ${phone}</p>
      <p>${address}</p>
      <a class="footer-button" href="/contact/">Contact Sales</a>
      <a href="/privacy/">Privacy Policy</a>
    </div>
  </div>
</footer>`;
}

function hero({ eyebrow, title, text, image, cta = "Request a Quote", secondary = "View Products", contactHref = "/contact/", secondaryHref = "/products/", heroClass = "" }) {
  return `<section class="hero${heroClass ? ` ${esc(heroClass)}` : ""}">
  <div class="hero-media"><img src="${image}" alt="" loading="eager"></div>
  <div class="hero-content">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1>${esc(title)}</h1>
    <p>${esc(text)}</p>
    <div class="hero-actions">
      <a class="button primary" href="${contactHref}">${cta}</a>
      <a class="button secondary" href="${secondaryHref}">${secondary}</a>
    </div>
    <dl class="proof-strip">
      <div><dt>2013</dt><dd>Founded</dd></div>
      <div><dt>110,000+ m2</dt><dd>Campus area</dd></div>
      <div><dt>PS</dt><dd>Lead ingredient</dd></div>
    </dl>
  </div>
</section>`;
}

function sectionIntro(label, title, text) {
  return `<div class="section-intro"><p class="eyebrow">${esc(label)}</p><h2>${esc(title)}</h2><p>${esc(text)}</p></div>`;
}

function companyVideoPlayer(className = "company-video-player") {
  return `<figure class="${esc(className)}">
    <video controls playsinline preload="metadata" poster="/assets/images/nutranexa-company-video-poster.webp" width="1280" height="720" aria-label="Nutranexa company and manufacturing introduction video">
      <source src="/assets/video/nutranexa-company-profile.mp4" type="video/mp4">
      Your browser does not support HTML5 video. <a href="/assets/video/nutranexa-company-profile.mp4">Open the company film</a>.
    </video>
    <figcaption>A closer look at our campus, production workshops, R&D facilities, and ingredient products.</figcaption>
  </figure>`;
}

function companyVideoSection() {
  return `<section class="company-video-section" aria-labelledby="company-video-title">
    <div class="company-video-copy"><p class="eyebrow">Company film</p><h2 id="company-video-title">Inside Nutranexa: from R&D to ingredient production</h2><p>Tour the Nutranexa campus, production workshops, processing equipment, laboratory facilities, and phosphatidylserine product presentation.</p></div>
    ${companyVideoPlayer()}
  </section>`;
}

function quoteForm(context = "General inquiry") {
  return `<form class="quote-form" data-context="${esc(context)}" action="https://formsubmit.co/wh1007209170@gmail.com" method="post">
  <input type="hidden" name="Product Interest" value="${esc(context)}">
  <input type="hidden" name="_subject" value="New Nutranexa Website Inquiry">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_next" value="https://nutranexaps.com/thank-you/">
  <input type="hidden" name="_url" value="https://nutranexaps.com/contact/">
  <label class="hidden-field">Company website <input name="_honey" tabindex="-1" autocomplete="off"></label>
  <div class="form-grid">
    <label>Name <input required name="Name" autocomplete="name"></label>
    <label>Email <input required type="email" name="Email" autocomplete="email"></label>
    <label>Phone <input required type="tel" name="Phone" autocomplete="tel" inputmode="tel" pattern="^\\+?[0-9\\s().-]{7,24}$" placeholder="+1 555 123 4567"></label>
    <label>Company <input name="Company" autocomplete="organization" placeholder="Company name"></label>
    <label>Country / Region <input name="Country" autocomplete="country-name" placeholder="United States, Germany, Brazil..."></label>
    <label>Product Interest <input name="Interest" value="${esc(context)}" placeholder="PS powder, Soy PS, Sunflower PS..."></label>
    <label class="form-full">Message <textarea name="Message" rows="4" placeholder="Tell us your product requirement, specification, quantity, or documents needed."></textarea></label>
  </div>
  <button class="button primary" type="submit">Submit Inquiry</button>
  <p class="form-status" role="status" aria-live="polite">Name, email, and phone are required.</p>
  <p class="form-note">Your inquiry will be prepared for sales follow-up. You can also email ${salesEmail} or contact us on WhatsApp ${whatsapp}.</p>
</form>`;
}

function productInquiryHref(product, documents = "") {
  const params = new URLSearchParams({
    product: product.name,
    source: product.inquirySource || "",
    assay: product.inquiryAssay || "",
  });
  if (documents) params.set("documents", documents);
  return `/contact/?${params.toString()}`;
}

function sourceSelectorSection() {
  return `<section class="source-selector">${sectionIntro("Choose a source", "Compare soy and sunflower phosphatidylserine", "Use source preference, label planning, target assay, and document needs to choose the right product route. Final specifications must match the quoted product and batch.")}
    <div class="source-choice-grid">
      <article class="source-choice"><img src="/assets/images/product-soy-ps.webp" alt="Soy phosphatidylserine powder source option" loading="lazy"><div><p class="eyebrow">Soy-source PS</p><h3>Soy Phosphatidylserine</h3><p>For buyers evaluating soy lecithin-derived PS across capsules, tablets, powders, and nutrition formulas.</p><ul><li>Confirm current assay options</li><li>Request source-specific allergen documents</li><li>Match the COA to the quoted product</li></ul><a href="/products/soy-phosphatidylserine/">Review Soy PS</a></div></article>
      <article class="source-choice"><img src="/assets/images/product-sunflower-ps.webp" alt="Sunflower phosphatidylserine powder source option" loading="lazy"><div><p class="eyebrow">Sunflower-source PS</p><h3>Sunflower Phosphatidylserine</h3><p>For buyers who prefer sunflower-origin positioning and need a clearly documented source route.</p><ul><li>PS 20% and 50% sunflower sample COAs available</li><li>Do not infer allergen-free status without documents</li><li>Confirm target assay and application</li></ul><a href="/products/sunflower-phosphatidylserine/">Review Sunflower PS</a></div></article>
    </div>
  </section>`;
}

function specificationMatrix() {
  const rows = psSpecificationMatrix.map((item) => `<tr><th scope="row">${esc(item.product)}</th><td>${esc(item.source)}</td><td>${esc(item.assay)}</td><td>${esc(item.appearance)}</td><td>${esc(item.moisture)}</td><td>${esc(item.peroxide)}</td><td>${esc(item.acetone)}</td><td>${esc(item.density)}</td><td>${esc(item.shelfLife)}</td><td><span class="status-tag">${esc(item.status)}</span></td></tr>`).join("");
  return `<section class="spec-section">${sectionIntro("Source and assay matrix", "Compare PS options before requesting a quotation", "The values below are specification limits shown in supplied sample COAs or are clearly marked for confirmation. Sample COA results are batch-specific and are not permanent sales guarantees.")}
    <div class="spec-table-wrap"><table class="spec-table"><thead><tr><th>Product</th><th>Source</th><th>Target PS assay</th><th>Appearance</th><th>Moisture</th><th>Peroxide</th><th>Acetone insoluble</th><th>Bulk density</th><th>Shelf life</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="section-actions"><a class="button primary" href="/contact/?product=Phosphatidylserine+%28PS%29&documents=Specification">Request Current Specification</a><a class="button secondary" href="/contact/?product=Phosphatidylserine+%28PS%29&documents=COA+sample">Request COA Sample</a></div>
  </section>`;
}

function technicalSpecificationSection(product) {
  if (!product.specification?.length) return "";
  return `<section class="technical-specification">${sectionIntro("Technical specification", `${product.name} supplied specification highlights`, "These values summarize the supplied English specification. Confirm the current signed version, batch COA, test methods, and destination-market requirements before purchase or formulation use.")}
    <dl class="technical-spec-grid">${product.specification.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}</dl>
    ${product.supplierNote ? `<p class="document-caution"><strong>Document scope:</strong> ${esc(product.supplierNote)}</p>` : ""}
  </section>`;
}

function downloadableDocuments(product) {
  if (!product.downloads?.length) return "";
  return `<section class="download-library">${sectionIntro("Technical downloads", "Review supplied product documents", "Download the supplied files for preliminary evaluation. Ask sales for the latest controlled copy and current batch documents before placing an order.")}
    <div class="download-grid">${product.downloads.map(([title, href, format]) => `<a class="download-card" href="${href}" download><span class="download-format">${esc(format)}</span><span><strong>${esc(title)}</strong><small>Download supplied file</small></span><span aria-hidden="true">&#8595;</span></a>`).join("")}</div>
  </section>`;
}

function technicalDownloadLibrary() {
  const files = [
    ["PS 20% English Specification", "/assets/documents/phosphatidylserine-20-specification.docx", "DOCX", "Phosphatidylserine"],
    ["Soluble Soybean Polysaccharide Specification", "/assets/documents/soluble-soybean-polysaccharide-specification.pdf", "PDF", "Self-owned factory specification"],
  ];
  return `<section class="download-library">${sectionIntro("Technical downloads", "Specifications available for preliminary buyer review", "These supplied files support initial evaluation. Request a current controlled version and matching batch COA before purchase or shipment.")}
    <div class="download-grid">${files.map(([title, href, format, note]) => `<a class="download-card" href="${href}" download><span class="download-format">${esc(format)}</span><span><strong>${esc(title)}</strong><small>${esc(note)}</small></span><span aria-hidden="true">&#8595;</span></a>`).join("")}</div>
  </section>`;
}

function documentsRequestSection(product) {
  const href = (documents) => productInquiryHref(product, documents);
  const items = [
    ["COA sample", product.slug === "sunflower-phosphatidylserine" ? "PS 20% and 50% sunflower samples available" : product.slug === "phosphatidylserine" ? "PS 20% sunflower, PS 50%, and PS 50% sunflower samples available" : product.slug === "soluble-soybean-polysaccharide" ? "Request the current batch COA matching TJ-110" : "Reference samples available; exact source must be confirmed", "COA sample"],
    ["Current specification", product.downloads?.length ? "English specification available below; request the latest controlled version for approval" : "Request the version matching source, target assay, and quoted product", "Specification"],
    ["TDS / SDS", "Availability and current version to be confirmed by sales", "TDS / SDS"],
    ["Certificates", "Request current files and verify product scope and validity", "Certificates"],
    ["Allergen / GMO statements", "Request source-specific statements; do not infer status", "Allergen / GMO statements"],
    ["Packaging and shipment", product.moq ? `MOQ ${product.moq}; ${product.packaging}. Lead time and shipment details are confirmed with the quotation.` : "MOQ, packaging, lead time, and shipment details to be confirmed", "Multiple documents"],
  ];
  return `<section class="documents-request">${sectionIntro("Document workflow", "Request the files needed for supplier approval", "Choose the relevant document path and send the exact source, target assay, application, and destination market for faster review.")}
    <div class="document-status-grid">${items.map(([title, text, request]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p><a href="${href(request)}">Request ${esc(title)}</a></article>`).join("")}</div>
  </section>`;
}

function packagingSection(product) {
  if (!product.moq || !product.packaging) return "";
  const inquiry = productInquiryHref(product, "Packaging and quotation");
  return `<section class="split-section product-packaging">
    <div>${sectionIntro("MOQ and bulk packaging", "One 25 kg drum meets the minimum order quantity", `The MOQ for ${product.name} is ${product.moq}. Standard bulk packing is ${product.packaging}. Final labels, inner packing, palletizing, and export shipment details are confirmed before order.`)}
      <ul class="check-list"><li>Minimum order quantity: ${esc(product.moq)}</li><li>Net weight: ${esc(product.packaging)}</li><li>Request a quotation by required drum quantity</li><li>Confirm destination-market labels and shipping details before dispatch</li></ul>
      <a class="button secondary" href="${inquiry}">Request Packaging Quote</a>
    </div>
    <img class="section-photo" src="/assets/images/ps-25kg-drum-packaging-clean.webp" width="960" height="1280" alt="Nutranexa phosphatidylserine packed in 25 kg drums in a clean dispatch preparation area" loading="lazy">
  </section>`;
}

function applicationFormatSection(app) {
  return `<section class="application-formats">${sectionIntro("Format-level evaluation", "Plan the tests before requesting a production quote", "These are buyer evaluation points, not fixed formulation instructions. Confirm the exact product specification and run tests under the intended process conditions.")}
    <div class="application-format-grid">${app.formats.map(([title, text]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}</div>
  </section>`;
}

function manufacturingProcessSection() {
  return `<section class="manufacturing-process">${sectionIntro("Process and QC overview", "A document-led route from raw materials to shipment", "This high-level workflow supports supplier evaluation without disclosing confidential parameters. Product-specific procedures should be confirmed during technical review.")}
    <ol class="process-flow">${manufacturingSteps.map(([number, title, text]) => `<li><span>${number}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></li>`).join("")}</ol>
  </section>`;
}

function qualityDocumentWorkflow() {
  return `<section class="quality-workflow">${sectionIntro("Buyer document workflow", "Organize files by approval purpose", "Request current copies for the exact product and destination market. Validity, scope, and product applicability should be checked before purchase or shipment.")}
    <div class="quality-group-grid">${qualityDocumentGroups.map(([group, title, text]) => `<article><p class="eyebrow">${esc(group)}</p><h3>${esc(title)}</h3><p>${esc(text)}</p><a href="/contact/?documents=${encodeURIComponent(title)}">Request current copy</a></article>`).join("")}</div>
  </section>`;
}

function contactDetailsCard(title = "Sales contact") {
  return `<div class="contact-card contact-details-card"><h2>${esc(title)}</h2><p><strong>Email:</strong> <a href="mailto:${salesEmail}">${salesEmail}</a></p><p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">${whatsapp}</a></p><p><strong>Phone:</strong> ${phone}</p><p><strong>Address:</strong> ${address}</p><p><strong>Website:</strong> www.nutranexa.cn</p></div>`;
}

function documentCards(limit = documentProof.length) {
  return `<div class="document-grid">${documentProof.slice(0, limit).map((doc) => `<article class="document-card"><img src="${doc.image}" alt="${esc(doc.title)} document sample" loading="lazy"><div><h3>${esc(doc.title)}</h3><p>${esc(doc.text)}</p></div></article>`).join("")}</div>`;
}

function coaSampleTables(samples = coaSamples) {
  return `<div class="coa-grid">${samples.map((sample) => `<article class="coa-card"><a class="coa-image-link" href="${sample.image}" target="_blank" rel="noopener"><img src="${sample.image}" alt="${esc(sample.title)}" loading="lazy"></a><div><h3>${esc(sample.title)}</h3><table><tbody>${sample.rows.map(([label, value]) => `<tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>`).join("")}</tbody></table><p class="form-note">Sample COA data is batch-specific. Current batch COA should be confirmed before quotation or shipment.</p><a class="document-link" href="${sample.image}" target="_blank" rel="noopener">View full COA sample</a></div></article>`).join("")}</div>`;
}

function productCard(product) {
  return `<article class="item-card">
  <img src="${product.image}" alt="${esc(product.imageAlt)}" loading="lazy">
  <div>
    <p class="eyebrow">${esc(product.eyebrow)}</p>
    <h3>${esc(product.name)}</h3>
    <p>${esc(product.description)}</p>
    <a href="/products/${product.slug}/">View product page</a>
  </div>
</article>`;
}

function articleImage(article) {
  return article.image;
}

function productSeoTitle(product) {
  const titles = {
    phosphatidylserine: "Phosphatidylserine Manufacturer | Nutranexa",
    "soy-phosphatidylserine": "Soy Phosphatidylserine Supplier | Nutranexa",
    "sunflower-phosphatidylserine": "Sunflower Phosphatidylserine Supplier | Nutranexa",
    "soluble-soybean-polysaccharide": "Soluble Soybean Polysaccharide Supplier | Nutranexa",
  };
  return titles[product.slug] || `${product.name} Supplier | Nutranexa`;
}

function articleSeoTitle(article) {
  const titles = {
    "what-is-phosphatidylserine": "What Is Phosphatidylserine? | Nutranexa",
    "soy-vs-sunflower-phosphatidylserine": "Soy vs Sunflower Phosphatidylserine | Nutranexa",
    "choose-phosphatidylserine-supplier": "How to Choose a PS Supplier | Nutranexa",
    "phosphatidylserine-dietary-supplements": "PS for Dietary Supplements | Nutranexa",
    "documents-for-ps-ingredients": "PS Ingredient Documents Checklist | Nutranexa",
    "phosphatidylserine-powder-specifications": "PS Powder Specifications | Nutranexa",
    "functional-food-ingredient-manufacturing": "Functional Food Ingredient Manufacturing | Nutranexa",
    "soluble-soybean-polysaccharide-uses": "Soluble Soybean Polysaccharide Uses | Nutranexa",
    "phosphatidylserine-guide": "Phosphatidylserine Sourcing Guide | Nutranexa",
  };
  return article.seoTitle || titles[article.slug] || `${article.title} | Nutranexa`;
}

function homePage() {
  const body = `${hero({
    eyebrow: "Phosphatidylserine and functional food ingredients",
    title: "Phosphatidylserine Manufacturer for Global Ingredient Buyers",
    text: "Source phosphatidylserine and related functional food ingredients from Nutranexa, a biotechnology manufacturer serving ingredient buyers primarily in Europe and North America.",
    image: "/assets/images/brand-product-lab.webp",
  })}
  ${psBenefitsSection("home")}
  ${sourceSelectorSection()}
  <section>${sectionIntro("Core products", "Phosphatidylserine and related food ingredients", "Compare source options, application fit, available documents, and quotation requirements before selecting an ingredient.")}
    <div class="card-grid">${products.map(productCard).join("")}</div>
  </section>
  <section id="manufacturing-proof" class="split-section manufacturing-proof-section">
    <div>${sectionIntro("Our manufacturing", "Integrated manufacturing, R&D, and quality control", "Nutranexa operates an integrated production campus built around functional food ingredients, with dedicated workshops, R&D facilities, and quality-control capabilities.")}
      <ul class="check-list"><li>110,000+ m2 integrated manufacturing campus</li><li>Dedicated phosphatidylserine production capability</li><li>Controlled workshops and stainless-steel processing equipment</li><li>In-house R&D and quality-control facilities</li><li>Export supply experience across Europe and North America</li></ul>
      <a class="button secondary" href="/manufacturing/">Explore our manufacturing</a>
    </div>
    ${companyVideoPlayer("manufacturing-video")}
  </section>
  <section>${sectionIntro("Application opportunities", "PS applications across supplements and functional foods", "Phosphatidylserine can be evaluated for capsules, tablets, nutrition powders, dairy beverages, and other functional food concepts.")}
    <div class="card-grid">${applications.map((app) => `<article class="item-card"><img src="${app.image}" alt="${esc(app.title)}" loading="lazy"><div><h3>${esc(app.title)}</h3><p>${esc(app.description)}</p><a href="/applications/${app.slug}/">Explore application</a></div></article>`).join("")}</div>
  </section>
  <section class="cta-band">
    <div><p class="eyebrow">Sourcing support</p><h2>Request PS specifications, source details, and quotation support.</h2><p>Share your country, application, annual quantity, and document needs. The sales team can confirm current specifications before purchase.</p></div>
    <a class="button light" href="/contact/">Request a Quote</a>
  </section>`;
  return layout({
    title: "Phosphatidylserine Manufacturer | Nutranexa PS Ingredient Supplier",
    description: "Source phosphatidylserine, soy PS, sunflower PS, and soluble soybean polysaccharide from Nutranexa for supplements and functional food applications.",
    route: "/",
    image: "/assets/images/brand-product-lab.webp",
    schema: [breadcrumbJson([["Home", "/"]])],
    body,
  });
}

function productsHub() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Products</p><h1>Bulk Functional Food Ingredients for Global Buyers</h1><p>Start with phosphatidylserine, then compare soy-source, sunflower-source, and related functional food ingredient options.</p></section>
  <section>${sectionIntro("Product portfolio", "Compare Nutranexa ingredient options", "Review product source, application fit, available documents, and quote requirements from one place.")}
    <div class="card-grid">${products.map(productCard).join("")}</div>
  </section>
  <section class="form-panel"><div>${sectionIntro("Quote support", "Send one inquiry for multiple products", "Use the product interest field to list PS, soy PS, sunflower PS, and soluble soybean polysaccharide requirements.")}</div>${quoteForm("Multiple products")}</section>`;
  return layout({
    title: "Products | Phosphatidylserine, Soy PS, Sunflower PS | Nutranexa",
    description: "Explore Nutranexa bulk ingredients for phosphatidylserine, soy PS, sunflower PS, and soluble soybean polysaccharide.",
    route: "/products/",
    schema: [breadcrumbJson([["Home", "/"], ["Products", "/products/"]])],
    body,
  });
}

function advisorCard(product) {
  return `<aside class="advisor-sticky" aria-label="Ingredient specialist contact">
    <div class="advisor-card">
      <div class="advisor-photo-wrap"><img src="/assets/images/ip-specialist.webp" alt="Nutranexa ingredient specialist for ${esc(product.name)} sourcing" loading="lazy"></div>
      <p class="eyebrow">Ingredient Specialist</p>
      <h2>Your direct sourcing contact</h2>
      <p>Share your application, source preference, annual quantity, and documents needed. The team can confirm current ${esc(product.name)} details before quotation.</p>
      <ul class="advisor-list">
        <li>PS / Soy PS / Sunflower PS support</li>
        <li>Specification, COA, and certificate requests</li>
        <li>Application and quotation follow-up</li>
      </ul>
      <div class="advisor-actions">
        <a class="button primary" href="${productInquiryHref(product)}">Request Source & Assay</a>
        <a class="button secondary" href="/resources/documents-for-ps-ingredients/">Document checklist</a>
      </div>
    </div>
  </aside>`;
}

function psBenefitsSection(context = "product") {
  const intro = context === "home"
    ? {
        eyebrow: "Benefits & application value",
        title: "Explore how PS supports supplement and functional food concepts",
        text: "Cognitive wellness concepts, source options, supplement formats, and functional food applications can be discussed with current specifications, COA samples, and compliant market wording.",
      }
    : {
        eyebrow: "PS value areas",
        title: "Phosphatidylserine: a functional ingredient for modern nutrition concepts",
        text: "Phosphatidylserine can be evaluated for supplement and functional food projects where source, format, documentation, and permitted market wording all matter.",
      };
  return `<section class="ps-benefits" aria-labelledby="ps-benefits-title">
    <div class="ps-benefits-intro">
      <p class="eyebrow">${intro.eyebrow}</p>
      <h2 id="ps-benefits-title">${intro.title}</h2>
      <p>${intro.text}</p>
    </div>
    <div class="ps-benefit-strip">
      ${psBenefitItems.map((item) => `<a class="ps-benefit-card" href="/benefits/${item.slug}/" aria-label="Explore ${esc(item.title)} with Nutranexa">
        <span class="benefit-icon" style="--benefit-color:${item.color}">${esc(item.icon)}</span>
        <span class="benefit-copy"><strong>${esc(item.title)}</strong><small>${esc(item.text)}</small></span>
        <span class="benefit-arrow" aria-hidden="true">›</span>
      </a>`).join("")}
    </div>
    <p class="benefit-disclaimer">Claims, labels, and permitted wording depend on the target market and finished product category. Please confirm specifications and regulatory requirements before commercial use.</p>
  </section>`;
}

function benefitsHub() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Benefits & application value</p><h1>Phosphatidylserine Value Areas for B2B Product Planning</h1><p>Explore compliant PS value themes for supplement positioning, source selection, dosage-form planning, and functional food applications.</p></section>
  ${psBenefitsSection("home")}
  <section class="form-panel"><div>${sectionIntro("Discuss your project", "Request PS specifications and application support", "Share product format, source preference, target market, annual quantity, and document needs so the sales team can recommend the right next step.")}</div>${quoteForm("PS benefits and application value")}</section>`;
  return layout({
    title: "Benefits & Application Value | Nutranexa PS Ingredients",
    description: "Explore phosphatidylserine benefits and application value areas for supplement brands, nutrition products, source selection, and functional foods.",
    route: "/benefits/",
    image: "/assets/images/dietary-supplement-application.webp",
    schema: [breadcrumbJson([["Home", "/"], ["Benefits", "/benefits/"]])],
    body,
  });
}

function benefitPage(item) {
  const route = `/benefits/${item.slug}/`;
  const productLinks = item.recommendedProducts.map((name) => {
    const product = products.find((entry) => entry.name === name);
    return product ? `<a href="/products/${product.slug}/">${esc(name)}</a>` : `<a href="/products/phosphatidylserine/">${esc(name)}</a>`;
  }).join("");
  const body = `${hero({
    eyebrow: "Benefits & application value",
    title: item.pageTitle,
    text: item.pageDescription,
    image: item.image,
    cta: "Request Application Support",
    secondary: "View PS Products",
  })}
  <section class="quick-answer"><p class="eyebrow">Quick Answer</p><h2>What does this value area mean for buyers?</h2><p>${esc(item.buyerValue)}</p></section>
  <section>${sectionIntro("Application scenarios", "Where this value area fits", "Review practical product directions before discussing samples, specifications, or bulk pricing.")}
    <div class="feature-grid">${item.applications.map((application) => `<div class="feature"><h3>${esc(application)}</h3><p>Confirm source, specification, document needs, and finished-product wording with the sales team before commercial use.</p></div>`).join("")}</div>
  </section>
  <section class="detail-grid">
    <div><h2>Application value</h2><ul class="check-list">${item.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul></div>
    <div><h2>Buyer questions to confirm</h2><ul class="check-list">${item.buyerQuestions.map((question) => `<li>${esc(question)}</li>`).join("")}</ul></div>
    <div><h2>Recommended products</h2><div class="link-stack">${productLinks}</div><p>Compare product source, PS content, document availability, and application fit before quotation.</p></div>
    <div><h2>Documents to request</h2><ul class="check-list">${item.documents.map((doc) => `<li>${esc(doc)}</li>`).join("")}</ul></div>
  </section>
  <section class="split-section product-quality">
    <div>${sectionIntro("Sourcing workflow", "From value theme to quotation", "A clear inquiry helps Nutranexa confirm the right product source, sample path, and document package for your market.")}
      <ol class="number-list"><li>Share your product format and target country.</li><li>Confirm soy PS, sunflower PS, or general PS source preference.</li><li>Request specification, COA sample, and relevant certificate files.</li><li>Discuss annual quantity, packaging, MOQ, and shipment timeline.</li></ol>
      <a class="button secondary" href="/resources/documents-for-ps-ingredients/">View document checklist</a>
    </div>
    <img class="section-photo" src="/assets/images/quality-document-review.webp" alt="Nutranexa document review for PS application value sourcing" loading="lazy">
  </section>
  <section class="link-panel"><a href="/benefits/">All value areas</a><a href="/products/phosphatidylserine/">Phosphatidylserine</a><a href="/products/soy-phosphatidylserine/">Soy PS</a><a href="/products/sunflower-phosphatidylserine/">Sunflower PS</a><a href="/applications/">Applications</a><a href="/quality-rd/">Quality & R&D</a></section>
  <section class="form-panel"><div>${sectionIntro("Request support", `Discuss ${item.title.toLowerCase()} for your product`, "Include your application, target market, source preference, annual quantity, and required documents for a faster response.")}</div>${quoteForm(item.title)}</section>`;
  return layout({
    title: `${item.pageTitle} | Nutranexa`,
    description: item.pageDescription,
    route,
    image: item.image,
    schema: [breadcrumbJson([["Home", "/"], ["Benefits", "/benefits/"], [item.title, route]])],
    body,
  });
}

function productPage(product) {
  const route = `/products/${product.slug}/`;
  const body = `${hero({
    eyebrow: product.eyebrow,
    title: product.title,
    text: product.description,
    image: product.image,
    cta: product.cta,
    secondary: "Compare applications",
    contactHref: productInquiryHref(product),
  })}
  ${product.slug === "phosphatidylserine" ? psBenefitsSection() : ""}
  <section class="product-template">
    <div class="product-main">
      <div class="quick-answer product-quick"><p class="eyebrow">Quick Answer</p><h2>What is ${esc(product.name)} and who is it for?</h2><p>${esc(product.quick)}</p></div>
      ${product.slug === "phosphatidylserine" ? specificationMatrix() : ""}
      ${technicalSpecificationSection(product)}
      <div class="detail-grid product-detail-grid">
        <div><h2>Product overview</h2><p>${esc(product.description)}</p><h3>Source and ingredient base</h3><p>${esc(product.source)}</p></div>
        <div><h2>Applications</h2><ul class="check-list">${product.applications.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
        <div><h2>Manufacturing capability</h2><ul class="check-list">${product.proof.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><a href="/manufacturing/">View manufacturing proof</a></div>
        <div><h2>Available documents</h2><ul class="check-list">${product.docs.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><a href="/quality-rd/">Review Quality & R&D</a></div>
      </div>
      ${packagingSection(product)}
      <section class="split-section product-quality">
        <div>${sectionIntro("Quality control", "Request current product documents", "Ask the sales team for the latest specification, COA, and certificate files that match your product source, batch, and destination market.")}
          <a class="button secondary" href="/resources/documents-for-ps-ingredients/">See document checklist</a>
        </div>
        <img class="section-photo" src="/assets/images/quality-document-review.webp" alt="Nutranexa quality document review and COA request workflow" loading="lazy">
      </section>
      ${documentsRequestSection(product)}
      ${downloadableDocuments(product)}
      <section class="product-faq">${sectionIntro("FAQ", "Common buyer questions", "These answers are written for sourcing and application evaluation without medical treatment claims.")}
        <div class="faq-list">${product.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
      </section>
      ${product.slug === "phosphatidylserine" ? `<section class="coa-section">${sectionIntro("COA samples", "PS 20% and 50% sample COA highlights", "Sample COA files support buyer evaluation. Final batch COA, specification, and certificate files should be confirmed before quotation or shipment.")}${coaSampleTables()}</section>` : ""}
      ${product.slug === "sunflower-phosphatidylserine" ? `<section class="coa-section">${sectionIntro("Sunflower PS documents", "PS 20% and 50% sunflower COA samples", "These source-specific samples help buyers compare assay and common quality indicators. Request the current batch COA before purchase or shipment.")}${coaSampleTables(coaSamples.filter((sample) => sample.title.includes("Sunflower")))}</section>` : ""}
    </div>
    ${advisorCard(product)}
  </section>
  <section class="form-panel"><div>${sectionIntro("Request quotation", `Talk to sales about ${product.name}`, "Include target market, product format, annual quantity, and document requirements so the team can confirm current availability.")}</div>${quoteForm(product.name, product.moq ? `MOQ ${product.moq}; enter estimated yearly demand` : "Enter estimated yearly demand")}</section>`;
  return layout({
    title: productSeoTitle(product),
    description: product.description,
    route,
    image: product.image,
    schema: [breadcrumbJson([["Home", "/"], ["Products", "/products/"], [product.name, route]]), productJson(product, route)],
    body,
  });
}

function applicationsHub() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Applications</p><h1>Phosphatidylserine Applications for Supplements and Functional Foods</h1><p>Evaluate product format, source preference, document needs, and compliant wording before requesting a quotation.</p></section>
  <section>${sectionIntro("Application paths", "Choose the right application route", "Clarify product format, source preference, document needs, and quotation details before starting a sourcing discussion.")}
    <div class="card-grid">${applications.map((app) => `<article class="item-card"><img src="${app.image}" alt="${esc(app.title)}" loading="lazy"><div><h3>${esc(app.title)}</h3><p>${esc(app.description)}</p><a href="/applications/${app.slug}/">View application page</a></div></article>`).join("")}</div>
  </section>`;
  return layout({
    title: "Applications | Phosphatidylserine for Supplements and Functional Foods",
    description: "Explore phosphatidylserine ingredient applications in dietary supplements, nutrition powders, dairy formulas, and functional foods.",
    route: "/applications/",
    schema: [breadcrumbJson([["Home", "/"], ["Applications", "/applications/"]])],
    body,
  });
}

function applicationPage(app) {
  const route = `/applications/${app.slug}/`;
  const body = `${hero({
    eyebrow: "Application page",
    title: app.title,
    text: app.description,
    image: app.image,
    cta: "Request Application Support",
    secondary: "View PS Products",
  })}
  <section class="quick-answer"><p class="eyebrow">Quick Answer</p><h2>How should buyers evaluate this application?</h2><p>Buyers should define product format, target country, annual quantity, source preference, and document needs before requesting a quote. Nutranexa can discuss PS ingredient options without making unsupported medical or disease-treatment claims.</p></section>
  <section>${sectionIntro("Application checklist", "What to prepare before quotation", "A clear brief helps sales respond with the most relevant source and document path.")}
    <div class="feature-grid">${app.points.map((point) => `<div class="feature"><h3>${esc(point)}</h3><p>Confirm current product specifications, application fit, and compliance needs with the sales team.</p></div>`).join("")}</div>
  </section>
  ${applicationFormatSection(app)}
  <section class="link-panel"><a href="/products/phosphatidylserine/">Phosphatidylserine</a><a href="/products/soy-phosphatidylserine/">Soy PS</a><a href="/products/sunflower-phosphatidylserine/">Sunflower PS</a><a href="/quality-rd/">Quality & R&D</a></section>
  <section class="form-panel"><div>${sectionIntro("Talk to sales", "Request application support", "Include application details and document needs for a faster reply.")}</div>${quoteForm(app.title)}</section>`;
  return layout({
    title: `${app.title} | Nutranexa`,
    description: app.description,
    route,
    image: app.image,
    schema: [breadcrumbJson([["Home", "/"], ["Applications", "/applications/"], [app.title, route]])],
    body,
  });
}

function manufacturingPage() {
  const body = `${hero({
    eyebrow: "Manufacturing",
    title: "Factory, Cleanroom, and Equipment Proof for Ingredient Buyers",
    text: "Nutranexa presents factory campus, cleanroom production, workshop equipment, and packaging support information for buyer evaluation.",
    image: "/assets/images/factory-campus.webp",
    cta: "Request Factory Details",
    secondary: "View Quality & R&D",
    secondaryHref: "/quality-rd/",
    heroClass: "manufacturing-hero",
  })}
  <section>${sectionIntro("Factory evidence", "Manufacturing information for buyer confidence", "Review facility images and production context while confirming product-specific documents with the sales team.")}
    <div class="gallery">
      ${["factory-campus.webp", "factory-building.webp", "equipment-workshop-02.webp", "equipment-workshop-01.webp", "equipment-workshop-03.webp", "equipment-cleanroom-workshop.webp"].map((img) => `<img src="/assets/images/${img}" alt="Nutranexa manufacturing and factory visual proof" loading="lazy">`).join("")}
    </div>
  </section>
  ${manufacturingProcessSection()}
  <section class="split-section packaging-proof">
    <div>${sectionIntro("Bulk packaging", "25 kg per drum with a 25 kg MOQ", "For phosphatidylserine products, one 25 kg drum meets the minimum order quantity. Final labels, inner packing, palletizing, and export shipping requirements are confirmed before order.")}
      <ul class="check-list"><li>MOQ: 25 kg</li><li>Net weight: 25 kg per drum</li><li>Warehouse and packing preparation image available</li><li>Shipment details confirmed according to destination and order quantity</li></ul>
      <a class="button secondary" href="/contact/?product=Phosphatidylserine%20%28PS%29&documents=Packaging%20and%20quotation">Request packaging details</a>
    </div>
    <img class="section-photo" src="/assets/images/ps-25kg-drum-packaging-clean.webp" width="960" height="1280" alt="Phosphatidylserine 25 kg drums prepared in a clean Nutranexa dispatch area" loading="lazy">
  </section>
  <section class="dispatch-proof">
    ${sectionIntro("Dispatch proof", "Drum loading and palletized shipment preparation", "These operational photos show ingredient drums staged for vehicle loading and palletized drums protected with stretch wrapping at a logistics loading area. Final pallet pattern, labels, and transport arrangements are confirmed for each order.")}
    <div class="dispatch-gallery">
      <figure>
        <img class="dispatch-photo dispatch-photo-portrait" src="/assets/images/shipment-drums-local-dispatch.webp" width="900" height="1600" alt="Ingredient drums staged beside a vehicle for dispatch" loading="lazy">
        <figcaption>Drums staged for vehicle loading during dispatch preparation.</figcaption>
      </figure>
      <figure>
        <img class="dispatch-photo" src="/assets/images/shipment-palletized-drums-loading-bay.webp" width="1400" height="1050" alt="Palletized ingredient drums stretch wrapped at a logistics loading bay" loading="lazy">
        <figcaption>Palletized drums stretch wrapped for handling at the loading area.</figcaption>
      </figure>
    </div>
  </section>
  <section class="detail-grid"><div><h2>Buyer confidence points</h2><ul class="check-list"><li>110,000+ m2 production campus</li><li>Factory, equipment, and cleanroom imagery available</li><li>PS-focused production context</li><li>Product document requests available before purchase</li></ul></div><div><h2>Confirm before purchase</h2><ul class="check-list"><li>Current specifications</li><li>COA sample or current batch COA</li><li>Certificate scope and validity</li><li>Export packaging and MOQ details</li></ul></div></section>`;
  return layout({
    title: "Manufacturing Capability | Nutranexa PS Ingredient Factory",
    description: "View Nutranexa factory campus, cleanroom, equipment, and production context for phosphatidylserine and functional food ingredients.",
    route: "/manufacturing/",
    image: "/assets/images/factory-campus.webp",
    schema: [breadcrumbJson([["Home", "/"], ["Manufacturing", "/manufacturing/"]])],
    body,
  });
}

function casesPage() {
  const body = `${hero({
    eyebrow: "Cases & Projects",
    title: "Supply, Packaging, and Delivery Evidence for Ingredient Buyers",
    text: "Review representative factory, packaging, and dispatch records used to support phosphatidylserine sourcing projects. Customer identities and confidential order details are not published.",
    image: "/assets/images/shipment-palletized-drums-loading-bay.webp",
    cta: "Discuss Your Requirements",
    secondary: "View Manufacturing",
    secondaryHref: "/manufacturing/",
  })}
  <section>${sectionIntro("Project evidence", "From product confirmation to dispatch preparation", "Each sourcing project is confirmed against the requested product source, assay, documents, packaging, destination, and order quantity before shipment.")}
    <div class="feature-grid">
      <article class="feature"><h2>Product and document review</h2><p>Sales confirms the requested PS source and assay, then coordinates available specifications, COA samples, packaging information, and applicable certificate files.</p></article>
      <article class="feature"><h2>25 kg drum preparation</h2><p>Phosphatidylserine products are supplied with a 25 kg MOQ. One 25 kg drum meets the minimum order quantity, subject to final product and quotation confirmation.</p></article>
      <article class="feature"><h2>Dispatch coordination</h2><p>Labels, pallet pattern, stretch wrapping, delivery destination, and transport arrangements are checked according to the confirmed order.</p></article>
    </div>
  </section>
  <section class="split-section">
    <div>${sectionIntro("Packaging project", "Bulk drums prepared for shipment", "Operational photos show drums staged for handling and palletized loads protected for transport. Final packing details may vary by destination and order quantity.")}
      <ul class="check-list"><li>MOQ: 25 kg</li><li>Net weight: 25 kg per drum</li><li>Batch and label details confirmed before dispatch</li><li>Current documents available through the sales team</li></ul>
    </div>
    <img class="section-photo" src="/assets/images/shipment-drums-local-dispatch.webp" alt="Ingredient drums prepared for a Nutranexa delivery project" loading="lazy">
  </section>
  <section>${sectionIntro("Delivery evidence", "Palletized ingredient shipments", "These images document representative shipment preparation without disclosing customer identities, prices, or confidential order information.")}
    <div class="dispatch-gallery">
      <figure><img class="dispatch-photo" src="/assets/images/shipment-palletized-drums-loading-bay.webp" alt="Palletized ingredient drums prepared at a loading bay" loading="lazy"><figcaption>Palletized drums protected for loading and handling.</figcaption></figure>
      <figure><img class="dispatch-photo dispatch-photo-portrait" src="/assets/images/ps-25kg-drum-packaging-clean.webp" alt="Phosphatidylserine 25 kg drum packaging in a clean dispatch area" loading="lazy"><figcaption>Representative 25 kg drum packing preparation.</figcaption></figure>
    </div>
  </section>
  <section class="cta-band"><div><p class="eyebrow">Your project</p><h2>Send the product, assay, destination, and annual quantity</h2><p>Nutranexa can reply with the relevant sourcing path, available documents, MOQ, packaging, and quotation discussion points.</p></div><a class="button primary" href="/contact/">Send Your Requirements</a></section>`;
  return layout({
    title: "Cases & Projects | Nutranexa PS Supply and Delivery Evidence",
    description: "Review Nutranexa phosphatidylserine supply, 25 kg drum packaging, palletized shipment, and dispatch project evidence for B2B ingredient buyers.",
    route: "/cases/",
    image: "/assets/images/shipment-palletized-drums-loading-bay.webp",
    schema: [breadcrumbJson([["Home", "/"], ["Cases & Projects", "/cases/"]])],
    body,
  });
}

function qualityPage() {
  const body = `${hero({
    eyebrow: "Quality & R&D",
    title: "R&D Cooperation, Quality Control, and Verified Document Workflow",
    text: "Nutranexa's PS story includes cooperation with East China University of Science and Technology, production license references, and quality-control oriented buyer communication.",
    image: "/assets/images/quality-document-review.webp",
    cta: "Request Documents",
    secondary: "View Products",
  })}
  <section>${sectionIntro("Trust signals", "Quality information for buyer review", "Review company facts, R&D cooperation, production license references, and document samples before requesting current files.")}
    <div class="feature-grid"><div class="feature"><h3>R&D cooperation</h3><p>Nutranexa references cooperation with East China University of Science and Technology for PS development.</p></div><div class="feature"><h3>Production license reference</h3><p>PS obtained production license by the end of 2015 according to company materials.</p></div><div class="feature"><h3>Quality visibility</h3><p>Factory, cleanroom, lab, and equipment images support buyer evaluation.</p></div></div>
  </section>
  <section>${sectionIntro("Document proof", "Certificates and registration files for buyer review", "Use these files as preliminary review materials. Current validity, scope, and product applicability should be confirmed before purchase or shipment.")}${documentCards()}</section>
  ${technicalDownloadLibrary()}
  ${qualityDocumentWorkflow()}
  <section class="coa-section">${sectionIntro("COA samples", "PS 20% and 50% batch-specific sample data", "The COA samples show analysis items commonly reviewed by buyers, including assay, moisture, peroxide value, heavy metals, microbiology, and Salmonella.")}${coaSampleTables()}</section>
  <section class="split-section"><div><h2>Documents to request</h2><ul class="check-list"><li>Specification sheet</li><li>COA sample or current batch COA</li><li>Food production license and item details</li><li>Halal / Kosher files where market requires them</li><li>Packaging and storage information</li><li>Market-specific compliance files where relevant</li></ul></div><img class="section-photo" src="/assets/images/quality-document-review.webp" alt="Nutranexa specification review and COA request support" loading="lazy"></section>`;
  return layout({
    title: "Quality & R&D | Nutranexa Phosphatidylserine Supplier",
    description: "Review Nutranexa R&D cooperation, quality control, COA samples, certificates, and document support for phosphatidylserine ingredients.",
    route: "/quality-rd/",
    image: "/assets/images/quality-document-review.webp",
    schema: [breadcrumbJson([["Home", "/"], ["Quality & R&D", "/quality-rd/"]])],
    body,
  });
}

function aboutPage() {
  const body = `${hero({
    eyebrow: "About Nutranexa",
    title: "Biotechnology Manufacturer Focused on New Food Ingredients",
    text: "Shandong Baianrui Biopharmaceutical Co., Ltd. was founded in 2013, operates a 110,000+ m2 campus, and primarily serves export markets in Europe and North America.",
    image: "/assets/images/factory-campus.webp",
    cta: "Contact Sales",
    secondary: "View Manufacturing",
  })}
  ${companyVideoSection()}
  <section class="detail-grid"><div><h2>Company profile</h2><p>Nutranexa integrates R&D, production, and sales of new food ingredients, health food ingredients, and food additives. The company positions phosphatidylserine as a lead product and uses verified factory and product materials to support buyer evaluation.</p></div><div><h2>Primary export markets</h2><p>Nutranexa primarily serves B2B ingredient buyers in Europe and North America, with product documents and commercial details reviewed according to the destination market and quoted product.</p></div><div><h2>Mission</h2><p>Provide healthy, safe, and effective functional food and dietary supplement ingredients while supporting biotechnology industry development and customer product needs.</p></div></section>`;
  return layout({
    title: "About Nutranexa | Shandong Baianrui Biopharmaceutical",
    description: "Learn about Nutranexa, a biotechnology manufacturer supplying phosphatidylserine and functional food ingredients primarily to B2B buyers in Europe and North America.",
    route: "/about/",
    image: "/assets/images/factory-campus.webp",
    schema: [breadcrumbJson([["Home", "/"], ["About", "/about/"]])],
    body,
  });
}

function contactPage() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Contact sales</p><h1>Request a Quote or Product Documents</h1><p>Send product interest, target application, annual quantity, and document needs. You can contact sales by email, WhatsApp, phone, or the contact form.</p></section>
  <section class="contact-layout">
    ${contactDetailsCard("Nutranexa / Shandong Baianrui Biopharmaceutical")}
    ${quoteForm("General quote request")}
  </section>`;
  return layout({
    title: "Contact Nutranexa | Request PS Ingredient Quote",
    description: "Contact Nutranexa to request phosphatidylserine specifications, quotation, application support, and verified documents.",
    route: "/contact/",
    schema: [breadcrumbJson([["Home", "/"], ["Contact", "/contact/"]])],
    body,
  });
}

function inquiryPage() {
  const body = `<section class="inquiry-page">
  <div class="inquiry-copy">
    <p class="eyebrow">B2B Inquiry</p>
    <h1>Send Your Ingredient Requirements</h1>
    <p>Use this form to request PS specifications, source options, document availability, sample support, or quotation details. Required fields are marked clearly so overseas buyers can submit quickly.</p>
    <div class="inquiry-trust">
      <span>PS / Soy PS / Sunflower PS</span>
      <span>Specification and COA request</span>
      <span>Application and shipment discussion</span>
    </div>
    <div class="inquiry-tech-card">
      <h2>Direct Sales Contact</h2>
      <p>Email <a href="mailto:${salesEmail}">${salesEmail}</a> or WhatsApp <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">${whatsapp}</a> for PS specifications, COA samples, document review, and quotation support.</p>
      <ul class="check-list">
        <li>PS 20% and 50% COA sample review</li>
        <li>Halal, Kosher, food production license, and facility registration document discussion</li>
        <li>Source, application, annual quantity, packaging, and shipment timeline support</li>
      </ul>
    </div>
  </div>
  <form class="inquiry-form quote-form" data-context="Dedicated B2B inquiry page" action="https://formsubmit.co/wh1007209170@gmail.com" method="post" novalidate>
    <input type="hidden" name="Lead Source" value="Inquiry Page">
    <input type="hidden" name="_subject" value="New Nutranexa Website Inquiry">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_next" value="https://nutranexaps.com/thank-you/">
    <input type="hidden" name="_url" value="https://nutranexaps.com/contact/">
    <label class="hidden-field">Company website <input name="_honey" tabindex="-1" autocomplete="off"></label>
    <div class="required-note"><span>*</span> Required fields</div>
    <div class="inquiry-grid">
      <label>Name <span>*</span><input required name="Name" autocomplete="name" placeholder="Your full name"><small>Please enter your name.</small></label>
      <label>Email <span>*</span><input required type="email" name="Email" autocomplete="email" placeholder="name@company.com"><small>Please enter a valid business email.</small></label>
      <label>Phone <span>*</span><input required type="tel" name="Phone" autocomplete="tel" inputmode="tel" pattern="^\\+?[0-9\\s().-]{7,24}$" placeholder="+1 555 123 4567"><small>Please include a valid phone number with country code if possible.</small></label>
      <label>Company <input name="Company" autocomplete="organization" placeholder="Company or organization"></label>
      <label>Country / Region <input name="Country" autocomplete="country-name" placeholder="United States, Germany, Brazil..."></label>
      <label>Product Interest <input name="Interest" placeholder="PS powder, Soy PS, Sunflower PS, SSP..."></label>
      <label class="full">Message <textarea name="Message" rows="5" placeholder="Tell us your product requirement, specification, quantity, documents, or timeline."></textarea></label>
    </div>
    <div class="inquiry-form-actions">
      <button class="button inquiry-submit" type="submit">Submit Inquiry</button>
      <p class="form-status" role="status" aria-live="polite">Complete the required fields, then submit your request.</p>
    </div>
  </form>
</section>`;
  return layout({
    title: "Request a Quote | Nutranexa Phosphatidylserine Supplier",
    description: "Send your inquiry for phosphatidylserine specifications, COA samples, source options, application support, and bulk ingredient quotation.",
    route: "/inquiry/",
    image: "/assets/images/quality-document-review.webp",
    schema: [breadcrumbJson([["Home", "/"], ["Inquiry", "/inquiry/"]])],
    body,
  });
}

function resourcesHub() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Resources</p><h1>Phosphatidylserine Sourcing Guides</h1><p>Use these articles to compare product options, prepare document requests, and evaluate suppliers before contacting sales.</p></section>
  <section>${sectionIntro("Buyer guides", "Read practical PS sourcing articles", "The resource hub connects product selection, document review, application decisions, and supplier evaluation topics.")}
    <div class="article-grid">${articles.map((article) => `<article class="article-card article-card-media"><img src="${articleImage(article)}" alt="${esc(article.imageAlt)}" width="1536" height="1024" loading="lazy"><div><p class="eyebrow">${article.pillar ? "Pillar guide" : "Article"}</p><h3>${esc(article.title)}</h3><p>${esc(article.description)}</p><a href="/resources/${article.slug}/">Read article</a></div></article>`).join("")}</div>
  </section>`;
  return layout({
    title: "Resources | Phosphatidylserine Sourcing Guides | Nutranexa",
    description: "Read Nutranexa phosphatidylserine sourcing guides for product selection, COA review, applications, and supplier evaluation.",
    route: "/resources/",
    schema: [breadcrumbJson([["Home", "/"], ["Resources", "/resources/"]])],
    body,
  });
}

function newsCategory(article) {
  const text = `${article.headline} ${article.description}`.toLowerCase();
  if (/study|trial|research|journal|clinical/.test(text)) return "Research";
  if (/fda|efsa|regulat|guidance|compliance|dshea|law/.test(text)) return "Regulation";
  if (/launch|formula|product|introduc|debut/.test(text)) return "Product Launch";
  return "Ingredient Market";
}

function newsPage() {
  const sortedNews = [...newsItems].sort((a, b) => b.published.localeCompare(a.published));
  const cards = sortedNews.map((item) => `<article class="news-brief-card">
      <a class="news-brief-thumb" href="/news/${esc(item.slug)}/" aria-label="Read ${esc(item.headline)}">
        <img src="${esc(item.featuredImage)}" alt="${esc(item.featuredAlt)}" width="420" height="260" loading="lazy">
      </a>
      <div class="news-brief-content">
        <div class="news-meta"><span>${esc(newsCategory(item))}</span><time datetime="${esc(item.published)}">${esc(item.displayDate)}</time></div>
        <h2><a href="/news/${esc(item.slug)}/">${esc(item.headline)}</a></h2>
        <p>${esc(item.description)}</p>
        <a class="news-source-link" href="/news/${esc(item.slug)}/">Read full story and sources</a>
      </div>
    </article>`).join("");
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sortedNews.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.headline,
      url: urlFor(`/news/${item.slug}/`),
    })),
  };
  const body = `<section class="page-hero compact news-hero"><p class="eyebrow">Ingredient news</p><h1>Phosphatidylserine Industry News</h1><p>Short, source-led updates on PS, phospholipids, supplement regulation, research, and functional ingredient markets.</p>
    <div class="news-hero-facts"><span>${sortedNews.length} published report${sortedNews.length === 1 ? "" : "s"}</span><span>Sources listed on every article</span><span>Updated daily</span></div>
  </section>
  <section class="news-section" id="archive">${sectionIntro("News briefs", "Scan titles, summaries, and sources quickly", "Each brief links to a full article with sectioned details and source links for verification.")}
    <div class="news-brief-list">${cards}</div>
  </section>
  <section class="cta-band"><div><p class="eyebrow">Product sourcing</p><h2>Need PS specifications behind a market project?</h2><p>Share the source, target assay, application, annual quantity, and required documents with Nutranexa sales.</p></div><a class="button light" href="/contact/">Contact Sales</a></section>`;
  return layout({
    title: "Phosphatidylserine Industry News | Nutranexa",
    description: "Source-led phosphatidylserine, phospholipid, dietary supplement, and functional ingredient industry reporting.",
    route: "/news/",
    schema: [breadcrumbJson([["Home", "/"], ["News", "/news/"]]), itemList],
    body,
  });
}

function newsArticlePage(article) {
  const toc = article.sections
    .map((section) => `<li><a href="#${esc(section.id)}">${esc(section.heading)}</a></li>`)
    .concat('<li><a href="#sources">Sources</a></li>')
    .join("");
  const route = `/news/${article.slug}/`;
  const sections = article.sections.map((section) => `<section id="${esc(section.id)}"><h2>${esc(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</section>`).join("");
  const sources = article.sources.map((source) => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a></li>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.description,
    datePublished: article.published,
    dateModified: article.published,
    author: { "@type": "Organization", name: article.byline },
    publisher: { "@type": "Organization", name: "Nutranexa", logo: { "@type": "ImageObject", url: `${siteUrl}/assets/images/logo-nutranexa.webp` } },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${article.featuredImage}`,
      width: 1200,
      height: 800,
    },
    mainEntityOfPage: urlFor(route),
  };
  const body = `<article>
  <header>
    <p><a href="/news/">Back to News</a></p>
    <p>Ingredient news</p>
    <h1>${esc(article.headline)}</h1>
    <p>By ${esc(article.byline)} | <time datetime="${esc(article.published)}">${esc(article.displayDate)}</time></p>
    <p>${esc(article.description)}</p>
  </header>
  <p><img src="${esc(article.featuredImage)}" alt="${esc(article.featuredAlt)}" width="360" height="240" loading="eager"></p>
  <p><a href="${esc(article.imageCreditUrl)}" target="_blank" rel="noopener noreferrer">${esc(article.imageCredit)}</a></p>
  <nav aria-label="Table of contents">
    <h2>Table of contents</h2>
    <ul>${toc}</ul>
  </nav>
  ${sections}
  <section id="sources">
    <h2>Sources</h2>
    <ul>${sources}</ul>
  </section>
</article>`;
  return plainNewsArticleLayout({
    title: `${article.headline} | Nutranexa News`,
    description: article.description,
    route,
    image: article.featuredImage,
    imageAlt: article.featuredAlt,
    schema: [breadcrumbJson([["Home", "/"], ["News", "/news/"], [article.headline, route]]), schema],
    body,
  });
}

function articlePage(article) {
  const route = `/resources/${article.slug}/`;
  const articleContent = article.contentHtml || article.body.map((para, index) => `${index === 1 ? '<aside class="inline-cta"><strong>Need current specifications?</strong><a href="/contact/">Request Specifications</a></aside>' : ""}<p>${esc(para)}</p>`).join("");
  const schemas = [breadcrumbJson([["Home", "/"], ["Resources", "/resources/"], [article.title, route]]), articleJson(article, route), resourceFaqJson(article)].filter(Boolean);
  const body = `<article class="article-page">
  <header><p class="eyebrow">${article.pillar ? "Pillar guide" : "Resource article"}</p><h1>${esc(article.title)}</h1><p>${esc(article.description)}</p>${article.published ? `<p class="article-date">Published <time datetime="${esc(article.published)}">${esc(new Date(`${article.published}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }))}</time></p>` : ""}<div class="article-actions"><a class="button secondary" href="/products/phosphatidylserine/">View PS Products</a><a class="button primary" href="/contact/">Request Specifications</a></div><img class="article-hero-image" src="${articleImage(article)}" alt="${esc(article.imageAlt)}" width="1536" height="1024" loading="eager"></header>
  <div class="article-body">${articleContent}
  <h2>Recommended next steps</h2><ul><li>Review the <a href="/products/phosphatidylserine/">Phosphatidylserine product page</a>.</li><li>Compare <a href="/products/soy-phosphatidylserine/">Soy PS</a> and <a href="/products/sunflower-phosphatidylserine/">Sunflower PS</a>.</li><li>Check <a href="/manufacturing/">manufacturing proof</a> and <a href="/quality-rd/">Quality & R&D</a>.</li></ul>
  <div class="bottom-cta"><h2>Contact sales for product documents</h2><p>Share source preference, application, country, and annual quantity.</p><a class="button primary" href="/contact/">Contact Sales</a></div></div>
</article>`;
  return layout({
    title: articleSeoTitle(article),
    description: article.description,
    route,
    image: articleImage(article),
    schema: schemas,
    body,
  });
}

function thankYouPage() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Inquiry received</p><h1>Thank you. Your request is ready for sales follow-up.</h1><p>Our team will review your product interest, document needs, application details, and quotation request. You can also contact us by email or WhatsApp for urgent projects.</p><a class="button primary" href="/products/phosphatidylserine/">Return to PS Products</a></section>`;
  return layout({ title: "Thank You | Nutranexa Quote Request", description: "Your Nutranexa phosphatidylserine inquiry has been received for sales follow-up.", route: "/thank-you/", schema: [breadcrumbJson([["Home", "/"], ["Thank You", "/thank-you/"]])], body });
}

function privacyPage() {
  const body = `<section class="article-page"><header><p class="eyebrow">Privacy</p><h1>Privacy Policy</h1><p>This policy explains how Nutranexa handles B2B inquiry information.</p></header><div class="article-body"><p>Nutranexa collects information submitted through inquiry forms, including name, email, phone, company, country, product interest, and message content. The information is used to respond to B2B product, document, sample, and quotation requests.</p><p>Inquiry information may be reviewed by sales and technical staff so the team can confirm product source, specification, available documents, packaging, and shipment discussion points.</p><p>For privacy-related requests, contact ${salesEmail}.</p></div></section>`;
  return layout({ title: "Privacy Policy | Nutranexa", description: "Learn how Nutranexa handles B2B inquiry information submitted through the website.", route: "/privacy/", schema: [breadcrumbJson([["Home", "/"], ["Privacy", "/privacy/"]])], body });
}

async function write(route, html) {
  const file = routeToFile(route);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html.replace(/[ \t]+$/gm, ""), "utf8");
}

const routes = [];
async function add(route, html) {
  routes.push(route);
  await write(route, html);
}

await add("/", homePage());
await add("/products/", productsHub());
for (const product of products) await add(`/products/${product.slug}/`, productPage(product));
await add("/benefits/", benefitsHub());
for (const item of psBenefitItems) await add(`/benefits/${item.slug}/`, benefitPage(item));
await add("/applications/", applicationsHub());
for (const app of applications) await add(`/applications/${app.slug}/`, applicationPage(app));
await add("/manufacturing/", manufacturingPage());
await add("/cases/", casesPage());
await add("/quality-rd/", qualityPage());
await add("/about/", aboutPage());
await add("/contact/", contactPage());
await add("/news/", newsPage());
for (const article of newsItems) await add(`/news/${article.slug}/`, newsArticlePage(article));
await add("/resources/", resourcesHub());
for (const article of articles) await add(`/resources/${article.slug}/`, articlePage(article));
await add("/thank-you/", thankYouPage());
await add("/privacy/", privacyPage());

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${urlFor(route)}</loc></url>`).join("\n")}
</urlset>
`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`;
await fs.writeFile(path.join(root, "robots.txt"), robots, "utf8");

console.log(`Built ${routes.length} routes`);

