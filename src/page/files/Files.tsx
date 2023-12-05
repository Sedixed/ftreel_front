import { Box, CircularProgress } from "@mui/material";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useSearchParams } from "react-router-dom";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import FileTree from "@component/FileTree/FileTree";

// TODO :
// - Ajouter loader
// - Ajouter bouton refresh
// - Ajouter chemin courant
// - Ajouter possibilité de revenir en arrière via le chemin courant
// - Ajouter détails de fichier

export default function Files() {
  // Get the current position in the file tree
  const currentSearchParams = useSearchParams();
  const currentTreePath = currentSearchParams[0].get("path") ?? "/";

  // Send an API request to get the current files
  const filesRequestSearchParam = new URLSearchParams();
  filesRequestSearchParam.append("path", currentTreePath);
  const {
    data: files,
    error,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.FILES, undefined, {
    queryKey: "/files" + currentTreePath,
    searchParams: filesRequestSearchParam,
    staleTime: 60000,
  });

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Box sx={{ width: "90%", margin: "auto", paddingTop: "30px" }}>
        <h1>Fichiers</h1>
        {isLoading && (
          <CenterDiv sx={{ maxWidth: "30%", margin: "auto" }}>
            <CircularProgress color="primary" />
          </CenterDiv>
        )}
        {files && <FileTree path={currentTreePath} files={files} />}
      </Box>
    </>
  );
}
