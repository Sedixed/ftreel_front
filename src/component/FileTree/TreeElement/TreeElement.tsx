import {
  ContextMenu,
  ContextMenuOption,
} from "@component/ContextMenu/ContextMenu";
import { Box, SxProps, Theme, useTheme, hexToRgb } from "@mui/material";
import { ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * The TreeElement component properties.
 */
export type TreeElementProps = {
  /**
   * The tree element icon.
   */
  icon: ReactNode;

  /**
   * The element label.
   */
  label: string;

  /**
   * Options to add on a context menu.
   */
  contextOptions?: ContextMenuOption[];

  /**
   * Callback called when the element is clicked.
   */
  onClick?: (e: ClickedTreeElement) => void;

  /**
   * An URL to redirect when the element is clicked. If defined it override the onClick callback.
   */
  href?: string;

  /**
   * The style applied to the element container.
   */
  sx?: SxProps<Theme>;
};

/**
 * Type passed as a parameter to the onClick callback.
 */
export type ClickedTreeElement = {
  /**
   * The element label.
   */
  label: string;

  /**
   * The element href.
   */
  href?: string;
};

/**
 * Represents a tree element.
 */
export default function TreeElement({
  icon,
  label,
  contextOptions,
  onClick,
  href,
  sx,
}: TreeElementProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const containerOnClick = useCallback(() => {
    if (href != null) {
      navigate(href);
    } else if (onClick != null) {
      onClick({ label, href });
    }
  }, [href]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        height: "50px",
        borderBottom: "1px solid lightgray",
        ":hover": {
          backgroundColor: hexToRgb(theme.palette.primary.main + "10"),
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "50px",
        }}
        onClick={containerOnClick}
      >
        {icon}
      </Box>
      <Box
        sx={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
        onClick={containerOnClick}
      >
        {label}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        {contextOptions != null && <ContextMenu options={contextOptions} />}
      </Box>
    </Box>
  );
}
