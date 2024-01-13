import UploadDocumentRequestDTO from "@api/dto/request/document/UploadDocumentRequestDTO";
import DocumentResponseDTO from "@api/dto/response/document/DocumentResponseDTO";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import { Box, Button, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type CreateFileModalProps = {
  /**
   * The category ID of the file to create.
   */
  categoryId: number;

  /**
   * Callback called when an error occurs.
   */
  onError?: () => void;

  /**
   * Callback called when the data has been submitted successfully.
   * 
   * @param file The created file.
   */
  onSuccess?: (file: DocumentResponseDTO) => void;
}

export default function CreateFileModal({
  categoryId,
  onError,
  onSuccess,
}: CreateFileModalProps) {
  const { t } = useTranslation();
  // Form values and references
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null)
  const handleFileChange = (newFile: File | null) => {
    setFile(newFile)
  }

  // Create file request
  const { data, error, mutate, reset } = useApiMutation(APIEndpoint.UPLOAD_DOCUMENT, null, false, {
    invalidateQueries: ["notValidatedFiles"]
  });

  // Form handling
  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

  const onSubmit = async () => {
    // Get values
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const inputFile = file ?? new File([], "empty file");
    const base64File: string = await toBase64(inputFile);

    // Send them
    mutate(new UploadDocumentRequestDTO(
      title ?? "Pas de titre", 
      description ?? "Pas de description", 
      categoryId, 
      base64File
    ))
  }

  // Data or error handling
  if (data) {
    if (onSuccess) onSuccess(data);
    reset();
  }
  if (error && onError) {
    onError();
  }

  return (
    <>
        <h2>{t("createFileLabel")}</h2>
        <Box sx={{ margin: "10px 0" }}>
          <TextField inputRef={titleRef} label={t("fileTitleLabel")} sx={{ width: "100%" }} />
        </Box>
        <Box sx={{ margin: "10px 0" }}>
          <TextField
            inputRef={descriptionRef}
            multiline
            maxRows={4}
            style={{ width: "100%", resize: "none" }} 
            label={t("detailDescription")}
          />
        </Box>
        <Box sx={{ margin: "10px 0" }}>
          <MuiFileInput 
            label={t("chooseFileLabel")}
            value={file} 
            onChange={handleFileChange}
            sx={{ width: "100%" }} 
            />
        </Box>
        <Button variant="contained" onClick={onSubmit} style={{ marginBottom: "10px"}}>{t("create")}</Button>
    </>
  )
}