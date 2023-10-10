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
import { USERS_PAGE, ADMINS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearItemFiltred,
  editItemChanges,
  getBoxes,
  getItemCurrent,
  getItemDates,
  getItemFiltred,
  getItemInfo,
  getItemInfoCalc,
  getItemInfoCalc2,
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
import LockIcon from "@mui/icons-material/Lock";
import { changeItemActivity } from "../../store/actions/auth-action";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemsMenu from "./ItemsMenu";
import ItemField3 from "../../components/changeField/ItemFields3";
import ItemField2 from "../../components/changeField/ItemFields2";
import Calculator2 from "../../components/claculator/Calculator2";
import ItemFilters from "./ItemFilters";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
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
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const boxes = useSelector((state) => state.user.boxes);
  const dates = useSelector((state) => state.user.dates);
  const items = useSelector((state) => state.user.items);
  const filtredDates = useSelector((state) => state.user.filtredDates);
  const itemInfo = useSelector((state) => state.user.itemIinfo);
  const itemInfoCalc = useSelector((state) => state.user.calcData);
  const itemCurrentValue = useSelector((state) => state.user.currentValues);
  const prcemt = useSelector((state) => state.user.infoPrcent);
  const isSuper = useSelector((state) => state.auth.isSuper);

  const [data, setData] = useState(null);
  const [value, setValue] = useState(0);
  const [changedData, setChangedData] = useState({});
  const [currentId, setCurrent] = useState(null);
  const [ownerId, setOwnerId] = useState();
  const [calcData, setCalcData] = useState();
  const [access, setAccess] = useState();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [filterOn, setFilterOn] = useState(false);
  const [showMenu, setShowMewnu] = useState(false);
  const [active, setActive] = useState(null);
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
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id));
  }, []);

  useEffect(() => {
    setData(items?.filter((i) => i.p0 == active));
  }, [active]);

  useEffect(() => {
    // boxes.length && ;
    boxes?.length && dispatch(getSingleBox(id));
    data && active && setCurrent(data[0]?.id);
    data && active && setOwnerId(data[0]?.p2);
    data && active && setAccess(data[0]?.access);
  }, [data, boxes, active]);

  useEffect(() => {
    setCalcData(items?.filter((i) => i.id === currentId)[0]?.ItemValue);
    active && ownerId && dispatch(getItemCurrent({ ownerId, active }));
    active && ownerId && dispatch(getItemInfo(ownerId, active));
    active && ownerId && dispatch(getItemInfoPrcent(ownerId));
    active && ownerId && dispatch(getItemInfoModes(ownerId));
    active && ownerId && dispatch(getItemDates(ownerId));
    return;
    // if (active && ownerId && active == 1) {
    //   dispatch(getItemInfoCalc(ownerId));
    // } else if (active && ownerId && active == 2) {
    //   dispatch(getItemInfoCalc2(ownerId));
    // }
  }, [currentId, ownerId, active]);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);

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
          {isSuper == "superAdmin" ? (
            <div onClick={() => navigate(ADMINS_PAGE)} className="steper-item">
              {t("admins")}
            </div>
          ) : (
            <div onClick={() => navigate(USERS_PAGE)} className="steper-item">
              {t("users")}
            </div>
          )}
          <div
            onClick={() => navigate(`/user/${user?.id}`)}
            className="steper-item"
          >
            {t("users").slice(0, t("users").length - 1)} {"  "}
            {"("} {user?.firstName + " " + user?.lastName} {")"}
          </div>
          <div
            className="steper-item"
            onClick={() =>
              navigate(`/user/${user_id}/owner/${owner?.deviceOwner}`)
            }
          >
            {t("owners")} {"("} {owner?.firstName} {owner?.lastName} {")"}
          </div>
          <Typography color="text.primary" className="active-steper-item">
            {t("system")}
          </Typography>
        </Breadcrumbs>
      </Box>
      {!showMenu ? (
        <ItemsMenu setShowMewnu={setShowMewnu} setActive={setActive} />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box>
            <Button variant="outlined" onClick={() => setShowMewnu(false)}>
              {t("back-to-menu")}
            </Button>
          </Box>
          {data ? (
            <>
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
                          setOwnerId(i.p2);
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
                          {isSuper == "owner" ||
                            (isSuper == "superAdmin" && (
                              <>
                                <div>
                                  <DonutChart
                                    benefit={prcemt?.benefit}
                                    expenses={prcemt?.expenses}
                                  />
                                </div>
                                {active !== 3 && (
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
                                )}
                              </>
                            ))}
                          {isSuper !== "owner" &&
                            isSuper !== "superAdmin" &&
                            i.access && (
                              <>
                                <div>
                                  <DonutChart
                                    benefit={prcemt?.benefit}
                                    expenses={prcemt?.expenses}
                                  />
                                </div>
                                {active !== 3 && (
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
                                )}
                              </>
                            )}
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
                          {(isSuper == "owner" || isSuper == "superAdmin") && (
                            <>
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
                                        onChange={(e) =>
                                          setStart(e.target.value)
                                        }
                                      >
                                        {dates?.map((i) => (
                                          <MenuItem
                                            key={i}
                                            value={
                                              i.slice(0, 10) +
                                              " " +
                                              "00:00:00+04"
                                            }
                                          >
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
                                          ?.filter(
                                            (y) => y.slice(0, 10) !== start
                                          )
                                          .map((i) => (
                                            <MenuItem
                                              key={i}
                                              value={
                                                i.slice(0, 10) +
                                                " " +
                                                "00:00:00+04"
                                              }
                                            >
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
                                            ownerID: i?.p2,
                                            start,
                                            end,
                                            active,
                                          })
                                        );
                                        setFilterOn(true);
                                      }}
                                    >
                                      <FilterAltIcon
                                        sx={{ color: "#21726A" }}
                                      />
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
                                <ItemFilters
                                  active={active}
                                  filtredDates={filtredDates}
                                  countryId={owner?.countryId}
                                  item={i}
                                  itemCurrentValue={itemCurrentValue}
                                />
                              </Box>
                            </>
                          )}
                          {isSuper == "owner" && (
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
                                    changeItemActivity({
                                      id: i.p2,
                                      access: !access,
                                    })
                                  );
                                  setAccess(e.target.checked);
                                }}
                              />
                              <hr style={{ width: "50vw" }} />
                            </Box>
                          )}
                          <hr style={{ width: "50vw" }} />
                          {isSuper == "owner" && (
                            <>
                              {i &&
                                (active === 1 ? (
                                  <ItemField
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : active === 3 ? (
                                  <ItemField3
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : active === 2 ? (
                                  <ItemField2
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : null)}
                              <Box mt={3} mb={3}>
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  onClick={handleEditChanges}
                                >
                                  {t("savechanges")}
                                </Button>
                              </Box>
                            </>
                          )}
                          {isSuper == "superAdmin" && (
                            <>
                              {i &&
                                (active === 1 ? (
                                  <ItemField
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : active === 3 ? (
                                  <ItemField3
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : active === 2 ? (
                                  <ItemField2
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : null)}
                              <Box mt={3} mb={3}>
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  onClick={handleEditChanges}
                                >
                                  {t("savechanges")}
                                </Button>
                              </Box>
                            </>
                          )}
                          {isSuper !== "superAdmin" && !i.access && (
                            <Box
                              sx={{
                                width: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "20px",
                              }}
                            >
                              <LockIcon sx={{ color: "#21726A" }} />
                              <h1 style={{ color: "#21726A" }}>{t("block")}</h1>
                            </Box>
                          )}
                          {isSuper !== "superAdmin" && i.access && (
                            <>
                              {i &&
                                (active === 1 ? (
                                  <ItemField
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : active === 3 ? (
                                  <ItemField3
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : active === 2 ? (
                                  <ItemField2
                                    data={i}
                                    handleChangeData={handleChangeData}
                                    values={changedData}
                                  />
                                ) : null)}
                              <Box mt={3} mb={3}>
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  onClick={handleEditChanges}
                                >
                                  {t("savechanges")}
                                </Button>
                              </Box>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </TabPanel>
                  );
                })}
              </SwipeableViews>
            </>
          ) : (
            <HourglassTopIcon />
          )}
        </Box>
      )}
      {active === 1 ? (
        <Calculator
          open={open}
          handleClose={() => setOpen(false)}
          data={itemInfo}
          itemInfoCalc={itemInfoCalc}
          active={active}
          ownerID={ownerId}
        />
      ) : active === 2 ? (
        <Calculator2
          open={open}
          handleClose={() => setOpen(false)}
          data={itemInfo}
          itemInfoCalc={itemInfoCalc}
          active={active}
          countryId={owner?.countryId}
          ownerID={ownerId}
        />
      ) : null}
    </div>
  );
};

export default Items;
