import UpdateUserRequestDTO from "@api/dto/request/user/UpdateUserRequestDTO";
import UserResponseDTO from "@api/dto/response/authentication/UserResponseDTO";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export type UpdateUserFormProps = {
  currentUser: UserResponseDTO;

  onSubmit: (newUser: UpdateUserRequestDTO) => void;
};

export default function UpdateUserForm({
  currentUser,
  onSubmit,
}: UpdateUserFormProps) {
  const { t } = useTranslation();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAdminRef = useRef<HTMLInputElement | null>(null);
  const roleNames = currentUser.roles || [];

  const handleSubmit = () => {
    const passwordValue = passwordRef.current?.value;
    const password = typeof passwordValue === 'string' && passwordValue !== '' ? passwordValue : null;
    const isAdmin = isAdminRef.current?.checked ?? false;
    let roles;
    if (isAdmin) {
      roles = ["ROLE_USER", "ROLE_ADMIN"];
    } else {
      roles = ["ROLE_USER"];
    }

    onSubmit({
      id: currentUser.id,
      mail: emailRef.current?.value ?? "",
      password: password ?? "password",
      roles: roles,
    });
  };

  return (
    <>
        <h2>{t("updateFileUser")}</h2>
        <TextField label={t("usersMail")} variant="outlined" inputRef={emailRef}
        defaultValue={currentUser.mail}  style={{ marginBottom: "20px"}}/>
        <TextField type="password" label={t("usersPassword")} variant="outlined" inputRef={passwordRef} />
        <FormControlLabel style={{
          marginLeft: "left"
        }} control={<Checkbox inputRef={isAdminRef} 
          defaultChecked={roleNames.includes("ROLE_ADMIN")}/>} label={t("administrateur") + "?"} />
        <Button 
          variant="contained"
          type="submit" 
          onClick={handleSubmit}
          style={{ marginBottom: "10px"}}
        >
          {t("updateFileLabel")}
        </Button>
    </>
  );
}
