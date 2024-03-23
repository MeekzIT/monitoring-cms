import CoinsCounter from "../coinsCounter/CoinsCounter";
import SettingCard from "../settingCard/SettingCard";
import Chart from "react-apexcharts";
import "../ownerHome/OwnerHome.css";
import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { getSingleUser } from "../../store/actions/users-action";
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
import { USERS_PAGE } from "../../routing/pats";
import { getCountries } from "../../store/actions/statistics-action";

const UserHome = () => {
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
  const user = useSelector((state) => state.auth.admin);
  const data = useSelector((state) => state.user.single);
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getSingleUser(user.id));
  }, []);

  return (
    <Box mt={3}>
      <Box m={3}>
        <Typography gutterBottom variant="h5" component="div">
          {t("users")}
        </Typography>
        <TableContainer
          component={Paper}
          onClick={() => navigate(`/user/${user?.id}`)}
        >
          {" "}
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
              {data?.Owners?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
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
      <div>
        <SettingCard />
      </div>
    </Box>
  );
};

export default UserHome;
