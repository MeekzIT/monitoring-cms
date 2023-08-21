import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useScreenType";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { useDispatch, useSelector } from "react-redux";
import { generatedId } from "../../store/actions/users-action";
import { getMe } from "../../store/actions/auth-action";

const GenerateModal = ({ open, setOpen, ownerId }) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const newId = useSelector((state) => state.user.generated);
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: "background.paper",
    border: "3px solid #21726A",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    minHeight: isMobile ? "100vh" : null,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Generate new ID
        </Typography>
        <Box
          m={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() =>
              dispatch(
                generatedId({
                  ownerId: 4444,
                })
              )
            }
          >
            Genarate
          </Button>
          {newId && (
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h4">
                {newId}
              </Typography>
            </Box>
          )}
          {newId && (
            <Box>
              <Button onClick={() => copyToClipboard(newId)}>Copy</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default GenerateModal;
