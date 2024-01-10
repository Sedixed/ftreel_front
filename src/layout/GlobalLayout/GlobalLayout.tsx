import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApi from "@hook/api/useApi";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Outlet, useLocation } from "react-router-dom";

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

  return (
    <Outlet/>
  )
}