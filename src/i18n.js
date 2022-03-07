import i18n from "i18next";
import { initReactI18next   } from "react-i18next";
import en from './Lang/en.json'
import zh from './Lang/zh.json'
import detector  from 'i18next-browser-languagedetector';

const resources = {
    'en': {
        translation: en,
    },
    'zh': {
        translation: zh,
    },
};
i18n
  .use(detector)
  .use(initReactI18next ) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
// i18n
//     .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//         resources,
//         // lng: "en",

//         //keySeparator: false, // we do not use keys in form messages.welcome

//         interpolation: {
//             escapeValue: false // react already safes from xss
//         }
//     });

export default i18n;
