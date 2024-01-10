/**
 * Represents the document to upload.
 */
export default class UploadDocumentRequestDTO {

  /**
   * @param title           The file's title.
   * @param description     The file's description.
   * @param categoryId      The file's category's id.
   * @param base64          The file's base64.
   */
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly categoryId: number,
    public readonly base64: string,
  ) {}
  
}