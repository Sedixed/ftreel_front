import { Box, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

  /**
   * Callback called when the go back button is clicked.
   */
  onBack?: () => void;
};

/**
 * The file tree action bar. This bar contains all the buttons that allows an user to interact with the file tree.
 */
export default function TreeActionBar({
  onAddDirectory,
  onAddFile,
  onRefresh,
  onBack,
}: TreeActionBarProps) {

  return (
    <>
      <Box sx={{ borderBottom: "1px solid lightgray" }}>
        <Tooltip title="Revenir en arrière">
          <IconButton onClick={onBack}>
            <ArrowBackIosNewIcon color="primary" />
          </IconButton>
        </Tooltip>
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
    </>
  );
}
