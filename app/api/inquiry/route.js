export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_RECIPIENT = "wh1007209170@gmail.com";
const MAX_FIELD_LENGTH = 4000;

function clean(value) {
  return String(value ?? "").trim().slice(0, MAX_FIELD_LENGTH);
}

async function readPayload(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return request.json();

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

function getValue(payload, ...names) {
  for (const name of names) {
    const value = clean(payload[name]);
    if (value) return value;
  }
  return "";
}

function response(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  try {
    const payload = await readPayload(request);

    // Honeypot submissions receive a neutral response without sending email.
    if (clean(payload.website)) return response({ ok: true });

    const name = getValue(payload, "Name", "name");
    const email = getValue(payload, "Email", "email");
    const phone = getValue(payload, "Phone", "phone");
    const message = getValue(payload, "Message", "message");

    if (!name || !email) {
      return response({ ok: false, error: "Please enter your name and email address." }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response({ ok: false, error: "Please enter a valid email address." }, 400);
    }

    if (phone && !/^\+?[0-9\s().-]{7,24}$/.test(phone)) {
      return response({ ok: false, error: "Please enter a valid phone number." }, 400);
    }

    const product = getValue(payload, "Interest", "Product Interest", "Product Requirement") || "General ingredient inquiry";
    const context = getValue(payload, "context") || "Website inquiry";
    const submittedAt = getValue(payload, "submittedAt") || new Date().toISOString();
    const recipient = process.env.INQUIRY_TO_EMAIL || DEFAULT_RECIPIENT;
    const submission = Object.fromEntries(
      Object.entries(payload)
        .filter(([key, value]) => key !== "website" && clean(value))
        .map(([key, value]) => [key, clean(value)]),
    );
    Object.assign(submission, {
      name,
      email,
      phone,
      message: message || "No additional message provided.",
      "Inquiry Context": context,
      "Submitted At": submittedAt,
      _subject: `[Nutranexa Inquiry] ${product} - ${name}`,
      _template: "table",
      _captcha: "false",
      _url: "https://nutranexaps.com/contact/",
    });

    const delivery = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submission),
      cache: "no-store",
    });
    const deliveryResult = await delivery.json().catch(() => ({}));

    if (!delivery.ok || deliveryResult.success === false) {
      console.error("Inquiry email delivery failed:", delivery.status);
      return response({ ok: false, error: "We could not send your inquiry. Please email us directly or contact us on WhatsApp." }, 502);
    }

    return response({ ok: true });
  } catch (error) {
    console.error("Inquiry request failed:", error instanceof Error ? error.message : "Unknown error");
    return response({ ok: false, error: "We could not send your inquiry. Please try again or contact us directly." }, 500);
  }
}
