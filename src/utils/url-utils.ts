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
