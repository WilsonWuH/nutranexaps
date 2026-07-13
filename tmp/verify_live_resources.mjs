const urls = [
'https://nutranexaps.com/en/resources/',
'https://nutranexaps.com/en/resources/phosphatidylserine-lot-traceability-checklist/',
'https://nutranexaps.com/en/resources/phosphatidylserine-supplier-coa-qualification-us/'
];
for (const url of urls) {
  const res = await fetch(url);
  const html = await res.text();
  console.log(res.status, url, 'resourceImages=' + (html.match(/resource-[^"']+\.webp/g)||[]).length, 'FAQ=' + html.includes('FAQPage'), 'H1=' + (html.match(/<h1[\s>]/g)||[]).length, 'hasNewArticle=' + html.includes('phosphatidylserine-lot-traceability-checklist'));
}
