import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AccessRouteLayout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("mail")));

  // Refetch the API request if the location change
  useEffect(() => {
    const updateLocalStorageData = () => {
      const mail = Boolean(localStorage.getItem("mail"));
      setIsLoggedIn(mail);
      // const roles = localStorage.getItem("roles");
      // const containsAdmin = roles ? roles.includes("ROLE_ADMIN") : false;
    };
    window.addEventListener('storage', updateLocalStorageData);
    return () => {
      window.removeEventListener('storage', updateLocalStorageData);
    };
  }, []);

  const renderContent = () => {
    switch (location.pathname) {
      case ApplicationRoute.AUTHENTICATION:
        return !isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.FILES:
        return isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.FOLLOWED:
        return isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.LOGOUT:
        return isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.HOME:
        return <Outlet />;
      default:
        return <Navigate to={ApplicationRoute.HOME} />;
    }
  };
  
  return (
    <>
      {renderContent()}
    </>
  );
}