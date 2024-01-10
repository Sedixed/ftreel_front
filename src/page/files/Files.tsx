import { Box } from "@mui/material";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useSearchParams } from "react-router-dom";
import FileTree, { File } from "@component/FileTree/FileTree";
import useSnackbar from "@hook/snackbar/useSnackbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import DetailModal from "@component/DetailModal/DetailModal";
import CreateFileModal from "@component/CreateFileModal/CreateFileModal";
import CreateDirectoryModal from "@component/CreateDirectoryModal/CreateDirectoryModal";
import useApiMutation from "@hook/api/useApiMutation";

// TODO :
// - Ajouter chemin courant
// - Ajouter possibilité de revenir en arrière via le chemin courant

export default function Files() {
  const { t } = useTranslation();

  // State of the detail panel
  const [detailPanelContent, setDetailPanelContent] = useState<File | null>(
    null
  );

  // State of the create file modal
  const [createFileModalOpen, setCreateFileModalOpen] = useState(false);

  // State of the create directory modal
  const [createDirectoryModalOpen, setCreateDirectoryModalOpen] = useState(false);

  // Setup the error snackbar
  const { snackbar: errorSnackbar, show: showError } = useSnackbar(
    "Impossible de récupérer les fichiers.",
    "warning"
  );

  // Get the current position in the file tree
  const currentSearchParams = useSearchParams();
  const currentTreePath = currentSearchParams[0].get("path") ?? "/";

  // Send an API request to get the current files
  const filesRequestSearchParam = new URLSearchParams();
  filesRequestSearchParam.append("path", currentTreePath);
  const {
    data: category,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.GET_CATEGORY_WITH_PATH, undefined, {
    queryKey: "/files" + currentTreePath,
    searchParams: filesRequestSearchParam,
    staleTime: 60000,
    onError: showError,
  });

  // Filter files to match them with the FileTree "file" property
  let fileTreeFiles: File[] = [];
  if (category) {
    fileTreeFiles = category.childrenCategories
      .map((category): File => {
        return {
          id: category.id,
          name: category.name,
          path: currentTreePath,
          type: "directory",
        }
      })
      .concat(category.childrenDocuments.map((file): File => {
        return {
          id: file.id,
          name: file.title,
          path: currentTreePath,
          author: file.author,
          description: file.description,
          extension: file.extension,
          type: "file",
        }
      }))
  }

  // API mutations for delete
  const { 
    mutate: deleteDocument,
    reset: resetDeleteDocument,
    isSuccess: deletedDocumentSucess,
  } = useApiMutation(APIEndpoint.DELETE_DOCUMENT, null, false, { dataAsQueryParam: true });
  const { 
    mutate: deleteCategory,
    reset: resetDeleteCategory,
    isSuccess: deletedCategorySucess,
  } = useApiMutation(APIEndpoint.DELETE_CATEGORY, null, false, { dataAsQueryParam: true });
  if (deletedDocumentSucess) {
    refetch()
    resetDeleteDocument()
  }
  if (deletedCategorySucess) {
    refetch()
    resetDeleteCategory()
  }

  return (
    <>
      <Box
        sx={{
          padding: "0 50px",
        }}
      >
        <h1>{t('filesFiles')}</h1>
        <FileTree
          path={currentTreePath}
          files={fileTreeFiles}
          onRefresh={() => refetch()}
          onDetails={setDetailPanelContent}
          onCreateFile={() => setCreateFileModalOpen(true)}
          onCreateDirectory={() => setCreateDirectoryModalOpen(true)}
          onDeleteDirectory={(file) => deleteCategory({id: file.id})}
          onDeleteFile={(file) => deleteDocument({id: file.id})}
          isLoading={isLoading}
        />
      </Box>
      { category && 
        <CenteredModal 
          open={detailPanelContent != null} 
          handleClose={() => setDetailPanelContent(null)}
        >
          <DetailModal file={detailPanelContent} />
        </CenteredModal>
      }
      {
        category && 
        <CenteredModal open={createFileModalOpen} handleClose={() => setCreateFileModalOpen(false)}>
          <CreateFileModal 
            categoryId={category?.id ?? 0} 
            onSuccess={() => {
              setCreateFileModalOpen(false);
              refetch();
            }}
          />
        </CenteredModal>
      }
      {
        category &&
        <CenteredModal open={createDirectoryModalOpen} handleClose={() => setCreateDirectoryModalOpen(false)}>
          <CreateDirectoryModal 
            categoryId={category?.id ?? 0} 
            onSuccess={() => {
              setCreateDirectoryModalOpen(false);
              refetch();
            }}
          />
        </CenteredModal>
      }
      {errorSnackbar}
    </>
  );
}
