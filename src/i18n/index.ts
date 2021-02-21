import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'en',
    saveMissing: false, // send not translated keys to endpoint
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
