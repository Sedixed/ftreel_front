import { Box, Link } from "@mui/material";
import useApi from "@hook/api/useApi";
import APIEndpoint from "@api/endpoint/APIEndpoint";
import { useSearchParams } from "react-router-dom";
import FileTree, { File } from "@component/FileTree/FileTree";
import useSnackbar from "@hook/snackbar/useSnackbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import DetailModal from "@component/DetailModal/DetailModal";
import CreateFileModal from "@component/CreateFileModal/CreateFileModal";
import CreateDirectoryModal from "@component/CreateDirectoryModal/CreateDirectoryModal";
import useApiMutation from "@hook/api/useApiMutation";
import UpdateFileModal from "@component/UpdateFileModal/UpdateFileModal";
import UpdateDirectoryModal from "@component/UpdateDirectoryModal/UpdateDirectoryModal";
import CategorySkeletonResponseDTO from "@api/dto/response/category/CategorySkeletonResponseDTO";
import DocumentSkeletonResponseDTO from "@api/dto/response/document/DocumentSkeletonResponseDTO";
import { Base64FileInfoTree, downloadBase64, zipFilesAndDownload } from "@utils/download-utils";
import { useQueryClient } from "react-query";
import { buildSearchParamsNullSafe, buildURLWithQueryParams } from "@utils/url-utils";
import CategoryResponseDTO from "@api/dto/response/category/CategoryResponseDTO";
import DocumentResponseDTO from "@api/dto/response/document/DocumentResponseDTO";
import useGetLogginAdmin from "@hook/user/useGetLogginAdmin";
import LikeIcon from "@mui/icons-material/ThumbUp";
import UnlikeIcon from '@mui/icons-material/ThumbDown';
import { Breadcrumbs } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Files() {
  const { t } = useTranslation();
  const { containsAdmin } = useGetLogginAdmin();

  const queryClient = useQueryClient();

  // State of the detail panel
  const [detailPanelContent, setDetailPanelContent] = useState<File | null>(
    null
  );

  // State of the create file modal
  const [createFileModalOpen, setCreateFileModalOpen] = useState(false);

  // State of the create file modal
  const [updateFileModalOpen, setUpdateFileModalOpen] = useState(false);

  // State of the create directory modal
  const [createDirectoryModalOpen, setCreateDirectoryModalOpen] = useState(false);

  // State of the create file modal
  const [updateDirectoryModalOpen, setUpdateDirectoryModalOpen] = useState(false);

  // Setup the error snackbar
  const { snackbar: errorSnackbar, show: showError } = useSnackbar(
    t("getRequestError"),
    "warning",
    { horizontal: 'right', vertical: 'bottom' },
    3000
  );

  // Setup the success delete snackbar
  const { snackbar: successSnackbar, show: showSuccess } = useSnackbar(
    t("getRequestSuccess"),
    "success",
    { horizontal: 'right', vertical: 'bottom' },
    1000
  );

  // Setup selected file for update
  const [selectedFile, setSelectedFile] =
    useState<DocumentSkeletonResponseDTO>({
      id: 0,
      title: "",
      description: "",
      extension: "",
      author: "",
      path: "",
      liked: false,
      nbLikes: 0,
      isValidated: false,
    });

  // Setup selected directory for update
  const [selectedDirectory, setSelectedDirectory] =
    useState<CategorySkeletonResponseDTO>({
      id: 0,
      name: "",
      path: "",
    });

  // Get the current position in the file tree
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = (key: string, value: string) => {
    setSearchParams({[key]: value})    ;   
  }
  const currentTreePath = currentSearchParams.get("path") ?? "/";
  const pathItems = currentTreePath.split('/').filter(Boolean);

  // Send an API request to get the current files
  const [fetchFilter, setFetchFilter] = useState({
    filter: "title",
    value: "",
  })
  const fetchSearchParams = buildSearchParamsNullSafe({
    path: currentTreePath,
    ...fetchFilter
  });
  const {
    data: category,
    isLoading,
    refetch,
  } = useApi(APIEndpoint.GET_CATEGORY_WITH_PATH, undefined, {
    queryKey: "/files" + currentTreePath,
    searchParams: fetchSearchParams,
    staleTime: 60000,
    onError: showError,
  });
  useEffect(() => {
    refetch();
  }, [fetchFilter]);

  // Filter files to match them with the FileTree "file" property
  let fileTreeFiles: File[] = [];
  if (category) {
    fileTreeFiles = category.childrenCategories
      .map((category): File => {
        return {
          id: category.id,
          name: category.name,
          path: category.path,
          type: "directory",
          followed: category.subscribed
        }
      })
      .concat(category.childrenDocuments.map((file): File => {
        return {
          id: file.id,
          name: file.title,
          path: file.path,
          author: file.author,
          description: file.description,
          extension: file.extension,
          type: "file",
          liked: file.liked,
          nbLikes: file.nbLikes,
          isValidated: file.isValidated,
        }
      }))
  }

  // API mutations for delete
  const { 
    mutate: deleteDocument,
    reset: resetDeleteDocument,
    isSuccess: deletedDocumentSucess,
  } = useApiMutation(APIEndpoint.DELETE_DOCUMENT, null, false, { 
    dataAsQueryParam: true,
    invalidateQueries: ["notValidatedFiles"],
    onSuccess: showSuccess,
  });
  const { 
    mutate: deleteCategory,
    reset: resetDeleteCategory,
    isSuccess: deletedCategorySucess,
  } = useApiMutation(APIEndpoint.DELETE_CATEGORY, null, false, { 
    dataAsQueryParam: true,
    invalidateQueries: ["notValidatedFiles"],
    onSuccess: showSuccess, 
  });
  if (deletedDocumentSucess) {
    refetch()
    resetDeleteDocument()
  }
  if (deletedCategorySucess) {
    refetch()
    resetDeleteCategory()
  }

  // Download file handling
  const [fileToDownload, setFileToDownload] = useState<File | null>(null)
  const { data: downloadedFile, refetch: refetchDownloadFile } = useApi(
    APIEndpoint.GET_DOCUMENT, 
    { id: fileToDownload?.id ?? 0 }, 
    { enabled: false, queryKey: "downloadedFile" }
  );
  useEffect(() => {
    if (fileToDownload != null) {
      refetchDownloadFile();
    }
  }, [fileToDownload]);
  useEffect(() => {
    if (downloadedFile != null) {
      downloadBase64({
        base64: downloadedFile.base64, 
        mime: downloadedFile.contentType, 
        name: downloadedFile.title,
        type: "file",
      });
      queryClient.removeQueries("downloadedFile")
      setFileToDownload(null)
    }
  }, [downloadedFile])

  // Download directory handling
  const [directoryToDownload, setDirectoryToDownload] = useState<File | null>(null);
  useEffect(() => {
    if (directoryToDownload != null) {
      buildBase64Tree(directoryToDownload).then(tree => zipFilesAndDownload(tree));
      setDirectoryToDownload(null);
    }
  }, [directoryToDownload]);
  const buildBase64Tree = async (directory: File): Promise<Base64FileInfoTree[]> => {
    // Extract current directory tree
    const response = await fetch(
      buildURLWithQueryParams(APIEndpoint.GET_CATEGORY.toApiUrl(), { id: `${directory.id}` }), 
      {
        credentials: "include"
      }
    )
    const tree = await response.json() as CategoryResponseDTO;
    
    // Recursively search all the files of directories
    const base64categories: Base64FileInfoTree[] = [];
    const subcategories = await Promise.all(tree.childrenCategories.map(async category => {
      return await buildBase64Tree({
        id: category.id, 
        name: category.name, 
        path: directory.path + category.name + "/",
        type: "directory"
      });
    }));
    subcategories.forEach(subcategory => {
      base64categories.push(...subcategory);
    });
    
    // Add all the files
    const files: Base64FileInfoTree[] = await Promise.all(tree.childrenDocuments.map(async (file): Promise<Base64FileInfoTree> => {
      const fileResponse = await fetch(
        buildURLWithQueryParams(APIEndpoint.GET_DOCUMENT.toApiUrl(), { id: `${file.id}` }), 
        {
          credentials: "include"
        }
      )
      const fileWithContent = await fileResponse.json() as DocumentResponseDTO;
      return { name: file.title, type: "file", base64: fileWithContent.base64, mime: file.extension, childrens: [] }
    }));

    return [{ name: directory.name, type: "directory", childrens: [ ...base64categories, ...files ] }]
  }

  // Follow handling
  const { mutate: subscribe, isSuccess: isFollowSuccess } = useApiMutation(APIEndpoint.SUBSCRIBE_CATEGORY, null, false, {
    dataAsQueryParam: true,
    invalidateQueries: ["followed"],
    onSuccess: showSuccess,
  });
  const { mutate: unsubscribe, isSuccess: isUnfollowSuccess } = useApiMutation(APIEndpoint.UNSUBSCRIBE_CATEGORY, null, false, {
    dataAsQueryParam: true,
    invalidateQueries: ["followed"],
    onSuccess: showSuccess,
  });
  const subscribeCategory = (category: File) => {
    subscribe({
      id: category.id
    })
  }
  const unsubscribeCategory = (category: File) => {
    unsubscribe({
      id: category.id
    })
  }
  useEffect(() => {
    refetch();
  }, [isUnfollowSuccess, isFollowSuccess])

  // Like handling
  const { mutate: like, isSuccess: isLikeSuccess } = useApiMutation(APIEndpoint.LIKE_DOCUMENT, null, false, {
    dataAsQueryParam: true,
    invalidateQueries: ["liked"],
    onSuccess: showSuccess,
  });
  const { mutate: unlike, isSuccess: isUnlikeSuccess } = useApiMutation(APIEndpoint.UNLIKE_DOCUMENT, null, false, {
    dataAsQueryParam: true,
    invalidateQueries: ["liked"],
    onSuccess: showSuccess,
  });
  const likeFile = (file: File) => {
    like({
      id: file.id
    })
  }
  const unlikeFile = (file: File) => {
    unlike({
      id: file.id
    })
  }
  useEffect(() => {
    refetch();
  }, [isUnlikeSuccess, isLikeSuccess])

  // Filter handling
  const onFilter = (type: string, value: string) => {
    setFetchFilter({ filter: type, value: value })
  }

  return (
    <>
      <Box
        sx={{
          padding: "0 50px",
        }}
      >
        <h1>{t('filesFiles')}</h1>
        <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "10px" }}>
          <Link
          component={RouterLink}
            to="/files/" 
            onClick={() => updateSearchParams("path", "/")}
            sx={{ textDecoration: "none" }}
          >
            {t("root")}
          </Link>
          {pathItems.map((item, index) => (
            <Link
              key={index}
              component={RouterLink}
              to={`/files?path=${pathItems.slice(0, index + 1).join('/')}`}
              onClick={() => updateSearchParams("path", `/${pathItems.slice(0, index + 1).join('/')}`)}
              sx={{ textDecoration: "none" }}
            >
              {item}
            </Link>
          ))}
        </Breadcrumbs>
        <FileTree
          path={currentTreePath}
          files={fileTreeFiles}
          onRefresh={() => refetch()}
          onDetails={setDetailPanelContent}
          onCreateFile={() => setCreateFileModalOpen(true)}
          onUpdateFile={(file) => {
            setUpdateFileModalOpen(true);
            setSelectedFile({ 
              id: file.id, title: file.name, description: file.description || "",
              extension: file.extension || "", author: file.author || "", path: file.path,
              liked: file.liked || false, nbLikes: file.nbLikes || 0,
              isValidated: file.isValidated || false,
            });
          }}
          onCreateDirectory={() => setCreateDirectoryModalOpen(true)}
          onUpdateDirectory={(file) => {
            setUpdateDirectoryModalOpen(true);
            setSelectedDirectory(file);
          }}
          onDeleteDirectory={(file) => deleteCategory({id: file.id})}
          onDeleteFile={(file) => deleteDocument({id: file.id})}
          isLoading={isLoading}
          onBack={(newPath) => updateSearchParams("path", newPath)}
          onDownloadDirectory={setDirectoryToDownload}
          onDownloadFile={setFileToDownload}
          onFollow={subscribeCategory}
          onUnfollow={unsubscribeCategory}
          enableAlterFileOrDirectory={containsAdmin}
          enableCreateFile={true}
          onFilter={onFilter}
          customizeContextMenu={(file, menu) => {
            if (file.type === "file") {
              menu.push(
                { 
                  label: file.liked ? t("unlikeLabel") : t("likeLabel"), 
                  icon: file.liked ? <UnlikeIcon /> : <LikeIcon />, 
                  onClick: file.liked 
                    ? unlikeFile != null ? () => unlikeFile(file) : () => 0 
                    : likeFile != null ? () => likeFile(file) : () => 0 
                }
              );
            }
            
            return menu;
          }}
        />
      </Box>
      { category && 
        <CenteredModal 
          open={detailPanelContent != null} 
          handleClose={() => setDetailPanelContent(null)}
        >
          <DetailModal file={detailPanelContent} />
        </CenteredModal>
      }
      {
        category && 
        <CenteredModal open={createFileModalOpen} handleClose={() => setCreateFileModalOpen(false)}>
          <CreateFileModal 
            categoryId={category?.id ?? 0} 
            onSuccess={() => {
              setCreateFileModalOpen(false);
              showSuccess();
              refetch();
            }}
          />
        </CenteredModal>
      }
      {
        category && 
        <CenteredModal open={updateFileModalOpen} handleClose={() => setUpdateFileModalOpen(false)}>
          <UpdateFileModal
            categoryId={category?.id ?? 0}
            currentFile={selectedFile}
            onSuccess={() => {
              setUpdateFileModalOpen(false);
              showSuccess();
              refetch();
            }}
          />
        </CenteredModal>
      }
      {
        category &&
        <CenteredModal open={createDirectoryModalOpen} handleClose={() => setCreateDirectoryModalOpen(false)}>
          <CreateDirectoryModal 
            categoryId={category?.id ?? 0} 
            onSuccess={() => {
              setCreateDirectoryModalOpen(false);
              showSuccess();
              refetch();
            }}
          />
        </CenteredModal>
      }
      {
        category && 
        <CenteredModal open={updateDirectoryModalOpen} handleClose={() => setUpdateDirectoryModalOpen(false)}>
          <UpdateDirectoryModal
            categoryId={category?.id ?? 0} 
            currentDirectory={selectedDirectory}
            onSuccess={() => {
              setUpdateDirectoryModalOpen(false);
              showSuccess();
              refetch();
            }}
          />
        </CenteredModal>
      }
      {errorSnackbar}
      {successSnackbar}
    </>
  );
}
