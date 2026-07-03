export const defaultLocale = "en";

export const locales = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr", googleCode: "en", deeplCode: "EN", ogLocale: "en_US", switcherLabel: "Choose language" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr", googleCode: "es", deeplCode: "ES", ogLocale: "es_ES", switcherLabel: "Elegir idioma" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr", googleCode: "ru", deeplCode: "RU", ogLocale: "ru_RU", switcherLabel: "Выбрать язык" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl", googleCode: "ar", deeplCode: "AR", ogLocale: "ar_AR", switcherLabel: "اختر اللغة" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr", googleCode: "fr", deeplCode: "FR", ogLocale: "fr_FR", switcherLabel: "Choisir la langue" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português", dir: "ltr", googleCode: "pt", deeplCode: "PT-BR", ogLocale: "pt_BR", switcherLabel: "Escolher idioma" },
];

export const runtimeMessages = {
  en: { required: "Please complete all required fields before submitting.", submitting: "Submitting...", sendError: "We could not send your inquiry. Please email us directly or contact us on WhatsApp.", retryError: "We could not send your inquiry. Please try again.", success: "Submitted successfully. Redirecting to the confirmation page..." },
  es: { required: "Complete todos los campos obligatorios antes de enviar.", submitting: "Enviando...", sendError: "No pudimos enviar su consulta. Escríbanos directamente por correo electrónico o WhatsApp.", retryError: "No pudimos enviar su consulta. Inténtelo de nuevo.", success: "Enviado correctamente. Redirigiendo a la página de confirmación..." },
  ru: { required: "Перед отправкой заполните все обязательные поля.", submitting: "Отправка...", sendError: "Не удалось отправить запрос. Напишите нам по электронной почте или в WhatsApp.", retryError: "Не удалось отправить запрос. Повторите попытку.", success: "Запрос успешно отправлен. Переход на страницу подтверждения..." },
  ar: { required: "يرجى إكمال جميع الحقول المطلوبة قبل الإرسال.", submitting: "جارٍ الإرسال...", sendError: "تعذر إرسال استفسارك. يرجى مراسلتنا عبر البريد الإلكتروني أو WhatsApp.", retryError: "تعذر إرسال استفسارك. يرجى المحاولة مرة أخرى.", success: "تم إرسال الاستفسار بنجاح. جارٍ الانتقال إلى صفحة التأكيد..." },
  fr: { required: "Veuillez remplir tous les champs obligatoires avant l'envoi.", submitting: "Envoi en cours...", sendError: "Votre demande n'a pas pu être envoyée. Contactez-nous directement par e-mail ou WhatsApp.", retryError: "Votre demande n'a pas pu être envoyée. Veuillez réessayer.", success: "Demande envoyée. Redirection vers la page de confirmation..." },
  pt: { required: "Preencha todos os campos obrigatórios antes de enviar.", submitting: "Enviando...", sendError: "Não foi possível enviar sua consulta. Fale conosco diretamente por e-mail ou WhatsApp.", retryError: "Não foi possível enviar sua consulta. Tente novamente.", success: "Consulta enviada com sucesso. Redirecionando para a página de confirmação..." },
};

export const protectedTerms = [
  "Nutranexa",
  "Baianrui",
  "Shushi PS",
  "Phosphatidylserine",
  "PS",
  "Soy PS",
  "Sunflower PS",
  "Soluble Soybean Polysaccharide",
  "COA",
  "TDS",
  "SDS",
  "Halal",
  "Kosher",
  "FDA",
  "CNAS",
  "Eurofins",
  "PP201",
  "PP501",
  "QB/T 5821-2023",
  "Nutranexaps.com",
];

export function localeConfig(code) {
  return locales.find((locale) => locale.code === code);
}

export function localePath(locale, route) {
  const normalized = route === "/" ? "/" : `/${route.replace(/^\/+|\/+$/g, "")}/`;
  return `/${locale}${normalized}`;
}
