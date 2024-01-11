/**
 * Represents a category skeleton (exclude files).
 */
export default class CategorySkeletonResponseDTO {

  /**
   * @param id                  The file's ID.
   * @param name                The file's name.
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly path: string,
    public readonly subscribed?: boolean,
  ) {}

}