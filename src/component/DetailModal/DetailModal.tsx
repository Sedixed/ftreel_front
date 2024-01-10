import { File } from "@component/FileTree/FileTree"

/**
 * DetailModal properties.
 */
export type DetailModalProps = {
  /**
   * The file to display details.
   */
  file: File | null
}

/**
 * Modal showing a file details.
 */
export default function DetailModal({ file }: DetailModalProps) {
  if (file == null) {
    return <></>
  }
  
  return (
    <>
      <h2>{file.name} (ID: {file.id})</h2>
      <p>
        Auteur : {file.author}
      </p>
      <p>
        Description : {file.description}
      </p>
      <p>
        Extension : {file.extension}
      </p>
    </>
  )
}