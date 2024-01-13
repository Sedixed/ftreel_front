/**
 * Represents the current mail template.
 */
export default class GetMailTemplateResponseDTO {

  /**
   * @param subject   The current mail template's subject.
   * @param body      The current mail template's body.
   */
  constructor (
    public readonly subject: string,
    public readonly body: string,
  ) {}
  
}