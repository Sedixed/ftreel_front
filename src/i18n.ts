import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      homeLogin: 'Login',
      homeAccess: 'Access files',
      loginLogin: 'Login',
      loginUsername: 'Username',
      loginPassword: 'Password',
    },
  },
  fr: {
    translation: {
      homeLogin: 'Connexion',
      homeAccess: 'Accéder',
      loginLogin: 'Se connecter',
      loginUsername: 'Nom d\'utilisateur',
      loginPassword: 'Mot de passe',
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
