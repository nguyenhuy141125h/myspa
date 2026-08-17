const I18N_SUPPORTED_LANGUAGES = ["vi", "en"];
const I18N_DEFAULT_LANGUAGE = "vi";

function getTranslationByPath(object, path) {
  return path.split(".").reduce((current, key) => current?.[key], object);
}

function updateLanguageSelector(lang) {
  const currentLanguage = document.getElementById("currentLanguage");
  const mobileCurrentLanguage =
    document.getElementById("mobileCurrentLanguage");

  if (currentLanguage) {
    currentLanguage.textContent = lang.toUpperCase();
  }

  if (mobileCurrentLanguage) {
    mobileCurrentLanguage.textContent = lang.toUpperCase();
  }

  document.querySelectorAll("[data-lang]").forEach((item) => {
    item.classList.toggle(
      "selected",
      item.dataset.lang === lang
    );
  });
}

async function changeLanguage(lang) {
  if (!I18N_SUPPORTED_LANGUAGES.includes(lang)) {
    lang = I18N_DEFAULT_LANGUAGE;
  }

  try {
    const response = await fetch(
      `locales/${lang}.json`
    );

    const translations = await response.json();

    document
      .querySelectorAll("[data-i18n]")
      .forEach((element) => {

        const key = element.dataset.i18n;

        const value =
          getTranslationByPath(
            translations,
            key
          );

        if (value !== undefined) {
          element.textContent = value;
        }
      });

    document.documentElement.lang = lang;

    localStorage.setItem(
      "language",
      lang
    );

    updateLanguageSelector(lang);

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const savedLanguage =
      localStorage.getItem("language") || "vi";
    changeLanguage(savedLanguage);
  }
);