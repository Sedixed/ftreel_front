import { Box, IconButton, Menu, MenuItem, SxProps, Theme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

/**
 * The context menu properties.
 */
export type ContextMenuProps = {
  /**
   * The context menu options (choices).
   */
  options: ContextMenuOption[];

  /**
   * The context menu button style.
   */
  sx?: SxProps<Theme>;
};

/**
 * A context menu option (element).
 */
export type ContextMenuOption = {
  /**
   * Label of the option.
   */
  label: string;

  /**
   * Callback called when the option is clicked
   */
  onClick?: (e: ContextMenuOptionClicked) => void;
};

/**
 * Type passed as a parameter to the options onClick callback.
 */
export type ContextMenuOptionClicked = {
  label: string;
};

/**
 * A clickable icon that show up some options.
 */
export function ContextMenu({ options, sx }: ContextMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            <span
              onClick={() =>
                option.onClick != null
                  ? option.onClick({ label: option.label })
                  : null
              }
            >
              {option.label}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
