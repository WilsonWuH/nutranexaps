// Single source of truth for buyer-facing company and verification facts.
// Keep legal-name relationships neutral until the company approves a formal
// naming policy for contracts, certificates, and public web properties.
export const companyIdentity = {
  legalName: "Shandong Baianrui Biopharmaceutical Co., Ltd.",
  chineseName: "山东佰安瑞生物药业有限公司",
  publicName: "Nutranexa",
  foundingDate: "2013",
  campusArea: "110,000+ m²",
  productionLicense: "SC13137152113920",
  siteUrl: "https://nutranexaps.com",
  officialWebsite: "https://www.nutranexa.cn/en/",
  logoPath: "/assets/images/logo-nutranexa.webp",
  address: "Yunhe West Road, Shizilou District, Yanggu County, Liaocheng City, Shandong Province, P.R. China",
  phone: "400-138-0635",
  whatsapp: "+8613645700210",
  lastReviewed: "2026-09-03",
};

export const companySources = [
  {
    name: "Official Nutranexa website",
    url: companyIdentity.officialWebsite,
    supports: "Public-facing company and product information.",
  },
  {
    name: "CFAA company profile",
    url: "https://www.cfaa.cn/lxweb/queryCompanyAllDetail.action?companyInfo.id=9908",
    supports: "A third-party company profile referencing the Chinese company name and related business information.",
  },
  {
    name: "CPHI company profile",
    url: "https://www.cphi-online.com/company/shandong-nutranexa-biopharmaceutical-co-ltd/",
    supports: "A third-party exhibitor/company profile using an English Nutranexa company name.",
  },
];

export const companyPatents = [
  {
    number: "CN217817741U",
    url: "https://patents.google.com/patent/CN217817741U/zh",
    supports: "Patent record and named rights-holder information.",
  },
  {
    number: "CN212820171U",
    url: "https://patents.google.com/patent/CN212820171U/zh",
    supports: "Patent record and named rights-holder information.",
  },
];

export const companyEvidence = {
  identity: [
    ["English company name", companyIdentity.legalName],
    ["Chinese company name", companyIdentity.chineseName],
    ["Public-facing name used on this website", companyIdentity.publicName],
    ["Founded", companyIdentity.foundingDate],
  ],
  production: [
    ["Production licence reference", companyIdentity.productionLicense],
    ["Campus area stated in company materials", companyIdentity.campusArea],
  ],
};

export const companySameAs = [
  companyIdentity.officialWebsite,
  ...companySources.slice(1).map((source) => source.url),
  ...companyPatents.map((patent) => patent.url),
];
