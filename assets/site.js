const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const uiMessages = window.NUTRANEXA_I18N || {
  required: "Please complete all required fields before submitting.",
  submitting: "Submitting...",
  sendError: "We could not send your inquiry. Please try again or contact us on WhatsApp.",
  retryError: "We could not send your inquiry. Please try again.",
  success: "Submitted successfully. Redirecting to the confirmation page...",
};

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
    const needsTapToggle = window.matchMedia("(hover: none) and (min-width: 861px)").matches;
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
      const response = await fetch("https://formsubmit.co/ajax/wh1007209170@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== "true") {
        throw new Error(uiMessages.sendError);
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submit", product_interest: payload.Interest || payload["Product Interest"] || payload.context });
    } catch (error) {
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
