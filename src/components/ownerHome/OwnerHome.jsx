import CoinsCounter from "../coinsCounter/CoinsCounter";
import SettingCard from "../settingCard/SettingCard";
import Chart from "react-apexcharts";
import "./OwnerHome.css";
import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { getBoxes } from "../../store/actions/users-action";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { BOXES_PAGE } from "../../routing/pats";

const OwnerHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];
  const owner = useSelector((state) => state.auth.admin);
  const data = useSelector((state) => state.user.boxes);
  useEffect(() => {
    dispatch(getBoxes(owner.id));
  }, []);

  return (
    <Box mt={3}>
      <div className="owner-home">
        <div>
          <SettingCard />
        </div>
        <div>
          <CoinsCounter />
        </div>
        <div>
          <Card sx={{ minHeight: 350 }}>
            <Chart options={options} series={series} type="line" width="500" />
          </Card>
        </div>
      </div>
      <Box m={3}>
        <Typography gutterBottom variant="h5" component="div">
          {t("system")}
        </Typography>
        <TableContainer component={Paper} onClick={() => navigate(BOXES_PAGE)}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("name")}</TableCell>
                <TableCell align="left">{t("geolocation")}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default OwnerHome;
