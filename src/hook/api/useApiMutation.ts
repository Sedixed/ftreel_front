import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useEffect } from "react";
import APIOptions from "@type/APIOptions";

/**
 * Send a mutation request (POST, PUT, PATCH or DELETE) to the given endpoint.
 * 
 * @param  endpoint    The endpoint to send the request.
 * @param  requestData The data to send, can be null if the request is sent later (sendRequest = false).
 * @param  sendRequest Indicates if the request should be sent immediately.
 * @param  options     Some custom options about the request.
 * @return             A map containing multiple metrics about the sent request (isLoading, data...)
 */
export default function useApiMutation<T, U>(
  endpoint: APIEndpoint<T, U>, 
  requestData: T | null, 
  sendRequest: boolean = true,
  options: APIOptions | undefined = undefined
) {
  // Check that the given endpoint method is GET
  if (endpoint.method == "GET") {
    throw `Invalid endpoint method for useApiMutation (${endpoint.method}), to perform GET calls, use the useApi hook.`;
  }

  // Setup the mutation
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data) => {
      let finalURI = import.meta.env.VITE_API_HOST + endpoint.uri;
      if (options?.dataAsQueryParam) {
        // Extract query params and replace them with their associated values
        const queryParamPattern = /{[a-z0-9]+}/i;
        if (options?.searchParams != null) {
          finalURI += "?" + options?.searchParams?.toString();
        }
        endpoint.uri.match(queryParamPattern)?.forEach(queryParamIdentifier => {
          finalURI = finalURI.replace(
            queryParamIdentifier, 
            data[queryParamIdentifier.substring(1, queryParamIdentifier.indexOf("}"))]
          );
        });
      }

      const response = await fetch(finalURI, {
        method: endpoint.method,
        body: options?.dataAsQueryParam ? null : JSON.stringify(requestData ?? data),
        headers: {
          "Content-Type": options?.headers?.["Content-Type"] ?? "application/json",
          ...options?.headers,
        },
        credentials: options?.credentialsPolicy ?? "include",
      })

      // Check error and throw the response body if there is one
      if (!response.ok) {
        throw await response.json();
      }

      if (endpoint.responseType === null) {
        return null;
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        if (options?.queryKey != undefined) {
          queryClient.setQueryData(options?.queryKey, data)
        }
        if (options?.invalidateQueries != undefined) {
          queryClient.invalidateQueries(options.invalidateQueries)
        }
        if (options?.onSuccess) {
          options?.onSuccess();
        }
      },
      onError: options?.onError,
      retry: options?.retry ?? 0
    },
  ) as UseMutationResult<U, any, any, any>;

  // Send the request
  useEffect(() => {
    if (sendRequest) {
      mutation.mutate(null)
    }
  }, [mutation.mutate]);

  // Returns the mutation result
  return { ...mutation }
}
