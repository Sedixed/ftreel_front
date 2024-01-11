import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const { mutate } = useApiMutation(APIEndpoint.LOGOUT, null, false);
    
  useEffect(() => {
    const handleLogoutRequest = async () => {
      await mutate(null);
      localStorage.clear();
      window.dispatchEvent(new Event('storage'));
      navigate("/");
    } 
    handleLogoutRequest();
  }, [navigate, mutate]);
  
  return null;
}