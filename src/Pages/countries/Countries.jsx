import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountries,
  delCountries,
  editCountries,
  getCountries,
} from "../../store/actions/statistics-action";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
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
const Countries = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.statistics.countries);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activeName, setActiveName] = useState(null);
  const [activeShort, setActiveShort] = useState(null);
  const handleCloseDelete = () => setOpenDelete(false);
  useEffect(() => {
    dispatch(getCountries());
  }, []);
  return (
    <Box m={3}>
      <Box>
        <h2> {t("countries")}</h2>
      </Box>
      <Box mb={3}>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          <AddIcon sx={{ color: "white" }} />
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Short</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.short}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setActiveName(row.name);
                        setActiveShort(row.short);
                        setCurrentId(row.id);
                        setOpenEdit(true);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() => {
                        setOpenDelete(true);
                        setCurrentId(row.id);
                      }}
                    >
                      <DeleteIcon sx={{ color: "white" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("delete")} ?
          </Typography>
          <Typography
            className="btnsBox"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <div>
              <Button
                variant="contained"
                onClick={handleCloseDelete}
                sx={{ color: "white" }}
              >
                No
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(delCountries(currentId));
                  handleCloseDelete();
                }}
              >
                Yes
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
          setActiveShort("");
          setActiveName("");
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
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={activeName}
                  onChange={(e) => setActiveName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Short"
                  variant="outlined"
                  fullWidth
                  value={activeShort}
                  onChange={(e) => setActiveShort(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenEdit(false)}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          editCountries(currentId, activeName, activeShort)
                        );
                        setOpenEdit(false);
                        setActiveShort("");
                        setActiveName("");
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
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={activeName}
                  onChange={(e) => setActiveName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Short"
                  variant="outlined"
                  fullWidth
                  value={activeShort}
                  onChange={(e) => setActiveShort(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenEdit(false)}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          addCountries({ name: activeName, short: activeShort })
                        );
                        setOpenAdd(false);
                        setActiveShort("");
                        setActiveName("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Countries;
