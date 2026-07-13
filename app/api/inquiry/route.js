const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function clean(value, limit = 5000) {
  return String(value ?? "").trim().slice(0, limit);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function clientIp(request) {
  return clean(request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown", 100);
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request) {
  if (rateLimited(clientIp(request))) return Response.json({ success: false, error: "rate_limited" }, { status: 429 });
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "invalid_json" }, { status: 400 });
  }
  if (clean(body._honey, 200)) return Response.json({ success: true });

  const locale = clean(body.Locale, 5);
  const name = clean(body.Name, 200);
  const company = clean(body.Company, 300);
  const country = clean(body.Country, 120);
  const email = clean(body.Email, 254);
  const consent = clean(body["Privacy Consent"], 10);
  if (!name || !company || !country || consent !== "Yes" || !validEmail(email) || !["ko", "tr"].includes(locale)) {
    return Response.json({ success: false, error: "validation_failed" }, { status: 400 });
  }

  const payload = {};
  for (const [key, value] of Object.entries(body)) {
    if (key === "_honey") continue;
    payload[clean(key, 100)] = Array.isArray(value) ? value.map((item) => clean(item, 300)).join(", ") : clean(value);
  }
  payload["Submitted Time"] = new Date().toISOString();
  payload._subject = locale === "ko" ? `[Nutranexa KO] ${clean(body["Inquiry Kind"], 30)} 문의` : `[Nutranexa TR] ${clean(body["Inquiry Kind"], 30)} talebi`;
  payload._template = "table";
  payload._captcha = "false";

  try {
    const upstream = await fetch("https://formsubmit.co/ajax/wh1007209170@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await upstream.json().catch(() => ({}));
    if (!upstream.ok || String(result.success) !== "true") return Response.json({ success: false, error: "delivery_failed" }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "delivery_failed" }, { status: 502 });
  }
}
