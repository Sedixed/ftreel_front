import APIEndpoint from "@api/endpoint/APIEndpoint";
import FileTree, { File } from "@component/FileTree/FileTree";
import useApi from "@hook/api/useApi";
import useSnackbar from "@hook/snackbar/useSnackbar";
import { Box } from "@mui/material";

export default function Followed() {
  // Error snackbar
  const { show, snackbar: errorSnackbar } = useSnackbar("Impossible de récupérer les dossiers suivis.", "warning")

  // Get the followed categories
  const { data: followedData, refetch, isLoading } = useApi(APIEndpoint.GET_FOLLOWED_CATEGORIES, null, {
    staleTime: 60000,
    onError: show,
  })
  const followedCategories: File[] = []
  if (followedData) {
    followedData.followedCategories.forEach(category => {
      followedCategories.push({
        id: category.id,
        path: "/",
        name: category.name,
        type: "directory",
      })
    });
  }

  return (
    <Box
      sx={{
        padding: "0 50px",
      }}
    >
      <h1>Suivis</h1>
      <FileTree
        path={"/"}
        files={followedCategories}
        isLoading={isLoading}
        onRefresh={() => refetch()}
        enableBackButton={false}
      />
      {errorSnackbar}
    </Box>
  )
}