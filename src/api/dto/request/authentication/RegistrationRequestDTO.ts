/**
 * Register request data.
 */
export default class RegistrationRequestDTO {
  
  /**
   * @param login    The user's login.
   * @param password The user's password.
   */
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {}

}