import { Box, Dialog, DialogTitle, DialogContent, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";
import { dialogTitleSx, modalSX } from "../../../utils/StylesHelper/Modal";
import { useIsMutating } from "@tanstack/react-query";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string | number;
};

function Modal({ open, handleClose, title, children, maxWidth }: ModalProps) {
  const theme = useTheme();
  const isMutating = useIsMutating() > 0;

  return (
    <Dialog
      open={open}
      onClose={isMutating ? () => {} : handleClose}
      PaperProps={{
        sx: {
          ...modalSX(theme),
          maxWidth: maxWidth || "60rem",
          width: "100%",
        },
      }}
      closeAfterTransition={false}
    >
      {title && (
        <DialogTitle sx={dialogTitleSx}>
          {title}
          <IconButton onClick={handleClose} sx={{ p: 0, ml: 1 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ p: 0 }}>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
