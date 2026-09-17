const r = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=hello%20world");
const payload = await r.json();
console.log("STATUS", r.status, "TRANSLATION", payload[0][0][0]);
