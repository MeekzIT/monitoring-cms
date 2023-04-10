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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00a896",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "3px solid #00a896",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  width: "40%",
  minHeigth: "40%",
};

const Calculator = ({ open, handleClose, data }) => {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [changedData, setChangedData] = useState(null);
  console.log(changedData, data, "asdasd");
  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
  };

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setChangedData({
        whatherValue: data?.whatherValue,
        whaterSpeed: data?.whaterSpeed,
        liquidValue: data?.liquidValue,
        liquidSpeed: data?.liquidSpeed,
        energyValue: data?.energyValue,
      });
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          {t("calc")}
        </Typography>
        <Button
          variant="outlined"
          endIcon={
            showSettings ? (
              <ReplyIcon sx={{ color: "#00a896" }} />
            ) : (
              <SettingsSuggestIcon sx={{ color: "#00a896" }} />
            )
          }
          onClick={() => setShowSettings(!showSettings)}
        >
          {t("settings")}
        </Button>
        {!showSettings ? (
          <Box mt={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Function</TableCell>
                    <TableCell align="right">
                      <WaterDropIcon sx={{ color: "#00a896" }} />
                    </TableCell>
                    <TableCell align="right">
                      <ElectricBoltIcon sx={{ color: "#00a896" }} />
                    </TableCell>{" "}
                    <TableCell align="right">
                      <BubbleChartIcon sx={{ color: "#00a896" }} />
                    </TableCell>{" "}
                    <TableCell align="right">
                      <TimelapseIcon sx={{ color: "#00a896" }} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
        ) : (
          <Box mt={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">
                      Dessert (100g serving)
                    </StyledTableCell>
                    <StyledTableCell align="left">Calories</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {changedData.whatherValue}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <ChangeField
                        name="whatherValue"
                        value={changedData.whatherValue}
                        handleChangeData={handleChangeData}
                        title="Price of wather per minute"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {changedData.whaterSpeed}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <ChangeField
                        name="whaterSpeed"
                        value={changedData.whaterSpeed}
                        handleChangeData={handleChangeData}
                        title="Price of wather per cubic meter"
                      />
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left">
                      {changedData.liquidValue}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <ChangeField
                        name="liquidValue"
                        value={changedData.liquidValue}
                        handleChangeData={handleChangeData}
                        title="Liquid price"
                      />
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left">
                      {changedData.liquidSpeed}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <ChangeField
                        name="liquidSpeed"
                        value={changedData.liquidSpeed}
                        handleChangeData={handleChangeData}
                        title="Liquid of wather per minute"
                      />
                    </StyledTableCell>
                  </StyledTableRow>

                  <StyledTableRow>
                    <StyledTableCell align="left">
                      {changedData.energyValue}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <ChangeField
                        name="energyValue"
                        value={changedData.energyValue}
                        handleChangeData={handleChangeData}
                        title="Energy consumption "
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Calculator;
