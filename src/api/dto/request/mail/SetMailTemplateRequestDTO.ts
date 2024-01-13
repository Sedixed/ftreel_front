/**
 * Represents the current new mail template.
 */
export default class SetMailTemplateRequestDTO {

  /**
   * @param customSubject   The new mail template's subject.
   * @param customBody      The new mail template's body.
   */
  constructor (
    public readonly customSubject: string,
    public readonly customBody: string,
  ) {}
  
}