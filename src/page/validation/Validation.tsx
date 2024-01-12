import { useEffect, useState } from 'react';
import useApi from '@hook/api/useApi';
import APIEndpoint from '@api/endpoint/APIEndpoint';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CenteredModal from '@component/CenteredModal/CenteredModal';
import DetailModal from '@component/DetailModal/DetailModal';
import useSnackbar from '@hook/snackbar/useSnackbar';
import useApiMutation from '@hook/api/useApiMutation';
import { downloadBase64 } from '@utils/download-utils';
import { useQueryClient } from 'react-query';
import FileTree, { File } from "@component/FileTree/FileTree";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from "@mui/icons-material/Delete";

export default function ValidationPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  // Setup the error snackbar
  const { snackbar: errorSnackbar, show: showError } = useSnackbar(
    t("getRequestError"),
    "warning",
    { horizontal: 'right', vertical: 'bottom' },
    3000
  );

  // Setup the success delete snackbar
  const { snackbar: successSnackbar, show: showSuccess } = useSnackbar(
    t("getRequestSuccess"),
    "success",
    { horizontal: 'right', vertical: 'bottom' },
    1000
  );

  // State of the detail panel
  const [detailPanelContent, setDetailPanelContent] = useState<File | null>(
    null
  );

  // Send an API request to get all not validated files
  const {
    data: files,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.GET_NOT_VALIDATED_DOCUMENTS, undefined, {
    queryKey: "notValidatedFiles",
    staleTime: 60000,
    onError: showError,
  });

  // Filter files to match them with the FileTree "file" property
  let notValidatedFiles: File[] = [];
  if (files) {
    notValidatedFiles = files.map((file): File => {
      return {
        id: file.id,
        name: file.title,
        author: file.author,
        description: file.description,
        extension: file.contentType,
        path: "",
        type: "file",
      };
    });
  }

  // API mutations for validate
  const { 
    mutate: validateDocument,
    reset: resetValidateDocument,
    isSuccess: validateDocumentSucess,
  } = useApiMutation(APIEndpoint.VALIDATE_DOCUMENT, null, false, { 
    dataAsQueryParam: true, 
    invalidateQueries: ["notValidatedFiles"],
    onError: showError,
    onSuccess: showSuccess,
  });
  if (validateDocumentSucess) {
    refetch()
    resetValidateDocument()
  }

  // API mutations for delete
  const { 
    mutate: deleteDocument,
    reset: resetDeleteDocument,
    isSuccess: deletedDocumentSucess,
  } = useApiMutation(APIEndpoint.DELETE_DOCUMENT, null, false, { 
    dataAsQueryParam: true, 
    invalidateQueries: ["notValidatedFiles"],
    onError: showError,
    onSuccess: showSuccess,
  });
  if (deletedDocumentSucess) {
    refetch()
    resetDeleteDocument()
  }
  
  // Download file handling
  const [fileToDownload, setFileToDownload] = useState<File | null>(null)
  const { data: downloadedFile, refetch: refetchDownloadFile } = useApi(
    APIEndpoint.GET_DOCUMENT, 
    { id: fileToDownload?.id ?? 0 }, 
    { enabled: false, queryKey: "downloadedFile" }
  );
  useEffect(() => {
    if (fileToDownload != null) {
      refetchDownloadFile();
    }
  }, [fileToDownload]);
  useEffect(() => {
    if (downloadedFile != null) {
      downloadBase64({
        base64: downloadedFile.base64, 
        mime: downloadedFile.contentType, 
        name: downloadedFile.title,
        type: "file",
      });
      queryClient.removeQueries("downloadedFile")
      setFileToDownload(null)
    }
  }, [downloadedFile])

  return (
    <>
      <Box
        sx={{
          padding: "0 50px",
        }}
      >
        <h1>{t('filesValidation')}</h1>
        {
          files && !isLoading &&
          <FileTree
            path={""}
            files={notValidatedFiles}
            isLoading={isLoading}
            onRefresh={() => refetch()}
            enableBackButton={false}
            enableFilterBar={false}
            enableCreateFile={false}
            enableAlterFileOrDirectory={false}
            onDetails={setDetailPanelContent}
            onDeleteFile={(file) => deleteDocument({id: file.id})}
            onDownloadFile={setFileToDownload}
            customizeContextMenu={(file, menu) => {
              menu.push({
                label: t("validate"),
                icon: <DoneIcon />,
                onClick: validateDocument != null ? () => validateDocument(file) : () => 0,
              });
              menu.push({
                label: t("deleteFileLabel"),
                icon: <DeleteIcon />,
                onClick: deleteDocument != null ? () => deleteDocument(file) : () => 0,
              });
              return menu;
            }}
            elementSx={{ opacity: 1 }}
          />
        }
        { 
          files && detailPanelContent != null &&
          <CenteredModal 
            open={detailPanelContent != null} 
            handleClose={() => setDetailPanelContent(null)}
          >
            <DetailModal file={detailPanelContent} />
          </CenteredModal>
        }
      </Box>
      { files && 
        <CenteredModal 
          open={detailPanelContent != null} 
          handleClose={() => setDetailPanelContent(null)}
        >
          <DetailModal file={detailPanelContent} />
        </CenteredModal>
      }
      {errorSnackbar}
      {successSnackbar}
    </>
  )
}
