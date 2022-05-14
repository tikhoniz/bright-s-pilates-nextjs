import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
//
import ruLocales from "./ru.json";
import enLocales from "./en.json";
import deLocales from "./de.json";
import frLocales from "./fr.json";

// ----------------------------------------------------------------------

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ru: { translations: ruLocales },
			en: { translations: enLocales },
			de: { translations: deLocales },
			fr: { translations: frLocales },
		},
		//lng: localStorage.getItem("i18nextLng") || "ru",

		lng: "ru",

		fallbackLng: "ru",
		debug: false,
		ns: ["translations"],
		defaultNS: "translations",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
