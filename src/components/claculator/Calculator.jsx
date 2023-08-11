// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { useTranslation } from "react-i18next";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import WaterDropIcon from "@mui/icons-material/WaterDrop";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// import BubbleChartIcon from "@mui/icons-material/BubbleChart";
// import TimelapseIcon from "@mui/icons-material/Timelapse";
// import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
// import ReplyIcon from "@mui/icons-material/Reply";
// import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import ChangeField from "../changeField/ChangeField";
// import { useIsMobile } from "../../hooks/useScreenType";
// import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch } from "react-redux";
// import { editItemInfo } from "../../store/actions/users-action";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#21726A",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Calculator = ({ open, handleClose, data, itemInfoCalc }) => {
//   const { t } = useTranslation();
//   const isMobile = useIsMobile();
//   const dispatch = useDispatch();
//   const [showSettings, setShowSettings] = useState(false);
//   const [currentFunctionId, setCurrentFunctionID] = useState();
//   const [changedData, setChangedData] = useState(null);
//   const handleChangeData = (name, value) => {
//     changedData[name] = value;
//     setChangedData(changedData);
//     dispatch(editItemInfo(changedData));
//   };

//   useEffect(() => {
//     if (data !== null && data !== undefined) {
//       setChangedData(data);
//     }
//   }, [data]);

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: isMobile ? "100%" : 800,
//     bgcolor: "background.paper",
//     border: "3px solid #21726A",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: "10px",
//     minHeight: isMobile ? "100vh" : 400,
//     maxHeight: isMobile ? "100vh" : 600,
//     display: isMobile && "flex",
//     justifyContent: isMobile && "center",
//     alignItems: isMobile && "center",
//     flexDirection: isMobile && "column",
//     gap: isMobile && "20px",
//     overflowY: "scroll",
//   };

//   console.log(currentFunctionId, "111111111111111111111111");
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <div className="mobile-modal-close-btn" onClick={handleClose}>
//           <CloseIcon fontSize="large" />
//         </div>
//         <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
//           {t("calc")}
//         </Typography>
//         {showSettings && (
//           <Button
//             variant="outlined"
//             endIcon={<ReplyIcon sx={{ color: "#21726A" }} />}
//             onClick={() => setShowSettings(!showSettings)}
//           >
//             {t("settings")}
//           </Button>
//         )}
//         {!showSettings ? (
//           <Box mt={2}>
//             <Box sx={{ overflow: "auto" }}>
//               <Box
//                 sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
//               >
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell align="left">{t("rejim")}</TableCell>
//                         <TableCell align="left">
//                           <WaterDropIcon sx={{ color: "#21726A" }} />
//                         </TableCell>
//                         <TableCell align="left">
//                           <ElectricBoltIcon sx={{ color: "#21726A" }} />
//                         </TableCell>{" "}
//                         <TableCell align="left">
//                           <BubbleChartIcon sx={{ color: "#21726A" }} />
//                         </TableCell>{" "}
//                         <TableCell align="left">
//                           <TimelapseIcon sx={{ color: "#21726A" }} />
//                         </TableCell>
//                         <TableCell align="right">{t("settings")}</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {itemInfoCalc?.map((row) => (
//                         <TableRow
//                           key={row.modeName}
//                           sx={{
//                             "&:last-child td, &:last-child th": { border: 0 },
//                           }}
//                         >
//                           <TableCell component="th" scope="row" align="left">
//                             {t(row.modeName)}
//                           </TableCell>
//                           <TableCell align="left">{row.water}</TableCell>
//                           <TableCell align="left">{row.electric}</TableCell>
//                           <TableCell align="left">{row.modeValue}</TableCell>
//                           <TableCell align="left">{row.seconds}</TableCell>
//                           <TableCell align="right">
//                             <Button
//                               variant="outlined"
//                               endIcon={
//                                 <SettingsSuggestIcon
//                                   sx={{ color: "#21726A" }}
//                                 />
//                               }
//                               onClick={() => {
//                                 setShowSettings(!showSettings);
//                                 setCurrentFunctionID(row.functionId);
//                               }}
//                             >
//                               {t("settings")}
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>
//             </Box>
//           </Box>
//         ) : (
//           <Box mt={2}>
//             <Box sx={{ overflow: "auto" }}>
//               <Box
//                 sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
//               >
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                       <TableRow>
//                         <StyledTableCell align="left">
//                           Current Data
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           {t("edit")}
//                         </StyledTableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <StyledTableRow>
//                         <StyledTableCell component="th" scope="row">
//                           {changedData?.power} KW
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           <ChangeField
//                             name="power"
//                             value={changedData?.power}
//                             handleChangeData={handleChangeData}
//                             title={t("power")}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>
//                       <StyledTableRow>
//                         <StyledTableCell component="th" scope="row">
//                           {changedData?.water} dram / m 3
//                         </StyledTableCell>
//                         <StyledTableCell component="th" scope="row">
//                           <ChangeField
//                             name="water"
//                             value={changedData?.water}
//                             handleChangeData={handleChangeData}
//                             title={t("water")}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>
//                       <StyledTableRow>
//                         <StyledTableCell component="th" scope="row">
//                           {changedData?.modeValue1}
//                         </StyledTableCell>
//                         <StyledTableCell component="th" scope="row">
//                           <ChangeField
//                             name="modeValue1"
//                             value={changedData?.modeValue1}
//                             handleChangeData={handleChangeData}
//                             title={`${t("modeValue")} №1`}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>

//                       <StyledTableRow>
//                         <StyledTableCell align="left">
//                           {changedData?.modeValue2}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           <ChangeField
//                             name="modeValue2"
//                             value={changedData?.modeValue2}
//                             handleChangeData={handleChangeData}
//                             title={`${t("modeValue")} №2`}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>

//                       <StyledTableRow>
//                         <StyledTableCell align="left">
//                           {changedData?.modeValue3}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           <ChangeField
//                             name="modeValue3"
//                             value={changedData?.modeValue3}
//                             handleChangeData={handleChangeData}
//                             title={`${t("modeValue")} №3`}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>

//                       <StyledTableRow>
//                         <StyledTableCell align="left">
//                           {changedData?.modeValue4}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           <ChangeField
//                             name="modeValue4"
//                             value={changedData?.modeValue4}
//                             handleChangeData={handleChangeData}
//                             title={`${t("modeValue")} №4`}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>

//                       <StyledTableRow>
//                         <StyledTableCell align="left">
//                           {changedData?.modeValue5}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           <ChangeField
//                             name="modeValu5"
//                             value={changedData?.modeValue5}
//                             handleChangeData={handleChangeData}
//                             title={`${t("modeValue")} №5`}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>

//                       <StyledTableRow>
//                         <StyledTableCell align="left">
//                           {changedData?.modeValue6}
//                         </StyledTableCell>
//                         <StyledTableCell align="left">
//                           <ChangeField
//                             name="modeValu6"
//                             value={changedData?.modeValue6}
//                             handleChangeData={handleChangeData}
//                             title={`${t("modeValue")} №6`}
//                           />
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default Calculator;

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Calculator = ({ open, handleClose, data, itemInfoCalc }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [currentFunctionId, setCurrentFunctionID] = useState();
  const [changedData, setChangedData] = useState(null);

  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
    dispatch(editItemInfo(changedData));
  };

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setCurrentFunctionID(data[0]?.functionId);
      setChangedData(data[0]);
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
    minHeight: isMobile ? "100vh" : 400,
    maxHeight: isMobile ? "100vh" : 600,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
    overflowY: "scroll",
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
                                setChangedData(
                                  data?.filter(
                                    (i) => i.functionId == row.functionId
                                  )[0]
                                );
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
                        <StyledTableCell align="left">
                          {t("edit")}
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {changedData?.enginePower} KW
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="enginePower"
                            value={changedData?.enginePower}
                            handleChangeData={handleChangeData}
                            title={t("enginePower")}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {changedData?.electricPrice} ㎥
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <ChangeField
                            name="electricPrice"
                            value={changedData?.electricPrice}
                            handleChangeData={handleChangeData}
                            title={t("electricPrice")}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {changedData?.waterPrice}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <ChangeField
                            name="waterPrice"
                            value={changedData?.waterPrice}
                            handleChangeData={handleChangeData}
                            title={`${t("waterPrice")}`}
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.waterPerMinute}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="waterPerMinute"
                            value={changedData?.waterPerMinute}
                            handleChangeData={handleChangeData}
                            title={`${t("waterPerMinute")}`}
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.modeValuePerLitre}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeField
                            name="modeValuePerLitre"
                            value={changedData?.modeValuePerLitre}
                            handleChangeData={handleChangeData}
                            title={`${t("modeValuePerLitre")}`}
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.PrcentOfRegulator} %
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <ChangeSelect
                            name="PrcentOfRegulator"
                            value={changedData?.PrcentOfRegulator}
                            handleChangeData={handleChangeData}
                            title={`${t("PrcentOfRegulator")}`}
                            options={options}
                          />
                        </StyledTableCell>
                      </StyledTableRow>

                      <StyledTableRow>
                        <StyledTableCell align="left">
                          {changedData?.PrcetOfModeValueFirst} /{" "}
                          {changedData?.PrcetOfModeValueSecond}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <DoubleField
                            title={t("PrcentOfRegulator")}
                            nameFirst={"PrcetOfModeValueFirst"}
                            nameSecond={"PrcetOfModeValueSecond"}
                            firstValue={changedData?.PrcetOfModeValueFirst}
                            secondValue={changedData?.PrcetOfModeValueSecond}
                            handleChangeData={handleChangeData}
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
