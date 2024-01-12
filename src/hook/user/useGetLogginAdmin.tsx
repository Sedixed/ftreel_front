import { useEffect, useState } from "react";

export default function useGetLogginAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("mail")));
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem("mail"));
  const roles = localStorage.getItem("roles");
  const [containsAdmin, setContainsAdmin] = useState(Boolean(
    roles ? roles.includes("ROLE_ADMIN") : false));

  // Refetch the API request if the location change
  useEffect(() => {
    const updateLocalStorageData = () => {
      const isLogged = Boolean(localStorage.getItem("mail"));
      const mail = localStorage.getItem("mail");
      const roles = localStorage.getItem("roles");
      setIsLoggedIn(isLogged);
      setLoggedUser(mail);
      setContainsAdmin(roles ? roles.includes("ROLE_ADMIN") : false);
    };
    window.addEventListener('storage', updateLocalStorageData);
    return () => {
      window.removeEventListener('storage', updateLocalStorageData);
    };
  }, []);

  return { isLoggedIn, containsAdmin, loggedUser };
}