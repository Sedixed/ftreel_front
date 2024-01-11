import { File } from "@component/FileTree/FileTree"
import { useTranslation } from "react-i18next"

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
  // Translation
  const { t } = useTranslation();

  if (file == null) {
    return <></>
  }
  
  return (
    <>
      <h2>{file.name} (ID: {file.id})</h2>
      <p>
        {t("detailAuthor")} : {file.author}
      </p>
      <p>
      {t("detailDescription")} : {file.description}
      </p>
      <p>
      {t("detailExtension")} : {file.extension}
      </p>
    </>
  )
}