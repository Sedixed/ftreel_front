import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { buildURL } from "@utils/url-utils";
import DownloadIcon from "@mui/icons-material/Download";
import TreeElement from "@component/FileTree/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import InfoIcon from "@mui/icons-material/Info";
import FileTreeActionBar from "@component/FileTree/FileTreeActionBar/FileTreeActionBar";
import CenterDiv from "@component/CenterDiv/CenterDiv";
import { CircularProgress } from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

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
}: FileTreeProps) {
  const getContextMenuByFile = (file: File) => {
    const downloadOption = { label: "Télécharger", icon: <DownloadIcon /> };
    const detailOption = {
      label: "Détails",
      icon: <InfoIcon />,
      onClick: onDetails != null ? () => onDetails(file) : () => 0,
    };
    const followOption = { label: "Suivre", icon: <BookmarkAddIcon /> };

    if (file.type == "file") {
      return [downloadOption, detailOption];
    } else {
      return [downloadOption, followOption, detailOption];
    }
  };

  return (
    <>
      <FileTreeActionBar
        onRefresh={() => (onRefresh != null ? onRefresh(path) : () => 0)}
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
            icon={
              file.type == "file" ? (
                <DescriptionIcon color="secondary" />
              ) : (
                <FolderIcon color="secondary" />
              )
            }
            label={file.name}
            contextOptions={getContextMenuByFile(file)}
            href={
              file.type == "file"
                ? undefined
                : buildURL(ApplicationRoute.FILES, {
                    path: path + file.name + "/",
                  })
            }
          />
        ))}
    </>
  );
}
