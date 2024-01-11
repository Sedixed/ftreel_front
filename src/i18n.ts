import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      homeLogin: 'Login',
      homeLogout: 'Logout',
      homeRegister: 'Register',
      homeAccess: 'Access files',
      homeSlogan: 'One click, one tree saved.',
      loginLogin: 'Login',
      registerRegister: 'Register',
      loginUsername: 'Username',
      loginPassword: 'Password',
      filesFiles: 'Files',
      sidebarHome: 'Home',
      sidebarFiles: 'Files',
      sidebarFollowed: 'Followed',
      sidebarLogout : 'Logout',
    },
  },
  fr: {
    translation: {
      homeLogin: 'Connexion',
      homeLogout: 'Déconnexion',
      homeRegister: 'Inscription',
      homeAccess: 'Accéder',
      homeSlogan: 'Un clic, un arbre préservé.',
      loginLogin: 'Se connecter',
      registerRegister: 'S\'inscire',
      loginUsername: 'Nom d\'utilisateur',
      loginPassword: 'Mot de passe',
      filesFiles: 'Fichiers',
      sidebarHome: 'Accueil',
      sidebarFiles: 'Fichiers',
      sidebarFollowed: 'Suivis',
      sidebarLogout: 'Déconnexion'
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
