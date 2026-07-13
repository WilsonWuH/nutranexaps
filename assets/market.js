const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#market-nav");
navToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  nav.parentElement.style.flexWrap = "wrap";
  nav.style.flex = "0 0 100%";
  nav.style.width = "100%";
  nav.style.minWidth = "0";
  navToggle.setAttribute("aria-expanded", String(open));
});

window.dataLayer = window.dataLayer || [];
const pageLanguage = document.body.dataset.pageLanguage || document.documentElement.lang;
const pageLocale = document.body.dataset.pageLocale || pageLanguage;
window.dataLayer.push({ event: "page_language", page_language: pageLanguage, page_locale: pageLocale });
if (/^\/(ko|tr)\/products\/(soy|sunflower)/.test(location.pathname)) {
  window.dataLayer.push({ event: "product_view", page_language: pageLanguage, product_name: document.querySelector("h1")?.textContent });
}

document.querySelectorAll("[data-event]").forEach((element) => element.addEventListener("click", () => {
  window.dataLayer.push({ event: element.dataset.event, page_language: pageLanguage });
}));
document.querySelectorAll("[data-kakao-copy]").forEach((button) => button.addEventListener("click", async () => {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(button.dataset.kakaoCopy);
    button.textContent = `${button.dataset.kakaoCopy} 복사됨`;
  } catch {
    button.textContent = `KakaoTalk: ${button.dataset.kakaoCopy}`;
  }
  window.setTimeout(() => { button.textContent = original; }, 1800);
}));
document.querySelectorAll('a[href$=".pdf"],a[href$=".docx"]').forEach((element) => element.addEventListener("click", () => {
  window.dataLayer.push({ event: "document_download", page_language: pageLanguage, document_url: element.href });
}));

const params = new URLSearchParams(location.search);
const landing = sessionStorage.getItem("nutranexa_landing") || location.href;
sessionStorage.setItem("nutranexa_landing", landing);

document.querySelectorAll(".market-form").forEach((form) => {
  const set = (name, value) => {
    const field = form.elements.namedItem(name);
    if (field) field.value = value || "";
  };
  set("Source Page", location.href);
  set("Landing Page", landing);
  set("Referrer", document.referrer);
  set("UTM Source", params.get("utm_source"));
  set("UTM Medium", params.get("utm_medium"));
  set("UTM Campaign", params.get("utm_campaign"));
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.elements.namedItem("_honey")?.value) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = form.dataset.required;
      status.className = "form-status error wide";
      return;
    }
    const last = Number(localStorage.getItem("nutranexa_last_submit") || 0);
    if (Date.now() - last < 30000) {
      status.textContent = form.dataset.error;
      status.className = "form-status error wide";
      return;
    }

    const original = button.textContent;
    button.disabled = true;
    button.textContent = form.dataset.submitting;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data["Documents Required"] = formData.getAll("Documents Required");
    data["Inquiry Kind"] = form.dataset.kind;
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) throw new Error("submit failed");
      localStorage.setItem("nutranexa_last_submit", String(Date.now()));
      const eventName = form.dataset.kind === "quote" ? "quote_form_submit" : form.dataset.kind === "sample" ? "sample_form_submit" : "contact_form_success";
      window.dataLayer.push({ event: eventName, page_language: pageLanguage, requested_product: data["Requested Product"], requested_assay: data["Requested Assay"] });
      if (data["Documents Required"].includes("COA")) window.dataLayer.push({ event: "coa_request", page_language: pageLanguage });
      if (data["Documents Required"].includes("Specification")) window.dataLayer.push({ event: "specification_request", page_language: pageLanguage });
      const intent = `${data.Application || ""} ${data.Message || ""}`.toLowerCase();
      if (intent.includes("distrib")) window.dataLayer.push({ event: "distributor_inquiry", page_language: pageLanguage });
      if (intent.includes("oem") || intent.includes("odm")) window.dataLayer.push({ event: "oem_odm_inquiry", page_language: pageLanguage });
      status.textContent = form.dataset.success;
      status.className = "form-status success wide";
      form.reset();
    } catch {
      status.textContent = form.dataset.error;
      status.className = "form-status error wide";
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  });
});
