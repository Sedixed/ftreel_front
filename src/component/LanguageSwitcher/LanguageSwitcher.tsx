import { useTranslation } from 'react-i18next';
import frenchFlagPath from '@assets/languageSwitcher/france.png';
import englishFlagPath from '@assets/languageSwitcher/united-kingdom.png';

function LanguageSwitcher(){
  const { i18n } = useTranslation();

  return (
    <div>
      <img src={ frenchFlagPath } alt="French flag" onClick={() => i18n.changeLanguage("fr")} />
      <img src={ englishFlagPath } alt="English flag" onClick={() => i18n.changeLanguage("en")} />
    </div>
  );
};

export { LanguageSwitcher };