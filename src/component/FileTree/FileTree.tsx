import { ContextMenuOption } from "@component/ContextMenu/ContextMenu";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { buildURL } from "@utils/url-utils";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TreeElement from "@component/FileTree/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box } from "@mui/material";

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

  onRefresh?: (path: string) => void;
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
export default function FileTree({ path, files, onRefresh }: FileTreeProps) {
  // Constants that contains the context menus content depending on the file type
  const fileContextMenuOptions: ContextMenuOption[] = [
    { label: "Télécharger", icon: <DownloadIcon /> },
  ];
  const directoryContextMenuOptions: ContextMenuOption[] = [
    { label: "Télécharger", icon: <DownloadIcon /> },
    { label: "S'abonner", icon: <BookmarkIcon /> },
  ];

  return (
    <>
      <RefreshIcon
        sx={{ cursor: "pointer" }}
        color="primary"
        onClick={onRefresh != null ? () => onRefresh(path) : () => 0}
      />
      {files.map((file) => (
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
          contextOptions={
            file.type == "file"
              ? fileContextMenuOptions
              : directoryContextMenuOptions
          }
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
