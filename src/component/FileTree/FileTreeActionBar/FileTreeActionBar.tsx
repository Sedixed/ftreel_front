import { Box, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
// import CenteredModal from "@component/CenteredModal/CenteredModal";
// import CreateFileForm from "@component/CreateFileForm/CreateFileForm";
// import { useState } from "react";
// import useSnackbar from "@hook/snackbar/useSnackbar";
// import useApiMutation from "@hook/api/useApiMutation";
// import APIEndpoint from "@api/endpoint/APIEndpoint";

/**
 * The file tree action bar.
 */
export type TreeActionBarProps = {
  /**
   * Callback called when the add directory button is clicked.
   */
  onAddDirectory?: () => void;

  /**
   * Callback called when the add file button is clicked.
   */
  onAddFile?: () => void;

  /**
   * Callback called when the refresh button is clicked.
   */
  onRefresh?: () => void;
};

/**
 * The file tree action bar. This bar contains all the buttons that allows an user to interact with the file tree.
 */
export default function TreeActionBar({
  onAddDirectory,
  onAddFile,
  onRefresh,
}: TreeActionBarProps) {

  return (
    <>
      <Box sx={{ borderBottom: "1px solid lightgray" }}>
        <Tooltip title="Créer un fichier">
          <IconButton onClick={onAddFile}>
            <NoteAddIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Créer un dossier">
          <IconButton
            onClick={onAddDirectory}
          >
            <CreateNewFolderIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Rafraîchir">
          <IconButton onClick={onRefresh != null ? () => onRefresh() : () => 0}>
            <RefreshIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* <CenteredModal
        open={openFileCreate}
        handleClose={() => setOpenFileCreate(false)}
        sx={{ padding: "0 10px 10px 10px", width: "clamp(200px, 50%, 500px)" }}
      >
        <CreateFileForm onSubmit={createFile} />
      </CenteredModal> */}
    </>
  );
}
