/**
 * Represents the current user.
 */
export default class GetUserResponseDTO {

  /**
   * @param id    The current user's id.
   * @param mail  The current user's mail.
   * @param roles The current user's roles.
   */
  constructor (
    public readonly id: number,
    public readonly mail: string,
    public readonly roles: string[],
  ) {}
  
}