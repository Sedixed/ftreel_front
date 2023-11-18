/**
 * Login response data.
 */
export default class AuthenticationResponseDTO {

  /**
   * @param token The new user's token.
   */
  constructor(
    public readonly token: string,
  ) {}

}