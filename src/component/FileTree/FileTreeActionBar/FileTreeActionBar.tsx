import { Box, Button, IconButton, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRef } from "react";
import { useTranslation } from "react-i18next";

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

  /**
   * Boolean that indicate if the buttons to create file should be enabled.
   */
  enableCreateFile?: boolean;

  /**
   * Boolean that indicate if the buttons to create directory should be enabled.
   */
  enableCreateDirectory?: boolean;

  /**
   * Enables the back button (default: true).
   */
  enableBackButton?: boolean;

  /**
   * Enables the filter bar (default: true).
   */
  enableFilterBar?: boolean;

  /**
   * Callback called when the filter button is clicked
   * 
   * @param filterType  The type of the filter to apply
   * @param filterValue The filter value.
   */
  onFilter?: (filterType: string, filterValue: string) => void;
};

/**
 * The file tree action bar. This bar contains all the buttons that allows an user to interact with the file tree.
 */
export default function TreeActionBar({
  onAddDirectory,
  onAddFile,
  onRefresh,
  onBack,
  enableCreateFile,
  enableCreateDirectory,
  enableBackButton,
  enableFilterBar,
  onFilter,
}: TreeActionBarProps) {
  const { t } = useTranslation();
  // Input references
  const filterTypeRef = useRef<HTMLSelectElement | null>(null);
  const filterValueRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Box sx={{ 
        display: "flex",
        overflow: "auto",
        borderBottom: "1px solid lightgray",
      }}>
        {
          (enableBackButton ?? true)
          && <Tooltip title={t("actionBack")}>
            <IconButton onClick={onBack}>
              <ArrowBackIosNewIcon color="primary" />
            </IconButton>
          </Tooltip>
        }
        {
          enableCreateFile &&
          <Tooltip title={t("createFileLabel")}>
            <IconButton onClick={onAddFile}>
              <NoteAddIcon color="primary" />
            </IconButton>
          </Tooltip>
        }
        {
          enableCreateDirectory &&
          <Tooltip title={t("createDirectoryLabel")}>
            <IconButton
              onClick={onAddDirectory}
            >
              <CreateNewFolderIcon color="primary" />
            </IconButton>
          </Tooltip>
        }
        <Tooltip title={t("actionRefresh")}>
          <IconButton onClick={onRefresh != null ? () => onRefresh() : () => 0}>
            <RefreshIcon color="primary" />
          </IconButton>
        </Tooltip>

        {
          (enableFilterBar ?? true)
          && <>
            <Select
              defaultValue="title"
              size="small"
              inputRef={filterTypeRef}
              sx={{ minWidth: "100px", height: "100%", margin: "5px" }}
            >
              <MenuItem value="title">{t("detailTitle")}</MenuItem>
              <MenuItem value="description">{t("detailDescription")}</MenuItem>
              <MenuItem value="author">{t("detailAuthor")}</MenuItem>
            </Select>
            <TextField
              label={t("actionValue")}
              variant="outlined"
              size="small"
              inputRef={filterValueRef}
              sx={{ margin: "5px 0", minWidth: "100px" }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ minWidth: "80px", margin: "5px 5px" }}
              onClick={() => (onFilter ? onFilter(filterTypeRef.current?.value ?? "", filterValueRef.current?.value ?? "") : () => 0)}
            >
              {t("actionFilter")}
            </Button>
          </>
        }

        
      </Box>
    </>
  );
}
