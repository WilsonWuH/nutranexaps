import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const siteUrl = "https://nutranexaps.com";
const phone = "400-138-0635";
const whatsapp = "+8613645700210";
const address = "Yunhe West Road, Shizilou District, Yanggu County, Liaocheng City, Shandong Province, P.R. China";
const newsItems = JSON.parse(await fs.readFile(path.join(root, "content", "news.json"), "utf8"));
const researchItems = JSON.parse(await fs.readFile(path.join(root, "content", "research.json"), "utf8"));

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
  {
    label: "Products",
    href: "/products/",
    columns: [
      {
        title: "By Purity",
        links: [
          ["PS 20%", "/products/phosphatidylserine-20/", "Flexible entry grade for nutrition formulations"],
          ["PS 50%", "/products/phosphatidylserine-50/", "Higher assay option for concentrated concepts"],
          ["PS 70%", "/products/phosphatidylserine-70/", "Premium high-purity grade for advanced formulations"],
        ],
      },
      {
        title: "By Source",
        links: [
          ["Soy-Derived PS", "/products/soy-phosphatidylserine/", "Established source route with document support"],
          ["Sunflower-Derived PS", "/products/sunflower-phosphatidylserine/", "Source option for differentiated market positioning"],
        ],
      },
      {
        title: "Compare & Select",
        links: [
          ["Compare PS Grades", "/resources/phosphatidylserine-powder-specifications/", "Review assay, source, and document considerations"],
          ["Request Specifications", "/contact/", "Ask for current specifications and sample COA"],
        ],
      },
    ],
  },
  {
    label: "Applications",
    href: "/applications/",
    columns: [
      {
        title: "Health & Nutrition",
        links: [
          ["Cognitive Health", "/applications/cognitive-health/", "Ingredient concepts designed for cognitive wellness"],
          ["Memory Support", "/applications/memory-support/", "Compliant formulation and positioning context"],
          ["Healthy Aging", "/applications/healthy-aging/", "Nutrition concepts for healthy aging portfolios"],
          ["Sports Nutrition", "/applications/sports-nutrition/", "Powder, capsule, and active-lifestyle format planning"],
        ],
      },
      {
        title: "Food & Supplements",
        links: [
          ["Functional Foods", "/applications/functional-foods/", "Food, beverage, and nutrition formula development"],
          ["Dietary Supplements", "/applications/dietary-supplements/", "Capsule, tablet, and powder applications"],
          ["Application Guidance", "/contact/", "Discuss process and format requirements"],
        ],
      },
    ],
  },
  {
    label: "Science",
    href: "/science/",
    columns: [
      {
        title: "PS Fundamentals",
        links: [
          ["What Is Phosphatidylserine?", "/resources/what-is-phosphatidylserine/", "A practical introduction for ingredient buyers"],
          ["How PS Works", "/science/how-ps-works/", "Phospholipid structure and compliant mechanism education"],
          ["Research Library", "/science/research-library/", "Structured, source-linked scientific publications"],
        ],
      },
      {
        title: "Technical Support",
        links: [
          ["Formulation Support", "/science/formulation-support/", "Discuss application, source, and target assay"],
          ["Quality & R&D", "/quality-rd/", "Review R&D and quality-control capability"],
        ],
      },
    ],
  },
  {
    label: "Quality",
    href: "/quality-rd/",
    columns: [
      {
        title: "Manufacturing & Control",
        links: [
          ["Manufacturing", "/manufacturing/", "Integrated production and controlled workshops"],
          ["Quality Control", "/quality-rd/", "Testing and release workflow"],
          ["Testing", "/quality-rd/", "Analytical and batch-review capability"],
        ],
      },
      {
        title: "Documentation",
        links: [
          ["COA / TDS / MSDS", "/resources/documents-for-ps-ingredients/", "Technical files for buyer qualification"],
          ["Request Current Copies", "/contact/", "Match documents to the quoted product and batch"],
        ],
      },
    ],
  },
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
  { label: "About Us", href: "/about/" },
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
    legacy: true,
    points: ["Tablet and capsule formulas", "Powder product development", "Source and content comparison", "Specification and COA requests"],
    formats: [
      ["Hard capsules", "Confirm particle profile, bulk density, flow, fill weight, source, and target PS assay before a production trial."],
      ["Tablets", "Evaluate compressibility, excipient compatibility, disintegration, color stability, and assay uniformity in the finished formula."],
      ["Soft capsules", "Confirm the quoted PS form, carrier system, oxidation control, compatibility, and storage requirements with technical documents."],
      ["Powder blends", "Test dispersibility, taste, caking, blend uniformity, moisture control, and packaging under the intended process conditions."],
    ],
  },
  {
    slug: "cognitive-health",
    title: "Phosphatidylserine for Cognitive Health",
    seoTitle: "Cognitive Health PS Ingredient | Nutranexa",
    description: "Science-informed soy- and sunflower-derived PS ingredient solutions for brain health, mental performance, and cognitive wellness formulations.",
    image: "/assets/images/hero-ps-innovation-v2.png",
    tags: ["Brain Health Formulas", "Mental Performance Products", "Healthy Aging Nutrition"],
    points: ["Cell membrane structure", "Neuronal communication research", "Flexible formulation options", "Cognitive and healthy-aging research interest"],
    formats: [
      ["Capsules", "Confirm source, target assay, particle profile, fill weight, and excipient compatibility before scale-up."],
      ["Tablets", "Evaluate compressibility, disintegration, color stability, and finished-product assay uniformity."],
      ["Powder blends", "Test dispersibility, taste, caking, moisture control, and blend uniformity in the intended formula."],
      ["Sachets", "Confirm serving weight, barrier packaging, flavor impact, and stability under intended storage conditions."],
      ["Functional nutrition products", "Suitability should be confirmed through formulation, processing, and stability testing."],
    ],
  },
  {
    slug: "memory-support",
    title: "Phosphatidylserine for Memory Support Formulations",
    seoTitle: "PS for Memory Support Formulas | Nutranexa",
    description: "PS ingredient options for memory-focused formulas, daily cognitive products, student nutrition, professional performance, and healthy-aging concepts.",
    image: "/assets/images/news-lecithin-memory-muscle-study-2025.webp",
    tags: ["Daily Cognitive Products", "Student Nutrition", "Healthy Aging Support"],
    points: ["Memory-focused formula positioning", "Daily cognitive nutrition concepts", "Source and grade selection", "Compliance-aware communication"],
    formats: [
      ["Capsules", "Define the target serving format, PS grade, source preference, and documentation required for the market."],
      ["Tablets", "Confirm processing suitability and finished-product testing with the contract manufacturer."],
      ["Powder blends", "Evaluate sensory impact, uniformity, and moisture protection in the complete formula."],
      ["Sachets", "Use formulation and stability testing to confirm serving format and shelf-life assumptions."],
    ],
  },
  {
    slug: "healthy-aging",
    title: "Phosphatidylserine Solutions for Healthy Aging",
    seoTitle: "Phosphatidylserine Solutions for Healthy Aging | Nutranexa",
    description: "Plant-derived PS solutions for 50+ nutrition, active aging, cognitive wellness, and senior nutrition product development.",
    image: "/assets/images/news-mfgm-phospholipid-cognition-trial-2025.webp",
    tags: ["50+ Nutrition", "Active Aging", "Cognitive Wellness"],
    points: ["Healthy-aging market opportunity", "Phospholipid research context", "Source and purity options", "Technical document support"],
    formats: [
      ["Capsules", "Use source and grade selection to balance serving format, positioning, and document requirements."],
      ["Tablets", "Confirm compressibility, disintegration, and stability in the finished senior-nutrition formula."],
      ["Powder blends", "Evaluate taste, blend uniformity, serving size, and barrier packaging."],
      ["Functional nutrition products", "Confirm processing compatibility and target-market requirements before commercialization."],
    ],
  },
  {
    slug: "sports-nutrition",
    title: "Phosphatidylserine for Sports Nutrition and Active Lifestyles",
    seoTitle: "Phosphatidylserine for Sports Nutrition | Nutranexa",
    description: "PS ingredient solutions for active-lifestyle, exercise-nutrition, mental-performance, and recovery-formula concepts.",
    image: "/assets/images/dietary-supplement-application.webp",
    tags: ["Active Lifestyle", "Exercise Nutrition", "Mental Performance"],
    points: ["Studied in exercise-related nutrition research", "Active-lifestyle product concepts", "Mental-performance formulation context", "Source and grade selection"],
    formats: [
      ["Capsules", "Confirm serving design, source, target assay, and compatibility with the complete active-nutrition formula."],
      ["Tablets", "Evaluate processing and stability with all active ingredients and excipients."],
      ["Powder blends", "Test taste, dispersibility, caking, and assay uniformity under intended processing conditions."],
      ["Sachets", "Confirm moisture barrier, serving weight, sensory profile, and shelf-life through finished-product testing."],
    ],
  },
  {
    slug: "functional-foods",
    title: "Phosphatidylserine for Functional Food Innovation",
    seoTitle: "PS for Functional Food Innovation | Nutranexa",
    description: "Evaluate PS formats, processing, stability, and technical support for powder blends, sachets, nutrition mixes, and functional food concepts.",
    image: "/assets/images/functional-food-application.webp",
    tags: ["Powder Blends", "Sachets", "Nutrition Mixes"],
    points: ["Milk powder and nutrition formulas", "Dairy beverage applications", "Functional food ingredient positioning", "Compliance-aware content and document workflow"],
    formats: [
      ["Milk powder", "Evaluate blend uniformity, moisture exposure, flavor impact, target assay, serving format, and shelf-life conditions."],
      ["Dairy drinks", "Run bench tests for dispersion, sedimentation, heat treatment, pH, sensory impact, and processing losses."],
      ["Nutrition powders", "Confirm carrier compatibility, caking control, serving size, packaging barrier, and assay verification in the final blend."],
      ["Functional food concepts", "Define the target country, permitted positioning, process conditions, source preference, and required document package."],
    ],
  },
];

const psGrades = [
  {
    slug: "phosphatidylserine-20",
    name: "Phosphatidylserine 20%",
    shortName: "PS 20%",
    badge: "Flexible Grade",
    positioning: "Value-focused nutrition",
    description: "A cost-efficient phosphatidylserine option designed for daily nutrition products, powder blends, and value-focused formulations.",
    image: "/assets/images/product-soy-ps.webp",
    source: "Soy or sunflower source; confirm the quoted route",
    appearance: "Fine powder; light to brown yellow",
    content: ">= 20% according to the supplied PS 20% specification",
    highlights: ["Soy or sunflower source", "Flexible formulation option", "Technical documentation available"],
    applications: ["Cognitive health", "Healthy aging", "Powder blends", "Functional nutrition"],
    downloads: [["PS 20% English Specification", "/assets/documents/phosphatidylserine-20-specification.docx", "DOCX"]],
  },
  {
    slug: "phosphatidylserine-50",
    name: "Phosphatidylserine 50%",
    shortName: "PS 50%",
    badge: "Most Popular",
    positioning: "Mainstream cognitive products",
    description: "A balanced purity grade for mainstream cognitive health supplements, capsules, and tablet formulations.",
    image: "/assets/images/brand-product-lab.webp",
    source: "Soy or sunflower source; confirm the quoted route",
    appearance: "Confirm against the current controlled specification",
    content: "Target 50% grade; confirm against the current controlled specification",
    highlights: ["Soy or sunflower source", "Mainstream supplement application", "Complete technical support"],
    applications: ["Cognitive health", "Memory support", "Healthy aging", "Capsules and tablets"],
    downloads: [],
  },
  {
    slug: "phosphatidylserine-70",
    name: "Phosphatidylserine 70%",
    shortName: "PS 70%",
    badge: "Premium Grade",
    positioning: "Premium formulations",
    description: "A high-purity solution for premium cognitive health, healthy aging, and advanced nutrition concepts.",
    image: "/assets/images/product-sunflower-ps.webp",
    source: "Soy or sunflower source; confirm current availability",
    appearance: "Light to brown yellow powder; the supplied batch result is yellow powder",
    content: ">= 70%; supplied batch sample result: 72.9 g/100g",
    highlights: ["Premium positioning", "High-concentration option", "Technical documentation available"],
    applications: ["Premium cognitive health", "Healthy aging", "Advanced nutrition", "Compact dosage formats"],
    downloads: [],
    coa: {
      title: "PS 70% COA Batch Sample",
      image: "/assets/images/doc-coa-ps-70.webp",
      note: "This buyer-supplied COA is a batch-specific sample. It does not identify soy or sunflower source. Request the current batch COA and source statement for each order.",
      rows: [
        ["Product model", "PP701"],
        ["Lot number", "C00120260604"],
        ["Manufacture date", "June 7, 2026"],
        ["Report date", "June 12, 2026"],
        ["Test basis", "QB/T 5821-2023"],
        ["Shelf life", "24 months"],
        ["Color / appearance", "Yellow / powder"],
        ["Moisture", "0.59 g/100g; standard <= 2.0"],
        ["Phosphatidylserine", "72.9 g/100g; standard >= 70"],
        ["Peroxide value", "0.39 mmol/kg; standard <= 2.5"],
        ["Acetone insoluble", "99.0 g/100g; standard >= 95.0"],
        ["Lead / arsenic / mercury", "Not detected"],
        ["Cadmium", "< 0.003 mg/kg; standard <= 1"],
        ["Total plate count", "< 10 CFU/g; standard <= 1,000"],
        ["Coliforms", "< 10 CFU/g; standard <= 10"],
        ["Molds and yeasts", "< 10 CFU/g; standard <= 50"],
        ["Salmonella", "Not detected / 25g"],
      ],
    },
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
  {
    title: "PS 70% COA Batch Sample",
    text: "Buyer-supplied batch COA for model PP701, lot C00120260604, reporting 72.9 g/100g phosphatidylserine. The source route is not stated on the sample.",
    image: "/assets/images/doc-coa-ps-70.webp",
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
  "phosphatidylserine-health-claims-europe": "European supplement regulatory and formulation team reviewing health-claim placement on blank phosphatidylserine packaging with green, amber, and red decision tiles in a morning design studio",
  "phosphatidylserine-ndi-review-us": "U.S. supplement premarket review desk with a sealed 25 kilogram phosphatidylserine drum, soy and sunflower source trays, a powder dish, three blank evidence lanes, and an abstract 75-day launch timeline in late-afternoon light",
  "phosphatidylserine-dioxin-pcb-testing-europe": "Representative phosphatidylserine lot sampling with three powder increments, a composite amber sample jar, analytical vials, and confirmatory dioxin and PCB laboratory instrumentation",
  "phosphatidylserine-pesticide-residue-review-europe": "European phosphatidylserine pesticide-residue review with separate soy and sunflower source trays, a PS powder sample, multi-residue vials, and blank release-decision cards",
  "phosphatidylserine-payment-terms-europe": "European procurement-finance desk at morning light planning phosphatidylserine payment terms, with a sealed ingredient drum, a blank contract sheet and milestone schedule, two separate payment rails through a bank window, and a distant container terminal",
  "soluble-soybean-polysaccharide-acidified-beverage-pilot": "Acidified protein beverage pilot with four stability samples, soluble soybean polysaccharide powder, a homogenizer, pH probe, and centrifuge tubes",
  "soluble-soybean-polysaccharide-vs-pectin-acidified-beverages-us-eu": "Split-screen acidified protein beverage comparison with two unlabeled beverage prototypes, a central soluble soybean polysaccharide sample, a separate pectin dish, a pH meter, and a buyer decision board in a bright pilot kitchen",
  "phosphatidylserine-fsvp-importer-checklist-us": "U.S. phosphatidylserine FSVP review with a sealed ingredient drum, PS powder, a supplier-to-entry workflow, barcode scanner, and blank hazard cards",
  "phosphatidylserine-pah-testing-europe": "European phosphatidylserine PAH review with an amber-glass powder sample, foil-wrapped retain, four analytical vials, and chromatography equipment",
  "phosphatidylserine-flowability-blend-uniformity-pilot": "Phosphatidylserine capsule-production pilot with a powder flow funnel, three spatial blend samples, a scale, scoop, and capsule filling plate",
  "phosphatidylserine-gras-scope-review-us": "U.S. phosphatidylserine GRAS scope review with soy and sunflower sources, PS powder, blank scope tiles, and unbranded beverage, bar, and cereal prototypes",
  "phosphatidylserine-customer-questionnaire-control-us-canada": "North American phosphatidylserine questionnaire-control desk with a sealed 25 kilogram drum edge, PS powder dish, soy and sunflower source trays, blank answer cards, barcode labels, and separate QA, regulatory, and sales folders",
  "phosphatidylserine-assay-batch-calculation-europe": "Top-down European supplement formulation bench showing two phosphatidylserine powder quantities, a blank precision scale, mass-balance tiles, a mixing vessel, and a capsule-filling tray",
  "phosphatidylserine-hs-code-review-us-canada": "North American customs-classification review desk with a sealed 25 kilogram phosphatidylserine drum, powder dish, soy and sunflower route trays, a magnifier over blank tariff-code tiles, and a broker handoff board for identity, classification, invoice, and release checks",
  "phosphatidylserine-third-party-testing-us-eu": "Cross-border phosphatidylserine independent-lab verification with a sealed 25 kilogram drum, powder dish, tamper-evident sample jar, chain-of-custody tags, and blank supplier-COA-versus-lab-report comparison cards on a daylight technical bench",
  "phosphatidylserine-vegan-statement-us-canada": "North American phosphatidylserine vegan-statement review desk with a sealed 25 kilogram drum edge, white PS powder dish, soy and sunflower source trays, blank green claim cards, and a clean amber bottle mockup in daylight",
  "phosphatidylserine-fda-food-facility-registration-us": "U.S. import-compliance review with a sealed plain 25 kilogram phosphatidylserine drum, an unreadable facility-registration portal on a laptop, route cards for general soy and sunflower PS, a QA checklist board, and procurement-regulatory reviewers in a daylight office",
  "soluble-soybean-polysaccharide-e426-europe": "European food-application review in a bright pilot kitchen with a central soluble soybean polysaccharide sample, separate beverage, cultured dairy, sauce, bakery, and tablet prototypes, and a gloved specialist moving a blank decision puck through a blue-and-amber physical gate",
  "soluble-soybean-polysaccharide-allergen-statement-us-eu": "Cross-border soluble soybean polysaccharide allergen-statement review with a powder dish, soybeans in a separate source tray, blank U.S. and EU label cards, and QA-regulatory reviewers aligning a dual-market decision board in daylight",
  "phosphatidylserine-certificate-of-origin-review-us-eu": "Cross-border phosphatidylserine origin-document review with a sealed plain 25 kilogram drum, blank certificate and invoice folders, separate U.S. and EU route markers, and a customs validation board showing origin, consignee, and label checkpoints in daylight",
  "phosphatidylserine-incoterms-europe": "European phosphatidylserine freight-planning route model with a sealed ingredient drum on a pallet, container terminal, import gate, warehouse, and four blank handover markers",
  "phosphatidylserine-supplemented-food-caution-box-canada": "Canadian supplemented-food packaging review with a blank beverage carton and bar wrapper, a bold caution-identifier tile, an empty caution-box card, a Supplemented Food Facts placeholder grid, a phosphatidylserine powder dish, and a soy-source tray on a daylight regulatory desk",
  "phosphatidylserine-food-supplement-notification-europe": "European food-supplement launch planning desk with one unbranded phosphatidylserine bottle branching into three separate national notification lanes, each ending at a blank dossier tray and decision gate",
  "phosphatidylserine-sample-shipment-checklist-us-eu": "Cross-border phosphatidylserine first-sample shipment setup with small sealed sample packs, a plain courier carton, blank invoice and packing cards, U.S. and EU route markers, tamper seals, and a receiving checklist on a daylight shipping desk",
  "soy-phosphatidylserine-eudr-europe": "European soy phosphatidylserine EUDR scope review shown as geolocated soybean field parcels feeding an amber ingredient path through a physical customs-classification gate",
  "phosphatidylserine-3-mcpd-glycidyl-esters-review-europe": "Top-down European phosphatidylserine process-contaminant review with soy and sunflower source cues, amber oil vials, phosphatidylserine powder dish, and blank QA cards beside a sealed drum edge",
  "phosphatidylserine-tse-bse-statement-europe": "European phosphatidylserine TSE/BSE statement review with a sealed 25 kilogram drum, soy and sunflower source trays, blank animal-origin declaration cards, and QA reviewers in a daylight technical office",
  "phosphatidylserine-kosher-certificate-review-us-canada": "North American private-label phosphatidylserine kosher review with an amber supplement bottle mockup, soy and sunflower source dishes, a sealed drum edge, and tabbed approval folders on a daylight compliance desk",
  "phosphatidylserine-customs-broker-handoff-us": "U.S. phosphatidylserine customs-broker handoff desk with invoice sleeves, packing tabs, an air-waybill pouch, barcode scanner, sealed drum corner, and abstract entry-workflow screen blocks in daylight",
  "phosphatidylserine-safety-data-sheet-review-europe": "European phosphatidylserine safety-data-sheet review desk with a blank 16-section clipboard grid, powder dish, sealed drum edge, divider tabs, magnifier, and warehouse glove in daylight",
  "phosphatidylserine-food-production-license-review-us-eu": "Top-down phosphatidylserine supplier-license review with a sealed drum lid, powder dish, blank checklist cards, soy and sunflower source trays, magnifier, red seal pad, and export carton corner in daylight",
  "phosphatidylserine-halal-certificate-review-us-eu": "Top-down cross-border phosphatidylserine halal review workstation with a sealed drum lid edge, white powder dish on a translucent green panel, soy and sunflower sample trays, blank approval sleeves, and export carton corner in daylight",
  "phosphatidylserine-country-of-origin-marking-us": "U.S. import receiving desk reviewing country-of-origin marking on a sealed phosphatidylserine drum with blank label cards, source samples, and an entry-document folder in daylight",
  "phosphatidylserine-isf-filing-checklist-us": "Container vessel on open water at dusk with abstract data-link nodes connecting manufacturer, consolidator, carrier, and importer into one advance-filing flow, an arc-shaped 24-hour clock motif above the bridge, and a distant U.S. port skyline",
  "phosphatidylserine-food-safety-certification-review-europe": "European phosphatidylserine supplier certificate-scope review with one blank certificate card feeding separate scheme-register, accreditation-database, and certification-body verification lanes, a magnifier over the scope line, a sealed 25 kilogram drum edge, and a white powder dish",
  "phosphatidylserine-supplier-quality-agreement-us-eu": "Cross-border phosphatidylserine supplier-quality-agreement review with two procurement and quality reviewers aligning one blank agreement across separate U.S. and EU clause lanes, a sealed 25 kilogram drum edge, a white PS powder dish, soy and sunflower source trays, and tabbed clause dividers in a daylight technical office",
  "phosphatidylserine-uflpa-compliance-us": "Flat-illustration UFLPA supply-chain checkpoint for U.S. importers: factory cluster feeding a traceability route through a compliance gate with shield and checklist to a U.S. port, with a magnifying glass over a sealed ingredient drum",
  "phosphatidylserine-fda-import-alert-dwpe-review-us": "U.S. port import checkpoint at dusk with a sealed 25 kilogram phosphatidylserine drum on a pallet truck stopped at a gate barrier, an abstract three-lane release status board with green amber and red signals, and a magnifier over an unreadable blank detention document",
  "phosphatidylserine-export-documentation-ispm15-review-us-eu": "Daylight warehouse loading bay with a sealed plain 25 kilogram phosphatidylserine drum on a solid wood pallet corner, a clipboard with blank export document sheets, a measuring tape and caliper beside the pallet, abstract ISPM-15 style stamp blocks on the wood, and a distant container door",
  "phosphatidylserine-peroxide-value-review-us-eu": "Cool-toned analytical review bench with chilled amber sample vials on a color-block oxidation indicator strip, a white phosphatidylserine powder dish, a titration flask and burette, a magnifier over a blank COA sheet with an abstract highlighted result row, a sealed plain 25 kilogram drum edge, a temperature and humidity logger, and soy and sunflower source trays",
  "phosphatidylserine-sfcr-import-licence-canada": "Canadian food-import licensing review with a sealed plain 25 kilogram phosphatidylserine drum, an unreadable licence-portal screen showing an abstract eight-character code tile, blank activity and commodity cards, a maple-leaf route marker beside a snow-dusted border gateway, and a broker handoff board for declaration and HS code checks in cool winter daylight",
  "phosphatidylserine-stability-study-europe": "European quality laboratory with an open glass-front stability chamber holding amber supplement bottles, sealed white powder tubs, and pouch samples on timepoint shelves, a blank protocol card, and an abstract timepoint track in cool morning light",
  "phosphatidylserine-mycotoxin-testing-us-eu": "Top-down mycotoxin sampling-station review for phosphatidylserine with a stainless grain sampling probe across a split tray of soybeans and sunflower seeds, sealed sample bags with blank tags, a white powder dish, a blank COA sheet with an abstract highlighted result row, a small risk-matrix card, and a sealed drum edge in daylight",
  "phosphatidylserine-reserve-samples-us": "US quality-control reserve-sample review with a sealed plain 25 kilogram phosphatidylserine drum on a pallet, a retention-calendar board with blank month tiles, sealed amber sample jars with blank lot stickers, a white powder dish, a finished supplement bottle mockup, and a temperature and humidity logger on a daylight warehouse QA bench",
  "phosphatidylserine-moisture-water-activity-review-us-eu": "Close-up moisture and water-activity spec review on a bright quality-control bench with a digital water-activity analyzer probe inserted into a white phosphatidylserine powder sample cup, a dew-point sensor card, sealed desiccant sachets, a condensation-gradient panel with moisture droplets, a blank COA sheet with an abstract highlighted moisture row, and a sealed plain 25 kilogram drum edge in daylight",
  "phosphatidylserine-mosh-moah-testing-review-us-eu": "Mineral oil hydrocarbon review desk for phosphatidylserine with a cutaway sealed plain 25 kilogram drum showing a white powder bag inside a food-grade liner, a recycled-paperboard sheet separated from the drum by a divider, a blank COA sheet with two abstract chromatogram humps, a magnifier, a food-grade lubricant dropper bottle, and a packaging-declaration card in cool daylight",
  "phosphatidylserine-structure-function-claims-us": "US supplement claims-review desk in daylight with a sealed plain 25 kilogram phosphatidylserine drum on a pallet, a white powder dish, an amber supplement bottle with a blank label, blank claim-review cards feeding separate green and red decision gates, a magnifier over an evidence sheet, and a scale, with a wall notice board in the background",
  "phosphatidylserine-particle-size-distribution-review-us-eu": "Quality reviewer comparing a stainless analytical sieve stack holding fine phosphatidylserine powder, a laser diffraction reading unit, and a blank particle size distribution report with an abstract bell-curve plot and D-value markers at a sourcing desk",
  "phosphatidylserine-fda-inspection-history-review-us": "US supplier-qualification review of FDA inspection records with a sealed plain 25 kilogram phosphatidylserine drum on a pallet, a compliance-screen monitor showing abstract database result rows, blank Form 483 observation cards with a magnifier, and green, amber, and red classification gate tiles on a daylight QA desk",
  "phosphatidylserine-rasff-monitoring-europe": "European morning early-warning review desk with an abstract EU network map of alert node points and signal rings feeding three blank notification lanes marked by green amber and red status markers, a sealed plain 25 kilogram phosphatidylserine drum on a pallet, a magnifier, and a distant container port",
  "phosphatidylserine-marine-cargo-insurance-us-canada": "US and Canada portside logistics office reviewing marine cargo insurance for a phosphatidylserine shipment: a sealed plain 25 kilogram drum on a pallet, an open cargo-policy binder with blank green amber and blue coverage tabs, a single-shipment insurance certificate card under a magnifier, and a container vessel at a port terminal seen through the office window",
  "phosphatidylserine-ics2-eu-import": "Dawn container terminal scene for European phosphatidylserine imports with a sealed plain 25 kilogram drum on a pallet, blank shipping-instructions clipboard and packing-list card, an abstract translucent pre-arrival data window of unreadable form rows with a gold approval arrow, and a container ship and gantry crane in soft morning haze",
  "phosphatidylserine-acetone-insoluble-review-us-eu": "Bright analytical extraction bench for a phosphatidylserine acetone-insoluble review with a round-bottom flask of clear acetone, a fine white PS powder weighing dish, a folded filter funnel above a receiving flask with a white precipitate, a blank COA sheet with an abstract highlighted purity row, a small reagent bottle, and a sealed plain 25 kilogram drum edge in daylight",
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
  "phosphatidylserine-health-claims-europe": "Phosphatidylserine Health Claims Europe | Nutranexa",
  "phosphatidylserine-ndi-review-us": "Phosphatidylserine NDI Review for US Supplement Brands | Nutranexa",
  "phosphatidylserine-dioxin-pcb-testing-europe": "PS Dioxin & PCB Testing for Europe | Nutranexa",
  "phosphatidylserine-pesticide-residue-review-europe": "PS Pesticide Residue Review Europe | Nutranexa",
  "phosphatidylserine-payment-terms-europe": "Phosphatidylserine Payment Terms for Europe: T/T, L/C, and Risk Controls | Nutranexa",
  "soluble-soybean-polysaccharide-acidified-beverage-pilot": "SSPS Acidified Beverage Pilot Guide | Nutranexa",
  "soluble-soybean-polysaccharide-vs-pectin-acidified-beverages-us-eu": "Soluble Soybean Polysaccharide vs Pectin for Acidified Protein Beverages | Nutranexa",
  "phosphatidylserine-fsvp-importer-checklist-us": "PS FSVP Importer Checklist for the US | Nutranexa",
  "phosphatidylserine-pah-testing-europe": "PS PAH Testing for Europe | Nutranexa",
  "phosphatidylserine-flowability-blend-uniformity-pilot": "PS Flow & Blend Uniformity Pilot | Nutranexa",
  "phosphatidylserine-gras-scope-review-us": "PS GRAS Scope Review for US Foods | Nutranexa",
  "phosphatidylserine-customer-questionnaire-control-us-canada": "PS Customer Questionnaire Control for US and Canada Buyers | Nutranexa",
  "phosphatidylserine-assay-batch-calculation-europe": "PS Assay-to-Batch Calculation for Europe | Nutranexa",
  "phosphatidylserine-hs-code-review-us-canada": "PS HS Code Review for US and Canada Importers | Nutranexa",
  "phosphatidylserine-vegan-statement-us-canada": "PS Vegan Statement Review for US and Canada Buyers | Nutranexa",
  "phosphatidylserine-fda-food-facility-registration-us": "PS FDA Food Facility Registration Review for US Importers | Nutranexa",
  "soluble-soybean-polysaccharide-e426-europe": "Soluble Soybean Polysaccharide E 426 Europe | Nutranexa",
  "soluble-soybean-polysaccharide-allergen-statement-us-eu": "Soluble Soybean Polysaccharide Allergen Statement Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-incoterms-europe": "Phosphatidylserine Incoterms for Europe | Nutranexa",
  "phosphatidylserine-supplemented-food-caution-box-canada": "Phosphatidylserine Supplemented Food Caution Box Review for Canada | Nutranexa",
  "phosphatidylserine-food-supplement-notification-europe": "PS Supplement Notification Europe | Nutranexa",
  "phosphatidylserine-sample-shipment-checklist-us-eu": "PS First Sample Shipment Checklist for US and EU Buyers | Nutranexa",
  "phosphatidylserine-3-mcpd-glycidyl-esters-review-europe": "Phosphatidylserine 3-MCPD Review for Europe | Nutranexa",
  "phosphatidylserine-tse-bse-statement-europe": "PS TSE/BSE Statement Review for Europe | Nutranexa",
  "phosphatidylserine-kosher-certificate-review-us-canada": "PS Kosher Certificate Review for North America | Nutranexa",
  "phosphatidylserine-customs-broker-handoff-us": "PS Customs Broker Handoff Checklist for US Importers | Nutranexa",
  "phosphatidylserine-safety-data-sheet-review-europe": "PS Safety Data Sheet Review for Europe | Nutranexa",
  "phosphatidylserine-food-production-license-review-us-eu": "PS Food Production License Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-halal-certificate-review-us-eu": "PS Halal Certificate Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-country-of-origin-marking-us": "PS Country of Origin Marking Checklist for US Importers | Nutranexa",
  "phosphatidylserine-isf-filing-checklist-us": "PS ISF Filing Checklist for U.S. Importers | Nutranexa",
  "phosphatidylserine-food-safety-certification-review-europe": "Phosphatidylserine Food-Safety Certification Review for Europe | Nutranexa",
  "phosphatidylserine-supplier-quality-agreement-us-eu": "Phosphatidylserine Supplier Quality Agreement Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-uflpa-compliance-us": "Phosphatidylserine UFLPA Compliance for U.S. Importers | Nutranexa",
  "phosphatidylserine-fda-import-alert-dwpe-review-us": "Phosphatidylserine FDA Import Alert and DWPE Review for US Importers | Nutranexa",
  "phosphatidylserine-export-documentation-ispm15-review-us-eu": "Phosphatidylserine Export Documentation and ISPM-15 Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-peroxide-value-review-us-eu": "Phosphatidylserine Peroxide Value and Oxidation Quality Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-sfcr-import-licence-canada": "Phosphatidylserine SFCR Import Licence Review for Canadian Buyers | Nutranexa",
  "phosphatidylserine-stability-study-europe": "Phosphatidylserine Stability Study Guide for Europe | Nutranexa",
  "phosphatidylserine-mycotoxin-testing-us-eu": "Phosphatidylserine Mycotoxin Testing Review for US and EU Buyers | Nutranexa",
  "phosphatidylserine-reserve-samples-us": "Phosphatidylserine Reserve Samples: US Supplement GMP Review | Nutranexa",
  "phosphatidylserine-moisture-water-activity-review-us-eu": "Phosphatidylserine Moisture & Water Activity Review | Nutranexa",
  "phosphatidylserine-mosh-moah-testing-review-us-eu": "Phosphatidylserine MOSH & MOAH Testing Review | Nutranexa",
  "phosphatidylserine-structure-function-claims-us": "Phosphatidylserine Structure/Function Claims for US Brands | Nutranexa",
  "phosphatidylserine-particle-size-distribution-review-us-eu": "Phosphatidylserine Particle Size Distribution Guide | Nutranexa",
  "phosphatidylserine-fda-inspection-history-review-us": "Phosphatidylserine FDA Inspection History Review | Nutranexa",
  "phosphatidylserine-rasff-monitoring-europe": "Phosphatidylserine RASFF Monitoring for EU Buyers | Nutranexa",
  "phosphatidylserine-marine-cargo-insurance-us-canada": "Phosphatidylserine Marine Cargo Insurance Review | Nutranexa",
  "phosphatidylserine-ics2-eu-import": "Phosphatidylserine ICS2 EU Import Guide | Nutranexa",
  "phosphatidylserine-acetone-insoluble-review-us-eu": "Phosphatidylserine Acetone Insoluble Review | Nutranexa",
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
    .map(async (name) => {
      const markdown = await fs.readFile(path.join(directory, name), "utf8");
      return {
        name,
        markdown,
        publishedAt: metaValue(markdown, "Published At") || `${name.slice(0, 10)}T00:00:00Z`,
      };
    });
  const names = (await Promise.all(entries))
    .sort((a, b) => {
      const publishedCompare = b.publishedAt.localeCompare(a.publishedAt);
      if (publishedCompare !== 0) return publishedCompare;
      return b.name.localeCompare(a.name);
    })
    .map(({ name, markdown }) => ({ name, markdown }));
  return Promise.all(names.map(async ({ name, markdown }) => {
    const route = metaValue(markdown, "URL Slug");
    const slug = route.replace(/^\/resources\//, "").replace(/\/$/, "");
    const title = metaValue(markdown, "H1") || metaValue(markdown, "SEO Title");
    const publishedAt = metaValue(markdown, "Published At") || `${name.slice(0, 10)}T00:00:00Z`;
    return {
      slug,
      title,
      seoTitle: promotedSeoTitles[slug] || metaValue(markdown, "SEO Title"),
      description: conciseMeta(metaValue(markdown, "Meta Description")),
      primaryKeyword: metaValue(markdown, "Primary Keyword"),
      published: name.slice(0, 10),
      publishedAt,
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
    contactPoint: [{ "@type": "ContactPoint", telephone: phone, contactType: "sales", areaServed: ["Europe", "North America", "Worldwide"], availableLanguage: ["English", "Chinese"] }],
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

function layout({ title, description, route, body, schema = [], image = "/assets/images/factory-aerial-wide.webp", imageAlt = "", imageWidth = "", imageHeight = "", ogType = "website", head = "", optimizeLogo = false, robots = "index,follow" }) {
  const active = route.split("/")[1] || "";
  const headerLogo = optimizeLogo
    ? '<img src="/assets/images/logo-nutranexa-260.webp" srcset="/assets/images/logo-nutranexa-260.webp 1x, /assets/images/logo-nutranexa-520.webp 2x" alt="Nutranexa logo" width="260" height="60" decoding="async">'
    : '<img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa logo" width="260" height="60">';
  const canonical = urlFor(route);
  const allSchema = [organizationJson(), websiteJson(), ...schema];
  const ogImageDetails = [
    imageAlt ? `<meta property="og:image:alt" content="${esc(imageAlt)}">` : "",
    imageWidth ? `<meta property="og:image:width" content="${esc(imageWidth)}">` : "",
    imageHeight ? `<meta property="og:image:height" content="${esc(imageHeight)}">` : "",
  ].filter(Boolean).join("\n  ");
  const twitterImageAlt = imageAlt ? `<meta name="twitter:image:alt" content="${esc(imageAlt)}">` : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="naver-site-verification" content="c6d0c699471e32f496c25af5be8693ab4c4580e8">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${esc(robots)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${esc(ogType)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}${image}">
${ogImageDetails ? `  ${ogImageDetails}\n` : ""}  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${siteUrl}${image}">
${twitterImageAlt ? `  ${twitterImageAlt}\n` : ""}${head ? `  ${head}\n` : ""}  <link rel="icon" href="/assets/images/logo-nutranexa-icon.png">
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
        ${headerLogo}
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
        ${renderMegaNav(active)}
      </nav>
      <a class="nav-cta" href="/contact/">Request Specification</a>
    </div>
  </header>
  <main id="main">${body}</main>
  ${footer(optimizeLogo)}
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
              <h2>${item.label === "Products" ? "Source PS ingredients with clear buyer paths." : item.label === "Applications" ? "Connect ingredients to compliant applications." : item.label === "Science" ? "Turn phospholipid science into practical formulation decisions." : item.label === "Quality" ? "Qualify products with manufacturing and document confidence." : "Build buyer trust before the inquiry."}</h2>
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

function footer(optimizeLogo = false) {
  const logo = optimizeLogo
    ? '<img src="/assets/images/logo-nutranexa-260.webp" srcset="/assets/images/logo-nutranexa-260.webp 1x, /assets/images/logo-nutranexa-520.webp 2x" alt="Nutranexa logo" class="footer-logo" width="260" height="60" loading="lazy" decoding="async">'
    : '<img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa logo" class="footer-logo">';
  return `<footer class="site-footer">
  <div class="footer-grid">
    <div>
      ${logo}
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
      <a href="/applications/cognitive-health/">Cognitive Health</a>
      <a href="/applications/healthy-aging/">Healthy Aging</a>
      <a href="/applications/sports-nutrition/">Sports Nutrition</a>
      <a href="/applications/functional-foods/">Functional Foods</a>
      <a href="/science/research-library/">Research Library</a>
      <a href="/quality-rd/">Quality & R&D</a>
    </div>
    <div>
      <h2>Contact</h2>
      <p>WhatsApp: <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">${whatsapp}</a></p>
      <p>Phone: ${phone}</p>
      <p>${address}</p>
      <a class="footer-button" href="/contact/">Request Specification &amp; COA</a>
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
  return `<form class="quote-form" data-context="${esc(context)}" action="/api/inquiry" method="post">
  <input type="hidden" name="Product Interest" value="${esc(context)}">
  <input type="hidden" name="Locale" value="en">
  <input type="hidden" name="Form Started" value="">
  <label class="hidden-field">Company website <input name="_honey" tabindex="-1" autocomplete="off"></label>
  <div class="form-grid">
    <label>Name *<input required name="Name" autocomplete="name"></label>
    <label>Business Email *<input required type="email" name="Email" autocomplete="email"></label>
    <label>Company *<input required name="Company" autocomplete="organization" placeholder="Company name"></label>
    <label>Country *<input required name="Country" autocomplete="country-name" placeholder="United States, Germany, Korea..."></label>
    <label>Application <select name="Application"><option value="">Select application</option><option>Cognitive Health</option><option>Memory Support</option><option>Healthy Aging</option><option>Sports Nutrition</option><option>Functional Foods</option><option>Other</option></select></label>
    <label>Preferred Source <select name="Source Preference"><option value="">No preference yet</option><option>Soy</option><option>Sunflower</option><option>Need recommendation</option></select></label>
    <label>Required PS Grade <select name="Target Assay"><option value="">Need recommendation</option><option>20%</option><option>50%</option><option>70%</option><option>Other / customized</option></select></label>
    <label>Estimated Annual Volume <input name="Estimated Annual Volume" placeholder="e.g. 500 kg / year"></label>
    <fieldset class="form-full document-choice"><legend>Required Documents</legend><label><input type="checkbox" name="Documents Needed" value="Specification"> Specification</label><label><input type="checkbox" name="Documents Needed" value="COA"> COA</label><label><input type="checkbox" name="Documents Needed" value="TDS"> TDS</label><label><input type="checkbox" name="Documents Needed" value="MSDS"> MSDS</label><label><input type="checkbox" name="Documents Needed" value="Allergen Information"> Allergen Information</label></fieldset>
    <label class="form-full">Message <textarea name="Message" rows="4" placeholder="Tell us about your formulation, target market, timeline, or technical questions."></textarea></label>
    <label class="form-full consent-field"><input required type="checkbox" name="Consent" value="Yes"> <span>I agree that Nutranexa may use this information to respond to my B2B inquiry. *</span></label>
  </div>
  <button class="button primary" type="submit">Request Specification &amp; COA</button>
  <p class="form-status" role="status" aria-live="polite">Name, business email, company, country, and consent are required.</p>
  <p class="form-note">Your information is used only to respond to this B2B product and technical-document request.</p>
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
  return `<section class="application-formats">${sectionIntro("Product formats", "Compatible Product Formats", "Capsules, tablets, powder blends, sachets, and selected functional nutrition products can be evaluated. Suitability for beverage systems should be confirmed through formulation and stability testing.")}
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
  return `<div class="contact-card contact-details-card"><h2>${esc(title)}</h2><p><strong>Technical response:</strong> Use the secure inquiry form to request specifications, COA, TDS, MSDS, and application support.</p><p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">${whatsapp}</a></p><p><strong>Phone:</strong> ${phone}</p><p><strong>Address:</strong> ${address}</p><p><strong>Website:</strong> www.nutranexa.cn</p></div>`;
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
  const claimVariant = (image, width) => image.replace(/\.webp$/, `-${width}.webp`);
  const claimIcons = [
    ["GMP", "/assets/images/claims/claim-gmp.webp"],
    ["Kosher", "/assets/images/claims/claim-kosher.webp"],
    ["Halal", "/assets/images/claims/claim-halal.webp"],
    ["ISO", "/assets/images/claims/claim-iso.webp"],
    ["FDA Registration", "/assets/images/claims/claim-fda.webp"],
    ["FSSC 22000", "/assets/images/claims/claim-fssc-22000.webp"],
    ["Heavy Metals", "/assets/images/claims/claim-heavy-metals.webp"],
    ["Allergen Review", "/assets/images/claims/claim-allergens.webp"],
  ];
  const claimIconItems = claimIcons
    .map(([label, image]) => `<li class="claim-icon-card"><img src="${claimVariant(image, 112)}" srcset="${claimVariant(image, 112)} 1x, ${claimVariant(image, 224)} 2x" alt="" width="112" height="112" loading="lazy" decoding="async"><span>${esc(label)}</span></li>`)
    .join("");
  const heroClaimIcons = [
    ["ISO", "/assets/images/claims/claim-iso.webp"],
    ["FDA Registration", "/assets/images/claims/claim-fda.webp"],
    ["GMP", "/assets/images/claims/claim-gmp.webp"],
    ["FSSC 22000", "/assets/images/claims/claim-fssc-22000.webp"],
    ["Kosher", "/assets/images/claims/claim-kosher.webp"],
    ["Halal", "/assets/images/claims/claim-halal.webp"],
  ];
  const heroClaimSlides = heroClaimIcons
    .map(([label, image]) => `<span class="hero-certification-slide" aria-hidden="true"><img src="${claimVariant(image, 48)}" srcset="${claimVariant(image, 48)} 1x, ${claimVariant(image, 96)} 2x" alt="" width="46" height="46" fetchpriority="low" decoding="async"><strong>${esc(label)}</strong></span>`)
    .join("");
  const body = `<section class="home-hero">
    <div class="home-hero-copy">
      <p class="eyebrow">Premium PS ingredient solutions</p>
      <h1>Premium Phosphatidylserine Ingredients <span>for Cognitive Health Innovation</span></h1>
      <p class="home-hero-lead">High-quality soy- and sunflower-derived phosphatidylserine in flexible purity grades for nutraceutical, functional food, and healthy aging formulations.</p>
      <div class="hero-certification-rotator" role="img" aria-label="Selected quality references: ISO, FDA Registration, GMP, FSSC 22000, Kosher, and Halal. Scope and validity are confirmed for each order.">
        <span class="hero-certification-label">Quality references<small>Scope confirmed per order</small></span>
        <span class="hero-certification-stage">${heroClaimSlides}</span>
      </div>
      <ul class="hero-benefit-tags" aria-label="Key product benefits">
        <li>Soy &amp; Sunflower Sources</li>
        <li>20%, 50% &amp; 70% PS Grades</li>
        <li>Technical Documentation Support</li>
      </ul>
      <div class="hero-actions">
        <a class="button primary" href="/contact/">Request Specification &amp; COA</a>
        <a class="button secondary" href="#product-solutions">Explore PS Solutions</a>
      </div>
    </div>
    <div class="home-hero-visual">
      <img src="/assets/images/hero-ps-composite-v3-1100.webp" srcset="/assets/images/hero-ps-composite-v3-1100.webp 1100w, /assets/images/hero-ps-composite-v3.webp 1672w" sizes="(max-width: 1100px) 100vw, 1px" alt="Soybeans, sunflower, phosphatidylserine powder, a molecular structure, and a neural brain visualization" width="1672" height="941" loading="lazy" fetchpriority="low" decoding="async">
      <div class="hero-visual-note"><span>PS</span><p><strong>Formulation-ready options</strong><br>Source, purity, and documents aligned to your project.</p></div>
    </div>
  </section>

  <section class="trust-strip" aria-label="Nutranexa buyer support">
    <article><span class="trust-icon">20–70</span><div><h2>Flexible PS Grades</h2><p>Multiple purity options</p></div></article>
    <article><span class="trust-icon">S / SF</span><div><h2>Soy &amp; Sunflower Options</h2><p>Different market positioning</p></div></article>
    <article><span class="trust-icon">DOC</span><div><h2>Technical Documents</h2><p>COA / TDS / MSDS</p></div></article>
    <article><span class="trust-icon">B2B</span><div><h2>Global B2B Supply</h2><p>Professional ingredient service</p></div></article>
  </section>

  <section id="product-solutions" class="home-section product-solutions">
    ${sectionIntro("Product solutions", "Choose the right PS route for your formulation", "Compare target purity and source preference, then confirm the current specification, COA, and application fit with our technical team.")}
    <div class="grade-grid">
      ${psGrades.map((grade, index) => {
        const cardImage = grade.image.replace(/\.webp$/, "-480.webp");
        const dimensions = grade.image.includes("brand-product-lab") ? 'width="480" height="270"' : 'width="480" height="480"';
        return `<article class="grade-card${index === 1 ? " grade-card-featured" : ""}">
        <div class="grade-card-media"><img src="${cardImage}" srcset="${cardImage} 480w, ${grade.image} 1200w" sizes="(max-width: 760px) calc(100vw - 48px), 376px" alt="${esc(grade.name)} light-yellow powder ingredient" ${dimensions} loading="lazy" decoding="async">${grade.badge ? `<span>${esc(grade.badge)}</span>` : ""}</div>
        <p class="grade-kicker">${esc(grade.positioning)}</p><h3>${esc(grade.name)}</h3><p>${esc(grade.description)}</p>
        <ul>${grade.highlights.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        <a class="button secondary" href="/products/${grade.slug}/">View ${esc(grade.shortName)}</a>
      </article>`;
      }).join("")}
    </div>
    <div class="source-bar">
      <div><img src="/assets/images/product-soy-ps.webp" alt="Fine light-yellow soy-derived phosphatidylserine powder" loading="lazy"><span><small>Source option</small><strong>Soy-Derived PS</strong></span></div>
      <div><img src="/assets/images/product-sunflower-ps.webp" alt="Fine light-yellow sunflower-derived phosphatidylserine powder" loading="lazy"><span><small>Source option</small><strong>Sunflower-Derived PS</strong></span></div>
      <a href="/resources/soy-vs-sunflower-phosphatidylserine/">Compare source options &rarr;</a>
    </div>
  </section>

  <section class="home-section applications-showcase">
    ${sectionIntro("Applications", "Built for modern cognitive and functional nutrition concepts", "Nutranexa supports product developers with source selection, technical documentation, and application-focused ingredient guidance.")}
    <div class="application-grid">
      <a href="/applications/cognitive-health/"><span>01</span><h3>Cognitive Health</h3><p>PS ingredient solutions for brain health, mental performance, and cognitive wellness formulations.</p></a>
      <a href="/applications/memory-support/"><span>02</span><h3>Memory Support</h3><p>Ingredient planning for memory-focused formulas and daily cognitive products.</p></a>
      <a href="/applications/healthy-aging/"><span>03</span><h3>Healthy Aging</h3><p>PS solutions for 50+ nutrition, active aging, and cognitive wellness concepts.</p></a>
      <a href="/applications/sports-nutrition/"><span>04</span><h3>Sports Nutrition</h3><p>Active-lifestyle, exercise-nutrition, and mental-performance formulation paths.</p></a>
      <a href="/applications/functional-foods/"><span>05</span><h3>Functional Foods</h3><p>Food, beverage, dairy, and nutrition formula support.</p></a>
    </div>
  </section>

  <section class="home-section why-nutranexa">
    <div class="why-copy">${sectionIntro("Why Nutranexa", "Why Formulators Choose Nutranexa PS", "International buyers need consistent products, clear documentation, responsive technical communication, and a partner who understands how PS moves from specification to finished formulation.")}
      <a class="text-link" href="/about/">Meet Nutranexa &rarr;</a>
    </div>
    <div class="capability-grid">
      <article><span>01</span><h3>Soy &amp; Sunflower PS Solutions</h3><p>Multiple sources for different formulation requirements, labeling needs, and market positioning.</p></article>
      <article><span>02</span><h3>Customized Purity Solutions</h3><p>20%, 50%, and 70% PS grades designed for different product concepts and supplement positioning.</p></article>
      <article><span>03</span><h3>Technical &amp; Scientific Support</h3><p>Support for product selection, technical documents, and application guidance.</p></article>
      <article><span>04</span><h3>Quality-Focused Supply</h3><p>Clear specifications, batch documentation, and professional B2B ingredient service.</p></article>
    </div>
  </section>

  <section class="home-section science-section">
    <div class="science-visual"><img src="/assets/images/science-phosphatidylserine-lab-v2-560.webp" srcset="/assets/images/science-phosphatidylserine-lab-v2-560.webp 560w, /assets/images/science-phosphatidylserine-lab-v2.webp 1200w" sizes="(max-width: 760px) calc(100vw - 48px), 560px" alt="Laboratory scientist reviewing a phosphatidylserine powder sample beside analytical equipment" width="560" height="560" loading="lazy" decoding="async"><div><strong>Science-led</strong><span>Ingredient decisions</span></div></div>
    <div class="science-copy">${sectionIntro("Science & research", "Science Behind Phosphatidylserine", "Explore the structure, biological role, and research areas associated with phosphatidylserine. Our science center helps formulators evaluate application potential without converting research into medical claims.")}
      <div class="science-links">
        <a href="/resources/what-is-phosphatidylserine/"><span>01</span><div><strong>What is Phosphatidylserine?</strong><small>Understand the ingredient and sourcing context.</small></div></a>
        <a href="/science/how-ps-works/"><span>02</span><div><strong>How PS Works</strong><small>Review compliant phospholipid structure and mechanism education.</small></div></a>
        <a href="/science/research-library/"><span>03</span><div><strong>Research Library</strong><small>Browse structured, source-linked scientific publications.</small></div></a>
        <a href="/science/formulation-support/"><span>04</span><div><strong>Formulation Support</strong><small>Discuss your format, target assay, and process.</small></div></a>
      </div>
    </div>
  </section>

  <section class="home-section quality-docs">
    <div class="quality-heading">${sectionIntro("Quality documentation", "Quality Information Buyers Can Review", "Request current, product-specific specifications, batch COA, technical files, and manufacturing information for supplier qualification and shipment release.")}
      <a class="button secondary" href="/resources/documents-for-ps-ingredients/">View document guidance</a>
    </div>
    <div class="quality-claims" aria-label="Selected certification and product assurance references">
      <p>Selected quality &amp; compliance references</p>
      <div class="claim-marquee-window"><div class="claim-marquee-track"><ul class="claim-icon-list">${claimIconItems}</ul><ul class="claim-icon-list" aria-hidden="true">${claimIconItems}</ul></div></div>
      <small>Current certificate validity, scope, and product applicability should be confirmed before purchase or shipment.</small>
    </div>
    <div class="document-support-grid">
      <article><span>COA</span><h3>Certificate of Analysis</h3><p>Batch-specific test results for buyer and quality review.</p></article>
      <article><span>TDS</span><h3>Technical Data Sheet</h3><p>Product properties, specification context, and handling information.</p></article>
      <article><span>MSDS</span><h3>Safety Data Sheet</h3><p>Safety, handling, storage, and transport information.</p></article>
      <article><span>TECH</span><h3>Technical Consultation</h3><p>Application-focused discussion before sampling or scale-up.</p></article>
    </div>
  </section>

  <section class="home-section resource-section">
    ${sectionIntro("Resources", "Practical guidance for PS ingredient buyers", "Use our buyer resources to compare sources, prepare document requests, and make a more confident supplier decision.")}
    <div class="resource-feature-grid">
      <a href="/resources/phosphatidylserine-guide/"><img src="/assets/images/resource-phosphatidylserine-buyers-guide.webp" alt="Phosphatidylserine buyer guide" loading="lazy"><div><span>Buying guide</span><h3>PS Buying Guide</h3><p>A practical framework for source, assay, specification, and supplier review.</p></div></a>
      <a href="/resources/documents-for-ps-ingredients/"><img src="/assets/images/quality-document-review.webp" alt="Technical document review for phosphatidylserine sourcing" loading="lazy"><div><span>Technical downloads</span><h3>Document Checklist</h3><p>Prepare the files needed for qualification and commercial handoff.</p></div></a>
      <a href="/resources/soy-vs-sunflower-phosphatidylserine/"><img src="/assets/images/resource-soy-vs-sunflower-ps.webp" alt="Soy and sunflower phosphatidylserine source comparison" loading="lazy"><div><span>Source comparison</span><h3>Soy vs Sunflower PS</h3><p>Compare positioning, documentation, and formulation considerations.</p></div></a>
    </div>
  </section>

  <section class="home-final-cta">
    <div><p class="eyebrow">Start a technical conversation</p><h2>Build your next cognitive health formulation with confidence.</h2><p>Tell us your market, application, preferred source, target purity, and document needs. Our team will help define the right PS ingredient route.</p></div>
    <div class="final-cta-actions"><a class="button light" href="/contact/">Request Specification &amp; COA</a><a href="/products/phosphatidylserine/">Explore PS Solutions &rarr;</a></div>
  </section>`;
  return layout({
    title: "Premium Phosphatidylserine Ingredients | Nutranexa",
    description: "Premium soy- and sunflower-derived phosphatidylserine in 20%, 50%, and 70% grades with technical documentation and formulation support.",
    route: "/",
    image: "/assets/images/og-nutranexa-premium-ps-v2.png",
    head: '<link rel="preload" as="image" href="/assets/images/hero-ps-banner-v4.webp" type="image/webp" media="(min-width: 1101px)" fetchpriority="high">',
    optimizeLogo: true,
    schema: [breadcrumbJson([["Home", "/"]])],
    body,
  });
}

function productsHub() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Products</p><h1>Bulk Functional Food Ingredients for Global Buyers</h1><p>Start with phosphatidylserine, then compare soy-source, sunflower-source, and related functional food ingredient options.</p></section>
  <section class="grade-hub">${sectionIntro("PS purity grades", "Phosphatidylserine 20%, 50%, and 70%", "Select a target grade for product positioning, then confirm source availability, the current controlled specification, and batch documentation.")}
    <div class="grade-grid">${psGrades.map((grade) => `<article class="grade-card"><div class="grade-card-media"><img src="${grade.image}" alt="${esc(grade.name)} powder" loading="lazy"><span>${esc(grade.badge)}</span></div><p class="grade-kicker">${esc(grade.positioning)}</p><h3>${esc(grade.name)}</h3><p>${esc(grade.description)}</p><a class="button secondary" href="/products/${grade.slug}/">View ${esc(grade.shortName)}</a></article>`).join("")}</div>
  </section>
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

function psGradePage(grade) {
  const route = `/products/${grade.slug}/`;
  const controlledSpecNote = grade.slug === "phosphatidylserine-20"
    ? "The PS 20% values below come from the supplied English specification. Request the latest controlled copy before purchase."
    : "Only values supported by the supplied batch or controlled documents are shown. Request the current product specification before formulation or purchase.";
  const gradeFaqs = [
    [`Can ${grade.shortName} be supplied from soy or sunflower?`, "Source availability must be confirmed for the quoted grade. Request a source statement and product-specific documents before approval."],
    [`Which documents are available for ${grade.shortName}?`, "Buyers can request the current specification, batch COA, TDS, MSDS, allergen information, and applicable certificates. Availability and scope must be confirmed."],
    ["Can this grade be used in beverages?", "Suitability for beverage systems should be confirmed through formulation, processing, and stability testing. The website does not claim universal beverage solubility."],
  ];
  const body = `<section class="product-grade-hero">
    <div><p class="eyebrow">${esc(grade.badge)}</p><h1>${esc(grade.name)} Powder</h1><p>Plant-derived phosphatidylserine ingredient for nutraceutical and functional nutrition formulations.</p><ul class="application-tags"><li>${esc(grade.source)}</li><li>${esc(grade.positioning)}</li><li>Technical documents on request</li></ul><div class="hero-actions"><a class="button primary" href="/contact/?product=${encodeURIComponent(grade.name)}&assay=${encodeURIComponent(grade.shortName.replace("PS ", ""))}">Request Specification &amp; COA</a><a class="button secondary" href="/contact/?product=${encodeURIComponent(grade.name)}">Talk to Technical Support</a></div></div>
    <img src="${grade.image}" alt="${esc(grade.name)} fine powder ingredient" loading="eager">
  </section>
  <section class="product-overview">${sectionIntro("Product overview", grade.name, grade.description)}
    <div class="detail-grid"><div><h3>Source</h3><p>${esc(grade.source)}</p></div><div><h3>Purity route</h3><p>${esc(grade.content)}</p></div><div><h3>Appearance</h3><p>${esc(grade.appearance)}</p></div><div><h3>Application direction</h3><p>${esc(grade.applications.join(", "))}</p></div></div>
  </section>
  <section class="technical-specification">${sectionIntro("Technical specification", "Parameters available for buyer review", controlledSpecNote)}
    <div class="table-wrap"><table class="spec-table"><tbody><tr><th>Product name</th><td>${esc(grade.name)}</td></tr><tr><th>Source</th><td>${esc(grade.source)}</td></tr><tr><th>Appearance</th><td>${esc(grade.appearance)}</td></tr><tr><th>PS content</th><td>${esc(grade.content)}</td></tr><tr><th>Heavy metals</th><td>According to the current specification or batch COA</td></tr><tr><th>Microbiology</th><td>According to the current specification or batch COA</td></tr><tr><th>Shelf life</th><td>${grade.coa ? "24 months on the supplied sample COA; confirm the current controlled document" : "According to the current controlled specification"}</td></tr></tbody></table></div>
  </section>
  ${grade.coa ? `<section class="coa-section">${sectionIntro("Batch documentation", grade.coa.title, grade.coa.note)}
    <div class="coa-grid"><article class="coa-card"><a class="coa-image-link" href="${grade.coa.image}" target="_blank" rel="noopener"><img src="${grade.coa.image}" alt="${esc(grade.coa.title)} supplied certificate image" loading="lazy"></a><div><h3>Extracted batch information</h3><table><tbody>${grade.coa.rows.map(([label, value]) => `<tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>`).join("")}</tbody></table><p class="form-note">Inspection items marked with an asterisk on the supplied COA are reported as sourced from external inspection reports.</p><a class="document-link" href="${grade.coa.image}" target="_blank" rel="noopener">View full COA sample</a></div></article></div>
  </section>` : ""}
  <section class="product-downloads">${sectionIntro("Product downloads", "Request the controlled document package", "COA, TDS, MSDS, specification sheet, and allergen information must match the exact quoted grade, source, and destination market.")}
    ${grade.downloads.length ? `<div class="download-grid">${grade.downloads.map(([title, href, type]) => `<a href="${href}" download><strong>${esc(title)}</strong><span>${esc(type)}</span></a>`).join("")}</div>` : `<div class="inline-cta"><strong>Current controlled files are supplied through technical support.</strong><a class="button primary" href="/contact/?product=${encodeURIComponent(grade.name)}&documents=Specification%2C%20COA%2C%20TDS%2C%20MSDS">Request documents</a></div>`}
  </section>
  <section class="application-links">${sectionIntro("Application links", "Explore relevant product-development paths", "Application pages provide educational and formulation context without making disease-treatment or guaranteed-result claims.")}
    <div class="science-card-grid"><a href="/applications/cognitive-health/"><h3>Cognitive Health</h3><p>Brain-health, mental-performance, and cognitive-wellness concepts.</p></a><a href="/applications/healthy-aging/"><h3>Healthy Aging</h3><p>50+, active-aging, and senior-nutrition concepts.</p></a><a href="/applications/sports-nutrition/"><h3>Sports Nutrition</h3><p>Active-lifestyle and exercise-related nutrition research context.</p></a><a href="/applications/functional-foods/"><h3>Functional Foods</h3><p>Powder blends, sachets, nutrition mixes, and processing evaluation.</p></a></div>
  </section>
  <section class="product-faq">${sectionIntro("FAQ", `Common ${grade.shortName} buyer questions`, "Confirm all commercial and technical details against the current quoted product.")}
    <div class="faq-list">${gradeFaqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
  </section>
  <section class="link-panel"><a href="/products/">All products</a><a href="/resources/phosphatidylserine-guide/">PS Buying Guide</a><a href="/resources/documents-for-ps-ingredients/">Technical documents</a><a href="/science/research-library/">Research Library</a><a href="/contact/">Request Specification &amp; COA</a></section>
  <section class="form-panel"><div>${sectionIntro("Start an inquiry", `Request ${grade.shortName} specifications and technical support`, "Share your application, preferred source, target market, document needs, and estimated annual volume.")}</div>${quoteForm(grade.name)}</section>`;
  return layout({
    title: `${grade.name} Ingredient | Nutranexa`,
    description: `Explore ${grade.name} for ${grade.positioning.toLowerCase()}. Request current specifications, COA, TDS, MSDS, source details, and formulation support.`,
    route,
    image: grade.coa?.image || grade.image,
    schema: [breadcrumbJson([["Home", "/"], ["Products", "/products/"], [grade.name, route]]), productJson(grade, route), {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: gradeFaqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    }],
    body,
  });
}

function applicationsHub() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Applications</p><h1>Phosphatidylserine Application Solutions</h1><p>Explore how source, purity grade, product format, technical documents, and compliant scientific context shape PS formulation decisions.</p></section>
  <section>${sectionIntro("Application paths", "Choose the right application route", "Clarify product format, source preference, document needs, and quotation details before starting a sourcing discussion.")}
    <div class="card-grid">${applications.filter((app) => !app.legacy).map((app) => `<article class="item-card"><img src="${app.image}" alt="${esc(app.title)}" loading="lazy"><div><h3>${esc(app.title)}</h3><p>${esc(app.description)}</p><a href="/applications/${app.slug}/">Explore application &rarr;</a></div></article>`).join("")}</div>
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
  const isCognitive = app.slug === "cognitive-health";
  const tags = app.tags?.length ? `<ul class="application-tags">${app.tags.map((tag) => `<li>${esc(tag)}</li>`).join("")}</ul>` : "";
  const body = `${isCognitive ? `<section class="application-hero">
    <div><p class="eyebrow">Cognitive health application</p><h1>${esc(app.title)}</h1><p>${esc(app.description)}</p>${tags}<div class="hero-actions"><a class="button primary" href="/contact/?application=Cognitive%20Health">Request Cognitive Health Solution</a><a class="button secondary" href="/products/phosphatidylserine-20/">Download Product Overview</a></div></div>
    <img src="${app.image}" alt="Light blue neural network, PS molecular structure, and fine light-yellow phosphatidylserine powder" loading="eager">
  </section>` : `${hero({ eyebrow: "Application solution", title: app.title, text: app.description, image: app.image, cta: "Request Specification & COA", secondary: "View PS Grades" })}<section class="application-tag-band">${tags}</section>`}
  ${isCognitive ? `<section class="application-relevance">${sectionIntro("Why PS fits cognitive health", "Why PS Is Relevant to Cognitive Health Formulations", "Phosphatidylserine is a naturally occurring phospholipid found in cell membranes, including neuronal cell membranes. Its structural and biological roles make it an ingredient of interest in cognitive-health research and nutraceutical product development.")}
    <div class="explanation-grid">
      <article><span>01</span><h3>Cell Membrane Structure</h3><p>Phosphatidylserine is an important phospholipid component associated with cell membrane structure and fluidity.</p></article>
      <article><span>02</span><h3>Neuronal Communication</h3><p>PS is studied for its role in membrane-related signaling and neuronal communication processes.</p></article>
      <article><span>03</span><h3>Flexible Formulation</h3><p>Available in multiple purity grades for capsules, tablets, powder blends, and selected nutrition formats.</p></article>
      <article><span>04</span><h3>Research Interest</h3><p>Phosphatidylserine has been investigated across cognitive health, aging, stress, and exercise research areas.</p></article>
    </div>
  </section>
  <section class="mechanism-module">${sectionIntro("Mechanism education", "A formulation-focused PS pathway", "This educational sequence describes ingredient context and scientific interest. It does not promise a consumer outcome or disease benefit.")}
    <ol><li><span>01</span><strong>PS Ingredient</strong></li><li><span>02</span><strong>Digestion &amp; Absorption</strong></li><li><span>03</span><strong>Phospholipid Availability</strong></li><li><span>04</span><strong>Cell Membrane Structure</strong></li><li><span>05</span><strong>Scientific Research Interest</strong></li></ol>
  </section>` : `<section>${sectionIntro("Application focus", `Building ${app.title.toLowerCase()} concepts`, "Use scientific research as educational context, then validate the exact ingredient, serving format, processing conditions, label wording, and target-market requirements for the finished product.")}
    <div class="feature-grid">${app.points.map((point) => `<div class="feature"><h3>${esc(point)}</h3><p>Confirm current specifications, finished-product fit, and permitted market wording before commercial use.</p></div>`).join("")}</div>
  </section>`}
  <section class="grade-comparison">${sectionIntro("Recommended grades", "Recommended PS Grades for Product Development", "These are positioning routes, not automatic formulation recommendations. Confirm the current controlled specification and run finished-product testing.")}
    <div class="table-wrap"><table class="spec-table"><thead><tr><th>Product</th><th>PS content</th><th>Source</th><th>Positioning</th><th></th></tr></thead><tbody>${psGrades.map((grade) => `<tr><td>${esc(grade.shortName)}</td><td>${esc(grade.shortName.replace("PS ", "Target "))}</td><td>Soy / Sunflower*</td><td>${esc(grade.positioning)}</td><td><a href="/products/${grade.slug}/">View grade</a></td></tr>`).join("")}</tbody></table></div><p class="form-note">* Source availability and product-specific documentation must be confirmed for the quoted grade.</p>
  </section>
  ${applicationFormatSection(app)}
  <section class="application-science">${sectionIntro("Science and technical information", "Evidence, mechanism, and product documentation", "Keep human, animal, laboratory, and review evidence clearly distinguished, and never convert a research finding into a medical claim.")}
    <div class="science-card-grid"><a href="/science/research-library/"><h3>Research Library</h3><p>Browse selected publications related to cognition, aging, exercise, and nutritional science.</p></a><a href="/science/how-ps-works/"><h3>Mechanism Overview</h3><p>Understand the biological role and structural characteristics of phosphatidylserine.</p></a><a href="/resources/documents-for-ps-ingredients/"><h3>Technical Documents</h3><p>Request product specifications, COA, TDS, MSDS, and related technical information.</p></a></div>
  </section>
  <section class="link-panel"><a href="/products/phosphatidylserine-20/">PS 20%</a><a href="/products/phosphatidylserine-50/">PS 50%</a><a href="/products/phosphatidylserine-70/">PS 70%</a><a href="/products/soy-phosphatidylserine/">Soy PS</a><a href="/products/sunflower-phosphatidylserine/">Sunflower PS</a><a href="/science/research-library/">Research Library</a><a href="/contact/">Talk to Technical Support</a></section>
  <section class="form-panel"><div>${sectionIntro("Talk to technical support", `Request support for ${app.title.toLowerCase()}`, "Include your application, source preference, required PS grade, target market, annual volume, and document needs.")}</div>${quoteForm(app.title)}</section>`;
  return layout({
    title: app.seoTitle || `${app.title} | Nutranexa`,
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
  <section>${sectionIntro("Document proof", "Quality, certification, and registration files for buyer review", "Use these files as preliminary review materials. Batch relevance, current validity, scope, and product applicability should be confirmed before purchase or shipment.")}${documentCards()}</section>
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
  const body = `<section class="page-hero compact"><p class="eyebrow">Technical inquiry</p><h1>Request Specification &amp; COA</h1><p>Send your application, preferred source, required PS grade, target market, annual volume, and document needs through the secure form.</p></section>
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
      <p>Use the secure inquiry form or WhatsApp <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">${whatsapp}</a> for PS specifications, COA samples, document review, and quotation support.</p>
      <ul class="check-list">
        <li>PS 20% and 50% COA sample review</li>
        <li>Halal, Kosher, food production license, and facility registration document discussion</li>
        <li>Source, application, annual quantity, packaging, and shipment timeline support</li>
      </ul>
    </div>
  </div>
  <form class="inquiry-form quote-form" data-context="Dedicated B2B inquiry page" action="/api/inquiry" method="post" novalidate>
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
  const hubArticles = [...articles].sort((a, b) => {
    const aDate = a.publishedAt || (a.published ? `${a.published}T00:00:00Z` : "");
    const bDate = b.publishedAt || (b.published ? `${b.published}T00:00:00Z` : "");
    const publishedCompare = bDate.localeCompare(aDate);
    if (publishedCompare !== 0) return publishedCompare;
    return b.slug.localeCompare(a.slug);
  });
  const body = `<section class="page-hero compact"><p class="eyebrow">Resources</p><h1>Phosphatidylserine Sourcing Guides</h1><p>Use these articles to compare product options, prepare document requests, and evaluate suppliers before contacting sales.</p></section>
  <section>${sectionIntro("Buyer guides", "Read practical PS sourcing articles", "The resource hub connects product selection, document review, application decisions, and supplier evaluation topics.")}
    <div class="article-grid">${hubArticles.map((article) => `<article class="article-card article-card-media"><img src="${articleImage(article)}" alt="${esc(article.imageAlt)}" width="1536" height="1024" loading="lazy"><div><p class="eyebrow">${article.pillar ? "Pillar guide" : "Article"}</p><h3>${esc(article.title)}</h3><p>${esc(article.description)}</p><a href="/resources/${article.slug}/">Read article</a></div></article>`).join("")}</div>
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

function scienceHubPage() {
  const route = "/science/";
  const body = `<section class="page-hero compact"><p class="eyebrow">Science center</p><h1>Science Behind Phosphatidylserine</h1><p>Explore phosphatidylserine structure, biological role, selected research, and formulation guidance with clear evidence boundaries.</p></section>
  <section>${sectionIntro("Science pathways", "Educational support for ingredient decisions", "Nutranexa distinguishes scientific education from finished-product claims and links buyers to original research sources.")}
    <div class="science-card-grid"><a href="/science/how-ps-works/"><h3>How PS Works</h3><p>Understand phospholipid structure, membrane context, and research interest without medical claims.</p></a><a href="/science/research-library/"><h3>Research Library</h3><p>Review structured publication records with study type, population, summary, limitations, DOI, and original source.</p></a><a href="/science/formulation-support/"><h3>Formulation Support</h3><p>Connect target application, purity grade, source, product format, and required technical documents.</p></a></div>
  </section>
  <section class="cta-band"><div><p class="eyebrow">Scientific compliance</p><h2>Research interest is not a medical claim.</h2><p>Finished-product wording, study relevance, and permitted claims depend on formulation, dose, population, evidence quality, and target-market rules.</p></div><a class="button light" href="/contact/">Talk to Technical Support</a></section>`;
  return layout({ title: "Phosphatidylserine Science Center | Nutranexa", description: "Explore phosphatidylserine structure, research publications, evidence limitations, and formulation support for B2B product development.", route, image: "/assets/images/hero-ps-innovation-v2.png", schema: [breadcrumbJson([["Home", "/"], ["Science", route]])], body });
}

function howPsWorksPage() {
  const route = "/science/how-ps-works/";
  const body = `<section class="application-hero"><div><p class="eyebrow">Mechanism education</p><h1>How Phosphatidylserine Works</h1><p>Phosphatidylserine is a naturally occurring phospholipid associated with cell membrane structure and membrane-related biological processes.</p><ul class="application-tags"><li>Phospholipid Structure</li><li>Cell Membrane Context</li><li>Research Education</li></ul></div><img src="/assets/images/hero-ps-innovation-v2.png" alt="Scientific visualization of neural connections, a molecular structure, and PS powder" loading="eager"></section>
  <section class="mechanism-module">${sectionIntro("Educational pathway", "From PS ingredient to scientific research interest", "This sequence is a simplified educational framework for formulators. It does not demonstrate that a specific ingredient batch or finished product causes a health outcome.")}
    <ol><li><span>01</span><strong>PS Ingredient</strong></li><li><span>02</span><strong>Digestion &amp; Absorption</strong></li><li><span>03</span><strong>Phospholipid Availability</strong></li><li><span>04</span><strong>Cell Membrane Structure</strong></li><li><span>05</span><strong>Scientific Research Interest</strong></li></ol>
  </section>
  <section class="detail-grid"><div><h2>Structure</h2><p>PS is a phospholipid ingredient. Its molecular and membrane context is relevant to scientific study and formulation education.</p></div><div><h2>Biological role</h2><p>PS is associated with cell membrane structure and fluidity and is studied in relation to membrane-related signaling processes.</p></div><div><h2>Evidence language</h2><p>Use phrases such as “studied for,” “associated with,” and “research interest in.” Do not convert research findings into treatment or guaranteed-result claims.</p></div><div><h2>Product development</h2><p>Ingredient source, purity, format, process conditions, dose, and finished-product stability must be evaluated separately.</p></div></section>
  <section class="link-panel"><a href="/science/research-library/">Research Library</a><a href="/applications/cognitive-health/">Cognitive Health</a><a href="/science/formulation-support/">Formulation Support</a><a href="/contact/">Request Technical Documents</a></section>`;
  return layout({ title: "How Phosphatidylserine Works | Nutranexa", description: "Learn about phosphatidylserine structure, cell membrane context, biological research interest, and compliant formulation education.", route, image: "/assets/images/hero-ps-innovation-v2.png", schema: [breadcrumbJson([["Home", "/"], ["Science", "/science/"], ["How PS Works", route]])], body });
}

function researchLibraryPage() {
  const route = "/science/research-library/";
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: researchItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: item.source_url })),
  };
  const cards = researchItems.map((item) => `<article class="research-card${item.featured ? " featured" : ""}">
    <div class="research-meta"><span>${esc(item.research_type)}</span><span>${esc(item.application_area)}</span><span>${item.year}</span></div>
    <h2>${esc(item.title)}</h2><p class="research-authors">${esc(item.authors)}</p><p><strong>${esc(item.journal)}</strong> · DOI <a href="https://doi.org/${item.doi.split("/").map(encodeURIComponent).join("/")}" target="_blank" rel="noopener noreferrer">${esc(item.doi)}</a></p>
    <dl><div><dt>Population</dt><dd>${esc(item.population)}</dd></div><div><dt>Evidence summary</dt><dd>${esc(item.summary)}</dd></div><div><dt>Limitations</dt><dd>${esc(item.limitations)}</dd></div></dl>
    <a href="${esc(item.source_url)}" target="_blank" rel="noopener noreferrer">View original source &rarr;</a>
  </article>`).join("");
  const body = `<section class="page-hero compact"><p class="eyebrow">Research library</p><h1>Phosphatidylserine Research Library</h1><p>Selected source-linked publications for formulation education, organized by study type, application area, population, summary, and limitations.</p></section>
  <section class="research-compliance"><h2>How to read this library</h2><p>Human findings are described as “reported in human studies.” Animal findings should be labeled “observed in animal studies,” laboratory findings “investigated in laboratory models,” and reviews “summarized previous research.” No entry should be treated as a medical claim for a bulk ingredient or finished product.</p></section>
  <section class="research-library">${cards}</section>
  <section class="link-panel"><a href="/science/how-ps-works/">How PS Works</a><a href="/applications/cognitive-health/">Cognitive Health</a><a href="/applications/healthy-aging/">Healthy Aging</a><a href="/applications/sports-nutrition/">Sports Nutrition</a><a href="/contact/">Talk to Technical Support</a></section>`;
  return layout({ title: "Phosphatidylserine Research Library | Nutranexa", description: "Browse source-linked phosphatidylserine research records with study type, population, summary, limitations, DOI, and original source links.", route, image: "/assets/images/news-lab-measurement-unsplash.jpg", schema: [breadcrumbJson([["Home", "/"], ["Science", "/science/"], ["Research Library", route]]), itemList], body });
}

function formulationSupportPage() {
  const route = "/science/formulation-support/";
  const body = `<section class="page-hero compact"><p class="eyebrow">Formulation support</p><h1>PS Ingredient Formulation Support</h1><p>Build a clearer technical brief around application, source, purity grade, product format, processing conditions, documentation, and target market.</p></section>
  <section>${sectionIntro("Development workflow", "Information to prepare before sampling", "A complete brief helps technical and sales teams identify the relevant grade, source route, controlled documents, and testing questions.")}
    <div class="explanation-grid"><article><span>01</span><h3>Define Application</h3><p>Cognitive health, memory support, healthy aging, sports nutrition, or functional food.</p></article><article><span>02</span><h3>Select Source</h3><p>Compare soy and sunflower routes against label, market, and document needs.</p></article><article><span>03</span><h3>Choose Target Grade</h3><p>Evaluate 20%, 50%, or 70% positioning without assuming process suitability.</p></article><article><span>04</span><h3>Plan Testing</h3><p>Confirm processing, stability, sensory, compatibility, assay, and packaging requirements.</p></article></div>
  </section>
  <section class="form-panel"><div>${sectionIntro("Technical brief", "Talk to technical support", "Share your formulation and document requirements. No technical value will be assumed without a controlled specification or batch document.")}</div>${quoteForm("Formulation support")}</section>`;
  return layout({ title: "PS Formulation Support | Nutranexa", description: "Request phosphatidylserine formulation support for source selection, target purity, formats, testing, specifications, COA, TDS, and MSDS.", route, image: "/assets/images/quality-document-review.webp", schema: [breadcrumbJson([["Home", "/"], ["Science", "/science/"], ["Formulation Support", route]])], body });
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
  const isSspArticle = article.slug.startsWith("soluble-soybean-polysaccharide");
  const productRoute = isSspArticle ? "/products/soluble-soybean-polysaccharide/" : "/products/phosphatidylserine/";
  const productLabel = isSspArticle ? "View SSP Product" : "View PS Products";
  const recommendedSteps = isSspArticle
    ? `<h2>Recommended next steps</h2><ul><li>Review the <a href="/products/soluble-soybean-polysaccharide/">Soluble Soybean Polysaccharide product page</a>.</li><li>Define the project through <a href="/applications/functional-foods/">Functional Food Applications</a>.</li><li>Check <a href="/manufacturing/">manufacturing proof</a> and <a href="/quality-rd/">Quality & R&D</a>.</li></ul>`
    : `<h2>Recommended next steps</h2><ul><li>Review the <a href="/products/phosphatidylserine/">Phosphatidylserine product page</a>.</li><li>Compare <a href="/products/soy-phosphatidylserine/">Soy PS</a> and <a href="/products/sunflower-phosphatidylserine/">Sunflower PS</a>.</li><li>Check <a href="/manufacturing/">manufacturing proof</a> and <a href="/quality-rd/">Quality & R&D</a>.</li></ul>`;
  const articleContent = article.contentHtml || article.body.map((para, index) => `${index === 1 ? '<aside class="inline-cta"><strong>Need current specifications?</strong><a href="/contact/">Request Specifications</a></aside>' : ""}<p>${esc(para)}</p>`).join("");
  const schemas = [breadcrumbJson([["Home", "/"], ["Resources", "/resources/"], [article.title, route]]), articleJson(article, route), resourceFaqJson(article)].filter(Boolean);
  const body = `<article class="article-page">
  <header><p class="eyebrow">${article.pillar ? "Pillar guide" : "Resource article"}</p><h1>${esc(article.title)}</h1><p>${esc(article.description)}</p>${article.published ? `<p class="article-date">Published <time datetime="${esc(article.published)}">${esc(new Date(`${article.published}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }))}</time></p>` : ""}<div class="article-actions"><a class="button secondary" href="${productRoute}">${productLabel}</a><a class="button primary" href="/contact/">Request Specifications</a></div><img class="article-hero-image" src="${articleImage(article)}" alt="${esc(article.imageAlt)}" width="1536" height="1024" loading="eager"></header>
  <div class="article-body">${articleContent}
  ${recommendedSteps}
  <div class="bottom-cta"><h2>Contact sales for product documents</h2><p>Share source preference, application, country, and annual quantity.</p><a class="button primary" href="/contact/">Contact Sales</a></div></div>
</article>`;
  return layout({
    title: articleSeoTitle(article),
    description: article.description,
    route,
    image: articleImage(article),
    imageAlt: article.imageAlt,
    imageWidth: "1536",
    imageHeight: "1024",
    ogType: "article",
    schema: schemas,
    body,
  });
}

function thankYouPage() {
  const body = `<section class="page-hero compact"><p class="eyebrow">Inquiry received</p><h1>Thank you. Your request is ready for technical follow-up.</h1><p>Our team will review your application, source preference, required PS grade, document needs, and estimated annual volume.</p><a class="button primary" href="/products/">Return to PS Products</a></section>`;
  return layout({ title: "Thank You | Nutranexa Quote Request", description: "Your Nutranexa phosphatidylserine inquiry has been received for sales follow-up.", route: "/thank-you/", robots: "noindex,follow", schema: [breadcrumbJson([["Home", "/"], ["Thank You", "/thank-you/"]])], body });
}

function privacyPage() {
  const body = `<section class="article-page"><header><p class="eyebrow">Privacy</p><h1>Privacy Policy</h1><p>This policy explains how Nutranexa handles B2B inquiry information.</p></header><div class="article-body"><p>Nutranexa collects information submitted through inquiry forms, including name, business email, company, country, application, source preference, required PS grade, document needs, estimated annual volume, and message content. The information is used to respond to B2B product, document, sample, and quotation requests.</p><p>Inquiry information may be reviewed by sales and technical staff so the team can confirm product source, specification, available documents, packaging, and shipment discussion points.</p><p>For privacy-related requests, use the website inquiry form and select the relevant request in your message.</p></div></section>`;
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
for (const grade of psGrades) await add(`/products/${grade.slug}/`, psGradePage(grade));
await add("/benefits/", benefitsHub());
for (const item of psBenefitItems) await add(`/benefits/${item.slug}/`, benefitPage(item));
await add("/applications/", applicationsHub());
for (const app of applications) await add(`/applications/${app.slug}/`, applicationPage(app));
await add("/science/", scienceHubPage());
await add("/science/how-ps-works/", howPsWorksPage());
await add("/science/research-library/", researchLibraryPage());
await add("/science/formulation-support/", formulationSupportPage());
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
${routes.filter((route) => route !== "/thank-you/").map((route) => `  <url><loc>${urlFor(route)}</loc></url>`).join("\n")}
</urlset>
`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`;
await fs.writeFile(path.join(root, "robots.txt"), robots, "utf8");

console.log(`Built ${routes.length} routes`);

