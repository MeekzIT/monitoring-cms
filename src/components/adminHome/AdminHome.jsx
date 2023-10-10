import CoinsCounter from "../coinsCounter/CoinsCounter";
import SettingCard from "../settingCard/SettingCard";
import Chart from "react-apexcharts";
import "../ownerHome/OwnerHome.css";
import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  getBoxes,
  getSingleUser,
  getUsers,
} from "../../store/actions/users-action";
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
import { BOXES_PAGE, USERS_PAGE } from "../../routing/pats";
import { getCountries } from "../../store/actions/statistics-action";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.admin);
  const data = useSelector((state) => state.user.single);
  const newData = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getSingleUser(user.id));
    dispatch(getUsers(0, user.id));
  }, []);

  return (
    <Box mt={3}>
      <Box m={3}>
        <Typography gutterBottom variant="h5" component="div">
          {t("users")}
        </Typography>
        <TableContainer component={Paper} onClick={() => navigate(USERS_PAGE)}>
          {" "}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("name")}</TableCell>
                <TableCell align="left">{t("email")}</TableCell>
                <TableCell align="left">{t("country")}</TableCell>
                <TableCell align="left">{t("active")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newData?.map((row) => (
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
                    {row.block ? (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {t("pasive")}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "green",
                        }}
                      >
                        {t("subscribe")}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div className="owner-home">
        <div>
          <SettingCard />
        </div>
        {/* <div>
          <CoinsCounter />
        </div> */}
      </div>
    </Box>
  );
};

export default AdminHome;
