import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import useGetLogginAdmin from "@hook/user/useGetLogginAdmin";
import { Navigate, Outlet } from "react-router-dom";

export function AccessRouteLayout() {
  const { isLoggedIn, containsAdmin }= useGetLogginAdmin();

  const renderContent = () => {
    switch (location.pathname) {
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
        return <Navigate to={ApplicationRoute.HOME} />;
    }
  };
  
  return (
    <>
      {renderContent()}
    </>
  );
}