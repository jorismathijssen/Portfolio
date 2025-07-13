import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import nl from '../public/locales/nl/translation.json';
import en from '../public/locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'nl',
    resources: {
      nl: { translation: nl },
      en: { translation: en }
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
