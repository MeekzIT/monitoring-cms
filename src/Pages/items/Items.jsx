import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { USERS_PAGE, ADMINS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import {
  getBoxLinear,
  getBoxes,
  getBoxesInfo,
  getSingleBoxInfo,
  getSingleOwners,
  getSingleUser,
  changeName,
} from "../../store/actions/users-action";
import { useTheme } from "@mui/material/styles";
import { useIsMobile } from "../../hooks/useScreenType";
import { compareWithUTC } from "../../hooks/helpers";
import CircleIcon from "@mui/icons-material/Circle";
import DonutChart from "../../components/graphics/Dount";
import CloseIcon from "@mui/icons-material/Close";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CalculateIcon from "@mui/icons-material/Calculate";
import { getCurrency } from "../../hooks/helpers";
import TableHead from "@mui/material/TableHead";
import GoBack from "../../components/goBack/GoBack";
import LineChart from "../../components/graphics/LineChart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import GenerateModal from "../../components/generateModal/GenerateModal";
import dayjs from "dayjs";

const Items = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const items = useSelector((state) => state.user.items);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const singleBoxInfo = useSelector((state) => state.user.singleBoxInfo);
  const boxLinear = useSelector((state) => state.user.boxLinear);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [expand, setExpand] = useState(false);
  const [selectedDate, handleDateChange] = useState();
  const [dountDate, handleDountDateChange] = useState();
  const [dountDate2, handleDountDateChange2] = useState();
  const [openGenerate, setOpenGenerate] = useState(false);
  const [current, setCurrent] = useState(null);
  const [name, setName] = useState("");
  const [openName, setOpenName] = useState(false);

  const handleNested = (id) => {
    if (typeof expand == "boolean") {
      setExpand(id);
    } else setExpand(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 800,
    bgcolor: "background.paper",
    border: "3px solid #008491",
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

  const styleName = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: "background.paper",
    border: "3px solid #008491",
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
  useEffect(() => {
    dispatch(
      getSingleBoxInfo({
        ownerId: owner_id,
        boxId: id,
        date: dountDate,
        endDate: dountDate2,
      })
    );
    if (!dountDate || !dountDate2) {
      dispatch(
        getBoxLinear({
          ownerId: owner_id,
          date: selectedDate,
          boxId: id,
        })
      );
    } else {
      dispatch(
        getBoxLinear({
          ownerId: owner_id,
          date: dountDate,
          endDate: dountDate2,
          boxId: id,
        })
      );
    }
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id, id));
  }, [selectedDate, dountDate, dountDate2]);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);
  return (
    <div>
      <Box m={2}>
        <GoBack prevPath={location.pathname} />
      </Box>
      <hr />
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
        className="grapsBox"
      >
        <div className="grap">
          <div className="grapsBox">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="start"
                  format="YYYY-MM-DD"
                  onChange={(date) =>
                    handleDountDateChange(dayjs(date).format("YYYY-MM-DD"))
                  }
                  sx={{ width: "250px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="end"
                  format="YYYY-MM-DD"
                  onChange={(date) =>
                    handleDountDateChange2(dayjs(date).format("YYYY-MM-DD"))
                  }
                  sx={{ width: "250px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {(dountDate || dountDate2) && (
              <Button
                onClick={() => {
                  handleDountDateChange();
                  handleDountDateChange2();
                }}
              >
                clear filtres
              </Button>
            )}
          </div>
          {singleBoxInfo !== null && (
            <>
              <DonutChart
                benefit={100 - singleBoxInfo?.ratio}
                expenses={singleBoxInfo?.ratio}
                expensesValue={singleBoxInfo?.expense}
                benefitValue={singleBoxInfo?.benefit}
                countryId={user?.countryId}
                openStatistics={openStatistics}
                setOpenStatistics={setOpenStatistics}
                show={true}
              />
              <div>
                <hr />
                <Typography className="coint-show-heading">
                  {" "}
                  <MonetizationOnIcon sx={{ color: "#008491" }} />
                  <div> Coin - {singleBoxInfo?.coin}</div>
                </Typography>
                <hr />
                <Typography className="coint-show-heading">
                  {" "}
                  <LocalAtmIcon sx={{ color: "#008491" }} />
                  <div> Bill - {singleBoxInfo?.cash}</div>
                </Typography>
                <hr />
                <Typography className="coint-show-heading">
                  <PaymentIcon sx={{ color: "#008491" }} />
                  <div> Cash Less - {singleBoxInfo?.bill}</div>
                </Typography>
                <hr />
              </div>
            </>
          )}
        </div>
        <Box className="grap">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker", "DatePicker", "DatePicker"]}
            >
              <DatePicker
                label={"date"}
                views={["month", "year"]}
                format="YYYY-MM"
                onChange={(date) =>
                  handleDateChange(dayjs(date).format("YYYY-MM"))
                }
                sx={{ width: "250px" }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {selectedDate && (
            <Button
              onClick={() => {
                handleDateChange();
              }}
            >
              clear filtres
            </Button>
          )}
          <LineChart
            benefit={boxLinear?.map((i) => {
              return i.result;
            })}
            expense={boxLinear?.map((i) => {
              return i.caxs;
            })}
            all={boxLinear?.map((i) => {
              return i.all;
            })}
            mont={selectedDate}
            startDate={dountDate}
            endDate={dountDate2}
          />
        </Box>
      </div>

      <hr />
      <div>
        <Box m={2}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => setOpenGenerate(true)}
          >
            {t("Generate")}
          </Button>
        </Box>
        <hr />
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {items?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {compareWithUTC(row.datatime) ? (
                          <span className="online">
                            <CircleIcon />
                            {/* {t("online")} */}
                          </span>
                        ) : (
                          <span className="offline">
                            <CircleIcon />
                            {/* {t("offline")} */}
                          </span>
                        )}
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            // navigate(`/admin-user/${row.id}`);
                            navigate(
                              `/owner/${owner_id}/item/${id}/${row.p2}/${row.p0}`
                            );
                          }}
                        >
                          <RemoveRedEyeIcon
                            sx={{
                              color: "white",
                            }}
                          />
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setCurrent(row.p2);
                            setName(row.name);
                            setOpenName(true);
                          }}
                        >
                          {t("edit")}
                        </Button>
                      </TableCell>
                      <TableCell align="left">ID-{row.p2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Modal
          open={openStatistics}
          onClose={() => {
            setOpenStatistics(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("statistics")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenStatistics(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>
            <Box>
              <Box sx={{ overflow: "auto" }}>
                <Box
                  sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
                >
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">ID</TableCell>
                          <TableCell align="left">type</TableCell>
                          <TableCell align="left">benefit</TableCell>
                          <TableCell align="left">exspence</TableCell>
                          <TableCell align="left">prcent</TableCell>
                          <TableCell>Expand</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {singleBoxInfo?.allResult?.map((row) => (
                          <TableRow
                            key={row.modeName}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">
                              {row.type == 1 ? t("moika") : t("cux")}
                            </TableCell>
                            <TableCell align="left">
                              {row.result} {getCurrency(user?.countryId)}
                            </TableCell>
                            <TableCell align="left">
                              {row.caxs} {getCurrency(user?.countryId)}
                            </TableCell>
                            <TableCell align="left">
                              {Math.round(100 - row.ratio)} %
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Button
                                onClick={() => handleNested(row.id)}
                                variant="outlined"
                              >
                                <CalculateIcon />
                              </Button>
                            </TableCell>
                            <TableCell align="left"></TableCell>

                            {expand === row.id ? (
                              <TableRow>
                                <TableCell colSpan="1">
                                  {row.data ? (
                                    <Table
                                      sx={{ minWidth: 650 }}
                                      aria-label="simple table"
                                    >
                                      <TableHead>
                                        <TableRow>
                                          <TableCell align="left">
                                            {t("rejim")}
                                          </TableCell>
                                          <TableCell align="left">
                                            <WaterDropIcon
                                              sx={{ color: "#008491" }}
                                            />
                                          </TableCell>
                                          <TableCell align="left">
                                            <ElectricBoltIcon
                                              sx={{ color: "#008491" }}
                                            />
                                          </TableCell>{" "}
                                          <TableCell align="left">
                                            <BubbleChartIcon
                                              sx={{ color: "#008491" }}
                                            />
                                          </TableCell>{" "}
                                          <TableCell align="left">
                                            <TimelapseIcon
                                              sx={{ color: "#008491" }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {row.data?.map((row) => (
                                          <TableRow
                                            key={row.modeName}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                { border: 0 },
                                            }}
                                          >
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              align="left"
                                            >
                                              {t(row.modeName)}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.water}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.electric}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.modeValue}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.seconds}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  ) : (
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>firstValue</TableCell>
                                          <TableCell>secondValue</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>
                                            {row.firstValue1}
                                          </TableCell>
                                          <TableCell>
                                            {row.secondValue1}
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  )}
                                </TableCell>
                              </TableRow>
                            ) : null}
                            {/* <TableCell align="left">
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  navigate(
                                    `/owner/${id}/item/${user_id}/${row.id}/${row.p0}`
                                    // /owner/:owner_id/item/:id/:single/:active
                                  );
                                }}
                              >
                                <RemoveRedEyeIcon />
                              </Button>
                            </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openName}
          onClose={() => {
            setOpenName(false);
          }}
        >
          <Box sx={styleName}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("name")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenName(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>
            <Box>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(changeName({ name, ownerId: current }));
                  dispatch(getBoxes(owner_id, id));
                  setName("");
                  setOpenName(false);
                }}
              >
                {t("save")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <GenerateModal
        open={openGenerate}
        setOpen={setOpenGenerate}
        ownerId={owner_id}
      />
    </div>
  );
};

export default Items;
