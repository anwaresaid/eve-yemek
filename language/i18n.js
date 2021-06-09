import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, tr, ru, ar } from './locales';

const { NODE_ENV } = process.env;

i18n.use(LanguageDetector).init({
  resources: {
    en,
    tr,
    ru,
    ar
  },
  fallbackLng: 'en',
  debug: false,

  // have a common namespace used around the full app
  ns: 'translations',
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
