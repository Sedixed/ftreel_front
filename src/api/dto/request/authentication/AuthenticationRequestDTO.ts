/**
 * Authentication request data.
 */
export default class AuthenticationRequestDTO {
  
  /**
   * @param username    The user's username.
   * @param password    The user's password.
   */
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}

}