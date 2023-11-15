import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useEffect } from "react";
import APIOptions from "@type/APIOptions";

/**
 * Send a mutation request (POST, PUT or DELETE) to the given endpoint.
 * 
 * @param  endpoint    The endpoint to send the request.
 * @param  requestData The data to send.
 * @param  options     Some custom options about the request.
 * @return             A map containing multiple metrics about the sent request (isLoading, data...)
 */
export default function useApiMutation<T, U>(
  endpoint: APIEndpoint<T, U>, 
  requestData: T, 
  options: APIOptions | undefined = undefined
) {
  // Check that the given endpoint method is GET
  if (endpoint.method == "GET") {
    throw `Invalid endpoint method for useApiMutation (${endpoint.method}), to perform GET calls, use the useApi hook.`;
  }

  // Setup the mutation
  const queryClient = useQueryClient();
  const mutation = useMutation(() => 
    fetch(import.meta.env.VITE_API_HOST + endpoint.uri, {
      method: endpoint.method,
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": options?.headers?.["Content-Type"] ?? "application/json",
        ...options?.headers,
      }
    }).then(res => res.json()),
    {
      onSuccess: (data) => {
        if (options?.queryKey != undefined) {
          queryClient.setQueryData(options?.queryKey, data)
        }
        if (options?.invalidateQueries != undefined) {
          queryClient.invalidateQueries(options.invalidateQueries)
        }
      },
    },
  ) as UseMutationResult<U, any, any, any>;

  // Send the request
  useEffect(() => {
    mutation.mutate(null)
  }, [mutation.mutate]);

  // Returns the mutation result
  return { ...mutation }
}
