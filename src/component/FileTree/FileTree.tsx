import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { buildURL } from "@utils/url-utils";
import DownloadIcon from "@mui/icons-material/Download";
import TreeElement from "@component/FileTree/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import InfoIcon from "@mui/icons-material/Info";
import FileTreeActionBar from "@component/FileTree/FileTreeActionBar/FileTreeActionBar";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import { CircularProgress, SxProps, Theme } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";

/**
 * The file tree properties.
 */
export type FileTreeProps = {
  /**
   * The file tree current path.
   */
  path: string;

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
  onRefresh?: (path: string) => void;

  /**
   * Callback to call when the detail button is clicked in a file context menu.
   *
   * @param file The file we want to get the details.
   */
  onDetails?: (file: File) => void;

  /**
   * Callback called when the create file button is clicked.
   */
  onCreateFile?: () => void;

  /**
   * Callback called when the create directory button is clicked.
   */
  onCreateDirectory?: () => void;

  /**
   * Callback called when the subscribe button is clicked.
   * 
   * @param file The file to subscribe.
   */
  onFollow?: (file: File) => void;

  /**
   * Callback called when the unsubscribe button is clicked.
   * 
   * @param file The file to unsubscribe.
   */
  onUnfollow?: (file: File) => void;

  /**
   * Callback called when the delete button is clicked.
   * 
   * @param file The file to delete
   */
  onDeleteFile?: (file: File) => void;
  onDeleteDirectory?: (file: File) => void;
  
  /**
   * Callback called when the update button is clicked.
   * 
   * @param file The file to update
   */
  onUpdateFile?: (file: File) => void;
  onUpdateDirectory?: (file: File) => void;

  /**
   * Callback called when the back button is clicked.
   * 
   * @param newPath The new file tree path.
   */
  onBack?: (newPath: string) => void;

  /**
   * Callabcks called when the downlaod button is clicked.
   * 
   * @param file The file to download.
   */
  onDownloadFile?: (file: File) => void;
  onDownloadDirectory?: (file: File) => void;

  /**
   * Callback called when the filter button is clicked
   * 
   * @param filterType  The type of the filter to apply
   * @param filterValue The filter value.
   */
  onFilter?: (filterType: string, filterValue: string) => void;

  /**
   * Boolean that indicate if the buttons to create, delete or update
   * a file should be enabled.
   */
  enableAlterFileOrDirectory?: boolean;

  /**
   * Boolean that indicate if the buttons to create a file should be enabled.
   */
  enableCreateFile?: boolean;

  /**
   * Indicates if the file tree should have a back button or not (default: true).
   */
  enableBackButton?: boolean;

  /**
   * Enables the filter bar (default: true).
   */
  enableFilterBar?: boolean;

  /**
   * Callback called to customize the files context menu items.
   * 
   * @param   file The file to customize the context menu.
   * @param   menu The current context menu of this file
   * @returns      The new context menu.
   */
  customizeContextMenu?: (file: File, menu: { onClick: () => void, label: string, icon: JSX.Element}[]) => {
    onClick: () => void;
    label: string;
    icon: JSX.Element;
  }[];

  elementSx?: SxProps<Theme>;
};

/**
 * The file type to give to the file tree.
 */
export type File = {
  /**
   * The file's ID.
   */
  id: number;

  /**
   * The file's path.
   */
  path: string;

  /**
   * The file's type (directory or file).
   */
  type: "directory" | "file";

  /**
   * The file's name.
   */
  name: string;

  /**
   * The file's description.
   */
  description?: string;

  /**
   * The file's author.
   */
  author?: string;

  /**
   * The file's extension.
   */
  extension?: string;

  /**
   * Indicates if the file is followed or not (default: false).
   */
  followed?: boolean;

  /**
   * Indicates if the file is like or not by the current user (default: false).
   */
  liked?: boolean;

  /**
   * Indicates file's likes count.
   */
  nbLikes?: number;

  /**
   * Indicates if the file has been validated or not (default: false).
   */
  isValidated?: boolean;
};

/**
 * A file tree is a set of file (or directory) that are linked to other files.
 */
export default function FileTree({
  path,
  files,
  isLoading,
  onRefresh,
  onDetails,
  onCreateFile,
  onUpdateFile,
  onCreateDirectory,
  onUpdateDirectory,
  onDeleteDirectory,
  onDeleteFile,
  onBack,
  onFollow,
  onUnfollow,
  onFilter,
  onDownloadFile,
  onDownloadDirectory,
  enableAlterFileOrDirectory,
  enableCreateFile,
  enableBackButton,
  enableFilterBar,
  customizeContextMenu,
  elementSx,
}: FileTreeProps) {
  // Translation
  const { t } = useTranslation()

  const getContextMenuByFile = (file: File) => {
    const downloadOption = { label: t("downloadLabel"), icon: <DownloadIcon /> };
    const detailOption = {
      label: t("detailsLabel"),
      icon: <InfoIcon />,
      onClick: onDetails != null ? () => onDetails(file) : () => 0,
    };
    const followOption = { 
      label: file.followed ? t("unfollowLabel") : t("followLabel"), 
      icon: file.followed ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />, 
      onClick: file.followed 
        ? onUnfollow != null ? () => onUnfollow(file) : () => 0 
        : onFollow != null ? () => onFollow(file) : () => 0 
    };

    if (enableAlterFileOrDirectory) {
      const updateOption = {
        label: t("updateFileLabel"),
        icon: <EditIcon />,
        onClick: onUpdateFile != null ? () => onUpdateFile(file) : () => 0,
      };
      const deleteOption = {
        label: t("deleteFileLabel"), 
        icon: <DeleteIcon />,
      };
      if (file.type == "file") {
        return [
          { ...downloadOption, onClick: onDownloadFile != null ? () => onDownloadFile(file) : () => 0 }, 
          { ...updateOption, onClick: onUpdateFile != null ? () => onUpdateFile(file) : () => 0 },
          { ...deleteOption, onClick: onDeleteFile != null ? () => onDeleteFile(file) : () => 0 },
          detailOption,
        ];
      } else {
        return [
          { ...downloadOption, onClick: onDownloadDirectory != null ? () => onDownloadDirectory(file) : () => 0 },
          followOption, 
          { ...updateOption, onClick: onUpdateDirectory != null ? () => onUpdateDirectory(file) : () => 0 },
          { ...deleteOption, onClick: onDeleteDirectory != null ? () => onDeleteDirectory(file) : () => 0 },
          detailOption,
        ];
      }
    } else {
      if (file.type == "file") {
        return [
          { ...downloadOption, onClick: onDownloadFile != null ? () => onDownloadFile(file) : () => 0 }, 
          detailOption,
        ];
      } else {
        return [
          { ...downloadOption, onClick: onDownloadDirectory != null ? () => onDownloadDirectory(file) : () => 0 },
          followOption,
          detailOption,
        ];
      }
    }
  };

  return (
    <>
      <FileTreeActionBar
        onRefresh={() => (onRefresh != null ? onRefresh(path) : () => 0)}
        onAddDirectory={onCreateDirectory}
        onAddFile={onCreateFile}
        onBack={() => {
          if (path == "/") {
            return "/";
          }
          
          let newPath = path.split("/")
          if (path !== "/") {
            newPath.pop();
            newPath.pop();
          }
          newPath = [newPath.join("/")]

          return onBack != null ? onBack(newPath[0] == "" ? "/" : newPath[0] + "/") : () => 0
        }}
        enableCreateFile={enableCreateFile}
        enableCreateDirectory={enableAlterFileOrDirectory}
        onFilter={onFilter}
        enableBackButton={enableBackButton ?? true}
        enableFilterBar={enableFilterBar ?? true}
      />
      {isLoading && (
        <CenterDiv sx={{ paddingTop: "10px" }}>
          <CircularProgress sx={{ width: "30%" }} color="primary" />
        </CenterDiv>
      )}
      {!isLoading &&
        files.map((file) => (
          <TreeElement
            key={file.type == "directory" ? "d" + file.id : "f" + file.id}
            icon={
              file.type == "file" ? (
                <DescriptionIcon color="secondary" />
              ) : (
                <FolderIcon color="secondary" />
              )
            }
            label={file.name}
            contextOptions={customizeContextMenu != null ? customizeContextMenu(file, getContextMenuByFile(file)) : getContextMenuByFile(file)}
            href={
              file.type == "file"
                ? undefined
                : buildURL(ApplicationRoute.FILES, {
                    path: file.path + "/",
                  })
            }
            sx={{
              cursor: file.type == "directory" ? "pointer" : "auto",
              opacity: file.type == "file" && !file.isValidated ? 0.5 : 1,
              ...elementSx
            }}
          />
        ))}
    </>
  );
}
