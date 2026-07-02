const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

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
  if (event.key === "Escape") closeMegaMenus();
});

const inquiryParams = new URLSearchParams(window.location.search);
const inquiryPrefill = {
  product: inquiryParams.get("product"),
  source: inquiryParams.get("source"),
  assay: inquiryParams.get("assay"),
  documents: inquiryParams.get("documents"),
  sample: inquiryParams.get("sample"),
};

const setFormValue = (form, name, value) => {
  if (!value) return;
  const field = form.elements.namedItem(name);
  if (!field || field instanceof RadioNodeList) return;

  if (field.tagName === "SELECT" && ![...field.options].some((option) => option.value === value)) {
    field.add(new Option(value, value));
  }
  field.value = value;
};

document.querySelectorAll(".quote-form").forEach((form) => {
  setFormValue(form, "Product Interest", inquiryPrefill.product);
  setFormValue(form, "Interest", inquiryPrefill.product);
  setFormValue(form, "Product Requirement", inquiryPrefill.product);
  setFormValue(form, "Source Preference", inquiryPrefill.source);
  setFormValue(form, "Target Assay", inquiryPrefill.assay);
  setFormValue(form, "Documents Needed", inquiryPrefill.documents);
  setFormValue(form, "Sample Needed", inquiryPrefill.sample);

  const status = form.querySelector(".form-status");
  const submit = form.querySelector('button[type="submit"]');
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
        status.textContent = "Please complete all required fields before submitting.";
        status.className = "form-status error";
      }
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Submitting...";
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      context: form.dataset.context || "General inquiry",
      submittedAt: new Date().toISOString(),
      name: data.Name || "Website visitor",
      email: data.Email || "",
      phone: data.Phone || "",
      message: data.Message || "No additional message provided.",
      _subject: `[Nutranexa Inquiry] ${data.Interest || data["Product Interest"] || data["Product Requirement"] || "General inquiry"} - ${data.Name || "Website visitor"}`,
      _template: "table",
      _captcha: "false",
      _url: "https://nutranexaps.com/contact/",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/wh1007209170@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== "true") {
        throw new Error("We could not send your inquiry. Please email us directly or contact us on WhatsApp.");
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submit", product_interest: payload.Interest || payload["Product Interest"] || payload.context });
    } catch (error) {
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Submit Inquiry";
      }
      if (status) {
        status.textContent = error instanceof Error ? error.message : "We could not send your inquiry. Please try again.";
        status.className = "form-status error";
      }
      return;
    }

    if (status) {
      status.textContent = "Submitted successfully. Redirecting to the confirmation page...";
      status.className = "form-status success";
    }

    setTimeout(() => {
      window.location.href = "/thank-you/";
    }, 900);
  });
});
