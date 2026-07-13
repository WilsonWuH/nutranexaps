const fs = require('fs');
for (const file of ['apps/kr-site/dist/index.html','apps/tr-site/dist/index.html']) {
  const html = fs.readFileSync(file,'utf8');
  const hangul = (html.match(/[\uAC00-\uD7AF]/g)||[]).length;
  const turkish = (html.match(/[ğĞüÜşŞıİöÖçÇ]/g)||[]).length;
  const replacement = (html.match(/�/g)||[]).length;
  console.log(file, { hangul, turkish, replacement, hasNutranexaCom: html.includes('nutranexaps.com') });
}
