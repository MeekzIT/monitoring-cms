import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { useIsMobile } from "../../hooks/useScreenType";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/actions/auth-action";

const ResetModal = ({ open, handleClose, role, currint }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

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
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("reset")} ?
        </Typography>
        <Typography>{t("resetText")}</Typography>
        <div className="mobile-modal-close-btn" onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </div>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(
                resetPassword({
                  id: currint,
                  role,
                })
              );
              handleClose();
            }}
          >
            {t("reset")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResetModal;
