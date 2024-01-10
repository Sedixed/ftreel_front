/**
 * Represents a document.
 */
export default class DocumentResponseDTO {

  /**
   * @param id              The file's ID.
   * @param title           The file's title.
   * @param description     The file's description.
   * @param extension       The file's extension.
   * @param author          The file's author.
   * @param category        The file's category.
   * @param base64          The file's base64.
   */
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly extension: string,
    public readonly author: string,
    public readonly category: string,
    public readonly base64: string,
  ) {}

}