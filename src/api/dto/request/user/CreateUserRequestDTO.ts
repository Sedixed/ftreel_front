/**
 * Represents the user to create.
 */
export default class CreateUserRequestDTO {

  /**
   * @param id        The user's id.
   * @param mail      The user's mail.
   * @param password  The user's password.
   * @param roles     The user's roles.
   */
  constructor (
    public readonly id: number,
    public readonly mail: string,
    public readonly password: string,
    public readonly roles: string[],
  ) {}
  
}