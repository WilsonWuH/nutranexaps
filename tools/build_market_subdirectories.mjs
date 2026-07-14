import fs from "node:fs/promises";
import path from "node:path";
import ko from "../content/ko/site.mjs";
import tr from "../content/tr/site.mjs";
import { company, englishRouteMap, localizedPath, siteOrigin } from "../config/locales/markets.mjs";

const root = process.cwd();
const sites = { ko, tr };

function esc(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function canonical(locale, route) {
  return `${siteOrigin}${localizedPath(locale, route)}`;
}

function pageFile(locale, route) {
  const parts = route.split("/").filter(Boolean);
  return path.join(root, locale, ...parts, "index.html");
}

function whatsappButton() {
  return `<a class="whatsapp-float" href="https://wa.me/${company.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener noreferrer" aria-label="Contact Nutranexa on WhatsApp"><span>WhatsApp</span><strong>${esc(company.whatsapp)}</strong></a>`;
}

function alternateLinks(page) {
  const links = ["ko", "tr"].map((locale) => `<link rel="alternate" hreflang="${locale}" href="${canonical(locale, page.route)}">`);
  const englishRoute = englishRouteMap.get(page.route);
  if (englishRoute) {
    links.unshift(`<link rel="alternate" hreflang="en" href="${siteOrigin}${englishRoute}">`);
    links.push(`<link rel="alternate" hreflang="x-default" href="${siteOrigin}${englishRoute}">`);
  }
  return links.join("\n  ");
}

function languageSwitcher(site, page) {
  const english = englishRouteMap.get(page.route) || "/";
  return `<details class="language-switcher"><summary aria-label="${esc(site.ui.language)}">${esc(site.language)}</summary><div class="language-menu"><a href="${english}" lang="en">English</a><a href="${localizedPath("ko", page.route)}" lang="ko"${site.locale === "ko" ? ' aria-current="page"' : ""}>한국어</a><a href="${localizedPath("tr", page.route)}" lang="tr"${site.locale === "tr" ? ' aria-current="page"' : ""}>Türkçe</a></div></details>`;
}

function schema(site, page) {
  const graph = [
    {
      "@type": "Organization", "@id": `${siteOrigin}/#organization`, name: company.name, url: siteOrigin,
      email: company.email, telephone: company.phone,
      logo: { "@type": "ImageObject", url: `${siteOrigin}/assets/images/logo-nutranexa.webp` },
      address: { "@type": "PostalAddress", streetAddress: company.address, addressCountry: "CN" },
    },
    {
      "@type": "WebPage", "@id": `${canonical(site.locale, page.route)}#webpage`, url: canonical(site.locale, page.route),
      name: page.title, description: page.description, inLanguage: site.locale,
      isPartOf: { "@type": "WebSite", "@id": `${siteOrigin}/#website`, name: "Nutranexa PS", url: siteOrigin },
      about: { "@id": `${siteOrigin}/#organization` },
    },
    {
      "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: site.ui.home, item: canonical(site.locale, "/") },
        ...(page.route === "/" ? [] : [{ "@type": "ListItem", position: 2, name: page.h1, item: canonical(site.locale, page.route) }]),
      ],
    },
  ];
  if (page.type === "product") {
    graph.push({ "@type": "Product", name: page.h1, description: page.description, category: "Phosphatidylserine ingredient", brand: { "@type": "Brand", name: company.name }, url: canonical(site.locale, page.route) });
  }
  if (page.type === "faq") {
    graph.push({ "@type": "FAQPage", mainEntity: page.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  }
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function navHtml(site, page) {
  const active = page.route.split("/").filter(Boolean)[0] || "home";
  return site.nav.map(([label, route]) => {
    const key = route.split("/").filter(Boolean)[0] || "home";
    return `<a href="${localizedPath(site.locale, route)}"${key === active ? ' aria-current="page"' : ""}>${esc(label)}</a>`;
  }).join("");
}

function header(site, page) {
  return `<a class="skip-link" href="#main">${esc(site.ui.skip)}</a><header class="site-header"><a class="brand" href="${localizedPath(site.locale, "/")}"><img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa" width="180" height="54"></a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="market-nav">${esc(site.ui.menu)}</button><nav id="market-nav" class="site-nav" aria-label="${esc(site.ui.menu)}">${navHtml(site, page)}</nav>${languageSwitcher(site, page)}<a class="button header-cta" href="${localizedPath(site.locale, "/quote/")}" data-event="quote_click">${esc(site.ui.quote)}</a></header>`;
}

function footer(site) {
  const productLinks = ["/products/soy-phosphatidylserine/", "/products/sunflower-phosphatidylserine/", "/products/ps-specifications/"];
  const applicationLinks = ["/applications/dietary-supplements/", "/applications/functional-foods/", "/applications/oem-odm/"];
  const labelFor = (route) => site.pages.find((page) => page.route === route)?.h1 || route;
  const links = (routes) => routes.map((route) => `<a href="${localizedPath(site.locale, route)}">${esc(labelFor(route))}</a>`).join("");
  const kakao = site.locale === "ko" ? `<button type="button" class="button kakao-copy" data-event="kakao_click" data-kakao-copy="${company.kakaoTalk}" aria-label="KakaoTalk ID ${company.kakaoTalk} 복사">KakaoTalk: ${company.kakaoTalk}</button>` : "";
  return `<footer class="site-footer"><div><img src="/assets/images/logo-nutranexa.webp" alt="Nutranexa" width="180" height="54"><p>${esc(site.ui.footer)}</p><p class="legal-note">${esc(site.ui.legal)}</p></div><div><h2>${esc(site.nav[1][0])}</h2>${links(productLinks)}</div><div><h2>${esc(site.nav[2][0])}</h2>${links(applicationLinks)}</div><div><h2>${esc(site.nav[7][0])}</h2><a href="mailto:${company.email}" data-event="email_click">${company.email}</a><a href="tel:${company.phone}" data-event="phone_click">${company.phone}</a><a href="https://wa.me/${company.whatsapp.replace(/\D/g, "")}" data-event="whatsapp_click">WhatsApp: ${company.whatsapp}</a>${kakao}</div></footer>`;
}

function hero(site, page) {
  const image = page.image || "quality-document-review.webp";
  return `<section class="hero"><div><p class="eyebrow">${esc(site.market)} · B2B Phosphatidylserine</p><h1>${esc(page.h1)}</h1><p class="lead">${esc(page.intro)}</p><div class="button-row"><a class="button" href="${localizedPath(site.locale, "/quote/")}" data-event="quote_click">${esc(site.ui.quote)}</a><a class="button secondary" href="${localizedPath(site.locale, "/sample-request/")}" data-event="sample_click">${esc(site.ui.sample)}</a></div></div><img src="/assets/images/${image}" alt="${esc(page.h1)}" width="1200" height="760"></section>`;
}

function sections(items = []) {
  return `<div class="section-stack">${items.map(([title, text]) => `<section class="content-section"><h2>${esc(title)}</h2><p>${esc(text)}</p></section>`).join("")}</div>`;
}

function cards(site, routes) {
  const images = { soy: "product-soy-ps.webp", sunflower: "product-sunflower-ps.webp", specs: "quality-document-review.webp", dietary: "dietary-supplement-application.webp", functional: "functional-food-application.webp", oem: "brand-product-lab.webp" };
  return `<section class="grid-section"><div class="card-grid">${routes.map(([route, imageKey]) => {
    const page = site.pages.find((item) => item.route === route);
    return `<article class="card"><img src="/assets/images/${images[imageKey]}" alt="${esc(page.h1)}" width="720" height="460"><div><h2>${esc(page.h1)}</h2><p>${esc(page.description)}</p><a href="${localizedPath(site.locale, route)}">${esc(site.ui.learnMore)}</a></div></article>`;
  }).join("")}</div></section>`;
}

const formText = {
  ko: {
    name: "이름", company: "회사명", country: "국가", email: "비즈니스 이메일", website: "회사 웹사이트", phone: "전화", whatsapp: "WhatsApp", kakao: "KakaoTalk",
    source: "PS 출처", assay: "PS 함량", application: "적용 분야", quantity: "예상 구매 수량", sample: "샘플 필요 여부", documents: "필요 문서", message: "문의 내용", privacy: "개인정보 처리 및 문의 회신에 동의합니다.", submit: "문의 보내기",
    select: "선택해 주세요", soy: "대두 유래", sunflower: "해바라기 유래", unsure: "미정", yes: "예", no: "아니요", coa: "COA", specification: "규격서", tds: "TDS", sds: "SDS", other: "기타",
  },
  tr: {
    name: "Ad soyad", company: "Şirket adı", country: "Ülke", email: "Kurumsal e-posta", website: "Şirket web sitesi", phone: "Telefon", whatsapp: "WhatsApp", kakao: "KakaoTalk",
    source: "PS kaynağı", assay: "PS oranı", application: "Uygulama", quantity: "Tahmini satın alma miktarı", sample: "Numune gerekli mi?", documents: "Gerekli belgeler", message: "Mesaj", privacy: "Kişisel verilerimin talebime yanıt verilmesi amacıyla işlenmesini kabul ediyorum.", submit: "Talebi Gönder",
    select: "Seçin", soy: "Soya kaynaklı", sunflower: "Ayçiçeği kaynaklı", unsure: "Henüz belli değil", yes: "Evet", no: "Hayır", coa: "COA", specification: "Spesifikasyon", tds: "TDS", sds: "SDS", other: "Diğer",
  },
};

function form(site, page) {
  const t = formText[site.locale];
  const kakao = site.locale === "ko" ? `<label>${t.kakao}<input name="KakaoTalk" autocomplete="off"></label>` : "";
  return `<section class="form-section"><div><h2>${esc(site.ui.formTitle)}</h2><p>${esc(site.ui.formIntro)}</p><p><a href="mailto:${company.email}" data-event="email_click">${company.email}</a><br><a href="https://wa.me/${company.whatsapp.replace(/\D/g, "")}" data-event="whatsapp_click">WhatsApp ${company.whatsapp}</a></p></div><form class="market-form" action="https://formsubmit.co/${company.email}" method="POST" data-locale="${site.locale}" data-kind="${page.formKind}" data-success="${esc(site.ui.success)}" data-error="${esc(site.ui.error)}" data-required="${esc(site.ui.required)}" data-submitting="${esc(site.ui.submitting)}"><input type="hidden" name="Language" value="${site.language}"><input type="hidden" name="Locale" value="${site.locale}"><input type="hidden" name="Source Page"><input type="hidden" name="Landing Page"><input type="hidden" name="Referrer"><input type="hidden" name="UTM Source"><input type="hidden" name="UTM Medium"><input type="hidden" name="UTM Campaign"><input type="text" class="honey" name="_honey" tabindex="-1" autocomplete="off"><label>${t.name} *<input name="Name" required autocomplete="name"></label><label>${t.email} *<input type="email" name="Email" required autocomplete="email"></label><label>${t.phone} *<input name="Phone" required autocomplete="tel" inputmode="tel" pattern="^\\+?[0-9\\s().-]{7,24}$"></label><label>${t.company}<input name="Company" autocomplete="organization"></label><label>${t.country}<input name="Country" autocomplete="country-name"></label><label>${t.source}<select name="Requested Product"><option value="">${t.select}</option><option value="Soy PS">${t.soy}</option><option value="Sunflower PS">${t.sunflower}</option><option value="To confirm">${t.unsure}</option></select></label><label class="wide">${t.message}<textarea name="Message" rows="5"></textarea></label><button class="button wide" type="submit">${t.submit}</button><p class="form-status wide" role="status" aria-live="polite"></p></form></section>`;
}

function pageBody(site, page) {
  let body = hero(site, page);
  if (page.type === "home") {
    body += cards(site, [["/products/soy-phosphatidylserine/","soy"],["/products/sunflower-phosphatidylserine/","sunflower"],["/products/ps-specifications/","specs"]]);
    body += sections(page.sections);
  } else if (page.type === "products") {
    body += cards(site, [["/products/soy-phosphatidylserine/","soy"],["/products/sunflower-phosphatidylserine/","sunflower"],["/products/ps-specifications/","specs"]]);
  } else if (page.type === "applications") {
    body += cards(site, [["/applications/dietary-supplements/","dietary"],["/applications/functional-foods/","functional"],["/applications/oem-odm/","oem"]]);
  } else if (page.type === "form") {
    body += form(site, page);
  } else if (page.type === "faq") {
    body += `<section class="faq-list">${page.faq.map(([q,a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</section>`;
  } else if (page.type === "blog") {
    body += `<section class="grid-section"><div class="card-grid article-grid">${page.articles.map(([title,text]) => `<article class="card text-card"><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></article>`).join("")}</div></section>`;
  } else {
    body += sections(page.sections);
  }
  if (page.type !== "form") {
    body += `<section class="cta-band"><h2>${esc(site.ui.formTitle)}</h2><p>${esc(site.ui.formIntro)}</p><div class="button-row"><a class="button light" href="${localizedPath(site.locale, "/quote/")}" data-event="quote_click">${esc(site.ui.quote)}</a><a class="button outline" href="${localizedPath(site.locale, "/contact/")}">${esc(site.ui.contact)}</a></div></section>`;
  }
  return body;
}

function render(site, page) {
  return `<!doctype html><html lang="${site.locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)}</title><meta name="description" content="${esc(page.description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical(site.locale, page.route)}">${alternateLinks(page)}<meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical(site.locale, page.route)}"><meta property="og:locale" content="${site.ogLocale}"><meta property="og:image" content="${siteOrigin}/assets/images/${page.image || "hero-ps-ingredients.webp"}"><link rel="icon" href="/assets/images/logo-nutranexa-icon.png"><link rel="stylesheet" href="/assets/market.css">${schema(site, page)}<!-- TODO: Add Naver Search Advisor verification meta after the client provides the token. --></head><body data-page-language="${site.locale}" data-page-locale="${site.locale}">${header(site, page)}<main id="main">${pageBody(site, page)}</main>${footer(site)}${whatsappButton()}<script src="/assets/market.js" defer></script></body></html>`;
}

async function writeSites() {
  for (const site of Object.values(sites)) {
    await fs.rm(path.join(root, site.locale), { recursive: true, force: true });
    for (const page of site.pages) {
      const target = pageFile(site.locale, page.route);
      await fs.mkdir(path.dirname(target), { recursive: true });
      const html = render(site, page)
        .replace(`action="https://formsubmit.co/${company.email}"`, 'action="/api/inquiry"')
        .replace('<input name="Estimated Quantity">', `<input name="Estimated Quantity" placeholder="${esc(company.moq)}">`)
        .replace('<meta name="robots"', '<meta name="naver-site-verification" content="c6d0c699471e32f496c25af5be8693ab4c4580e8"><meta name="robots"');
      await fs.writeFile(target, html, "utf8");
    }
  }
}

async function englishRoutes() {
  const dirs = ["about","applications","benefits","cases","contact","manufacturing","news","privacy","products","quality-rd","resources","thank-you"];
  const urls = ["/"];
  async function walk(directory, base) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      const relative = path.posix.join(base, entry.name);
      if (entry.isDirectory()) await walk(absolute, relative);
      else if (entry.name === "index.html") urls.push(`/${path.posix.dirname(relative).replace(/^\.$/, "")}/`.replace(/\/+/g, "/"));
    }
  }
  for (const dir of dirs) if (await fs.stat(path.join(root, dir)).then(() => true).catch(() => false)) await walk(path.join(root, dir), dir);
  return [...new Set(urls)].sort();
}

function sitemapUrlset(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

async function writeSitemaps() {
  const current = await fs.readFile(path.join(root, "sitemap.xml"), "utf8").catch(() => "");
  if (current.includes("<urlset")) await fs.writeFile(path.join(root, "sitemap-existing-locales.xml"), current, "utf8");
  const english = await englishRoutes();
  await fs.writeFile(path.join(root, "sitemap-en.xml"), sitemapUrlset(english.map((route) => `  <url><loc>${siteOrigin}${route}</loc></url>`)), "utf8");
  for (const site of Object.values(sites)) {
    const entries = site.pages.map((page) => {
      const alternates = ["ko","tr"].map((locale) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${canonical(locale, page.route)}"/>`);
      const en = englishRouteMap.get(page.route);
      if (en) alternates.unshift(`<xhtml:link rel="alternate" hreflang="en" href="${siteOrigin}${en}"/>`);
      if (en) alternates.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${siteOrigin}${en}"/>`);
      return `  <url><loc>${canonical(site.locale, page.route)}</loc>${alternates.join("")}</url>`;
    });
    await fs.writeFile(path.join(root, `sitemap-${site.locale}.xml`), sitemapUrlset(entries), "utf8");
  }
  const names = ["sitemap-en.xml", "sitemap-ko.xml", "sitemap-tr.xml", ...(current.includes("<urlset") ? ["sitemap-existing-locales.xml"] : [])];
  const index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${names.map((name) => `  <sitemap><loc>${siteOrigin}/${name}</loc></sitemap>`).join("\n")}\n</sitemapindex>\n`;
  await fs.writeFile(path.join(root, "sitemap.xml"), index, "utf8");
  await fs.writeFile(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\nSitemap: ${siteOrigin}/sitemap-ko.xml\nSitemap: ${siteOrigin}/sitemap-tr.xml\n`, "utf8");
}

await writeSites();
await writeSitemaps();
console.log(`Built ${ko.pages.length} Korean and ${tr.pages.length} Turkish subdirectory pages.`);
