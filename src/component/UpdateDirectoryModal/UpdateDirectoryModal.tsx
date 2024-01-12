import UpdateCategoryRequestDTO from "@api/dto/request/category/UpdateCategoryRequestDTO";
import CategoryResponseDTO from "@api/dto/response/category/CategoryResponseDTO";
import CategorySkeletonResponseDTO from "@api/dto/response/category/CategorySkeletonResponseDTO";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import useApiMutation from "@hook/api/useApiMutation";
import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export type UpdateDirectoryModalProps = {
  /**
   * The category ID of the directory to update.
   */
  categoryId: number;

  /**
   * The directory to update.
   */
  currentDirectory: CategorySkeletonResponseDTO;

  /**
   * Callback called when an error occurs.
   */
  onError?: () => void;

  /**
   * Callback called when the data has been submitted successfully.
   * 
   * @param file The updated directory.
   */
  onSuccess?: (file: CategoryResponseDTO) => void;
}

export default function UpdateDirectoryModal({
  categoryId,
  currentDirectory,
  onError,
  onSuccess,
}: UpdateDirectoryModalProps) {
  const { t } = useTranslation();
  // Form values and references
  const nameRef = useRef<HTMLInputElement | null>(null);

  // Create file request
  const { data, error, mutate, reset } = useApiMutation(APIEndpoint.UPDATE_CATEGORY, null, false, {
    invalidateQueries: ["notValidatedFiles"]
  });

  const onSubmit = async () => {
    // Get values
    const name = nameRef.current?.value;

    // Send them
    mutate(new UpdateCategoryRequestDTO(
      currentDirectory.id,
      name ?? "Aucun nom", 
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
        <h2>{t("updateFileDirectory")}</h2>
        <Box sx={{ margin: "10px 0" }}>
          <TextField inputRef={nameRef} placeholder="Nom" defaultValue={currentDirectory.name} sx={{ width: "100%" }} />
        </Box>
        <Button variant="contained" onClick={onSubmit} style={{ marginBottom: "10px"}}>{t("modify")}</Button>
    </>
  )
}