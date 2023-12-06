import { Box, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
}

/**
 * The file tree action bar. This bar contains all the buttons that allows an user to interact with the file tree.
 */
export default function TreeActionBar({ onAddDirectory, onAddFile, onRefresh }: TreeActionBarProps) {
  return (
    <Box>
      <Tooltip title="Créer un fichier">
        <IconButton onClick={onAddDirectory != null ? () => onAddDirectory() : () => 0}>  
          <NoteAddIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Créer un dossier">
        <IconButton onClick={onAddFile != null ? () => onAddFile() : () => 0}>  
          <CreateNewFolderIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rafraîchir">
        <IconButton onClick={onRefresh != null ? () => onRefresh() : () => 0}>  
          <RefreshIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
