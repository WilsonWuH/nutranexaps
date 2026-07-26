const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MIN_FORM_TIME_MS = 2000;
const MAX_FORM_TIME_MS = 24 * 60 * 60 * 1000;

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

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return request.json();
  const form = await request.formData();
  const body = {};
  for (const [key, value] of form.entries()) {
    if (key in body) body[key] = `${body[key]}, ${value}`;
    else body[key] = value;
  }
  return body;
}

export async function POST(request) {
  if (rateLimited(clientIp(request))) {
    return Response.json({ success: false, error: "rate_limited" }, { status: 429 });
  }

  let body;
  try {
    body = await readBody(request);
  } catch {
    return Response.json({ success: false, error: "invalid_request" }, { status: 400 });
  }

  if (clean(body._honey, 200)) return Response.json({ success: true });

  const now = Date.now();
  const started = Number(clean(body["Form Started"], 30));
  const elapsed = Number.isFinite(started) ? now - started : NaN;
  if (!Number.isFinite(elapsed) || elapsed < MIN_FORM_TIME_MS || elapsed > MAX_FORM_TIME_MS) {
    return Response.json({ success: false, error: "spam_check_failed" }, { status: 400 });
  }

  const name = clean(body.Name, 200);
  const email = clean(body.Email, 254);
  const company = clean(body.Company, 200);
  const country = clean(body.Country, 120);
  const consent = clean(body.Consent, 20);
  if (!name || !validEmail(email) || !company || !country || consent !== "Yes") {
    return Response.json({ success: false, error: "validation_failed" }, { status: 400 });
  }

  const payload = {};
  for (const [key, value] of Object.entries(body)) {
    if (key === "_honey" || key === "Form Started") continue;
    payload[clean(key, 100)] = Array.isArray(value) ? value.map((item) => clean(item, 300)).join(", ") : clean(value);
  }
  payload["Submitted Time"] = new Date().toISOString();
  payload._subject = `[Nutranexa B2B Inquiry] ${clean(body["Product Interest"], 80) || clean(body.Application, 80) || "PS ingredient request"} - ${name}`;
  payload._template = "table";
  payload._captcha = "false";

  try {
    const upstream = await fetch("https://formsubmit.co/ajax/wh1007209170@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await upstream.json().catch(() => ({}));
    if (!upstream.ok || String(result.success) !== "true") {
      return Response.json({ success: false, error: "delivery_failed" }, { status: 502 });
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "delivery_failed" }, { status: 502 });
  }
}
