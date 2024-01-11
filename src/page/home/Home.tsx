import SplashBackground from "@component/SplashBackground/SplashBackground";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { Box, Button, styled } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetLogginAdmin from "@hook/user/useGetLogginAdmin";

/**
 * Home component containing the home of the application.
 */
export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useGetLogginAdmin();

  const onAccessButtonClick = useCallback(() => {
    navigate(ApplicationRoute.FILES);
  }, [navigate]);

  const onLoginButtonClick = useCallback(() => {
    navigate(ApplicationRoute.AUTHENTICATION);
  }, [navigate]);

  const onLogoutButtonClick = useCallback(() => {
    navigate(ApplicationRoute.LOGOUT);
  }, [navigate]);

  const { t } = useTranslation();

  return (
    <HomeWrapper>
      <TitleContainer> 
        <ApplicationTitle>FTreel</ApplicationTitle>
        <ApplicationSubtitle>{t('homeSlogan')}</ApplicationSubtitle>
        <Box marginTop={5}>
          {
            !isLoggedIn &&
            <Button variant="contained" disabled onClick={onAccessButtonClick} style={{ zIndex: "1", width: "45%", marginRight: "5px" }}>
              {t('homeAccess')}
            </Button>
          }
          {
            isLoggedIn &&
            <Button variant="contained" onClick={onAccessButtonClick} style={{ zIndex: "1", width: "45%", marginRight: "5px" }}>
              {t('homeAccess')}
            </Button>
          }
          {
            !isLoggedIn &&
            <Button variant="outlined" onClick={onLoginButtonClick} style={{ zIndex: "1", width: "45%" }}>
              {t('homeLogin')}
            </Button>
          }
          {
            isLoggedIn &&
            <Button variant="outlined" onClick={onLogoutButtonClick} style={{ zIndex: "1", width: "45%" }}>
              {t('homeLogout')}
            </Button>
          }
        </Box>
      </TitleContainer>
      <SplashBackground src="https://picsum.photos/600" alt="Random test picture" />
    </HomeWrapper>
  );
}

const HomeWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  height: "100vh",
  background: theme.palette.background.default
}));

const TitleContainer = styled("div")(() => ({
  position: "absolute",
  top: "40%",
  left: "5%",
  zIndex: "1",
}));

const commonTitleStyle = {
  zIndex: "1",
  margin: "0",
  color: "black"
};

const ApplicationTitle = styled("h1")(() => ({
  fontSize: "3rem",
  ...commonTitleStyle,
}));

const ApplicationSubtitle = styled("h3")(() => ({
  fontSize: "2rem",
  fontWeight: "normal",
  ...commonTitleStyle
}));
