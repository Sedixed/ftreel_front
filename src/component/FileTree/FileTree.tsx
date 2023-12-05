import { ContextMenuOption } from "@component/ContextMenu/ContextMenu";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { buildURL } from "@utils/url-utils";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TreeElement from "@component/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";

export type FileTreeProps = {
  path: string;
  files: File[];
};

export type File = {
  id: number;
  path: string;
  type: "directory" | "file";
  name: string;
};

export default function FileTree({ path, files }: FileTreeProps) {
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
      {files.map((file) => (
        <TreeElement
          key={file.path + file.name}
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
