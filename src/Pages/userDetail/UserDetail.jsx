import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ADMINS_PAGE, USERS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteOwner,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOwner from "./AddModal";
import GoBack from "../../components/goBack/GoBack";
import LockResetIcon from "@mui/icons-material/LockReset";
import ResetModal from "../../components/resetModal/ResetModal";
const UserDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.user.single);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const [openReset, setOpenReset] = useState(false);
  const [currint, setCurrent] = useState();
  useEffect(() => {
    dispatch(getSingleUser(id));
    setLoading(false);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Box m={3}>
        <GoBack prevPath={location.pathname} />
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

          <Typography color="text.primary" className="active-steper-item">
            {t("users").slice(0, t("users").length - 1)} {"  "}
            {"("} {data?.firstName + " " + data?.lastName} {")"}
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        {loading ? (
          <div className="loading-box">
            <CircularProgress
              sx={{
                color: "#21726A",
              }}
            />
          </div>
        ) : (
          <Box m={3}>
            <Box>
              <h1>
                {data?.firstName} {data?.lastName}
              </h1>
              <h4>{data?.email}</h4>
            </Box>
            <hr />

            <Box>
              <Box mb={2}>
                <h1>{t("owners")}</h1>
                <Button variant="contained" onClick={handleOpen}>
                  <AddIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </Button>
              </Box>
              <Box sx={{ overflow: "auto" }}>
                <Box
                  sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
                >
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("name")}</TableCell>
                          <TableCell align="left">{t("email")}</TableCell>
                          <TableCell align="left">{t("country")}</TableCell>
                          <TableCell align="left">{t("active")}</TableCell>
                          <TableCell align="left">
                            {t("Owner Device ID")}
                          </TableCell>
                          <TableCell align="left">{t("delete")}</TableCell>
                          {(isSuper == "superAdmin" || isSuper == "admin") && (
                            <TableCell align="left">{t("reset")}</TableCell>
                          )}
                          <TableCell align="left">
                            {t("lastPay")} / {t("paymentType")}
                          </TableCell>
                          <TableCell align="left"></TableCell>
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
                            <TableCell align="left">
                              {row.Country.name}
                            </TableCell>
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
                              {row?.deviceOwner}
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                variant="contained"
                                onClick={() => {
                                  dispatch(deleteOwner(row.id));
                                }}
                              >
                                <DeleteIcon
                                  sx={{
                                    color: "white",
                                  }}
                                />
                              </Button>
                            </TableCell>
                            {(isSuper == "superAdmin" ||
                              isSuper == "admin") && (
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

                            <TableCell align="left">
                              <Button
                                variant="contained"
                                onClick={() => {
                                  dispatch(getSingleOwners(row.id));
                                  navigate(
                                    `/user/${id}/owner/${row?.deviceOwner}`
                                  );
                                }}
                              >
                                <RemoveRedEyeIcon
                                  sx={{
                                    color: "white",
                                  }}
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <AddOwner open={open} handleClose={handleClose} />
      <ResetModal
        open={openReset}
        handleClose={() => setOpenReset(false)}
        role="owner"
        currint={currint}
      />
    </div>
  );
};

export default UserDetail;
