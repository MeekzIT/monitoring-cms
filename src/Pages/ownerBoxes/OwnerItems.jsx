import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { USERS_PAGE, ADMINS_PAGE, BOXES_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearItemFiltred,
  editItemChanges,
  getBoxes,
  getItemDates,
  getItemFiltred,
  getItemInfo,
  getItemInfoCalc,
  getItemInfoModes,
  getItemInfoPrcent,
  getSingleBox,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import CalculateIcon from "@mui/icons-material/Calculate";
import Calculator from "../../components/claculator/Calculator";
import ItemField from "../../components/changeField/ItemFields";
import { useIsMobile } from "../../hooks/useScreenType";
import DonutChart from "../../components/graphics/Dount";
import { compareWithUTC, getCurrency } from "../../hooks/helpers";
import { changeItemActivity } from "../../store/actions/auth-action";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Items = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const boxes = useSelector((state) => state.user.boxes);
  const dates = useSelector((state) => state.user.dates);
  const box = useSelector((state) => state.user.box);
  const filtredDates = useSelector((state) => state.user.filtredDates);
  const itemInfo = useSelector((state) => state.user.itemIinfo);
  const itemInfoCalc = useSelector((state) => state.user.calcData);
  const prcemt = useSelector((state) => state.user.infoPrcent);
  const isSuper = useSelector((state) => state.auth.isSuper);

  const [value, setValue] = useState(0);
  const [changedData, setChangedData] = useState({});
  const [currentId, setCurrent] = useState(null);
  const [ownerId, setOwnerId] = useState();
  const [calcData, setCalcData] = useState();
  const [data, setData] = useState(null);
  const [access, setAccess] = useState();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [filterOn, setFilterOn] = useState(false);
  const [showMenu, setShowMewnu] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setData(box?.Items?.filter((i) => i.p0 == active));
  }, [active]);
  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  useEffect(() => {
    dispatch(getSingleUser(user?.id));
    dispatch(getBoxes(user?.id));
  }, []);

  useEffect(() => {
    setCalcData(box?.Items.filter((i) => i.id === currentId)[0]?.ItemValue);
    user?.id && dispatch(getItemInfo(user?.id));
    user?.id && dispatch(getItemInfoCalc(user?.id));
    user?.id && dispatch(getItemInfoPrcent(user?.id));
    user?.id && dispatch(getItemInfoModes(user?.id));
    user?.id && dispatch(getItemDates(user?.id));
  }, [currentId, user?.id]);

  useEffect(() => {
    user && dispatch(getSingleOwners(user?.id));
  }, [user]);

  useEffect(() => {
    // boxes.length && ;
    boxes?.length && dispatch(getSingleBox(id));
    setCurrent(box?.Items[0]?.id);
    setOwnerId(box?.Items[0]?.p2);
    setAccess(box?.Items[0]?.access);
  }, [boxes]);

  const handleEditChanges = () => {
    dispatch(editItemChanges({ ...changedData, id: currentId }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Box m={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <div>
            <HomeIcon />
          </div>

          <div onClick={() => navigate(BOXES_PAGE)} className="steper-item">
            {t("system")}
          </div>
        </Breadcrumbs>
      </Box>
      {!showMenu ? (
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h2"
              className="active-steper-item"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setShowMewnu(true);
                setActive(1);
              }}
            >
              {t("moika")}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              className="active-steper-item"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setShowMewnu(true);
                setActive(2);
              }}
            >
              {t("cux")}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              className="active-steper-item"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setShowMewnu(true);
                setActive(3);
              }}
            >
              {t("change")}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h2"
              className="active-steper-item"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setShowMewnu(true);
                setActive(4);
              }}
            >
              {t("sevacum")}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ sx: { display: "none" } }}
              sx={{
                "& .MuiTabs-flexContainer": {
                  flexWrap: "wrap",
                  padding: "0",
                },
              }}
            >
              {data?.map((i, idx) => {
                return (
                  <Tab
                    label={`${t("device")} ( ${i.id} )`}
                    {...a11yProps(i.id)}
                    key={i.id}
                    onClick={() => {
                      setCurrent(i.id);
                      setOwnerId(i.p2s);
                    }}
                  />
                );
              })}
            </Tabs>
          </Box>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {data?.map((i, idx) => {
              return (
                <TabPanel
                  value={value}
                  index={idx}
                  dir={theme.direction}
                  key={i.id}
                  sx={{
                    root: {
                      "& .MuiBox": {
                        padding: 0,
                      },
                    },
                  }}
                >
                  <Grid
                    spacing={1}
                    sx={{
                      padding: "0",
                    }}
                    container
                  >
                    <Grid item>
                      <div>
                        <DonutChart
                          benefit={prcemt?.benefit}
                          expenses={prcemt?.expenses}
                        />
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          size="large"
                          sx={{
                            color: "white",
                            fontSize: "20px",
                          }}
                          onClick={() => setOpen(true)}
                        >
                          <CalculateIcon />
                          {t("calc")}
                        </Button>
                      </div>
                    </Grid>
                    <Grid item>
                      <Typography
                        id="modal-modal-title"
                        variant="h3"
                        component="h1"
                      >
                        {t("device")} №-{i.id}{" "}
                        {compareWithUTC(i.datatime) ? (
                          <span className="online">{t("online")}</span>
                        ) : (
                          <span className="offline">{t("offline")}</span>
                        )}
                      </Typography>

                      <hr style={{ width: "50vw" }} />
                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "15px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "40%",
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Start
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={start}
                                label="Start"
                                onChange={(e) => setStart(e.target.value)}
                              >
                                {dates?.map((i) => (
                                  <MenuItem key={i} value={i.slice(0, 10)}>
                                    {i.slice(0, 10)}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box
                            sx={{
                              width: "40%",
                            }}
                          >
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                End
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={end}
                                label="End"
                                onChange={(e) => setEnd(e.target.value)}
                              >
                                {dates
                                  ?.filter((y) => y.slice(0, 10) !== start)
                                  .map((i) => (
                                    <MenuItem key={i} value={i.slice(0, 10)}>
                                      {i.slice(0, 10)}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <Button
                              variant="outlined"
                              size="large"
                              onClick={() => {
                                dispatch(
                                  getItemFiltred({
                                    ownerID: user?.id,
                                    start,
                                    end,
                                  })
                                );
                                setFilterOn(true);
                              }}
                            >
                              <FilterAltIcon sx={{ color: "#21726A" }} />
                            </Button>
                          </Box>
                          {(start || end) && (
                            <Box>
                              <Button
                                variant="outlined"
                                size="large"
                                onClick={() => {
                                  dispatch(clearItemFiltred(null));
                                  setFilterOn(false);
                                  setStart(null);
                                  setEnd(null);
                                }}
                              >
                                <DeleteIcon sx={{ color: "#21726A" }} />
                              </Button>
                            </Box>
                          )}
                        </Box>
                        {filtredDates ? (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                              }}
                            >
                              <MonetizationOnIcon sx={{ color: "#21726A" }} />
                              <Typography>
                                {filtredDates?.MonetizationOnIcon}
                                {getCurrency(owner?.countryId)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                              }}
                            >
                              <LocalAtmIcon sx={{ color: "#21726A" }} />
                              <Typography>
                                {filtredDates?.LocalAtmIcon}
                                {getCurrency(owner?.countryId)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                              }}
                            >
                              <CreditScoreIcon sx={{ color: "#21726A" }} />
                              <Typography>
                                {filtredDates?.CreditScoreIcon}
                                {getCurrency(owner?.countryId)}
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                              }}
                            >
                              <MonetizationOnIcon sx={{ color: "#21726A" }} />
                              <Typography>
                                {Number(i?.p16) * Number(i?.p10)}
                                {getCurrency(owner?.countryId)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                              }}
                            >
                              <LocalAtmIcon sx={{ color: "#21726A" }} />
                              <Typography>
                                {Number(i?.p17) * Number(i?.p11)}
                                {getCurrency(owner?.countryId)}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                              }}
                            >
                              <CreditScoreIcon sx={{ color: "#21726A" }} />
                              <Typography>
                                {Number(i?.p18) * Number(i?.p12)}
                                {getCurrency(owner?.countryId)}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <Typography>{t("change-access")}</Typography>
                        <FormControlLabel
                          control={<Switch defaultChecked={access} />}
                          label={t("change-access-text")}
                          value={access}
                          onChange={(e) => {
                            dispatch(
                              changeItemActivity({ id: i.p2, access: !access })
                            );
                            setAccess(e.target.checked);
                          }}
                        />
                        <hr style={{ width: "50vw" }} />
                      </Box>
                      <hr style={{ width: "50vw" }} />
                      {i && (
                        <ItemField
                          data={i}
                          handleChangeData={handleChangeData}
                          values={changedData}
                        />
                      )}
                      <Box mt={3} mb={3}>
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={handleEditChanges}
                        >
                          {t("savechanges")}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </Box>
      )}
      <Calculator
        open={open}
        handleClose={() => setOpen(false)}
        data={itemInfo}
        itemInfoCalc={itemInfoCalc}
      />
    </div>
  );
};

export default Items;
