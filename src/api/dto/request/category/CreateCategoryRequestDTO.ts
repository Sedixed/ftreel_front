/**
 * Represents the category to create.
 */
export default class CreateCategoryRequestDTO {

  /**
   * @param name             The Category's name.
   * @param parentCategoryId The category's parent.
   */
  constructor (
    public readonly name: string,
    public readonly parentCategoryId: number,
  ) {}
  
}