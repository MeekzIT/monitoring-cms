import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ChangeField from "../changeField/ChangeField";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  editItemInfo,
  getItemInfoCalc,
} from "../../store/actions/users-action";
import DoubleField from "../changeField/DoubleField";
import ChangeSelect from "../changeField/ChangedSelect";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#21726A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Calculator = ({
  open,
  handleClose,
  data,
  itemInfoCalc,
  active,
  ownerID,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [currentFunctionId, setCurrentFunctionID] = useState();
  const [currentData, setCurrentData] = useState(null);
  const [changedData, setChangedData] = useState({});

  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
    dispatch(
      editItemInfo({
        ...changedData,
        functionId: currentFunctionId,
        ownerID: data[0].ownerID,
        active,
      })
    );
    setChangedData({});
  };
  useEffect(() => {
    dispatch(getItemInfoCalc(ownerID));
    if (data !== null && data !== undefined && currentFunctionId) {
      setCurrentData(data?.filter((i) => i.functionId == currentFunctionId)[0]);
    }
  }, [data, currentFunctionId, ownerID]);

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
    maxWidth: isMobile ? 600 : 800,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
    overflowY: "scroll",
    marginTop: "30px",
  };

  const generateOptions = () => {
    const options = [];
    for (let i = 2; i <= 100; i += 2) {
      options.push(i);
    }
    return options;
  };
  const options = generateOptions();
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
        {showSettings && (
          <Button
            variant="outlined"
            endIcon={<ReplyIcon sx={{ color: "#21726A" }} />}
            onClick={() => setShowSettings(!showSettings)}
            className="settings-icon"
          >
            {t("settings")}
          </Button>
        )}
        {!showSettings ? (
          <Box mt={2}>
            <Box sx={{ overflow: "auto" }}>
              <Box
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">{t("rejim")}</TableCell>
                        <TableCell align="left">
                          <WaterDropIcon sx={{ color: "#21726A" }} />
                        </TableCell>
                        <TableCell align="left">
                          <ElectricBoltIcon sx={{ color: "#21726A" }} />
                        </TableCell>{" "}
                        <TableCell align="left">
                          <BubbleChartIcon sx={{ color: "#21726A" }} />
                        </TableCell>{" "}
                        <TableCell align="left">
                          <TimelapseIcon sx={{ color: "#21726A" }} />
                        </TableCell>
                        <TableCell align="right">{t("settings")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {itemInfoCalc?.map((row) => (
                        <TableRow
                          key={row.modeName}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {t(row.modeName)}
                          </TableCell>
                          <TableCell align="left">{row.water}</TableCell>
                          <TableCell align="left">{row.electric}</TableCell>
                          <TableCell align="left">{row.modeValue}</TableCell>
                          <TableCell align="left">{row.seconds}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              endIcon={
                                <SettingsSuggestIcon
                                  sx={{ color: "#21726A" }}
                                />
                              }
                              onClick={() => {
                                setShowSettings(!showSettings);
                                // setChangedData(
                                //   data?.filter(
                                //     (i) => i.functionId == row.functionId
                                //   )[0]
                                // );
                                setCurrentFunctionID(row.functionId);
                              }}
                            >
                              {t("settings")}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            mt={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box m={2}>
              <h1>{t("edit")}</h1>
            </Box>

            <Box m={2}>
              <ChangeField
                name="enginePower"
                value={changedData?.enginePower || currentData?.enginePower}
                handleChangeData={handleChangeData}
                title={t("enginePower")}
              />
            </Box>

            <Box m={2}>
              <ChangeField
                name="electricPrice"
                value={changedData?.electricPrice || currentData?.electricPrice}
                handleChangeData={handleChangeData}
                title={t("electricPrice")}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                name="waterPerMinute"
                value={
                  changedData?.waterPerMinute || currentData?.waterPerMinute
                }
                handleChangeData={handleChangeData}
                title={`${t("waterPerMinute")}`}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                name="waterPrice"
                value={changedData?.waterPrice || currentData?.waterPrice}
                handleChangeData={handleChangeData}
                title={`${t("waterPrice")}`}
              />
            </Box>
            <Box m={2}>
              <ChangeField
                name="modeValuePerLitre"
                value={
                  changedData?.modeValuePerLitre ||
                  currentData?.modeValuePerLitre
                }
                handleChangeData={handleChangeData}
                title={`${t("modeValuePerLitre")}`}
              />
            </Box>
            <Box m={2}>
              <ChangeSelect
                name="PrcentOfRegulator"
                value={
                  changedData?.PrcentOfRegulator ||
                  currentData?.PrcentOfRegulator
                }
                handleChangeData={handleChangeData}
                title={`${t("PrcentOfRegulator")}`}
                options={options}
              />
            </Box>
            <Box m={2}>
              <DoubleField
                title={t("PrcetOfModeValueFirst")}
                nameFirst={"PrcetOfModeValueFirst"}
                nameSecond={"PrcetOfModeValueSecond"}
                firstValue={
                  changedData?.PrcetOfModeValueFirst ||
                  currentData?.PrcetOfModeValueFirst
                }
                secondValue={
                  changedData?.PrcetOfModeValueSecond ||
                  currentData?.PrcetOfModeValueSecond
                }
                handleChangeData={handleChangeData}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Calculator;
