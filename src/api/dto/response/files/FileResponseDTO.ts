/**
 * Represents a file (directories are considered as files).
 */
export default class FileResponseDTO {

  /**
   * @param id   The file's ID.
   * @param path The file's path.
   * @param type The file's type (file or directory).
   * @param name The file's name.
   */
  constructor(
    public readonly id: number,
    public readonly path: string,
    public readonly type: "directory" | "file",
    public readonly name: string,
  ) {}

}