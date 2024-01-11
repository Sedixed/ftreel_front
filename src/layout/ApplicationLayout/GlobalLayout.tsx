import APIEndpoint from "@api/endpoint/APIEndpoint";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import useApi from "@hook/api/useApi";
import useUser from "@hook/user/useUser";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function GlobalLayout() {
  const location = useLocation();
  const queryClient = useQueryClient();

  // Send an API request to get the user informations
  const { refetch, isStale } = useApi(APIEndpoint.GET_USER, undefined, {
    queryKey: "user",
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  // Refetch the API request if the location change
  useEffect(() => {
    if (!queryClient.getQueryData("user") || isStale) {
      refetch();
    }
  }, [location.pathname]);

  const user = useUser();
  const isLoggedIn = user !== undefined;

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