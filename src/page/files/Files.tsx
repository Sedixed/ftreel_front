import TreeElement from "../../component/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import { Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { ContextMenuOption } from "@component/ContextMenu/ContextMenu";
import { ApplicationRoute } from "@constant/ApplicationRoute/ApplicationRoute";
import { buildURL } from "@utils/url-utils";
import { useSearchParams } from "react-router-dom";

export default function Files() {
  // Get the current position in the file tree
  const currentSearchParams = useSearchParams();
  const currentTreePath = currentSearchParams[0].get("path") ?? "/";

  // Send an API request to get the current files
  const filesRequestSearchParam = new URLSearchParams();
  filesRequestSearchParam.append("path", currentTreePath);
  const { data: files, error } = useApi(APIEndpoint.FILES, undefined, {
    queryKey: "/files" + currentTreePath,
    searchParams: filesRequestSearchParam,
    staleTime: 60000,
  });

  // Constants that contains the context menus content depending on the file type
  const fileContextMenuOptions: ContextMenuOption[] = [
    { label: "Télécharger", icon: <DownloadIcon /> },
  ];
  const directoryContextMenuOptions: ContextMenuOption[] = [
    { label: "Télécharger", icon: <DownloadIcon /> },
    { label: "S'abonner", icon: <BookmarkIcon /> },
  ];

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Box sx={{ width: "90%", margin: "auto", paddingTop: "30px" }}>
        <h1>Fichiers</h1>
        {files &&
          files.map((file) => (
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
                      path: currentTreePath + file.name + "/",
                    })
              }
            />
          ))}
      </Box>
    </>
  );
}
