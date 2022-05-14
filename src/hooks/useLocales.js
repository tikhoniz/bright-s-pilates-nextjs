import { useTranslation } from "react-i18next";
// material
import { ruRU, enUS, deDE, frFR } from "@mui/material/locale";
import determineLanguage from "../helpers/languageBrowser";

// ----------------------------------------------------------------------

const LANGS = [
	{
		label: "Russian",
		value: "ru",
		systemValue: ruRU,
		icon: "/static/icons/ic_flag_en.svg",
	},
	{
		label: "English",
		value: "en",
		systemValue: enUS,
		icon: "/static/icons/ic_flag_en.svg",
	},
	{
		label: "German",
		value: "de",
		systemValue: deDE,

		icon: "/static/icons/ic_flag_de.svg",
	},
	{
		label: "French",
		value: "fr",
		systemValue: frFR,
		icon: "/static/icons/ic_flag_fr.svg",
	},
];

export default function useLocales() {
	const { i18n, t: translate } = useTranslation();
	// определяет язык броузера
	const language = typeof window !== "undefined" && determineLanguage();

	const currentLang =
		LANGS.find((_lang) => _lang.value === language) || LANGS[0];

	const handleChangeLanguage = (newlang) => {
		i18n.changeLanguage(newlang);
	};

	return {
		onChangeLang: handleChangeLanguage,
		translate,
		currentLang,
		allLang: LANGS,
	};
}
