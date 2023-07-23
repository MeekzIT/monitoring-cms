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
import { editItemInfo } from "../../store/actions/users-action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#21726A",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("№ 1 wather", "20k", "22k", 0, "4.2k"),
  createData("№ 2 foam", "5.4k", "5.1k", "166k", "2.0k"),
  createData("№ 3 wax", "3.0k", "9.1k", "166k", "0.3k"),
  createData("№ 4 warm", "0", "0", "0", "0"),
  createData("№ 5 cleaner", "0", "0", "0", "0"),
  createData("Total", "98.6", "561", "149", "6.5k"),
];

const Calculator = ({ open, handleClose, data }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [changedData, setChangedData] = useState(null);
  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
    dispatch(editItemInfo(changedData));
  };

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setChangedData(data);
    }
  }, [data]);

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
    minHeight: isMobile ? "100vh" : null,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
  };

  console.log(changedData, "111111111111111111111111");
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
        <Button
          variant="outlined"
          endIcon={
            showSettings ? (
              <ReplyIcon sx={{ color: "#21726A" }} />
            ) : (
              <SettingsSuggestIcon sx={{ color: "#21726A" }} />
            )
          }
          onClick={() => setShowSettings(!showSettings)}
        >
          {t("settings")}
        </Button>
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
                        <TableCell>Function</TableCell>
                        <TableCell align="right">
                          <WaterDropIcon sx={{ color: "#21726A" }} />
                        </TableCell>
                        <TableCell align="right">
                          <ElectricBoltIcon sx={{ color: "#21726A" }} />
                        </TableCell>{" "}
                        <TableCell align="right">
                          <BubbleChartIcon sx={{ color: "#21726A" }} />
                        </TableCell>{" "}
                        <TableCell align="right">
                          <TimelapseIcon sx={{ color: "#21726A" }} />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box mt={2}>
            <Box sx={{ overflow: "auto" }}>
              <Box
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">
                          Current Data
                        </StyledTableCell>
                        <StyledTableCell align="left">Edit</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {changedData?.power} KV
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="power"
                            value={changedData?.power}
                            handleChangeData={handleChangeData}
                            title="Power"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {changedData?.modeValue1}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <ChangeField
                            name="modeValue1"
                            value={changedData?.modeValue1}
                            handleChangeData={handleChangeData}
                            title="modeValue1"
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.modeValue2}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="modeValue2"
                            value={changedData?.modeValue2}
                            handleChangeData={handleChangeData}
                            title="modeValue2"
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.modeValue3}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="modeValue3"
                            value={changedData?.modeValue3}
                            handleChangeData={handleChangeData}
                            title="modeValue3"
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.modeValue4}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="modeValue4"
                            value={changedData?.modeValue4}
                            handleChangeData={handleChangeData}
                            title="modeValue4"
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.modeValue5}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="modeValu5"
                            value={changedData?.modeValue5}
                            handleChangeData={handleChangeData}
                            title="modeValue5"
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.modeValue6}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="modeValu6"
                            value={changedData?.modeValue6}
                            handleChangeData={handleChangeData}
                            title="modeValue6"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Calculator;
