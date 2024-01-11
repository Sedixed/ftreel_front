import CategorySkeletonResponseDTO from "./CategorySkeletonResponseDTO";

export default class FollowedCategoryResponseDTO {

  /**
   * @param followedCategories The followed categories.
   */
    constructor(
      public readonly followedCategories: CategorySkeletonResponseDTO[]
    ) {}

}