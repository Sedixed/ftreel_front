/**
 * Custom options that can be used inside of the API hooks (useApi, useApiMutation).
 */
type APIOptions = {
  /**
   * The query key associated to the sent request (used for caching, invalidating...).
   */
  queryKey?: string | any[],

  /**
   * Custom headers to send with the request.
   */
  headers?: Record<string, any>,

  /**
   * The queries to invalidate after a mutation (only used by useApiMutation).
   */
  invalidateQueries?: string[],

  /**
   * The time (in ms) to set the retrieved data in a stale state (only works with useApi).
   */
  staleTime?: number,
}

export default APIOptions;
