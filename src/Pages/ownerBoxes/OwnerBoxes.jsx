import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { OWNER_ITEMS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changeBoxSettings,
  getBoxes,
  getSingleBox,
} from "../../store/actions/users-action";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import GenerateModal from "../../components/generateModal/GenerateModal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "3px solid #21726A",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const OwnerBoxes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.auth.admin);

  const data = useSelector((state) => state.user.boxes);
  const [open, setOpen] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState(null);
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    dispatch(getBoxes(owner?.deviceOwner));
  }, []);
  return (
    <div>
      <Box m={3}>
        <Box>
          <h1>
            {owner?.firstName} {owner?.lastName}
          </h1>
          <h4>{owner?.email}</h4>
        </Box>
        <hr />
        <Box>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => setOpenGenerate(true)}
          >
            {t("add")}
          </Button>
        </Box>
        <hr />
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("name")}</TableCell>
                  <TableCell align="left">{t("geolocation")}</TableCell>
                  <TableCell align="left">{t("edit")}</TableCell>
                  <TableCell align="left"></TableCell>
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
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setName(row.name);
                          setGeo(row.geolocation);
                          setCurrentId(row.id);
                          setOpen(true);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          dispatch(getSingleBox(row.id));
                          navigate(`/owner-items/${owner?.deviceOwner}`);
                        }}
                      >
                        <RemoveRedEyeIcon />
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
        open={open}
        onClose={() => {
          setOpen(false);
          setGeo("");
          setName("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("edit")}
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t("name")}
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("geolocation")}
                  variant="outlined"
                  fullWidth
                  value={geo}
                  onChange={(e) => setGeo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          changeBoxSettings({
                            id: currentId,
                            name,
                            geolocation: geo,
                          })
                        );
                        setOpen(false);
                        setGeo("");
                        setName("");
                      }}
                    >
                      {t("edit")}
                    </Button>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <GenerateModal
        open={openGenerate}
        setOpen={setOpenGenerate}
        ownerId={owner.id}
      />
    </div>
  );
};

export default OwnerBoxes;
