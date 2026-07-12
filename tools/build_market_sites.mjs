import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const sharedAssets = path.join(root, "assets", "images");
const marketRoot = path.join(root, "apps");

const imageFiles = [
  "logo-nutranexa.webp",
  "logo-nutranexa-icon.png",
  "hero-ps-ingredients.webp",
  "brand-product-lab.webp",
  "product-soy-ps.webp",
  "product-sunflower-ps.webp",
  "ps-25kg-drum-packaging-clean.webp",
  "factory-aerial.webp",
  "equipment-cleanroom-production.webp",
  "quality-document-review.webp",
  "dietary-supplement-application.webp",
  "functional-food-application.webp",
  "doc-coa-ps-20-sunflower.webp",
  "doc-coa-ps-50-sunflower.webp",
];

const company = {
  email: "wh1007209170@gmail.com",
  whatsapp: "+8613645700210",
  phone: "400-138-0635",
  address: "Yunhe West Road, Shizilou District, Yanggu County, Liaocheng City, Shandong Province, P.R. China",
  founded: "2013",
  campus: "110,000+ m2",
  moq: "25 kg",
  packaging: "25 kg net per drum",
  products: ["Soy Phosphatidylserine", "Sunflower Phosphatidylserine", "PS 20%", "PS 50%"],
};

const siteData = {
  "kr-site": {
    code: "ko",
    lang: "ko",
    dir: "ltr",
    name: "Nutranexa Korea",
    market: "Korea",
    defaultUrl: "https://ps-korea-domain-to-confirm.example",
    envExample: "NEXT_PUBLIC_SITE_URL=https://your-korean-domain.com",
    titleSuffix: "Nutranexa Korea",
    nav: [
      ["홈", "/"],
      ["제품", "/products/"],
      ["응용 분야", "/applications/"],
      ["품질 관리", "/quality-control/"],
      ["기술 자료", "/technical-documents/"],
      ["포장·납품", "/packaging-delivery/"],
      ["블로그", "/blog/"],
      ["문의", "/contact/"],
    ],
    ctaQuote: "견적 요청",
    ctaSample: "샘플 요청",
    ctaDocs: "COA·규격서 요청",
    ctaWhatsapp: "WhatsApp 문의",
    formLabels: {
      name: "성함",
      company: "회사명",
      country: "국가",
      email: "업무용 이메일",
      phone: "전화번호",
      website: "회사 웹사이트",
      kakao: "KakaoTalk ID",
      source: "필요한 PS 원료",
      assay: "필요한 PS 함량",
      application: "제품 적용 분야",
      quantity: "예상 구매 수량",
      sample: "샘플 필요 여부",
      documents: "필요 자료",
      message: "상세 요청 사항",
      privacy: "개인정보 처리 및 영업 연락에 동의합니다.",
      submit: "문의 보내기",
    },
    pages: {
      home: {
        route: "/",
        title: "한국 건강기능식품 기업을 위한 포스파티딜세린 원료 공급",
        description: "Nutranexa는 한국 건강기능식품, OEM/ODM, 원료 수입사에 대두 및 해바라기 유래 포스파티딜세린 원료와 기술 자료, 샘플, 장기 공급 지원을 제공합니다.",
        h1: "한국 건강기능식품 기업을 위한 포스파티딜세린 원료 공급",
        intro: "Nutranexa는 포스파티딜세린(PS) 원료를 B2B 고객에게 공급하는 제조 기반 원료 파트너입니다. 한국 시장에서는 함량, 원료 출처, COA, 규격서, 샘플 대응, 장기 공급 안정성을 중심으로 구매 검토가 이루어집니다.",
        sections: [
          ["대두 유래 PS", "캡슐, 정제, 분말 제품 개발에 적합한 대두 유래 포스파티딜세린 원료를 검토할 수 있습니다. 최종 함량, 입도, 색상, 수분, 미생물 기준은 최신 규격서와 COA로 확인해야 합니다."],
          ["해바라기 유래 PS", "비대두 원료 포지셔닝이 필요한 한국 브랜드와 OEM/ODM 프로젝트를 위해 해바라기 유래 PS 옵션을 제공합니다. 알레르겐, GMO, 원료 출처 관련 문서는 문의 시 확인합니다."],
          ["기술 자료와 샘플 지원", "PS 20%, PS 50% 등 제공 가능 사양은 견적 전 확인합니다. COA 샘플, 규격서, 포장 정보, 보관 조건, 유통기한 자료를 요청할 수 있습니다."],
          ["한국 시장 공급 경험", "회사에서 확인한 범위 내에서 한국 시장 공급 경험을 안내할 수 있습니다. 고객명, 브랜드명, 주문량은 공개하지 않습니다."],
        ],
      },
      about: {
        route: "/about/",
        title: "회사 소개 | 포스파티딜세린 원료 제조 기반 공급사",
        description: "Nutranexa의 회사 정보, 생산 기반, 품질 관리, R&D 협력 및 한국 B2B 원료 고객 지원 방향을 소개합니다.",
        h1: "포스파티딜세린 원료를 위한 제조 기반 파트너",
        intro: "Nutranexa는 2013년에 설립된 바이오 원료 기업으로, 포스파티딜세린과 관련 기능성 식품 원료의 B2B 공급을 중심으로 운영합니다.",
        sections: [
          ["공급 방향", "건강기능식품 브랜드, 원료 수입사, OEM/ODM 기업, 제품 개발팀이 원료를 검토할 때 필요한 문서와 샘플, 포장 정보를 제공합니다."],
          ["확인 가능한 사실", "110,000 m2 이상 규모의 생산 캠퍼스, 생산 설비 이미지, COA 샘플, 식품 생산 관련 문서, Halal 및 Kosher 문서가 준비되어 있습니다. 최종 문서 범위는 주문 전 확인해야 합니다."],
          ["표현 원칙", "이 사이트는 B2B 원료 정보 제공 사이트입니다. 질병 치료, 예방, 의약품 대체 효과를 주장하지 않습니다."],
        ],
      },
      contact: {
        route: "/contact/",
        title: "문의하기 | 포스파티딜세린 견적 및 샘플 요청",
        description: "PS 원료 견적, 샘플, COA, 규격서, OEM/ODM 적용 상담을 위해 Nutranexa Korea에 문의하세요.",
        h1: "포스파티딜세린 원료 문의",
        intro: "필요한 원료 출처, 함량, 적용 제품, 예상 수량, 필요한 문서를 알려주시면 영업팀이 확인 후 회신합니다.",
        form: true,
        sections: [
          ["연락처", `이메일: ${company.email}. WhatsApp: ${company.whatsapp}. 전화: ${company.phone}.`],
        ],
      },
      quote: {
        route: "/quote/",
        title: "견적 요청 | 대량 포스파티딜세린 원료",
        description: "대두 또는 해바라기 유래 포스파티딜세린 원료의 대량 견적을 요청하세요. 함량, 포장, 수량, 목적 시장을 함께 알려주세요.",
        h1: "대량 PS 원료 견적 요청",
        intro: "정확한 견적을 위해 필요한 PS 출처, 함량, 적용 제품, 예상 연간 수량, 도착 국가, 필요한 문서를 함께 보내주세요.",
        form: true,
        sections: [["견적 전 확인 항목", "MOQ는 25 kg이며 표준 포장은 25 kg net per drum입니다. 최종 가격, 리드타임, 운송 조건은 주문 수량과 목적지에 따라 확인됩니다."]],
      },
      sample: {
        route: "/sample-request/",
        title: "샘플 요청 | 포스파티딜세린 원료 평가",
        description: "한국 제품 개발팀과 OEM/ODM 기업을 위한 PS 원료 샘플 요청 페이지입니다.",
        h1: "PS 원료 샘플 요청",
        intro: "샘플 검토 시에는 목표 함량, 제품 제형, 원료 출처, 필요한 문서, 샘플 사용 목적을 함께 전달해 주세요.",
        form: true,
        sections: [["샘플 검토 기준", "색상, 냄새, 분산성, 흐름성, 입도, 수분, 산화 관련 항목, 미생물 기준은 적용 제품에 따라 검토 방식이 달라질 수 있습니다."]],
      },
      quality: {
        route: "/quality-control/",
        title: "품질 관리 | PS 원료 COA, 규격서, 시험 항목",
        description: "포스파티딜세린 원료 구매 전 확인해야 할 COA, 규격서, 중금속, 미생물, 수분, 산화 관리 항목을 정리했습니다.",
        h1: "PS 원료 품질 관리와 문서 검토",
        intro: "한국 원료 구매자는 함량, 원료 출처, COA, 규격서, 미생물, 중금속, 수분, 잔류용매, 포장 상태를 함께 확인해야 합니다.",
        sections: [
          ["COA 검토", "COA는 제품명, 로트번호, 제조일, 시험일, 보고일, 시험 기준, 분석 결과를 포함해야 합니다. 실제 출하 로트와 문서가 일치하는지 확인합니다."],
          ["주요 시험 항목", "PS 함량, 수분, 과산화물가, acetone insoluble, bulk density, 중금속, 총균수, 대장균군, 곰팡이 및 효모, Salmonella 등의 항목을 확인합니다."],
          ["문서 요청", "규격서, COA 샘플, 인증서, 포장 정보, 보관 조건, 원료 출처 확인 자료는 견적 단계에서 요청할 수 있습니다."],
        ],
      },
      documents: {
        route: "/technical-documents/",
        title: "기술 자료 | PS 규격서, COA, 인증 문서 요청",
        description: "포스파티딜세린 원료 구매 검토에 필요한 규격서, COA, Halal, Kosher, FDA 등록 관련 문서 범위를 확인하세요.",
        h1: "포스파티딜세린 기술 자료",
        intro: "Nutranexa는 구매 검토 단계에서 필요한 기술 자료를 제공합니다. 최종 문서는 제품 사양, 로트, 목적 시장에 따라 확인해야 합니다.",
        sections: [
          ["요청 가능한 자료", "규격서, COA 샘플, 포장 정보, 보관 조건, Halal, Kosher, 식품 생산 관련 문서, FDA food facility registration 관련 문서를 요청할 수 있습니다."],
          ["확인 필요 자료", "SDS, TDS, GMO statement, allergen statement, 잔류용매 및 중금속 관련 추가 문서는 목적 시장과 구매 조건에 따라 확인합니다."],
          ["주의 사항", "FDA 등록 문서는 제품 효능 인증이나 FDA 승인 표시가 아닙니다. 인증 문구는 실제 문서 범위에 맞춰 사용해야 합니다."],
        ],
      },
      packaging: {
        route: "/packaging-delivery/",
        title: "포장 및 납품 | 25 kg Drum PS 원료",
        description: "PS 원료의 MOQ, 25 kg 드럼 포장, 팔레트 준비, 샘플과 대량 운송 검토 항목을 안내합니다.",
        h1: "25 kg 드럼 포장과 납품 준비",
        intro: "포스파티딜세린 원료의 MOQ는 25 kg이며, 표준 벌크 포장은 25 kg net per drum입니다.",
        sections: [
          ["MOQ와 포장", "1드럼은 25 kg입니다. 따라서 1드럼이 최소 주문 수량에 해당합니다. 라벨, 내포장, 팔레트, 수출 운송 요건은 주문 전 확인합니다."],
          ["운송 검토", "샘플 운송, 항공 운송, 해상 운송, 국제 특송 가능 여부는 목적지와 주문 조건에 따라 확인됩니다."],
          ["출하 전 확인", "로트번호, 포장 상태, COA, packing list, shipment information을 출하 전 검토합니다."],
        ],
      },
      products: {
        route: "/products/",
        title: "제품 | 대두 및 해바라기 유래 포스파티딜세린",
        description: "Nutranexa Korea의 PS 제품 포트폴리오: 대두 유래 PS, 해바라기 유래 PS, PS 20%, PS 50% 및 요청 가능한 문서.",
        h1: "포스파티딜세린 제품",
        intro: "한국 시장의 건강기능식품, OEM/ODM, 원료 수입사 고객을 위해 대두 및 해바라기 유래 PS 원료 옵션을 제공합니다.",
      },
      soy: {
        route: "/products/soy-phosphatidylserine/",
        title: "대두 유래 포스파티딜세린 원료",
        description: "대두 유래 PS 원료의 출처, 적용 제형, 문서, MOQ, 포장 정보를 확인하세요.",
        h1: "대두 유래 포스파티딜세린",
        intro: "대두 유래 PS는 대두 레시틴과 L-serine 기반의 bio-enzymatic conversion 공정을 통해 생산되는 원료 옵션입니다.",
        product: true,
        sections: [
          ["적용 분야", "캡슐, 정제, 분말, 건강기능식품, 기능성 식품 개발 프로젝트에서 검토할 수 있습니다."],
          ["확인 항목", "PS 함량, 색상, 냄새, 입도, 분산성, 수분, 미생물 기준, 중금속, 잔류용매, GMO 및 알레르겐 문서를 확인합니다."],
        ],
      },
      sunflower: {
        route: "/products/sunflower-phosphatidylserine/",
        title: "해바라기 유래 포스파티딜세린 원료",
        description: "비대두 포지셔닝을 위한 해바라기 유래 PS 원료의 사양, 적용 분야, COA 및 샘플 요청 정보를 확인하세요.",
        h1: "해바라기 유래 포스파티딜세린",
        intro: "해바라기 유래 PS는 비대두 원료 포지셔닝이 필요한 브랜드와 한국 제품 개발 프로젝트에서 검토할 수 있는 옵션입니다.",
        product: true,
        sections: [
          ["구매 검토 포인트", "원료 출처, PS 함량, 알레르겐 문서, COA, 규격서, 포장, 샘플 평가 결과를 함께 확인합니다."],
          ["적용 제품", "캡슐, 정제, 분말 제품, 기능성 식품 및 OEM/ODM 제품 개발에 대해 상담할 수 있습니다."],
        ],
      },
      specs: {
        route: "/products/ps-specifications/",
        title: "PS 사양 | PS 20%, PS 50% 및 문서 확인",
        description: "PS 20%, PS 50% 등 포스파티딜세린 원료 사양을 구매 전 확인해야 할 항목 중심으로 정리했습니다.",
        h1: "PS 사양과 구매 확인 항목",
        intro: "PS 20%, PS 50% 등 실제 제공 가능한 사양은 주문 시점과 제품 출처에 따라 확인해야 합니다.",
        specs: true,
      },
      applications: {
        route: "/applications/",
        title: "응용 분야 | 건강기능식품과 기능성 식품용 PS 원료",
        description: "캡슐, 정제, 분말, 고체음료, 기능성 식품, OEM/ODM 제품 개발을 위한 PS 원료 적용 분야를 안내합니다.",
        h1: "PS 원료 응용 분야",
        intro: "PS 원료는 B2B 제품 개발에서 제형, 목표 시장, 문서 요구 사항에 따라 다르게 검토해야 합니다.",
      },
      supplements: {
        route: "/applications/dietary-supplements/",
        title: "건강기능식품용 PS 원료",
        description: "캡슐, 정제, 분말 건강기능식품 개발에서 PS 원료를 검토할 때 필요한 항목을 정리했습니다.",
        h1: "건강기능식품 제형을 위한 PS 원료",
        intro: "캡슐, 정제, 분말 제품에서는 흐름성, 입도, 함량 균일성, 색상, 냄새, 보관 안정성, COA가 중요합니다.",
        sections: [
          ["캡슐과 정제", "원료의 벌크 밀도, 흐름성, 색상, 함량, 부형제와의 적합성을 사전 검토합니다."],
          ["분말 제품", "분산성, 맛 영향, caking, 수분 관리, 포장 조건을 확인합니다."],
        ],
      },
      functional: {
        route: "/applications/functional-foods/",
        title: "기능성 식품용 PS 원료",
        description: "고체음료, 분말, 기능성 식품 개발에서 PS 원료 적용 가능성과 문서 검토 항목을 안내합니다.",
        h1: "기능성 식품 개발을 위한 PS 원료",
        intro: "기능성 식품 프로젝트는 원료 출처, 가공 조건, 목적 시장, 표시 문구, 문서 범위를 함께 검토해야 합니다.",
        sections: [
          ["분말과 고체음료", "분산성, 안정성, 맛 영향, 보관 조건, 최종 제품 함량 검토가 필요합니다."],
          ["표시 문구", "질병 치료나 예방 표현을 사용하지 않고, 목적 시장의 허용 표현을 확인해야 합니다."],
        ],
      },
      oem: {
        route: "/applications/oem-odm/",
        title: "OEM/ODM 제품 개발을 위한 PS 원료",
        description: "한국 OEM/ODM 기업이 PS 원료를 검토할 때 필요한 샘플, 문서, 포장, 공급 안정성 항목을 안내합니다.",
        h1: "OEM/ODM 제품 개발 지원",
        intro: "OEM/ODM 프로젝트에서는 고객 브랜드의 제형, 원료 출처 요구, 문서 범위, 납기, 반복 주문 관리가 중요합니다.",
        sections: [
          ["개발 단계", "샘플 평가, 규격서 검토, COA 확인, 시험 생산, 대량 주문 문서 확인 순서로 진행하는 것이 좋습니다."],
          ["장기 공급", "반복 주문에서는 사양 변경, 로트 추적성, 포장 조건, 문서 업데이트 여부를 확인합니다."],
        ],
      },
      faq: {
        route: "/faq/",
        title: "FAQ | 포스파티딜세린 원료 구매 질문",
        description: "PS 원료 MOQ, 샘플, COA, 규격서, 대두/해바라기 출처, 포장, 한국 시장 공급 경험에 대한 자주 묻는 질문입니다.",
        h1: "자주 묻는 질문",
        intro: "구매 전 자주 확인하는 내용을 정리했습니다.",
        faq: [
          ["MOQ는 얼마인가요?", "PS 원료 MOQ는 25 kg입니다. 표준 포장은 25 kg net per drum입니다."],
          ["COA와 규격서를 받을 수 있나요?", "예. 제품 출처와 사양을 확인한 뒤 COA 샘플과 규격서를 요청할 수 있습니다."],
          ["대두 유래와 해바라기 유래 PS를 모두 공급하나요?", "예. 대두 유래 PS와 해바라기 유래 PS 옵션을 검토할 수 있습니다."],
          ["한국 고객명이나 납품 사례를 공개할 수 있나요?", "고객명, 브랜드명, 주문량은 공개하지 않습니다. 회사가 확인한 범위에서 한국 시장 공급 경험만 안내합니다."],
          ["질병 개선 효과를 표시해도 되나요?", "이 사이트는 원료 B2B 정보 사이트입니다. 질병 치료, 예방, 의약품 대체 표현은 사용하지 않습니다."],
        ],
      },
      blog: {
        route: "/blog/",
        title: "블로그 | 한국 PS 원료 구매 가이드",
        description: "한국 건강기능식품, OEM/ODM, 원료 수입사를 위한 포스파티딜세린 구매 가이드와 품질 문서 검토 자료입니다.",
        h1: "PS 원료 구매 가이드",
        intro: "첫 단계에서는 한국 구매자가 자주 묻는 질문과 문서 검토 주제를 중심으로 콘텐츠를 구성합니다.",
        blog: [
          "포스파티딜세린 원료 구매 전 확인해야 할 항목",
          "대두 유래 PS와 해바라기 유래 PS의 차이",
          "PS 원료 공급사를 선택할 때 확인할 문서",
          "건강기능식품 제형에서 PS 원료 검토 포인트",
          "PS COA와 규격서를 읽는 방법",
        ],
      },
    },
  },
  "tr-site": {
    code: "tr",
    lang: "tr",
    dir: "ltr",
    name: "Nutranexa Türkiye",
    market: "Turkey",
    defaultUrl: "https://ps-turkey-domain-to-confirm.example",
    envExample: "NEXT_PUBLIC_SITE_URL=https://your-turkish-domain.com",
    titleSuffix: "Nutranexa Türkiye",
    nav: [
      ["Ana Sayfa", "/"],
      ["Ürünler", "/products/"],
      ["Uygulamalar", "/applications/"],
      ["Kalite", "/quality-control/"],
      ["Teknik Belgeler", "/technical-documents/"],
      ["Ambalaj ve Teslimat", "/packaging-delivery/"],
      ["Blog", "/blog/"],
      ["İletişim", "/contact/"],
    ],
    ctaQuote: "Fiyat Teklifi Al",
    ctaSample: "Numune Talep Et",
    ctaDocs: "COA ve Teknik Föy Talep Et",
    ctaWhatsapp: "WhatsApp'tan Yazın",
    formLabels: {
      name: "Ad Soyad",
      company: "Şirket Adı",
      country: "Ülke",
      email: "İş E-postası",
      phone: "Telefon",
      website: "Şirket Web Sitesi",
      kakao: "KakaoTalk ID",
      source: "İstenen PS Kaynağı",
      assay: "İstenen PS Konsantrasyonu",
      application: "Ürün Uygulaması",
      quantity: "Tahmini Satın Alma Miktarı",
      sample: "Numune Gerekli mi?",
      documents: "Gerekli Belgeler",
      message: "Detaylı Mesaj",
      privacy: "Gizlilik politikası ve satış iletişimi için onay veriyorum.",
      submit: "Talebi Gönder",
    },
    pages: {
      home: {
        route: "/",
        title: "Takviye Edici Gıdalar İçin Fosfatidilserin Üreticisi ve Tedarikçisi",
        description: "Nutranexa, Türkiye'deki takviye edici gıda üreticileri, ithalatçılar ve distribütörler için soya ve ayçiçeği kaynaklı fosfatidilserin hammaddesi sunar.",
        h1: "Takviye Edici Gıdalar İçin Fosfatidilserin Üreticisi ve Tedarikçisi",
        intro: "Nutranexa, fosfatidilserin (PS) hammaddesini B2B müşterilere sunan üretim odaklı bir tedarikçidir. Türkiye pazarı için hızlı teklif, numune desteği, COA, teknik föy, MOQ ve uluslararası teslimat bilgileri önceliklidir.",
        sections: [
          ["Soya kaynaklı PS", "Kapsül, tablet, toz ürün ve fonksiyonel gıda projeleri için soya kaynaklı fosfatidilserin hammaddesi değerlendirilebilir."],
          ["Ayçiçeği kaynaklı PS", "Soya dışı kaynak tercih eden markalar ve distribütörler için ayçiçeği kaynaklı PS seçeneği sunulur. Kaynak, alerjen ve teknik belge kapsamı siparişten önce doğrulanır."],
          ["Numune ve belge desteği", "PS 20%, PS 50% ve mevcut diğer spesifikasyonlar teklif aşamasında doğrulanır. COA örneği, teknik föy, ambalaj bilgisi ve saklama koşulları talep edilebilir."],
          ["Türkiye pazarına tedarik deneyimi", "Şirket tarafından doğrulandığı ölçüde Türkiye pazarına tedarik deneyimi belirtilebilir. Müşteri adı, marka adı ve sipariş miktarı açıklanmaz."],
        ],
      },
      about: {
        route: "/about/",
        title: "Hakkımızda | Fosfatidilserin Hammaddesi Tedarikçisi",
        description: "Nutranexa'nın üretim altyapısı, kalite kontrol yaklaşımı, belge desteği ve Türkiye B2B müşterilerine yönelik tedarik modeli.",
        h1: "Fosfatidilserin hammaddesi için üretim odaklı tedarik ortağı",
        intro: "Nutranexa, 2013 yılında kurulmuş bir biyoteknoloji hammaddesi şirketidir ve fosfatidilserin başta olmak üzere fonksiyonel gıda bileşenleri için B2B tedarik desteği sağlar.",
        sections: [
          ["Müşteri profili", "Takviye edici gıda markaları, ithalatçılar, distribütörler, OEM/ODM üreticileri ve ürün geliştirme ekipleri için çalışırız."],
          ["Doğrulanabilir bilgiler", "110.000 m2 üzeri üretim kampüsü, tesis görselleri, COA örnekleri, gıda üretim belgeleri, Halal ve Kosher belgeleri mevcuttur. Nihai belge kapsamı siparişten önce doğrulanmalıdır."],
          ["İfade sınırları", "Bu site B2B hammadde sitesidir. Hastalık tedavisi, önleme veya ilaç yerine kullanım iddiası içermez."],
        ],
      },
      contact: {
        route: "/contact/",
        title: "İletişim | Fosfatidilserin Fiyat Teklifi ve Numune",
        description: "Fosfatidilserin fiyat teklifi, numune, COA, teknik föy ve distribütörlük görüşmeleri için Nutranexa Türkiye ile iletişime geçin.",
        h1: "Fosfatidilserin hammadde talebi",
        intro: "İstenen PS kaynağı, konsantrasyon, uygulama, miktar ve belge ihtiyacınızı paylaşın. Satış ekibi bilgileri kontrol ederek dönüş yapacaktır.",
        form: true,
        sections: [["İletişim bilgileri", `E-posta: ${company.email}. WhatsApp: ${company.whatsapp}. Telefon: ${company.phone}.`]],
      },
      quote: {
        route: "/quote/",
        title: "Fiyat Teklifi Al | Toplu Fosfatidilserin Hammaddesi",
        description: "Soya veya ayçiçeği kaynaklı fosfatidilserin hammaddesi için toplu fiyat teklifi alın. Konsantrasyon, ambalaj ve miktar bilgisini paylaşın.",
        h1: "Toplu PS hammaddesi için fiyat teklifi",
        intro: "Doğru teklif için PS kaynağı, hedef konsantrasyon, kullanım alanı, yıllık miktar, varış ülkesi ve gerekli belgeleri belirtin.",
        form: true,
        sections: [["Teklif öncesi bilgiler", "MOQ 25 kg'dır ve standart ambalaj 25 kg net per drum şeklindedir. Nihai fiyat, teslim süresi ve taşıma koşulları miktara ve varış noktasına göre doğrulanır."]],
      },
      sample: {
        route: "/sample-request/",
        title: "Numune Talep Et | Fosfatidilserin Hammadde Değerlendirmesi",
        description: "Türkiye'deki üreticiler, ithalatçılar ve distribütörler için fosfatidilserin numune talep sayfası.",
        h1: "PS hammaddesi için numune talebi",
        intro: "Numune değerlendirmesi için hedef konsantrasyon, ürün formu, kaynak tercihi, gerekli belgeler ve kullanım amacını paylaşın.",
        form: true,
        sections: [["Numune değerlendirmesi", "Renk, koku, akışkanlık, dispersiyon, nem, oksidasyon kontrolü ve mikrobiyolojik kriterler ürün uygulamasına göre değerlendirilmelidir."]],
      },
      quality: {
        route: "/quality-control/",
        title: "Kalite Kontrol | Fosfatidilserin COA ve Spesifikasyon",
        description: "Fosfatidilserin alımında COA, teknik föy, ağır metal, mikrobiyoloji, nem ve kalıntı solvent kontrolü nasıl incelenir?",
        h1: "PS hammaddesi kalite kontrol ve belge incelemesi",
        intro: "Türkiye'deki alıcılar, PS kaynağını, konsantrasyonu, COA'yı, teknik föyü, mikrobiyoloji ve ağır metal kriterlerini birlikte değerlendirmelidir.",
        sections: [
          ["COA incelemesi", "COA; ürün adı, lot numarası, üretim tarihi, test tarihi, rapor tarihi, test standardı ve analiz sonuçlarını içermelidir."],
          ["Önemli test kalemleri", "PS konsantrasyonu, nem, peroxide value, acetone insoluble, bulk density, ağır metaller, toplam canlı sayımı, koliformlar, küf-maya ve Salmonella gibi kalemler kontrol edilir."],
          ["Belge talebi", "Spesifikasyon, COA örneği, ambalaj bilgisi, saklama koşulları, kaynak ve sertifika dosyaları teklif aşamasında istenebilir."],
        ],
      },
      documents: {
        route: "/technical-documents/",
        title: "Teknik Belgeler | PS Teknik Föy, COA, Sertifika Dosyaları",
        description: "Fosfatidilserin ithalatı ve kalite incelemesi için teknik föy, COA, Halal, Kosher, FDA facility registration ve ilgili belgeler.",
        h1: "Fosfatidilserin teknik belge paketi",
        intro: "Nutranexa, satın alma değerlendirmesi için gerekli teknik belgeleri sağlar. Nihai belge kapsamı ürün spesifikasyonu, lot ve hedef pazara göre doğrulanmalıdır.",
        sections: [
          ["Talep edilebilecek belgeler", "Teknik föy, COA örneği, ambalaj bilgisi, saklama koşulları, Halal, Kosher, gıda üretim belgesi ve FDA food facility registration belgesi talep edilebilir."],
          ["Doğrulanması gereken belgeler", "SDS, TDS, GMO statement, allergen statement, kalıntı solvent ve ağır metal ile ilgili ek belgeler hedef pazara göre doğrulanır."],
          ["Uyarı", "FDA facility registration, ürün onayı veya etki onayı anlamına gelmez. Sertifika ifadeleri gerçek belge kapsamına göre kullanılmalıdır."],
        ],
      },
      packaging: {
        route: "/packaging-delivery/",
        title: "Ambalaj ve Teslimat | 25 kg Drum Fosfatidilserin",
        description: "Fosfatidilserin MOQ, 25 kg drum ambalaj, palet hazırlığı, numune ve toplu sevkiyat bilgileri.",
        h1: "25 kg drum ambalaj ve teslimat hazırlığı",
        intro: "Fosfatidilserin için MOQ 25 kg'dır. Standart toplu ambalaj 25 kg net per drum şeklindedir.",
        sections: [
          ["MOQ ve ambalaj", "Bir drum 25 kg'dır; bu nedenle bir drum minimum sipariş miktarını karşılar. Etiket, iç ambalaj, paletleme ve ihracat taşıma koşulları siparişten önce doğrulanır."],
          ["Taşıma seçenekleri", "Numune gönderimi, hava yolu, deniz yolu ve uluslararası ekspres seçenekleri varış noktasına ve sipariş koşullarına göre değerlendirilir."],
          ["Sevkiyat öncesi kontrol", "Lot numarası, ambalaj durumu, COA, packing list ve sevkiyat bilgileri sevkiyat öncesinde kontrol edilir."],
        ],
      },
      products: {
        route: "/products/",
        title: "Ürünler | Soya ve Ayçiçeği Kaynaklı Fosfatidilserin",
        description: "Nutranexa Türkiye PS ürün portföyü: soya kaynaklı PS, ayçiçeği kaynaklı PS, PS 20%, PS 50% ve teknik belge desteği.",
        h1: "Fosfatidilserin ürünleri",
        intro: "Türkiye'deki takviye edici gıda üreticileri, ithalatçılar ve distribütörler için soya ve ayçiçeği kaynaklı PS hammadde seçenekleri sunulur.",
      },
      soy: {
        route: "/products/soy-phosphatidylserine/",
        title: "Soya Kaynaklı Fosfatidilserin Hammaddesi",
        description: "Soya kaynaklı PS hammaddesi için kaynak, uygulama, belge, MOQ ve ambalaj bilgilerini inceleyin.",
        h1: "Soya kaynaklı fosfatidilserin",
        intro: "Soya kaynaklı PS, soya lesitini ve L-serine bazlı bio-enzymatic conversion süreciyle üretilen bir hammadde seçeneğidir.",
        product: true,
        sections: [
          ["Uygulamalar", "Kapsül, tablet, toz ürün, takviye edici gıda ve fonksiyonel gıda geliştirme projelerinde değerlendirilebilir."],
          ["Kontrol noktaları", "PS konsantrasyonu, renk, koku, partikül profili, dispersiyon, nem, mikrobiyoloji, ağır metaller, kalıntı solvent, GMO ve alerjen belgeleri kontrol edilir."],
        ],
      },
      sunflower: {
        route: "/products/sunflower-phosphatidylserine/",
        title: "Ayçiçeği Kaynaklı Fosfatidilserin Hammaddesi",
        description: "Soya dışı kaynak arayan markalar ve distribütörler için ayçiçeği kaynaklı PS hammaddesi, COA ve numune bilgileri.",
        h1: "Ayçiçeği kaynaklı fosfatidilserin",
        intro: "Ayçiçeği kaynaklı PS, soya dışı kaynak pozisyonlaması isteyen markalar, ithalatçılar ve distribütörler için değerlendirilebilir.",
        product: true,
        sections: [
          ["Satın alma kontrolü", "Kaynak, PS konsantrasyonu, alerjen beyanı, COA, teknik föy, ambalaj ve numune değerlendirmesi birlikte incelenmelidir."],
          ["Uygulama alanları", "Kapsül, tablet, toz ürün, fonksiyonel gıda ve OEM/ODM projeleri için görüşülebilir."],
        ],
      },
      specs: {
        route: "/products/ps-specifications/",
        title: "PS Spesifikasyonları | PS 20%, PS 50% ve Belge Kontrolü",
        description: "PS 20%, PS 50% ve mevcut fosfatidilserin spesifikasyonlarını satın alma öncesi kontrol maddeleriyle inceleyin.",
        h1: "PS spesifikasyonları ve satın alma kontrolü",
        intro: "PS 20%, PS 50% ve diğer mevcut spesifikasyonlar sipariş dönemine ve ürün kaynağına göre doğrulanmalıdır.",
        specs: true,
      },
      applications: {
        route: "/applications/",
        title: "Uygulamalar | Takviye Edici Gıda ve Fonksiyonel Gıda için PS",
        description: "Kapsül, tablet, toz ürün, fonksiyonel gıda, OEM/ODM ve distribütör projeleri için PS hammadde uygulamaları.",
        h1: "PS hammadde uygulamaları",
        intro: "PS hammaddesi B2B ürün geliştirmede ürün formu, hedef pazar ve teknik belge ihtiyaçlarına göre değerlendirilmelidir.",
      },
      supplements: {
        route: "/applications/dietary-supplements/",
        title: "Takviye Edici Gıdalar İçin PS Hammaddesi",
        description: "Kapsül, tablet ve toz takviye ürünlerinde PS hammaddesi için kalite ve uygulama kontrol maddeleri.",
        h1: "Takviye edici gıda formları için PS",
        intro: "Kapsül, tablet ve toz ürünlerde akışkanlık, partikül profili, içerik homojenliği, renk, koku, saklama stabilitesi ve COA önemlidir.",
        sections: [
          ["Kapsül ve tablet", "Bulk density, akışkanlık, renk, konsantrasyon ve yardımcı maddelerle uyumluluk değerlendirilmelidir."],
          ["Toz ürünler", "Dispersiyon, tat etkisi, topaklanma, nem yönetimi ve ambalaj koşulları kontrol edilir."],
        ],
      },
      functional: {
        route: "/applications/functional-foods/",
        title: "Fonksiyonel Gıda için PS Hammaddesi",
        description: "Toz içecekler, beslenme ürünleri ve fonksiyonel gıda projeleri için PS hammadde değerlendirme rehberi.",
        h1: "Fonksiyonel gıda geliştirme için PS",
        intro: "Fonksiyonel gıda projelerinde kaynak, proses koşulları, hedef pazar, izin verilen ifade ve belge kapsamı birlikte değerlendirilmelidir.",
        sections: [
          ["Toz ve içecek formatları", "Dispersiyon, stabilite, tat etkisi, saklama koşulları ve nihai ürün konsantrasyonu kontrol edilir."],
          ["Etiket ifadeleri", "Hastalık tedavisi veya önleme iddiası kullanılmamalı; hedef pazar için izin verilen ifadeler ayrıca doğrulanmalıdır."],
        ],
      },
      oem: {
        route: "/applications/oem-odm/",
        title: "OEM/ODM Projeleri İçin PS Hammaddesi",
        description: "Türkiye'deki OEM/ODM üreticileri için PS numune, belge, ambalaj, fiyat ve tedarik sürekliliği değerlendirme sayfası.",
        h1: "OEM/ODM ürün geliştirme desteği",
        intro: "OEM/ODM projelerinde ürün formu, kaynak tercihi, belge kapsamı, teslimat planı ve tekrar sipariş yönetimi önemlidir.",
        sections: [
          ["Geliştirme süreci", "Numune değerlendirmesi, teknik föy incelemesi, COA kontrolü, deneme üretimi ve toplu sipariş belge kontrolü adım adım yürütülmelidir."],
          ["Uzun dönem tedarik", "Tekrar siparişlerde spesifikasyon değişikliği, lot izlenebilirliği, ambalaj koşulu ve belge güncellemesi kontrol edilir."],
        ],
      },
      faq: {
        route: "/faq/",
        title: "FAQ | Fosfatidilserin Hammadde Satın Alma Soruları",
        description: "Fosfatidilserin MOQ, numune, COA, teknik föy, soya/ayçiçeği kaynakları, ambalaj ve Türkiye pazarına tedarik deneyimi hakkında sorular.",
        h1: "Sık sorulan sorular",
        intro: "Satın alma öncesi sık sorulan konular.",
        faq: [
          ["MOQ nedir?", "PS hammaddesi için MOQ 25 kg'dır. Standart ambalaj 25 kg net per drum şeklindedir."],
          ["COA ve teknik föy alabilir miyim?", "Evet. Ürün kaynağı ve spesifikasyon doğrulandıktan sonra COA örneği ve teknik föy talep edilebilir."],
          ["Soya ve ayçiçeği kaynaklı PS sunuyor musunuz?", "Evet. Soya kaynaklı PS ve ayçiçeği kaynaklı PS seçenekleri değerlendirilebilir."],
          ["Türkiye müşterilerini veya sipariş miktarlarını açıklıyor musunuz?", "Hayır. Müşteri adı, marka adı ve sipariş miktarı açıklanmaz. Yalnızca doğrulanmış pazar tedarik deneyimi ifade edilir."],
          ["Hastalık iyileştirme iddiası kullanılabilir mi?", "Hayır. Bu site B2B hammadde bilgilendirme sitesidir. Tedavi, önleme veya ilaç yerine kullanım iddiası kullanılmaz."],
        ],
      },
      blog: {
        route: "/blog/",
        title: "Blog | Türkiye Fosfatidilserin Hammadde Rehberi",
        description: "Türkiye'deki takviye edici gıda üreticileri, ithalatçılar ve distribütörler için PS satın alma ve belge kontrol rehberleri.",
        h1: "PS hammadde satın alma rehberi",
        intro: "İlk aşamada Türkiye alıcılarının sık sorduğu satın alma, fiyat, belge ve uygulama konuları ele alınır.",
        blog: [
          "Fosfatidilserin nedir?",
          "Soya ve ayçiçeği kaynaklı fosfatidilserin farkları",
          "Fosfatidilserin tedarikçisi nasıl seçilir?",
          "Toplu fosfatidilserin fiyatını etkileyen faktörler",
          "Fosfatidilserin MOQ ve ambalaj seçenekleri",
        ],
      },
    },
  },
};

function esc(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pagePath(route) {
  if (route === "/") return "index.html";
  return path.join(route.replace(/^\/|\/$/g, ""), "index.html");
}

function siteUrl(site) {
  return process.env.NEXT_PUBLIC_SITE_URL || site.defaultUrl;
}

function canonical(site, route) {
  const base = siteUrl(site).replace(/\/$/, "");
  return `${base}${route}`;
}

function schema(site, page) {
  const base = siteUrl(site).replace(/\/$/, "");
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Nutranexa",
      url: base,
      email: company.email,
      telephone: company.phone,
      logo: `${base}/assets/images/logo-nutranexa.webp`,
      address: company.address,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: base,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.nav[0][0], item: `${base}/` },
        { "@type": "ListItem", position: 2, name: page.h1, item: canonical(site, page.route) },
      ],
    },
  ];
  if (page.product) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: page.h1,
      brand: { "@type": "Brand", name: "Nutranexa" },
      category: "Functional food ingredient",
      description: page.description,
    });
  }
  if (page.faq) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  return `<script type="application/ld+json">${JSON.stringify(graph)}</script>`;
}

function layout(site, page, body) {
  const active = page.route.split("/").filter(Boolean)[0] || "";
  const nav = site.nav.map(([label, href]) => {
    const key = href.split("/").filter(Boolean)[0] || "";
    return `<a ${active === key ? 'aria-current="page"' : ""} href="${href}">${esc(label)}</a>`;
  }).join("");
  return `<!doctype html>
<html lang="${site.lang}" dir="${site.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)} | ${esc(site.titleSuffix)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${canonical(site, page.route)}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical(site, page.route)}">
  <meta property="og:image" content="${siteUrl(site).replace(/\/$/, "")}/assets/images/hero-ps-ingredients.webp">
  <link rel="icon" href="/assets/images/logo-nutranexa-icon.png">
  <link rel="stylesheet" href="/assets/site.css">
  ${schema(site, page)}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/"><img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa logo" width="180" height="54"></a>
    <nav class="site-nav" aria-label="Main navigation">${nav}</nav>
    <a class="header-cta" href="/quote/">${esc(site.ctaQuote)}</a>
  </header>
  <main id="main">${body}</main>
  <footer class="site-footer">
    <div><img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa logo" width="180" height="54"><p>${esc(site.name)} · Phosphatidylserine B2B ingredient site.</p></div>
    <div><h2>${esc(site.nav[2][0])}</h2><a href="/applications/dietary-supplements/">${esc(site.pages.supplements.h1)}</a><a href="/applications/functional-foods/">${esc(site.pages.functional.h1)}</a><a href="/applications/oem-odm/">${esc(site.pages.oem.h1)}</a></div>
    <div><h2>${esc(site.nav[1][0])}</h2><a href="/products/soy-phosphatidylserine/">${esc(site.pages.soy.h1)}</a><a href="/products/sunflower-phosphatidylserine/">${esc(site.pages.sunflower.h1)}</a><a href="/products/ps-specifications/">${esc(site.pages.specs.h1)}</a></div>
    <div><h2>${esc(site.nav[7][0])}</h2><p>${company.email}</p><p>${company.whatsapp}</p><a class="footer-button" href="/contact/">${esc(site.ctaQuote)}</a></div>
  </footer>
</body>
</html>`;
}

function hero(site, page, image = "hero-ps-ingredients.webp") {
  return `<section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">${esc(site.market)} B2B PS Ingredient Site</p>
      <h1>${esc(page.h1)}</h1>
      <p>${esc(page.intro)}</p>
      <div class="button-row"><a class="button" href="/quote/">${esc(site.ctaQuote)}</a><a class="button secondary" href="/sample-request/">${esc(site.ctaSample)}</a></div>
      <dl class="proof-strip"><div><dt>${company.founded}</dt><dd>Founded</dd></div><div><dt>${company.campus}</dt><dd>Campus</dd></div><div><dt>${company.moq}</dt><dd>MOQ</dd></div></dl>
    </div>
    <img class="hero-image" src="/assets/images/${image}" alt="${esc(page.h1)}" width="1200" height="760">
  </section>`;
}

function sectionsHtml(sections = []) {
  return sections.map(([title, text]) => `<section class="content-section"><h2>${esc(title)}</h2><p>${esc(text)}</p></section>`).join("");
}

function productCards(site) {
  const cards = [
    [site.pages.soy.h1, site.pages.soy.description, "/products/soy-phosphatidylserine/", "product-soy-ps.webp"],
    [site.pages.sunflower.h1, site.pages.sunflower.description, "/products/sunflower-phosphatidylserine/", "product-sunflower-ps.webp"],
    [site.pages.specs.h1, site.pages.specs.description, "/products/ps-specifications/", "quality-document-review.webp"],
  ];
  return `<section class="grid-section"><h2>${site.code === "ko" ? "제품 선택" : "Ürün seçenekleri"}</h2><div class="card-grid">${cards.map(([title, text, href, image]) => `<article class="card"><img src="/assets/images/${image}" alt="${esc(title)}" width="720" height="460"><div><h3>${esc(title)}</h3><p>${esc(text)}</p><a href="${href}">${esc(site.code === "ko" ? "자세히 보기" : "İncele")}</a></div></article>`).join("")}</div></section>`;
}

function specsTable(site) {
  const labels = site.code === "ko"
    ? ["항목", "확인 내용", "상태"]
    : ["Kalem", "Kontrol içeriği", "Durum"];
  const rows = site.code === "ko"
    ? [
      ["PS 함량", "PS 20%, PS 50% 및 기타 제공 가능 사양", "주문 전 확인"],
      ["원료 출처", "대두 유래 또는 해바라기 유래", "제품별 확인"],
      ["포장", company.packaging, "확인됨"],
      ["MOQ", company.moq, "확인됨"],
      ["COA", "현재 로트 또는 샘플 COA", "요청 가능"],
      ["인증 문서", "Halal, Kosher, 식품 생산 관련 문서", "범위 확인"],
    ]
    : [
      ["PS konsantrasyonu", "PS 20%, PS 50% ve mevcut diğer spesifikasyonlar", "Sipariş öncesi doğrulanır"],
      ["Kaynak", "Soya kaynaklı veya ayçiçeği kaynaklı", "Ürüne göre doğrulanır"],
      ["Ambalaj", company.packaging, "Doğrulandı"],
      ["MOQ", company.moq, "Doğrulandı"],
      ["COA", "Güncel lot veya örnek COA", "Talep edilebilir"],
      ["Sertifika dosyaları", "Halal, Kosher ve gıda üretim belgeleri", "Kapsam doğrulanır"],
    ];
  return `<section class="content-section"><h2>${esc(site.pages.specs.h1)}</h2><div class="table-wrap"><table><thead><tr>${labels.map((label) => `<th>${esc(label)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
}

function formHtml(site) {
  const l = site.formLabels;
  const kakao = site.code === "ko" ? `<label>${l.kakao}<input name="kakao" placeholder="${l.kakao}"></label>` : "";
  return `<form class="inquiry-form" action="https://formsubmit.co/${company.email}" method="POST">
    <input type="hidden" name="_subject" value="${esc(site.name)} inquiry">
    <input type="hidden" name="site_id" value="${site.code}">
    <input type="text" name="_honey" tabindex="-1" autocomplete="off" class="hidden-field">
    <label>${l.name} *<input name="name" required placeholder="${l.name}"></label>
    <label>${l.company}<input name="company" placeholder="${l.company}"></label>
    <label>${l.country}<input name="country" placeholder="${l.country}"></label>
    <label>${l.email} *<input type="email" name="email" required placeholder="name@company.com"></label>
    <label>${l.phone} *<input name="phone" required placeholder="+82 / +90 ..."></label>
    <label>${l.website}<input name="website" placeholder="https://"></label>
    ${kakao}
    <label>${l.source}<select name="source"><option>Soy PS</option><option>Sunflower PS</option><option>Not sure yet</option></select></label>
    <label>${l.assay}<select name="assay"><option>PS 20%</option><option>PS 50%</option><option>To be confirmed</option></select></label>
    <label>${l.application}<input name="application" placeholder="${l.application}"></label>
    <label>${l.quantity}<input name="quantity" placeholder="25 kg / 100 kg / annual demand"></label>
    <label>${l.documents}<input name="documents" placeholder="COA, TDS, SDS, specification..."></label>
    <label class="wide">${l.message}<textarea name="message" rows="5" placeholder="${l.message}"></textarea></label>
    <label class="checkbox wide"><input type="checkbox" required name="privacy_agree" value="yes"> ${l.privacy}</label>
    <button class="button wide" type="submit">${l.submit}</button>
  </form>`;
}

function renderPage(site, page) {
  let body = hero(site, page);
  if (page.route === "/") {
    body += productCards(site);
    body += sectionsHtml(page.sections);
    body += `<section class="split"><div><h2>${esc(site.pages.quality.h1)}</h2><p>${esc(site.pages.quality.intro)}</p><a class="button secondary" href="/quality-control/">${esc(site.ctaDocs)}</a></div><img src="/assets/images/quality-document-review.webp" alt="${esc(site.pages.quality.h1)}" width="900" height="620"></section>`;
  } else if (page.route === "/products/") {
    body += productCards(site);
  } else if (page.specs) {
    body += specsTable(site);
  } else if (page.form) {
    body += `<section class="form-section"><div><h2>${esc(site.ctaQuote)}</h2><p>${esc(page.intro)}</p><p>${company.email}<br>${company.whatsapp}</p></div>${formHtml(site)}</section>`;
    body += sectionsHtml(page.sections);
  } else if (page.faq) {
    body += `<section class="content-section faq-list">${page.faq.map(([q, a]) => `<details open><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</section>`;
  } else if (page.blog) {
    body += `<section class="content-section"><ol class="blog-list">${page.blog.map((item) => `<li>${esc(item)}</li>`).join("")}</ol></section>`;
  } else {
    body += sectionsHtml(page.sections);
  }
  body += `<section class="cta-band"><h2>${esc(site.code === "ko" ? "PS 원료 검토를 시작하세요" : "PS hammadde değerlendirmenizi başlatın")}</h2><p>${esc(site.code === "ko" ? "필요한 사양, 샘플, COA, 포장 정보를 알려주시면 확인 후 회신합니다." : "İstenen spesifikasyon, numune, COA ve ambalaj bilgilerini paylaşın; ekip kontrol ederek dönüş yapacaktır.")}</p><a class="button" href="/contact/">${esc(site.ctaQuote)}</a></section>`;
  return layout(site, page, body);
}

async function copyAssets(outDir) {
  const target = path.join(outDir, "assets", "images");
  await fs.mkdir(target, { recursive: true });
  await Promise.all(imageFiles.map(async (name) => {
    await fs.copyFile(path.join(sharedAssets, name), path.join(target, name));
  }));
}

async function writeCss(outDir) {
  const css = `:root{--green:#0f6b42;--deep:#06281b;--gold:#c39024;--ink:#17231e;--muted:#5d6b64;--line:#d9e4de;--soft:#f4f8f5;--white:#fff}*{box-sizing:border-box}body{margin:0;font-family:Arial,'Noto Sans KR','Noto Sans',sans-serif;color:var(--ink);background:var(--white);line-height:1.65}.site-header{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:22px;padding:14px 6vw;background:rgba(255,255,255,.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}.brand img{display:block}.site-nav{display:flex;gap:18px;flex:1;align-items:center}.site-nav a,.site-footer a{color:var(--ink);text-decoration:none;font-weight:700}.site-nav a[aria-current=page]{color:var(--green)}.header-cta,.button,.footer-button{display:inline-flex;align-items:center;justify-content:center;border-radius:7px;background:var(--green);color:white;text-decoration:none;font-weight:800;padding:12px 18px;border:1px solid var(--green)}.button.secondary{background:white;color:var(--green);border-color:var(--line)}.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,560px);gap:44px;align-items:center;padding:72px 6vw;background:linear-gradient(110deg,#f7fbf8,#eef7f1)}.hero h1{font-size:clamp(34px,5vw,64px);line-height:1.08;margin:10px 0 18px}.hero p{font-size:18px;color:var(--muted);max-width:780px}.eyebrow{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:900}.hero-image,.split img,.card img{width:100%;height:auto;border-radius:8px;box-shadow:0 22px 60px rgba(0,0,0,.12);object-fit:cover}.button-row{display:flex;gap:14px;flex-wrap:wrap;margin:28px 0}.proof-strip{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid rgba(15,107,66,.22);border-radius:8px;overflow:hidden;max-width:640px}.proof-strip div{padding:18px;border-right:1px solid rgba(15,107,66,.16)}.proof-strip div:last-child{border-right:0}.proof-strip dt{font-size:28px;font-weight:900;color:var(--green)}.proof-strip dd{margin:0;color:var(--muted)}.content-section,.grid-section,.form-section,.split,.cta-band{padding:58px 6vw}.content-section{max-width:1050px}.content-section h2,.grid-section h2,.split h2,.form-section h2,.cta-band h2{font-size:clamp(26px,3vw,42px);line-height:1.18;margin:0 0 16px}.card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.card{border:1px solid var(--line);border-radius:8px;overflow:hidden;background:white}.card div{padding:22px}.card h3{font-size:23px;line-height:1.2;margin:0 0 12px}.card a{color:var(--green);font-weight:900;text-decoration:none}.split,.form-section{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,520px);gap:42px;align-items:center;background:var(--soft)}.cta-band{background:var(--deep);color:white}.cta-band p{color:#dbe8e1}.site-footer{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.2fr;gap:34px;background:#071f16;color:white;padding:52px 6vw}.site-footer h2{font-size:17px}.site-footer a,.site-footer p{display:block;color:#e9f3ee}.inquiry-form{display:grid;grid-template-columns:1fr 1fr;gap:14px;background:white;border:1px solid var(--line);border-radius:8px;padding:24px;box-shadow:0 24px 70px rgba(0,0,0,.1)}label{display:grid;gap:6px;font-weight:800}input,select,textarea{width:100%;border:1px solid #cfdcd5;border-radius:6px;padding:12px;font:inherit}.wide{grid-column:1/-1}.checkbox{display:flex;align-items:flex-start;gap:10px}.checkbox input{width:auto;margin-top:7px}.hidden-field{display:none}.table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;background:white}th,td{border:1px solid var(--line);padding:14px;text-align:left}th{background:var(--soft)}.faq-list details{border:1px solid var(--line);border-radius:8px;padding:18px;margin:12px 0}.faq-list summary{font-weight:900;cursor:pointer}.blog-list li{margin:12px 0;font-size:18px}@media(max-width:980px){.site-header{align-items:flex-start;flex-wrap:wrap}.site-nav{order:3;flex-basis:100%;overflow:auto;padding-bottom:4px}.hero,.split,.form-section,.site-footer{grid-template-columns:1fr}.card-grid{grid-template-columns:1fr}.proof-strip{grid-template-columns:1fr}.proof-strip div{border-right:0;border-bottom:1px solid rgba(15,107,66,.16)}.inquiry-form{grid-template-columns:1fr}.hero{padding-top:48px}}`;
  await fs.mkdir(path.join(outDir, "assets"), { recursive: true });
  await fs.writeFile(path.join(outDir, "assets", "site.css"), css);
}

async function writeSite(key) {
  const site = siteData[key];
  const outDir = path.join(marketRoot, key, "dist");
  await fs.rm(outDir, { recursive: true, force: true });
  await copyAssets(outDir);
  await writeCss(outDir);
  const pages = Object.values(site.pages);
  for (const page of pages) {
    const target = path.join(outDir, pagePath(page.route));
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, renderPage(site, page));
  }
  const urls = pages.map((page) => `  <url><loc>${canonical(site, page.route)}</loc></url>`).join("\n");
  await fs.writeFile(path.join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await fs.writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl(site).replace(/\/$/, "")}/sitemap.xml\n`);
  await fs.writeFile(path.join(marketRoot, key, ".env.example"), `${site.envExample}\nNEXT_PUBLIC_SITE_NAME=${site.name}\nNEXT_PUBLIC_CONTACT_EMAIL=${company.email}\nNEXT_PUBLIC_SALES_EMAIL=${company.email}\nNEXT_PUBLIC_WHATSAPP=${company.whatsapp}\nNEXT_PUBLIC_GA_ID=\nNEXT_PUBLIC_GTM_ID=\nNEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=\n${key === "kr-site" ? "NEXT_PUBLIC_NAVER_SITE_VERIFICATION=\nNEXT_PUBLIC_KAKAO_ID=\n" : ""}`);
  await fs.writeFile(path.join(marketRoot, key, "vercel.json"), JSON.stringify({ outputDirectory: "dist", buildCommand: "npm run build" }, null, 2));
  await fs.writeFile(path.join(marketRoot, key, "package.json"), JSON.stringify({ private: true, scripts: { build: `node ../../tools/build_market_sites.mjs ${key}`, dev: `node ../../tools/build_market_sites.mjs ${key}` } }, null, 2));
}

const requested = process.argv[2] ? [process.argv[2]] : Object.keys(siteData);
for (const key of requested) {
  if (!siteData[key]) throw new Error(`Unknown market site: ${key}`);
  await fs.mkdir(path.join(marketRoot, key), { recursive: true });
  await writeSite(key);
  console.log(`Built ${key}`);
}
