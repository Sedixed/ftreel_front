import { useEffect, useState } from 'react';
import useApi from '@hook/api/useApi';
import APIEndpoint from '@api/endpoint/APIEndpoint';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CenteredModal from '@component/CenteredModal/CenteredModal';
import DetailModal from '@component/DetailModal/DetailModal';
import useSnackbar from '@hook/snackbar/useSnackbar';
import FileGrid, { File } from "@component/FileGrid/FileGrid";
import useApiMutation from '@hook/api/useApiMutation';
import { downloadBase64 } from '@utils/download-utils';
import { useQueryClient } from 'react-query';

export default function ValidationPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  // Setup the error snackbar
  const { snackbar: errorSnackbar, show: showError } = useSnackbar(
    "Impossible de récupérer les fichiers.",
    "warning"
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
    staleTime: 60000,
    onError: showError,
  });

  // Filter files to match them with the FileTree "file" property
  let fileGridFiles: File[] = [];
  if (files) {
    fileGridFiles = files.map((file): File => {
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

  // API mutations for delete
  const { 
    mutate: deleteDocument,
    reset: resetDeleteDocument,
    isSuccess: deletedDocumentSucess,
  } = useApiMutation(APIEndpoint.DELETE_DOCUMENT, null, false, { dataAsQueryParam: true });
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
          <FileGrid
            files={fileGridFiles}
            onRefresh={() => refetch()}
            onDetails={setDetailPanelContent}
            onDeleteFile={(file) => deleteDocument({id: file.id})}
            isLoading={isLoading}
            onDownloadFile={setFileToDownload}
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
    </>
  )
}
