import APIEndpoint from "@api/endpoint/APIEndpoint";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import FormContainer from "@component/FormContainer/FormContainer";
import SplashBackground from "@component/SplashBackground/SplashBackground";
import { TextField, Button } from "@mui/material";
import { SyntheticEvent, useCallback, useRef } from "react";

export default function Login() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const sendLoginRequest = useCallback((e: SyntheticEvent) => {
    e.preventDefault()

    // Call API
    console.log(loginRef.current?.value);
    console.log(passwordRef.current?.value);
  }, []);

  return (
    <>
      <CenterDiv sx={{ width: "clamp(400px, 30%, 500px)", height: "100vh", marginLeft: "5%" }} direction="column">
        <div style={{ width: "100%" }}>
          <h1>Connexion</h1>
        </div>
        <FormContainer style={{ width: "100%" }} method="POST" action={ APIEndpoint.LOGIN.toApiUrl() } onSubmit={sendLoginRequest}>
          <TextField label="Adresse mail" variant="outlined" inputRef={loginRef}/>
          <TextField type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef}/>
          <Button onClick={sendLoginRequest} variant="contained" type="submit">Se connecter</Button>
        </FormContainer>
      </CenterDiv>
      <SplashBackground src="https://picsum.photos/600" alt="Random test picture" />
    </>
  )
}