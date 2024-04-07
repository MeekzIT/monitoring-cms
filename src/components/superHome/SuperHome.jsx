import SettingCard from "../settingCard/SettingCard";
import "../ownerHome/OwnerHome.css";
import { Box, Typography } from "@mui/material";
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
import { USERS_PAGE } from "../../routing/pats";
import { getCountries } from "../../store/actions/statistics-action";
import { useIsMobile } from "../../hooks/useScreenType";

const SuperHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const data = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getUsers());
  }, []);

  return (
    <Box mt={3}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <div>
        <SettingCard />
      </div>
    </Box>
  );
};

export default SuperHome;
