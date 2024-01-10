import DocumentSkeletonResponseDTO from "../document/DocumentSkeletonResponseDTO";
import CategorySkeletonResponseDTO from "./CategorySkeletonResponseDTO";

/**
 * Represents a category.
 */
export default class CategoryResponseDTO {

  /**
   * @param id                  The file's ID.
   * @param name                The file's name.
   * @param parentCategoryId    The file's parent Category id.
   * @param parentCategory      The file's parent Category.
   * @param childrenCategories  The file's children Categories.
   * @param childrenDocuments   The file's children Documents.
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly parentCategoryId: number,
    public readonly parentCategory: string,
    public readonly childrenCategories: CategorySkeletonResponseDTO[],
    public readonly childrenDocuments: DocumentSkeletonResponseDTO[],
  ) {}

}