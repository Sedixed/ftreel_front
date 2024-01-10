/**
 * Registration request data.
 */
export default class RegistrationRequestDTO {
  
  /**
   * @param username    The user's username.
   * @param password    The user's password.
   */
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly roles: string[],
  ) {}

}