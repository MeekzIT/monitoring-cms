import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { activityAdmin, getAdmins } from "../../store/actions/auth-action";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SettingsIcon from "@mui/icons-material/Settings";
import { useIsMobile } from "../../hooks/useScreenType";
import AddAdmin from "./AddAdmin";
import { getCountries } from "../../store/actions/statistics-action";
import GoBack from "../../components/goBack/GoBack";
import LockResetIcon from "@mui/icons-material/LockReset";
import ResetModal from "../../components/resetModal/ResetModal";
const Admins = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [activity, setActivity] = useState();
  const [currint, setCurrent] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = useSelector((state) => state.admins.admins);
  const countries = useSelector((state) => state.statistics.countries);
  const isSuper = useSelector((state) => state.auth.isSuper);
  useEffect(() => {
    dispatch(getAdmins());
    dispatch(getCountries());
  }, [openSettings]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: "background.paper",
    border: "3px solid #21726A",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    minHeight: isMobile ? "100vh" : null,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
  };

  return (
    <Box m={3}>
      <Box mb={2}>
        <h1>{t("admins")}</h1>
        <GoBack prevPath={location.pathname} />
        <Button variant="contained" onClick={handleOpen}>
          <AddIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell align="left">{t("email")}</TableCell>
                  <TableCell align="left">{t("active")}</TableCell>
                  <TableCell align="left">{t("settings")}</TableCell>
                  {isSuper == "superAdmin" && (
                    <TableCell align="left">{t("reset")}</TableCell>
                  )}
                  <TableCell align="left"></TableCell>
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
                          {t("active")}
                        </span>
                      )}
                    </TableCell>

                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setCurrent(row.id);
                          setActivity(row.block);
                          setOpenSettings(true);
                        }}
                      >
                        <SettingsIcon />
                      </Button>
                    </TableCell>

                    {isSuper == "superAdmin" && (
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(`/admin-user/${row.id}`);
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
      <Modal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>{t("activity")}</h1>
          <Typography>{t("block-requirement")}</Typography>
          <div
            className="mobile-modal-close-btn"
            onClick={() => setOpenSettings(false)}
          >
            <CloseIcon fontSize="large" />
          </div>
          <FormControlLabel
            required
            control={<Switch />}
            label={activity ? t("pasive") : t("active")}
            checked={!activity}
            onChange={(e) => {
              dispatch(
                activityAdmin({
                  id: currint,
                  activity: !activity,
                })
              );
              setActivity(!e.target.checked);
            }}
          />
        </Box>
      </Modal>
      <ResetModal
        open={openReset}
        handleClose={() => setOpenReset(false)}
        role="admin"
        currint={currint}
      />
      <AddAdmin open={open} handleClose={handleClose} countries={countries} />
    </Box>
  );
};

export default Admins;
