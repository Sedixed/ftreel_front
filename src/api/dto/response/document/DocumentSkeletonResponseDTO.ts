/**
 * Represents a document skeleton (exclude category and content).
 */
export default class DocumentSkeletonResponseDTO {

  /**
   * @param id              The file's ID.
   * @param title           The file's title.
   * @param description     The file's description.
   * @param extension       The file's extension.
   * @param author          The file's author.
   */
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly extension: string,
    public readonly author: string,
    public readonly path: string,
    public readonly liked: boolean,
    public readonly nbLikes: number,
    public readonly isValidated: boolean,
  ) {}

}