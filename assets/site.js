const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const uiMessages = window.NUTRANEXA_I18N || {
  required: "Please complete all required fields before submitting.",
  submitting: "Submitting...",
  sendError: "We could not send your inquiry. Please try again or contact us on WhatsApp.",
  retryError: "We could not send your inquiry. Please try again.",
  success: "Submitted successfully. Redirecting to the confirmation page...",
};

const pagePath = window.location.pathname || "/";
const pageLanguage = document.documentElement.lang || "en";
const analyticsValue = (value, fallback = "unspecified") => {
  const normalized = String(value || "").trim().slice(0, 80);
  return normalized || fallback;
};
const analyticsEnum = (value, allowed, fallback = "unspecified") => {
  const normalized = String(value || "").trim();
  return allowed.includes(normalized) ? normalized : fallback;
};
const analyticsProducts = ["Phosphatidylserine (PS)", "Soy Phosphatidylserine", "Sunflower Phosphatidylserine", "Soy Lecithin", "Soluble Soybean Polysaccharide"];
const analyticsRequestTypes = ["Qualification Pack", "Quote", "Sample", "Specification", "COA", "Technical Support", "Distributor Inquiry", "Other"];
const pushAnalytics = (event, details = {}) => {
  window.dataLayer = window.dataLayer || [];
  const safeDetails = Object.fromEntries(Object.entries({ page_path: pagePath, page_language: pageLanguage, ...details }).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  window.dataLayer.push({ event, ...safeDetails });
};

if (pagePath === "/company-verification/") {
  pushAnalytics("verification_view");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-analytics-event], a[href]");
  if (!target) return;
  const href = target.getAttribute("href") || "";
  const explicitEvent = target.getAttribute("data-analytics-event");
  const eventName = explicitEvent || (href.includes("request=qualification-pack") ? "qualification_pack_click" : href.startsWith("mailto:") ? "email_click" : href.includes("wa.me/") ? "whatsapp_click" : "");
  if (!eventName) return;
  const details = {};
    if (eventName === "qualification_pack_click") details.source_page = analyticsValue(target.getAttribute("data-source-page"));
    if (eventName === "verification_source_click") details.source_name = analyticsValue(target.getAttribute("data-source-name"));
  if (eventName === "document_preview") details.document_type = analyticsValue(target.getAttribute("data-document-type"));
  pushAnalytics(eventName, details);
});

document.querySelectorAll("video[data-analytics-event='factory_video_start']").forEach((video) => {
  let tracked = false;
  video.addEventListener("play", () => {
    if (tracked) return;
    tracked = true;
    pushAnalytics("factory_video_start");
  });
});

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const megaItems = [...document.querySelectorAll(".has-mega")];

const closeMegaMenus = (except) => {
  megaItems.forEach((item) => {
    if (item === except) return;
    item.classList.remove("is-open");
    item.querySelector(":scope > .nav-link")?.setAttribute("aria-expanded", "false");
  });
};

megaItems.forEach((item) => {
  const trigger = item.querySelector(":scope > .nav-link");
  if (!trigger) return;

  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {
    const needsTapToggle = window.matchMedia("(max-width: 1320px)").matches || window.matchMedia("(hover: none)").matches;
    if (!needsTapToggle || item.classList.contains("is-open")) return;

    event.preventDefault();
    closeMegaMenus(item);
    item.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".has-mega")) closeMegaMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMegaMenus();
    document.querySelectorAll(".language-switcher[open]").forEach((switcher) => switcher.removeAttribute("open"));
  }
});

document.addEventListener("click", (event) => {
  document.querySelectorAll(".language-switcher[open]").forEach((switcher) => {
    if (!switcher.contains(event.target)) switcher.removeAttribute("open");
  });
});

const inquiryParams = new URLSearchParams(window.location.search);
const inquiryPrefill = {
  product: inquiryParams.get("product"),
  source: inquiryParams.get("source"),
  assay: inquiryParams.get("assay"),
  documents: inquiryParams.get("documents"),
  sample: inquiryParams.get("sample"),
  application: inquiryParams.get("application"),
  request: inquiryParams.get("request"),
};

const setFormValue = (form, name, value) => {
  if (!value) return;
  const field = form.elements.namedItem(name);
  if (!field) return;
  if (field instanceof RadioNodeList) {
    const requested = value.split(",").map((item) => item.trim().toLowerCase());
    [...field].forEach((item) => {
      if (item.type === "checkbox" || item.type === "radio") item.checked = requested.includes(item.value.toLowerCase());
    });
    return;
  }

  if (field.tagName === "SELECT" && ![...field.options].some((option) => option.value === value)) {
    field.add(new Option(value, value));
  }
  field.value = value;
};

document.querySelectorAll(".quote-form").forEach((form) => {
  let formStartedTracked = false;
  let submitTracked = false;
  const trackFormStart = () => {
    if (formStartedTracked) return;
    formStartedTracked = true;
    pushAnalytics("qualification_form_start", {
      product: analyticsEnum(form.elements.namedItem("Product Interest")?.value, analyticsProducts),
      request_type: analyticsEnum(form.elements.namedItem("Request Type")?.value, analyticsRequestTypes),
      source_page: analyticsValue(pagePath),
    });
  };
  setFormValue(form, "Locale", document.documentElement.lang || "en");
  setFormValue(form, "Form Started", String(Date.now()));
  setFormValue(form, "Product Interest", inquiryPrefill.product);
  setFormValue(form, "Interest", inquiryPrefill.product);
  setFormValue(form, "Product Requirement", inquiryPrefill.product);
  setFormValue(form, "Source Preference", inquiryPrefill.source);
  setFormValue(form, "Target Assay", inquiryPrefill.assay);
  setFormValue(form, "Documents Needed", inquiryPrefill.documents);
  setFormValue(form, "Sample Needed", inquiryPrefill.sample);
  setFormValue(form, "Application", inquiryPrefill.application);
  setFormValue(form, "Request Type", inquiryPrefill.request === "qualification-pack" ? "Qualification Pack" : inquiryPrefill.request);

  const status = form.querySelector(".form-status");
  const submit = form.querySelector('button[type="submit"]');
  if (submit) submit.dataset.originalText = submit.textContent.trim();
  const validateField = (field) => {
    const label = field.closest("label");
    if (!label) return true;
    const valid = field.checkValidity();
    label.classList.toggle("is-invalid", !valid);
    return valid;
  };

  form.querySelectorAll("input, textarea, select").forEach((field) => {
    if (field.name === "_honey") return;
    field.addEventListener("focus", trackFormStart, { once: false });
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest("label")?.classList.contains("is-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value.trim()) {
      return;
    }

    const fields = [...form.querySelectorAll("input, textarea, select")].filter((field) => field.name !== "_honey");
    const isValid = fields.map(validateField).every(Boolean);
    if (!isValid) {
      pushAnalytics("qualification_form_error", {
        error_type: "validation",
        product: analyticsEnum(form.elements.namedItem("Product Interest")?.value, analyticsProducts),
        request_type: analyticsEnum(form.elements.namedItem("Request Type")?.value, analyticsRequestTypes),
        source_page: analyticsValue(pagePath),
      });
      if (status) {
        status.textContent = uiMessages.required;
        status.className = "form-status error";
      }
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = uiMessages.submitting;
    }

    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (key in data) data[key] = `${data[key]}, ${value}`;
      else data[key] = value;
    }
    const payload = {
      ...data,
      context: form.dataset.context || "General inquiry",
      submittedAt: new Date().toISOString(),
      name: data.Name || "Website visitor",
      email: data.Email || "",
      message: data.Message || "No additional message provided.",
      _subject: `[Nutranexa B2B Inquiry] ${data["Product Interest"] || data.Interest || data.Application || "PS ingredient request"} - ${data.Name || "Website visitor"}`,
      _template: "table",
      _captcha: "false",
      _url: window.location.href,
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== "true") {
        throw new Error(uiMessages.sendError);
      }

      if (!submitTracked) {
        submitTracked = true;
        pushAnalytics("qualification_form_submit", {
          product: analyticsEnum(form.elements.namedItem("Product Interest")?.value, analyticsProducts),
          document_type: data["Documents Needed"] ? "selected_documents" : "none_selected",
          request_type: analyticsEnum(data["Request Type"], analyticsRequestTypes),
          source_page: analyticsValue(pagePath),
        });
        // Preserve the existing funnel event for configured analytics users,
        // while keeping visitor-entered values out of the data layer.
        pushAnalytics("lead_form_submit", { form_type: "qualification" });
      }
    } catch (error) {
      pushAnalytics("qualification_form_error", {
        error_type: "delivery",
        product: analyticsEnum(form.elements.namedItem("Product Interest")?.value, analyticsProducts),
        request_type: analyticsEnum(form.elements.namedItem("Request Type")?.value, analyticsRequestTypes),
        source_page: analyticsValue(pagePath),
      });
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.originalText || "Submit Inquiry";
      }
      if (status) {
        status.textContent = error instanceof Error ? error.message : uiMessages.retryError;
        status.className = "form-status error";
      }
      return;
    }

    if (status) {
      status.textContent = uiMessages.success;
      status.className = "form-status success";
    }

    setTimeout(() => {
      const locale = document.documentElement.lang || "en";
      window.location.href = `/${locale}/thank-you/`;
    }, 900);
  });
});
