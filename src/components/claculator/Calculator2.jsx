import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ChangeField from "../changeField/ChangeField";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  editItemInfo,
  getItemInfoCalc2,
} from "../../store/actions/users-action";
import { getCurrency } from "../../hooks/helpers";

const Calculator2 = ({
  open,
  handleClose,
  data,
  itemInfoCalc,
  active,
  countryId,
  ownerID,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [changedData, setChangedData] = useState({});
  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
    dispatch(
      editItemInfo({
        ...changedData,
        ownerID: data[0]?.ownerID,
        active: active,
      })
    );
    setChangedData({});
  };

  useEffect(() => {
    dispatch(getItemInfoCalc2(ownerID));
  }, [ownerID]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 800,
    bgcolor: "background.paper",
    border: "3px solid #21726A",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    minHeight: isMobile ? "100vh" : 400,
    maxHeight: isMobile && 600,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
    overflowY: "scroll",
    marginTop: "30px",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="mobile-modal-close-btn" onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {t("calc")}
        </Typography>

        {data && (
          <Box
            mt={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box m={2}>
              <ChangeField
                value={data[0]?.first}
                name="first"
                handleChangeData={handleChangeData}
                // eslint-disable-next-line no-useless-concat
                title={t("calc-first") + " " + t("L")}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                value={data[0]?.value1}
                name="value1"
                handleChangeData={handleChangeData}
                title={t("calc-value1")}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                value={data[0]?.time1}
                name="time1"
                handleChangeData={handleChangeData}
                title={t("calc-time1") + " " + t("sec")}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                value={data[0]?.second}
                name="second"
                handleChangeData={handleChangeData}
                // eslint-disable-next-line no-useless-concat
                title={t("calc-second") + " " + t("L")}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                value={data[0]?.value2}
                name="value2"
                handleChangeData={handleChangeData}
                title={t("calc-value2")}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                value={data[0]?.time2}
                name="time2"
                handleChangeData={handleChangeData}
                title={t("calc-time2") + " " + t("sec")}
              />
            </Box>
          </Box>
        )}
        <hr />
        {itemInfoCalc && (
          <Box
            mt={2}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              {t("total")} {itemInfoCalc.firstValue + itemInfoCalc.secondValue}{" "}
              {getCurrency(countryId)}
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Calculator2;
