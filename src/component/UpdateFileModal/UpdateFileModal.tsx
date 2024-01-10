import UpdateDocumentRequestDTO from "@api/dto/request/document/UpdateDocumentRequestDTO";
import DocumentResponseDTO from "@api/dto/response/document/DocumentResponseDTO";
import DocumentSkeletonResponseDTO from "@api/dto/response/document/DocumentSkeletonResponseDTO";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";

export type UpdateFileModalProps = {
  /**
   * The category ID of the file to update.
   */
  categoryId: number;

  /**
   * The file to update.
   */
  currentFile: DocumentSkeletonResponseDTO;

  /**
   * Callback called when an error occurs.
   */
  onError?: () => void;

  /**
   * Callback called when the data has been submitted successfully.
   * 
   * @param file The updated file.
   */
  onSuccess?: (file: DocumentResponseDTO) => void;
}

export default function CreateFileModal({
  categoryId,
  currentFile,
  onError,
  onSuccess,
}: UpdateFileModalProps) {
  // Form values and references
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  // Update file request
  const { data, error, mutate, reset } = useApiMutation(APIEndpoint.UPDATE_DOCUMENT, null, false);

  const onSubmit = async () => {
    // Get values
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    // Send them
    mutate(new UpdateDocumentRequestDTO(
      currentFile.id,
      title ?? "Pas de titre", 
      description ?? "Pas de description", 
      currentFile.author,
      categoryId,
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
      <h2>Modifier un fichier</h2>
      <Box sx={{ margin: "10px 0" }}>
        <TextField inputRef={titleRef} placeholder={currentFile.title} sx={{ width: "100%" }} />
      </Box>
      <Box sx={{ margin: "10px 0" }}>
        <TextField
          inputRef={descriptionRef}
          multiline
          maxRows={4}
          style={{ width: "100%", resize: "none" }} 
          placeholder={currentFile.description}
        />
      </Box>
      <Button variant="contained" onClick={onSubmit}>Modifier</Button>
    </>
  )
}