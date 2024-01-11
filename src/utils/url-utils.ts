/**
 * Build an URL with the given URI and search params.
 * 
 * @param   uri          The URI used to build the final URL.
 * @param   searchParams The search parameters to add to the URL.
 * @returns              The resulting URL.
 */
export function buildURL(uri: string, searchParams: Record<string, string>): string {
  let finalURL = uri;
  const searchParamsBuilder = new URLSearchParams();
  for (const searchParam in searchParams) {
    searchParamsBuilder.append(searchParam, searchParams[searchParam]);
  }
  finalURL += "?" + searchParamsBuilder.toString();

  return finalURL;
}

/**
 * Build an URL with the given URI and query params.
 * 
 * @param   uri          The URI used to build the final URL.
 * @param   searchParams The query parameters to add to the URL.
 * @returns              The resulting URL.
 */
export function buildURLWithQueryParams(uri: string, queryParams: Record<string, string>): string {
  const queryParamPattern = /{[a-z0-9]+}/i;
  let finalURI = uri;
  uri.match(queryParamPattern)?.forEach(queryParamIdentifier => {
    finalURI = finalURI.replace(
      queryParamIdentifier, 
      queryParams[queryParamIdentifier.substring(1, queryParamIdentifier.indexOf("}"))]
    );
  });

  return finalURI;
}

/**
 * Build the URL search params based on the given pair. If a value is null, then it's not added to the params.
 * 
 * @param params The params to use to build the URLSearchParams. 
 */
export function buildSearchParamsNullSafe(params: Record<string, unknown | null>): URLSearchParams {
  const searchParamsBuilder = new URLSearchParams();
  for (const searchParam in params) {
    if (params[searchParam] == null) {
      continue;
    }
    searchParamsBuilder.append(searchParam, `${params[searchParam]}`);
  }

  return searchParamsBuilder;
}
