import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/users-action";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { getCountries } from "../../store/actions/statistics-action";
import { makeArray } from "../../hooks/makeArray";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GoBack from "../../components/goBack/GoBack";
import ResetModal from "../../components/resetModal/ResetModal";
import LockResetIcon from "@mui/icons-material/LockReset";

const AdminUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const data = useSelector((state) => state.user.users);
  const count = useSelector((state) => state.user.count);
  const countries = useSelector((state) => state.statistics.countries);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const [openReset, setOpenReset] = useState(false);
  const [currint, setCurrent] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / 12)));
    }
  }, [count]);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    dispatch(getUsers(page, id));
  }, [page, id]);

  return (
    <Box m={3}>
      <Box mb={2}>
        <h1>{t("users")}</h1>
        <GoBack prevPath={location.pathname} />
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">{t("email")}</TableCell>
                  <TableCell align="left">{t("country")}</TableCell>
                  <TableCell align="left">{t("active")}</TableCell>
                  {(isSuper == "superAdmin" || isSuper == "admin") && (
                    <TableCell align="left">{t("reset")}</TableCell>
                  )}
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
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(`/user/${row.id}`);
                        }}
                      >
                        <RemoveRedEyeIcon
                          sx={{
                            color: "white",
                          }}
                        />
                      </Button>
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
                    {(isSuper == "superAdmin" || isSuper == "admin") && (
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setCurrent(row.id);
                            setOpenReset(true);
                          }}
                        >
                          <LockResetIcon />
                        </Button>
                      </TableCell>
                    )}
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
      </Box>
      <Box>
        <div className="pagBox">
          <div className="arrowBack">
            {pages.length - 1 == page ? (
              <ArrowBackIcon
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            ) : null}
          </div>
          {pages.length > 1 &&
            pages.map((s, index) => {
              return (
                <div
                  key={index}
                  className={page === s ? "ActivePagItem" : "pagItem"}
                  onClick={() => {
                    setPage(s);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {s + 1}
                </div>
              );
            })}
          <div className="arrowBack">
            {pages.length - 1 == page ? null : (
              <ArrowForwardIcon
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            )}
          </div>
        </div>
      </Box>
      <ResetModal
        open={openReset}
        handleClose={() => setOpenReset(false)}
        role="user"
        currint={currint}
      />
    </Box>
  );
};

export default AdminUser;
