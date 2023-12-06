import { Box } from "@mui/material";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useSearchParams } from "react-router-dom";
import FileTree from "@component/FileTree/FileTree";
import useSnackbar from "@hook/snackbar/useSnackbar";

// TODO :
// - Ajouter chemin courant
// - Ajouter possibilité de revenir en arrière via le chemin courant
// - Ajouter détails de fichier

export default function Files() {
  // Get the current position in the file tree
  const currentSearchParams = useSearchParams();
  const currentTreePath = currentSearchParams[0].get("path") ?? "/";

  // Setup the error snackbar
  const { snackbar: errorSnackbar, show: showError } = useSnackbar("Impossible de récupérer les fichiers.", "warning");

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
    onError: () => showError()
  });

  return (
    <>
      <Box sx={{ width: "90%", margin: "auto", paddingTop: "30px" }}>
        <h1>Fichiers</h1>
        <FileTree
            path={currentTreePath}
            files={files != null ? files : []}
            onRefresh={() => refetch()}
            isLoading={isLoading}
          />
      </Box>
      {errorSnackbar}
    </>
  );
}
