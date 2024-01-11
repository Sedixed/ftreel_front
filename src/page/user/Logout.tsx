import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useApiMutation(APIEndpoint.LOGOUT, null, false);
    
  useEffect(() => {
      localStorage.clear();
      window.dispatchEvent(new Event('storage'));
      navigate("/");
  }, []);
  
  return null;
}