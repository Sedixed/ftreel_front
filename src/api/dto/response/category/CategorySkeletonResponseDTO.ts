import DocumentResponseDTO from "../document/DocumentResponseDTO";

/**
 * Represents a category skeleton (exclude files).
 */
export default class CategoryResponseDTO {

  /**
   * @param id                  The file's ID.
   * @param name                The file's name.
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
  ) {}

}