import { Box, IconButton } from "@mui/material";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useSearchParams } from "react-router-dom";
import FileTree, { File } from "@component/FileTree/FileTree";
import CloseIcon from "@mui/icons-material/Close";
import useSnackbar from "@hook/snackbar/useSnackbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// TODO :
// - Ajouter chemin courant
// - Ajouter possibilité de revenir en arrière via le chemin courant
// - Ajouter détails de fichier

export default function Files() {

  const { t } = useTranslation();

  // State of the detail panel
  const [detailPanelContent, setDetailPanelContent] = useState<File | null>(
    null
  );
  const detailPanelWidth = 350;
  const detailOpenDuration = 0.3;

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
    data: files,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.FILES, undefined, {
    queryKey: "/files" + currentTreePath,
    searchParams: filesRequestSearchParam,
    staleTime: 60000,
    onError: showError,
  });

  return (
    <>
      <Box
        sx={{
          padding: "0 50px",
          width:
            detailPanelContent != null
              ? `calc(100% - ${detailPanelWidth}px)`
              : "100%",
          transition: `width ${detailOpenDuration}s`,
        }}
      >
        <h1>{t('filesFiles')}</h1>
        <FileTree
          path={currentTreePath}
          files={files != null ? files : []}
          onRefresh={() => refetch()}
          onDetails={setDetailPanelContent}
          isLoading={isLoading}
        />
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: detailPanelContent != null ? `${detailPanelWidth}px` : "0",
          paddingLeft: detailPanelContent != null ? "10px" : "0",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px 0px #000000",
          transition: `width ${detailOpenDuration}s`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: `${detailPanelWidth}px`,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: "0px", right: "10px" }}
            onClick={() => setDetailPanelContent(null)}
          >
            <CloseIcon color="primary" />
          </IconButton>
          {/* <h2>{detailPanelContent?.name}</h2> */}
        </Box>
      </Box>
      {errorSnackbar}
    </>
  );
}
