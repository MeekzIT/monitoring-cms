import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { USERS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getOwnersOfUser,
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
import AddOwner from "./AddModal";

const UserDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.user.single);

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
        <Breadcrumbs aria-label="breadcrumb">
          <div>
            <HomeIcon />
          </div>
          <div onClick={() => navigate(USERS_PAGE)} className="steper-item">
            {t("users")}
          </div>
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
                color: "#00a896",
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
              <TableContainer component={Paper}>
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
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            onClick={() => {
                              dispatch(getOwnersOfUser(row.id));
                              dispatch(getSingleOwners(row.id));
                              navigate(`/user/${id}/owner/${row.id}`);
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
        )}
      </Box>
      <AddOwner open={open} handleClose={handleClose} />
    </div>
  );
};

export default UserDetail;
