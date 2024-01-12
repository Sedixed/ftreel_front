import { File } from "@component/FileTree/FileTree"
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next"

/**
 * DetailModal properties.
 */
export type DetailModalProps = {
  /**
   * The file to display details.
   */
  file: File | null
}

/**
 * Modal showing a file details.
 */
export default function DetailModal({ file }: DetailModalProps) {
  // Translation
  const { t } = useTranslation();
  const theme = useTheme();

  if (file == null) {
    return <></>
  }
  
  return (    
    <>
      <Box sx={{ margin: "15px" }}>
      { file.type == "directory" && (
        <>
          <h2>{t("titleDirectory")} : {file.name}</h2>
          <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailFollow")} : {" "}
          <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
            {file.followed ? t("yes") : t("no")}
          </span></Typography>
        </>)
      }
      {
        file.type == "file" && (
        <>
          <h2>{t("titleFile")} : {file.name}</h2>
          <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailDescription")} : {" "}
          <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
          {file.description}
          </span></Typography>
          <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailAuthor")} : {" "}
          <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
          {file.author}
          </span></Typography>
          <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailLiked")} : {" "}
          <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
          {file.liked ? t("yes") : t("no")}
          </span></Typography>
          <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailNbLikes")} : {" "}
          <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
          {file.nbLikes}
          </span></Typography>
          <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailExtension")} : {" "}
          <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
          {file.extension}
          </span></Typography>
        </>)
      }
      <Typography style={{ textAlign: 'left' }} variant="h5">{t("detailPath")} : {" "}
        <span style={{ fontWeight: 'bold', color: theme.palette.primary.light }}> 
          {file.path}
      </span></Typography>
      </Box>
    </>
  )
}