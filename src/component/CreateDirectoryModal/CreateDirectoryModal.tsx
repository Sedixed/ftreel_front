import CreateCategoryRequestDTO from "@api/dto/request/category/CreateCategoryRequestDTO";
import CategoryResponseDTO from "@api/dto/response/category/CategoryResponseDTO";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";

export type CreateDirectoryModalProps = {
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
  onSuccess?: (file: CategoryResponseDTO) => void;
}

export default function CreateDirectoryModal({
  categoryId,
  onError,
  onSuccess,
}: CreateDirectoryModalProps) {
  // Form values and references
  const nameRef = useRef<HTMLInputElement | null>(null);

  // Create file request
  const { data, error, mutate, reset } = useApiMutation(APIEndpoint.CREATE_CATEGORY, null, false);

  const onSubmit = async () => {
    // Get values
    const name = nameRef.current?.value;

    // Send them
    mutate(new CreateCategoryRequestDTO(
      name ?? "Pas de titre", 
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
        <h2>Créer un dossier</h2>
        <Box sx={{ margin: "10px 0" }}>
          <TextField inputRef={nameRef} placeholder="Nom du dossier" sx={{ width: "100%" }} />
        </Box>
        <Button variant="contained" onClick={onSubmit} style={{ marginBottom: "10px"}}>Créer</Button>
    </>
  )
}