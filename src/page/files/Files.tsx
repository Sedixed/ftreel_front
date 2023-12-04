import TreeElement from "../../component/TreeElement/TreeElement";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import { Box } from "@mui/material";

export default function Files() {
  return (
    <>
      <Box sx={{ width: "90%", margin: "auto", paddingTop: "30px" }}>
        <h1>Fichiers</h1>
        <TreeElement
          icon={<FolderIcon color="secondary" />}
          label="Dossier 1"
          contextOptions={[{ label: "S'abonner" }, { label: "Télécharger" }]}
        />
        <TreeElement
          icon={<FolderIcon color="secondary" />}
          label="Dossier 2"
          contextOptions={[{ label: "S'abonner" }, { label: "Télécharger" }]}
        />
        <TreeElement
          icon={<DescriptionIcon color="secondary" />}
          label="Fichier 1"
          contextOptions={[{ label: "Télécharger" }]}
        />
      </Box>
    </>
  );
}
