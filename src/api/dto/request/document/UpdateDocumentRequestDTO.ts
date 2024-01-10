/**
 * Represents the document of within id to update.
 */
export default class GetDocumentRequestDTO {

  /**
   * @param id              The file's ID.
   * @param title           The file's title.
   * @param description     The file's description.
   * @param author          The file's author.
   * @param category        The file's category.
   */
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly author: string,
    public readonly category: number,
  ) {}
  
}