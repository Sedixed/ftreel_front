/**
 * Represents the current user.
 */
export default class GetUserResponseDTO {

  /**
   * @param id          The current user's id.
   * @param username    The current user's username.
   * @param roles       The current user's roles.
   */
  constructor (
    public readonly id: number,
    public readonly username: string,
    public readonly roles: string[],
  ) {}
  
}