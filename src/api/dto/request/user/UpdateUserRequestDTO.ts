/**
 * Represents the user to update.
 */
export default class UpdateUserRequestDTO {

  /**
   * @param id        The user's id.
   * @param mail      The new user's mail.
   * @param password  The new user's password.
   * @param roles     The new user's roles.
   */
  constructor (
    public readonly id: number,
    public readonly mail: string,
    public readonly password: string,
    public readonly roles: string[],
  ) {}
  
}