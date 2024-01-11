import APIEndpoint from "@api/endpoint/APIEndpoint";
import CenteredModal from "@component/CenteredModal/CenteredModal";
import DetailModal from "@component/DetailModal/DetailModal";
import FileTree, { File } from "@component/FileTree/FileTree";
import useApi from "@hook/api/useApi";
import useApiMutation from "@hook/api/useApiMutation";
import useSnackbar from "@hook/snackbar/useSnackbar";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Followed() {
  // Error snackbar
  const { show, snackbar: errorSnackbar } = useSnackbar("Impossible de récupérer les dossiers suivis.", "warning")

  // Get the followed categories
  const { data: followedData, refetch, isLoading } = useApi(APIEndpoint.GET_FOLLOWED_CATEGORIES, {}, {
    queryKey: "followed",
    staleTime: 60000,
    onError: show,
  })
  const followedCategories: File[] = []
  if (followedData) {
    followedData.followedCategories.forEach(category => {
      followedCategories.push({
        id: category.id,
        path: category.path!,
        name: category.name,
        type: "directory",
        followed: true,
      })
    });
  }

  // State of the detail panel
  const [detailPanelContent, setDetailPanelContent] = useState<File | null>(null);

  // Unfollow handling
  const { mutate: unsubscribe } = useApiMutation(APIEndpoint.UNSUBSCRIBE_CATEGORY, null, false, {
    dataAsQueryParam: true,
    invalidateQueries: ["followed"]
  });
  const unsubscribeCategory = (category: File) => {
    unsubscribe({
      id: category.id
    })
  }

  return (
    <>    
      <Box
        sx={{
          padding: "0 50px",
        }}
      >
        <h1>Suivis</h1>
        <FileTree
          path={""}
          files={followedCategories}
          isLoading={isLoading}
          onRefresh={() => refetch()}
          enableBackButton={false}
          customizeContextMenu={(_file, menu) => menu.filter(item => item.label != "Télécharger")}
          onUnfollow={unsubscribeCategory}
          onDetails={setDetailPanelContent}
        />
        {errorSnackbar}
      </Box>
      { followedData && 
        <CenteredModal 
          open={detailPanelContent != null} 
          handleClose={() => setDetailPanelContent(null)}
        >
          <DetailModal file={detailPanelContent} />
        </CenteredModal>
      }
    </>
  )
}