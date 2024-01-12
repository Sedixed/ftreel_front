import { Box, IconButton, Modal, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

export type CenteredModalProps = {
  open: boolean;

  handleClose: () => void;

  sx?: SxProps<Theme>

  children: ReactNode;
}

export default function CenteredModal({ open, handleClose, sx, children }: CenteredModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
          borderRadius: "5px",
          minWidth: "50%",
          padding: "0 10px 10px 10px",
          margin: 0,
          outline: 'none',
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          ...sx
        }}
        >
        {children}
        <IconButton
          style={{ position: 'absolute', top: 5, right: 5 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  )
}