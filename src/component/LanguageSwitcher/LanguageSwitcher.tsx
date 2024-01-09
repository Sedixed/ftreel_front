import { useTranslation } from 'react-i18next';
import frenchFlagPath from '@assets/languageSwitcher/france.png';
import englishFlagPath from '@assets/languageSwitcher/united-kingdom.png';
import { Box } from '@mui/material';

function LanguageSwitcher(){
  const { i18n } = useTranslation();

  const styles = {
    display: "flex",
    flexDirection: "row",
    position: "fixed",
    top: "0",
    right: "0",
    margin: "10px",
    gap: "15px",
    zIndex: "1",   
    cursor: "pointer"
  };

  return (
    <Box sx={styles}>
      <img src={ frenchFlagPath } alt="French flag" onClick={() => i18n.changeLanguage("fr")} />
      <img src={ englishFlagPath } alt="English flag" onClick={() => i18n.changeLanguage("en")} />
    </Box>
  );
};

export { LanguageSwitcher };