import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      homeLogin: 'Login',
    },
  },
  fr: {
    translation: {
      homeLogin: 'Connexion',
    },
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
