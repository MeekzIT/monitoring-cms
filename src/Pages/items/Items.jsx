import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { USERS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  editItemChanges,
  getBoxes,
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
import LineChart from "../../components/graphics/LineChart";
import { compareWithUTC } from "../../hooks/helpers";

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
  const box = useSelector((state) => state.user.box);
  const itemInfo = useSelector((state) => state.user.itemIinfo);
  const itemInfoCalc = useSelector((state) => state.user.calcData);
  const prcemt = useSelector((state) => state.user.infoPrcent);
  const infoModes = useSelector((state) => state.user.infoByModes);
  const [value, setValue] = useState(0);
  const [changedData, setChangedData] = useState({});
  const [currentId, setCurrent] = useState(null);
  const [ownerId, setOwnerId] = useState();
  const [calcData, setCalcData] = useState();
  const [open, setOpen] = useState(false);
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
    setCalcData(box?.Items.filter((i) => i.id === currentId)[0]?.ItemValue);
    ownerId && dispatch(getItemInfo(ownerId));
    ownerId && dispatch(getItemInfoCalc(ownerId));
    ownerId && dispatch(getItemInfoPrcent(ownerId));
    ownerId && dispatch(getItemInfoModes(ownerId));
  }, [currentId, ownerId]);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);

  useEffect(() => {
    // boxes.length && ;
    boxes?.length && dispatch(getSingleBox(id));
    setCurrent(box?.Items[0]?.id);
    setOwnerId(box?.Items[0]?.p2);
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
          <div
            className="steper-item"
            onClick={() => navigate(`/user/${user_id}/owner/${owner?.id}`)}
          >
            {t("owners")} {"("} {owner?.firstName} {owner?.lastName} {")"}
          </div>
          <Typography color="text.primary" className="active-steper-item">
            {t("system")}
          </Typography>
        </Breadcrumbs>
      </Box>
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
            {box?.Items?.map((i, idx) => {
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
          {box?.Items?.map((i, idx) => {
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
                      {compareWithUTC(i.datatime) ? <span className="online">{t("online")}</span> : <span className="offline">{t("offline")}</span>}
                    </Typography>
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
