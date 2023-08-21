import CoinsCounter from "../coinsCounter/CoinsCounter";
import SettingCard from "../settingCard/SettingCard";
import Chart from "react-apexcharts";
import "../ownerHome/OwnerHome.css";
import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { getUsers } from "../../store/actions/users-action";
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
import {  USERS_PAGE } from "../../routing/pats";
import { getCountries } from "../../store/actions/statistics-action";
import { useIsMobile } from "../../hooks/useScreenType";

const SuperHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
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
  const data = useSelector((state) => state.user.users);
  const countries = useSelector((state) => state.statistics.countries);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getUsers(0));
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
            <Chart
              options={options}
              series={series}
              type="line"
              width={isMobile ? "320" : "500"}
            />
          </Card>
        </div>
      </div>
      {!isMobile && (
        <Box m={3}>
          <Typography gutterBottom variant="h5" component="div">
            {t("users")}
          </Typography>
          <TableContainer
            component={Paper}
            onClick={() => navigate(USERS_PAGE)}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell align="left">{t("email")}</TableCell>
                  <TableCell align="left">{t("country")}</TableCell>
                  <TableCell align="left">{t("active")}</TableCell>
                  <TableCell align="left">
                    {t("lastPay")} / {t("paymentType")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName} {row.lastName}
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.Country.name}</TableCell>
                    <TableCell align="left">
                      {row.subscribe ? (
                        <span
                          style={{
                            color: "green",
                          }}
                        >
                          {t("subscribe")}
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          {t("pasive")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {row.lastPay ? row.lastPay : "-"} /{" "}
                      {row?.variant?.toUpperCase()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default SuperHome;
