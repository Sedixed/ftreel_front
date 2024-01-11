import DownloadIcon from "@mui/icons-material/Download";
import TreeElement from "@component/FileTree/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import FileTreeActionBar from "@component/FileTree/FileTreeActionBar/FileTreeActionBar";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import { CircularProgress } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

/**
 * The file grid properties.
 */
export type FileGridProps = {
  /**
   * The files associated to the path.
   */
  files: File[];

  /**
   * Boolean that indicates if the file tree is loading or not.
   */
  isLoading: boolean;

  /**
   * Callback to call when the refresh button is clicked.
   */
  onRefresh?: () => void;

  /**
   * Callback to call when the detail button is clicked in a file context menu.
   *
   * @param file The file we want to get the details.
   */
  onDetails?: (file: File) => void;

  /**
   * Callback to call when the validate button is clicked in a file context menu.
   *
   * @param file The file we want to validate.
   */
  onValidate?: (file: File) => void;

  /**
   * Callback called when the delete button is clicked.
   * 
   * @param file The file to delete
   */
  onDeleteFile?: (file: File) => void;
  onDeleteDirectory?: (file: File) => void;

  /**
   * Callabcks called when the downlaod button is clicked.
   * 
   * @param file The file to download.
   */
  onDownloadFile?: (file: File) => void;
  onDownloadDirectory?: (file: File) => void;
};

/**
 * The file type to give to the file grid.
 */
export type File = {
  /**
   * The file tree current path.
   */
  path: string;

  /**
   * The file's type (directory or file).
   */
  type: "directory" | "file";

  /**
   * The file's ID.
   */
  id: number;

  /**
   * The file's name.
   */
  name: string;

  /**
   * The file's description.
   */
  description: string;

  /**
   * The file's author.
   */
  author: string;

  /**
   * The file's extension.
   */
  extension: string;
};

/**
 * A file tree is a set of file (or directory) that are linked to other files.
 */
export default function FileGrid({
  files,
  isLoading,
  onRefresh,
  onDetails,
  onValidate,
  onDeleteFile,
  onDownloadFile,
}: FileGridProps) {
  const getContextMenuByFile = (file: File) => {
    const downloadOption = { label: "Télécharger", icon: <DownloadIcon /> };
    const detailOption = {
      label: "Détails",
      icon: <InfoIcon />,
      onClick: onDetails != null ? () => onDetails(file) : () => 0,
    };
    const validateOption = {
      label: "Valider",
      icon: <DoneIcon />,
      onClick: onValidate != null ? () => onValidate(file) : () => 0,
    };
    const deleteOption = {
      label: "Supprimer", 
      icon: <DeleteIcon />,
    };

    return [
      detailOption,
      validateOption,
      { ...downloadOption, onClick: onDownloadFile != null ? () => onDownloadFile(file) : () => 0 }, 
      { ...deleteOption, onClick: onDeleteFile != null ? () => onDeleteFile(file) : () => 0 },
    ];
  };

  return (
    <>
      <FileTreeActionBar
        onRefresh={() => (onRefresh != null ? onRefresh() : () => 0)}
        enableCreateFileOrDirectory={false}
        enableBackButton={false}
      />
      {isLoading && (
        <CenterDiv sx={{ paddingTop: "10px" }}>
          <CircularProgress sx={{ width: "30%" }} color="primary" />
        </CenterDiv>
      )}
      {!isLoading &&
        files.map((file) => (
          <TreeElement
            key={file.id}
            icon={<DescriptionIcon color="secondary" />}
            label={file.name}
            contextOptions={getContextMenuByFile(file)}
            href={undefined}
          />
        ))}
    </>
  );
}
