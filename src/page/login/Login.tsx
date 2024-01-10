import APIEndpoint from "@api/endpoint/APIEndpoint";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import FormContainer from "@component/FormContainer/FormContainer";
import SplashBackground from "@component/SplashBackground/SplashBackground";
import useApiMutation from "@hook/api/useApiMutation";
import { TextField, Button } from "@mui/material";
import { SyntheticEvent, useCallback, useRef } from "react";
import AuthenticationRequestDTO from '../../api/dto/request/authentication/AuthenticationRequestDTO';
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

export default function Login() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useApiMutation(APIEndpoint.LOGIN, null, false);

  const { t } = useTranslation();

  const sendLoginRequest = useCallback((e: SyntheticEvent) => {
    e.preventDefault()

    // Get form values
    const login = loginRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    // Call API
    mutate(new AuthenticationRequestDTO(login, password));
  }, []);

  if (isSuccess) {
    queryClient.invalidateQueries("user");
  }

  return (
    <>
      <CenterDiv sx={{ width: "clamp(400px, 30%, 500px)", height: "100vh", marginLeft: "5%" }} direction="column">
        <div style={{ width: "100%" }}>
          <h1>{t('homeLogin')}</h1>
        </div>
        <FormContainer style={{ width: "100%" }} method="POST" action={ APIEndpoint.LOGIN.toApiUrl() } onSubmit={sendLoginRequest}>
          <TextField label={t('loginUsername')} variant="outlined" inputRef={loginRef}/>
          <TextField type="password" label={t('loginPassword')} variant="outlined" inputRef={passwordRef}/>
          <Button onClick={sendLoginRequest} variant="contained" type="submit">{t('loginLogin')}</Button>
        </FormContainer>
      </CenterDiv>
      <SplashBackground src="https://picsum.photos/600" alt="Random test picture" />
    </>
  )
}
