import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
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
import { USERS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  changeBoxSettings,
  getBoxes,
  getItemInfoBenefits,
  getSingleBox,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Chart from "react-apexcharts";
import { useIsMobile } from "../../hooks/useScreenType";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  addBoxExpenses,
  destroyBoxExpenses,
  editBoxExpenses,
  getBoxExpenses,
} from "../../store/actions/box";

const options1 = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
};

const series1 = [
  {
    name: "series-1",
    data: [
      10, 25, 30, 30, 30, 35, 37, 38, 38, 40, 45, 45, 45, 50, 52, 55, 70, 75,
      75, 75, 78, 78, 90, 90, 90, 90, 90, 91, 98, 98,
    ],
  },
];

const Boxes = () => {
  const { id, user_id, owner: ownerParam } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const data = useSelector((state) => state.user.boxes);
  const boxExpernses = useSelector((state) => state.user.boxExpernses);
  const [open, setOpen] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState(null);
  const [geo, setGeo] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [addField, setAddField] = useState(false);
  const [addedFieldValueName, setAddedFieldValueName] = useState("");
  const [addedFieldValuePrice, setAddedFieldValuePrice] = useState("");
  const [nameExpenses, setNameExpenses] = useState("");
  const [price, setPrice] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 500,
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
  useEffect(() => {
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(id));
  }, []);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);

  useEffect(() => {
    let items = [];
    // data?.filter((i) => i.ownerId == ownerId;);
    data
      ?.filter((i) => i.ownerId == ownerId)[0]
      ?.Items?.map((y) => items.push(y.p2));
    items.length && dispatch(getItemInfoBenefits(JSON.stringify(items)));
  }, [ownerId]);

  useEffect(() => {
    // dispatch(getBoxExpenses(currentId));
  }, [currentId, setOpenSettings]);
  
  return (
    <div>
      <Box m={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <div>
            <HomeIcon />
          </div>
          <div onClick={() => navigate(USERS_PAGE)} className="steper-item">
            {t("users")}
          </div>
          <div
            onClick={() => navigate(`/user/${user?.id}`)}
            className="steper-item"
          >
            {t("users").slice(0, t("users").length - 1)} {"  "}
            {"("} {user?.firstName + " " + user?.lastName} {")"}
          </div>
          <Typography color="text.primary" className="active-steper-item">
            {t("owners")} {"("} {owner?.firstName} {owner?.lastName} {")"}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box m={3}>
        <Box>
          <h1>
            {owner?.firstName} {owner?.lastName}
          </h1>
          <h4>{owner?.email}</h4>
        </Box>
        <hr />
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("name")}</TableCell>
                    <TableCell align="left">{t("geolocation")}</TableCell>
                    <TableCell align="left">{t("edit")}</TableCell>
                    <TableCell align="left">{t("settings")}</TableCell>
                    <TableCell align="left">{t("statistics")}</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.name}</TableCell>
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

                            setOpenSettings(true);
                          }}
                        >
                          <SettingsSuggestIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setOwnerId(row.id);
                            setOpenStatistics(true);
                          }}
                        >
                          <AutoGraphIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            dispatch(getSingleBox(row.id));
                            navigate(
                              `/user/${user_id}/owner/${row?.ownerId}/item/${row.id}`
                            );
                          }}
                        >
                          <RemoveRedEyeIcon />
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
          <div
            className="mobile-modal-close-btn"
            onClick={() => {
              setOpen(false);
              setGeo("");
              setName("");
            }}
          >
            <CloseIcon fontSize="large" />
          </div>
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
            <Chart
              options={options1}
              series={series1}
              type="line"
              width="500"
            />
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
            {t("settings")}
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
                          name: addedFieldValueName,
                          price: addedFieldValuePrice,
                        })
                      );
                      setAddField(false);
                      dispatch(getBoxExpenses(currentId));
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
                              dispatch(getBoxExpenses(currentId));
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
                              dispatch(getBoxExpenses(currentId));
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

export default Boxes;
