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
      filesValidation: 'Not validated files',
      sidebarHome: 'Home',
      sidebarFiles: 'Files',
      sidebarValidation: 'Validation',
      sidebarFollowed: 'Followed',
      sidebarLogout : 'Logout',
      downloadLabel: "Download",
      detailsLabel: "Information",
      followLabel: "Follow",
      unfollowLabel: "Unfollow",
      updateFileLabel: "Update",
      deleteFileLabel: "Delete",
      detailAuthor: "Author",
      detailDescription: "Description",
      detailExtension: "Type",
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
      filesValidation: 'Fichiers non validés',
      sidebarHome: 'Accueil',
      sidebarFiles: 'Fichiers',
      sidebarValidation: 'Validation',
      sidebarFollowed: 'Suivis',
      sidebarLogout: 'Déconnexion',
      downloadLabel: "Télécharger",
      detailsLabel: "Détails",
      followLabel: "Suivre",
      unfollowLabel: "Ne plus suivre",
      updateFileLabel: "Modifier",
      deleteFileLabel: "Supprimer",
      detailAuthor: "Auteur",
      detailDescription: "Description",
      detailExtension: "Type",
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
