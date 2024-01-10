/**
 * Represents the category of within id to update.
 */
export default class GetCategoryRequestDTO {

  /**
   * @param id                The Category's id
   * @param name              The Category's name
   * @param parentCategoryId  The Category's parent Category id
   */
  constructor (
    public readonly id: number,
    public readonly name: string,
    public readonly parentCategoryId: number,
  ) {}
  
}