/**
 * Login request data.
 */
export default class AuthenticationRequestDTO {
  
  /**
   * @param login    The user's login.
   * @param password The user's password.
   */
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {}

}