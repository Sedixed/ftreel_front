import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import useGetLogginAdmin from "@hook/user/useGetLogginAdmin";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function AccessRouteLayout() {
  const location = useLocation();
  const { isLoggedIn, containsAdmin }= useGetLogginAdmin();

  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const renderContent = () => {
    switch (pathname) {
      case ApplicationRoute.AUTHENTICATION:
        return !isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.FILES:
        return isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.USERS:
        return isLoggedIn && containsAdmin ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.VALIDATION:
        return isLoggedIn && containsAdmin ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.FOLLOWED:
        return isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.LOGOUT:
        return isLoggedIn ? <Outlet /> : <Navigate to={ApplicationRoute.HOME} />;
      case ApplicationRoute.HOME:
        return <Outlet />;
      default:
        return <Outlet />;
    }
  };
  
  return (
    <>
      {renderContent()}
    </>
  );
}