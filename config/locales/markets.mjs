export const siteOrigin = "https://nutranexaps.com";

export const company = {
  name: "Nutranexa",
  email: "wh1007209170@gmail.com",
  phone: "400-138-0635",
  whatsapp: "+8613645700210",
  kakaoTalk: "wilsonps1",
  moq: "25 kg / 1 drum",
  address: "Yunhe West Road, Shizilou District, Yanggu County, Liaocheng City, Shandong Province, P.R. China",
};

export const marketRoutes = [
  "/",
  "/about/",
  "/contact/",
  "/quote/",
  "/sample-request/",
  "/quality-control/",
  "/technical-documents/",
  "/packaging-delivery/",
  "/faq/",
  "/blog/",
  "/products/",
  "/products/soy-phosphatidylserine/",
  "/products/sunflower-phosphatidylserine/",
  "/products/ps-specifications/",
  "/applications/",
  "/applications/dietary-supplements/",
  "/applications/functional-foods/",
  "/applications/oem-odm/",
];

export function localizedPath(locale, route = "/") {
  const normalized = route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
  return `/${locale}${normalized}`;
}

export const englishRouteMap = new Map([
  ["/", "/"],
  ["/about/", "/about/"],
  ["/contact/", "/contact/"],
  ["/quality-control/", "/quality-rd/"],
  ["/products/", "/products/"],
  ["/products/soy-phosphatidylserine/", "/products/soy-phosphatidylserine/"],
  ["/products/sunflower-phosphatidylserine/", "/products/sunflower-phosphatidylserine/"],
  ["/applications/", "/applications/"],
  ["/applications/dietary-supplements/", "/applications/dietary-supplements/"],
  ["/applications/functional-foods/", "/applications/functional-foods/"],
]);
