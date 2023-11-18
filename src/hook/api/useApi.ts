import { UseQueryResult, useQuery } from "react-query";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import APIOptions from "@type/APIOptions";

/**
 * Send a GET request to the given endpoint.
 * 
 * @param  endpoint    The endpoint to retrieve.
 * @param  queryParams A map associating the different query parameters to their values.
 * @param  options     Some custom options about the request.
 * @return             A map containing multiple metrics about the request (isLoading, data, ...)
 */
export default function useApi<T, U>(
  endpoint: APIEndpoint<T, U>, 
  queryParams: Record<string, any> = {},
  options: APIOptions | undefined = undefined,
) {
  // Check that the given endpoint method is GET
  if (endpoint.method != "GET") {
    throw `Invalid endpoint method for useApi (${endpoint.method}), use GET or call the useApiMutation hook.`;
  }

  // Extract query params and replace them with their associated values
  const queryParamPattern = /{[a-z0-9]+}/i;
  let finalURI = import.meta.env.VITE_API_HOST + endpoint.uri;
  endpoint.uri.match(queryParamPattern)?.forEach(queryParamIdentifier => {
    finalURI = finalURI.replace(
      queryParamIdentifier, 
      queryParams[queryParamIdentifier.substring(1, queryParamIdentifier.indexOf("}"))]
    );
  });

  // Send the request and returns the useQuery hook result
  return useQuery(
    options?.queryKey ?? endpoint.uri, 
    () => fetch(finalURI, { headers: options?.headers }).then(res => res.json()), 
    {
      staleTime: options?.staleTime 
    }
  ) as UseQueryResult<U, any>;
}
