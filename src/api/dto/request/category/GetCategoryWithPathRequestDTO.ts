/**
 * Represents a category path.
 */
export default class GetCategoryWithPathRequestDTO {

  /**
   * @param path    The Category's path
   */
  constructor (
    public readonly path: string,
  ) {}
  
}