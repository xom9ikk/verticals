// @ts-ignore
import isLokiRunning from '@loki/is-loki-running';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    saveMissing: false, // send not translated keys to endpoint
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: !isLokiRunning,
    },
  });

export default i18n;
