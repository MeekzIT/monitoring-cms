import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { USERS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getBoxes,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import ChangeField from "../../components/changeField/ChangeField";

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

const OwnerItems = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.auth.admin);
  const data = useSelector((state) => state.user.boxes);
  const box = useSelector((state) => state.user.box);
  const [value, setValue] = useState(0);
  const [changedData, setChangedData] = useState({});

  const dountOpt = {};
  const dountSeries = [44, 55, 41];
  const dountLables = ["Awedfsdf", "B", "C"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    dispatch(getBoxes(owner.id));
  }, []);

  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
  };

  console.log(changedData, Object.keys(changedData));

  return (
    <div>
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
                  label={`${t("device")} ${idx + 1}`}
                  {...a11yProps(idx + 1)}
                  key={i.id}
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
                    <Box m={2}>
                      <ChangeField
                        value={i.DeviceType}
                        name="DeviceType"
                        handleChangeData={handleChangeData}
                        title="Device Type"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.FreeCard}
                        name="FreeCard"
                        handleChangeData={handleChangeData}
                        title="Free Card"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.CoinNominal}
                        name="CoinNominal"
                        handleChangeData={handleChangeData}
                        title="Coin Nominal"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.BillNominal}
                        name="BillNominal"
                        handleChangeData={handleChangeData}
                        title="Bill Nominal"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.CashLessNominal}
                        name="CashLessNominal"
                        handleChangeData={handleChangeData}
                        title="CashLess Nominal"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.CoinCount}
                        name="CoinCount"
                        handleChangeData={handleChangeData}
                        title="Coin Count"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.BillCount}
                        name="BillCount"
                        handleChangeData={handleChangeData}
                        title="Bill Count"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.CashLessCount}
                        name="CashLessCount"
                        handleChangeData={handleChangeData}
                        title="CashLess Count"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.CoinCountTotal}
                        name="CoinCountTotal"
                        handleChangeData={handleChangeData}
                        title="CoinCount Total"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.BillCountTotal}
                        name="BillCountTotal"
                        handleChangeData={handleChangeData}
                        title="BillCount Total"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.CashLessCountTotal}
                        name="CashLessCountTotal"
                        handleChangeData={handleChangeData}
                        title="CashLess Count Total"
                      />
                    </Box>
                    <Box m={2}>
                      <ChangeField
                        value={i.RelayOffTime}
                        name="RelayOffTime"
                        handleChangeData={handleChangeData}
                        title="Relay Off Time"
                      />
                    </Box>
                    {Object.keys(changedData).length > 0 && (
                      <Box mt={3}>
                        <Button variant="outlined" fullWidth>
                          Save Changes
                        </Button>
                      </Box>
                    )}
                    <Box mt={3}>
                      <Button variant="outlined" fullWidth>
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
    </div>
  );
};

export default OwnerItems;
