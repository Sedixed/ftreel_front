import APIEndpoint from "@api/endpoint/APIEndpoint";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import FormContainer from "@component/FormContainer/FormContainer";
import SplashBackground from "@component/SplashBackground/SplashBackground";
import useApiMutation from "@hook/api/useApiMutation";
import { TextField, Button, CircularProgress } from "@mui/material";
import { SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import AuthenticationRequestDTO from '../../api/dto/request/authentication/AuthenticationRequestDTO';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import RegistrationRequestDTO from "@api/dto/request/authentication/RegistrationRequestDTO";
import useSnackbar from "@hook/snackbar/useSnackbar";

export default function Authentication() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const { mutate, data, isLoading} =
    useApiMutation(formMode === 'login' ? APIEndpoint.LOGIN : APIEndpoint.REGISTER, null, false);
  const { t } = useTranslation();

  // Setup the error snackbar
  const { snackbar: errorSnackbar, show: showError } = useSnackbar(
    t("getRequestError"),
    "warning",
    { horizontal: 'right', vertical: 'bottom' },
    3000
  );

  const sendRequest = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
 
    // Get form values
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    const roles = ["ROLE_USER"];

    // Email syntax validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError();
      return;
    }
 
    // Call API
    mutate(formMode === 'login' ? 
      new AuthenticationRequestDTO(email, password): new RegistrationRequestDTO(email, password, roles), {
        onError: showError,
      });
  }, [formMode]);

  // Handling authentication
  useEffect(() => {
    if (data && !localStorage.getItem('mail')) {
      localStorage.setItem("id", String(data.id));
      localStorage.setItem("mail", data.mail);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      window.dispatchEvent(new Event('storage'));
      navigate("/");
    }
  }, [data]);

  return (
    <>
      <CenterDiv sx={{ width: "clamp(400px, 30%, 500px)", height: "100vh", marginLeft: "5%" }} direction="column">
        <div style={{ width: "100%" }}>
          <h1>{formMode === 'login' ? t('homeLogin') : t('homeRegister')}</h1>
        </div>
        <FormContainer style={{ width: "100%" }} method="POST" 
        action={formMode === 'login' ? APIEndpoint.LOGIN.toApiUrl() : APIEndpoint.REGISTER.toApiUrl()} onSubmit={sendRequest}>
          <TextField label={t('loginUsername')} variant="outlined" inputRef={emailRef} />
          <TextField type="password" label={t('loginPassword')} variant="outlined" inputRef={passwordRef} />
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={25} /> : formMode === 'login' ? t('loginLogin') : t('registerRegister')}
          </Button>
          <Button variant="outlined" type="button" 
          onClick={() => setFormMode(formMode === 'login' ? 'register' : 'login')} disabled={isLoading}>
            {isLoading ? <CircularProgress size={25} /> : formMode === 'login' ? t('registerRegister') : t('loginLogin')}
          </Button>
        </FormContainer>
      </CenterDiv>
      <SplashBackground src="https://picsum.photos/600" alt="Random test picture" />
      {errorSnackbar}
    </>
  )
}
