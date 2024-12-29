import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import json translations
import en from "./translations/en.json";
import da from "./translations/da.json";
import { URLHelper } from "./helper/URL";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: en
	},
	da: {
		translation: da
	}
};

// Get default language from browser
const browserLanguage = navigator.language || navigator.userLanguage;

const possibleLanguages = ["en", "da"];

let defaultLanguage = possibleLanguages.includes(browserLanguage) ? browserLanguage : "en";

const forceLanguage = URLHelper.getParameter("lang");

if (forceLanguage && possibleLanguages.includes(forceLanguage)) {
	console.info("Forcing language to", forceLanguage);
	defaultLanguage = forceLanguage;
}

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: defaultLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;