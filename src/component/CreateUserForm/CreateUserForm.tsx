import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useRef } from "react";

export type CreateUserFormProps = {
  onSubmit: (createdUser: { mail: string, password: string, roles: string[] }) => void
}

/**
 * Form used to create a user.
 */
export default function CreateUserForm({ onSubmit }: CreateUserFormProps) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAdminRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const isAdmin = isAdminRef.current?.checked ?? false;
    let roles;
    if (isAdmin) {
      roles = ["ROLE_USER", "ROLE_ADMIN"];
    } else {
      roles = ["ROLE_USER"];
    }

    onSubmit({
      mail: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      roles: roles,
    });
  };
  
  return (
    <>
        <h2>Créer un utilisateur</h2>
        <TextField label="Adresse mail" variant="outlined" inputRef={emailRef} style={{ marginBottom: "20px"}}/>
        <TextField type="password" label="Mot de passe" variant="outlined" inputRef={passwordRef}/>
        <FormControlLabel style={{
          marginLeft: "right", marginRight: "left"
        }} control={<Checkbox inputRef={isAdminRef} />} label="Administrateur ?" />
        <Button 
          variant="contained"
          type="submit" 
          onClick={handleSubmit}
          style={{ marginBottom: "10px"}}
        >
          Créer
        </Button>
    </>
  )
}