import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { OWNER_ITEMS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changeBoxSettings,
  getBoxes,
  getSingleBox,
  getBoxInfo,
  getBoxesInfo,
  getBoxLinear,
} from "../../store/actions/users-action";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import GenerateModal from "../../components/generateModal/GenerateModal";
import { getMe } from "../../store/actions/auth-action";
import GoBack from "../../components/goBack/GoBack";
import {
  addBox,
  addBoxExpenses,
  destroyBoxExpenses,
  editBoxExpenses,
  getBoxExpenses,
} from "../../store/actions/box";
import DonutChart from "../../components/graphics/Dount";
import LineChart from "../../components/graphics/LineChart";
import CloseIcon from "@mui/icons-material/Close";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CalculateIcon from "@mui/icons-material/Calculate";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { getCurrency } from "../../hooks/helpers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import dayjs from "dayjs";
import { themePallete } from "../..";

const OwnerBoxes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.auth.admin);
  const data = useSelector((state) => state.user.boxes);
  const boxInfo = useSelector((state) => state.user.boxInfo);
  const boxesInfo = useSelector((state) => state.user.boxesInfo);
  const boxExpernses = useSelector((state) => state.user.boxExpernses);
  const boxLinear = useSelector((state) => state.user.boxLinear);
  const [open, setOpen] = useState(false);
  const [addField, setAddField] = useState(false);
  const [addedFieldValueName, setAddedFieldValueName] = useState("");
  const [addedFieldValuePrice, setAddedFieldValuePrice] = useState("");
  const [nameExpenses, setNameExpenses] = useState("");
  const [price, setPrice] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [name, setName] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [geo, setGeo] = useState(null);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [single, setSingle] = useState(null);
  const [showRows, setShowRows] = useState(false);
  const [info, setInfo] = useState(null);
  const [expand, setExpand] = useState(false);
  const [selectedDate, handleDateChange] = useState();
  const [dountDate, handleDountDateChange] = useState();
  const [dountDate2, handleDountDateChange2] = useState();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: `3px solid ${themePallete}`,
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  const handleNested = (id) => {
    if (typeof expand == "boolean") {
      setExpand(id);
    } else setExpand(false);
  };
  useEffect(() => {
    dispatch(getMe());
  }, []);
  useEffect(() => {
    dispatch(getBoxes(owner?.deviceOwner));
    dispatch(
      getBoxInfo({
        ownerId: owner?.deviceOwner,
      })
    );
    dispatch(
      getBoxesInfo({
        ownerId: owner?.deviceOwner,
        date: dountDate,
        endDate: dountDate2,
      })
    );
    if (!dountDate || !dountDate2) {
      dispatch(
        getBoxLinear({
          ownerId: owner?.deviceOwner,
          date: selectedDate,
        })
      );
    } else {
      dispatch(
        getBoxLinear({
          ownerId: owner?.deviceOwner,
          date: dountDate,
          endDate: dountDate2,
        })
      );
    }
  }, [owner, selectedDate, dountDate, dountDate2]);
  return (
    <div>
      <Box m={3}>
        <GoBack />
        <Box>
          <h1>
            {owner?.firstName} {owner?.lastName}
          </h1>
          <h4>{owner?.email}</h4>
        </Box>
        <hr />
        <div className="grapsBox">
          <div className="grap">
            <div className="grapsBox">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="start"
                    format="YYYY-MM-DD"
                    value={dountDate}
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
                    value={dountDate2}
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
                    handleDountDateChange(null);
                    handleDountDateChange2(null);
                  }}
                >
                  clear filtres
                </Button>
              )}
            </div>
            {boxInfo !== null && (
              <>
                <DonutChart
                  benefit={100 - boxInfo?.ratio}
                  expenses={boxInfo?.ratio}
                  expensesValue={boxInfo?.expense}
                  benefitValue={boxInfo?.benefit}
                  countryId={owner?.countryId}
                  openStatistics={openStatistics}
                  setOpenStatistics={setOpenStatistics}
                  singleId={null}
                  show={true}
                />
                <div>
                  <hr />
                  <Typography
                    className="coint-show-heading"
                    sx={{ color: themePallete }}
                  >
                    {" "}
                    <MonetizationOnIcon sx={{ color: themePallete }} />
                    <div> Coin - {boxInfo?.coin}</div>
                  </Typography>
                  <hr />
                  <Typography
                    className="coint-show-heading"
                    sx={{ color: themePallete }}
                  >
                    {" "}
                    <LocalAtmIcon sx={{ color: themePallete }} />
                    <div> Bill - {boxInfo?.cash}</div>
                  </Typography>
                  <hr />
                  <Typography
                    className="coint-show-heading"
                    sx={{ color: themePallete }}
                  >
                    <PaymentIcon sx={{ color: themePallete }} />
                    <div> Cash Less - {boxInfo?.bill}</div>
                  </Typography>
                  <hr />
                </div>
              </>
            )}
          </div>
          <Box className="grap">
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider> */}
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
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => setOpenAdd(true)}
          >
            {t("add-object")}
          </Button>
        </Box>
        <hr />
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell>{t("moikaID")}</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">{t("geolocation")}</TableCell>
                  <TableCell align="left">{t("edit")}</TableCell>
                  <TableCell align="left">{t("difrentExspenses")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          dispatch(getSingleBox(row.id));
                          navigate(
                            `/owner-items/${owner?.deviceOwner}/${row.id}`
                          );
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="left">{row.geolocation}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setName(row.name);
                          setGeo(row.geolocation);
                          setCurrentId(row.id);
                          setOpen(true);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setCurrentId(row.id);
                          setCurrentOwner(row.ownerId);
                          dispatch(
                            getBoxExpenses({
                              boxId: row.id,
                              ownerId: row.ownerId,
                            })
                          );
                          setOpenSettings(true);
                        }}
                      >
                        <SettingsSuggestIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setGeo("");
          setName("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("edit")}
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t("name")}
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("geolocation")}
                  variant="outlined"
                  fullWidth
                  value={geo}
                  onChange={(e) => setGeo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          changeBoxSettings({
                            id: currentId,
                            name,
                            geolocation: geo,
                          })
                        );
                        setOpen(false);
                        setGeo("");
                        setName("");
                      }}
                    >
                      {t("edit")}
                    </Button>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("add-object")}
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t("name")}
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("geolocation")}
                  variant="outlined"
                  fullWidth
                  value={geo}
                  onChange={(e) => setGeo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenAdd(false)}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          addBox({
                            ownerId: owner?.deviceOwner,
                            name,
                            geolocation: geo,
                          })
                        );
                        setOpenAdd(false);
                        setGeo("");
                        setName("");
                      }}
                    >
                      {t("add")}
                    </Button>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
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
            {showRows ? (
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowRows(false);
                    setInfo(null);
                    setSingle(null);
                  }}
                >
                  {t("back-to-menu")}
                </Button>
                <Box sx={{ overflow: "auto" }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "table",
                      tableLayout: "fixed",
                    }}
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
                          {info?.allResult?.map((row) => (
                            <TableRow
                              key={row.modeName}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.id}</TableCell>
                              <TableCell align="left">
                                {row.type == 1 ? t("moika") : t("cux")}
                              </TableCell>
                              <TableCell align="left">
                                {row.result} {getCurrency(owner?.countryId)}
                              </TableCell>
                              <TableCell align="left">
                                {row.caxs} {getCurrency(owner?.countryId)}
                              </TableCell>
                              <TableCell align="left">
                                {Math.round(100 - row.ratio)} %
                              </TableCell>
                              <TableCell align="left">
                                {!expand ? (
                                  <Button
                                    onClick={() => handleNested(row.id)}
                                    variant="outlined"
                                  >
                                    <CalculateIcon />
                                  </Button>
                                ) : expand == row.id ? (
                                  <Button
                                    onClick={() => handleNested(row.id)}
                                    variant="outlined"
                                  >
                                    <CloseIcon fontSize="large" />
                                  </Button>
                                ) : null}
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
                                                sx={{ color: themePallete }}
                                              />
                                            </TableCell>
                                            <TableCell align="left">
                                              <ElectricBoltIcon
                                                sx={{ color: themePallete }}
                                              />
                                            </TableCell>{" "}
                                            <TableCell align="left">
                                              <BubbleChartIcon
                                                sx={{ color: themePallete }}
                                              />
                                            </TableCell>{" "}
                                            <TableCell align="left">
                                              <TimelapseIcon
                                                sx={{ color: themePallete }}
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
                                      `/owner/${id}/item/${user_id}/${row.id}/${row.type}`
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
            ) : (
              boxesInfo?.map((i) => {
                return (
                  <>
                    <hr />
                    {i !== null && (
                      <Box>
                        <DonutChart
                          benefit={100 - i?.ratio}
                          expenses={i?.ratio}
                          expensesValue={i?.expense}
                          benefitValue={i?.benefit}
                          countryId={owner?.countryId}
                          name={i?.box?.geolocation}
                          openStatistics={null}
                          singleId={i.box.id}
                          setSingle={setSingle}
                          show={true}
                          // setOpenStatistics={setOpenStatistics}
                        />
                      </Box>
                    )}
                    <hr />
                  </>
                );
              })
            )}
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openSettings}
        onClose={() => {
          setOpenSettings(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("difrentExspenses")}
          </Typography>
          <div
            className="mobile-modal-close-btn"
            onClick={() => {
              setOpenSettings(false);
            }}
          >
            <CloseIcon fontSize="large" />
          </div>

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
              <Box m={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setAddField(!addField)}
                >
                  {addField ? <ArrowBackIcon /> : <AddIcon />}
                </Button>
              </Box>
              {addField ? (
                <Box>
                  <Box
                    m={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <TextField
                        label={t("name")}
                        name="name"
                        value={addedFieldValueName}
                        variant="outlined"
                        onChange={(e) => setAddedFieldValueName(e.target.value)}
                        fullWidth
                      />
                    </div>
                    <div>
                      <TextField
                        label={t("price")}
                        name="price"
                        value={addedFieldValuePrice}
                        variant="outlined"
                        onChange={(e) =>
                          setAddedFieldValuePrice(e.target.value)
                        }
                        fullWidth
                      />
                    </div>
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      dispatch(
                        addBoxExpenses({
                          boxId: currentId,
                          ownerId: currentOwner,
                          name: addedFieldValueName,
                          price: addedFieldValuePrice,
                        })
                      );
                      setAddField(false);
                      setAddedFieldValuePrice("");
                      setAddedFieldValueName("");
                      dispatch(
                        getBoxExpenses({
                          boxId: currentId,
                          ownerId: currentOwner,
                        })
                      );
                    }}
                  >
                    {t("savechanges")}
                  </Button>
                  <Divider />
                </Box>
              ) : (
                boxExpernses?.map((i) => {
                  return (
                    <Box>
                      <Box
                        m={2}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div>
                          <TextField
                            label={t("name")}
                            name="name"
                            defaultValue={i.name}
                            variant="outlined"
                            onChange={(e) => setNameExpenses(e.target.value)}
                            fullWidth
                          />
                        </div>
                        <div>
                          <TextField
                            label={t("price")}
                            name="price"
                            defaultValue={i.price}
                            variant="outlined"
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                          />
                        </div>
                      </Box>
                      <Box
                        m={2}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                              dispatch(
                                editBoxExpenses({
                                  id: i.id,
                                  name: nameExpenses,
                                  price,
                                })
                              );
                              // dispatch(
                              //   getBoxExpenses({
                              //     boxId: i.ownerId,
                              //     ownerId: currentOwner,
                              //   })
                              // );
                            }}
                          >
                            {t("savechanges")}
                          </Button>
                        </div>
                        <div>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                              dispatch(
                                destroyBoxExpenses({
                                  id: i.id,
                                })
                              );
                            }}
                          >
                            {t("delete")}
                          </Button>
                        </div>
                      </Box>
                      <Divider />
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default OwnerBoxes;
