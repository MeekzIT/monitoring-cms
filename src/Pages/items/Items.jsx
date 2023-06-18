import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { USERS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  editItemChanges,
  getBoxes,
  getOwnersOfUser,
  getSingleBox,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import CalculateIcon from "@mui/icons-material/Calculate";
import Calculator from "../../components/claculator/Calculator";
import ItemField from "../../components/changeField/ItemFields";

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
const options = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
};

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

const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

const series1 = [
  {
    name: "series-1",
    data: [
      10, 25, 30, 30, 30, 35, 37, 38, 38, 40, 45, 45, 45, 50, 52, 55, 70, 75,
      75, 75, 78, 78, 90, 90, 90, 90, 90, 91, 98, 98,
    ],
  },
];

const dountOpt = {};
const dountSeries = [44, 55, 41];
const dountLables = ["Awedfsdf", "B", "C"];

const Items = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const boxes = useSelector((state) => state.user.boxes);
  const box = useSelector((state) => state.user.box);
  const [value, setValue] = useState(0);
  const [changedData, setChangedData] = useState({});
  const [currentId, setCurrent] = useState();
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
  console.log(id,"dvGBHNJMnhb");
  useEffect(() => {
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id));
  }, []);

  useEffect(() => {
    setCalcData(box?.Items.filter((i) => i.id === currentId)[0]?.ItemValue);
  }, [currentId]);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
    
  }, [user]);

  useEffect(()=>{
    // boxes.length && ; 
  boxes?.length &&  dispatch(getSingleBox(id));
  },[boxes])

  const handleEditChanges = () => {
    dispatch(editItemChanges({ ...changedData, id: currentId }));
  };

  console.log(box,"boxboxboxboxboxboxbox");

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
          <div
            className="steper-item"
            onClick={() => navigate(`/user/${user_id}/owner/${owner?.id}`)}
          >
            {t("owners")} {"("} {owner?.firstName} {owner?.lastName} {")"}
          </div>
          <Typography color="text.primary" className="active-steper-item">
            {t("system")} {"("} {owner?.firstName} {owner?.lastName} {")"}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            variant="fullWidth"
          >
            {box?.Items?.map((i, idx) => {
              return (
                <Tab
                  label={`${t("device")} ( ${i.name} )`}
                  {...a11yProps(i.id)}
                  key={i.id}
                  onClick={() => setCurrent(i.id)}
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
              >
                {idx + 1}

                <Grid container spacing={2}>
                  <Grid item>
                    <div>
                      <Chart
                        options={options}
                        series={series}
                        type="line"
                        width="500"
                      />
                    </div>
                    <div>
                      <Chart
                        options={dountOpt}
                        series={dountSeries}
                        label={dountLables}
                        type="donut"
                        width="380"
                      />
                    </div>
                    <div>
                      <Chart
                        options={options1}
                        series={series1}
                        type="line"
                        width="500"
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
                      {t("device")} №-{i.id}
                    </Typography>
                    <hr style={{ width: "50vw" }} />
                    <ItemField data={i} handleChangeData={handleChangeData} />
                    <Box mt={3}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleEditChanges}
                      >
                        Save Changes
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
        data={calcData}
      />
    </div>
  );
};

export default Items;
