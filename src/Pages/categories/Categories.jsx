import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  addCategories,
  delCategories,
  editCategories,
  getCategories,
} from "../../store/actions/category-action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "3px solid #00a896",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const Categories = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.category.categories);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [nameHy, setNameHy] = useState(null);
  const [nameRu, setNameRu] = useState(null);
  const [nameEn, setNameEn] = useState(null);
  const [nameGe, setNameGe] = useState(null);
  const [nameAz, setNameAz] = useState(null);
  const handleCloseDelete = () => setOpenDelete(false);
 
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <Box m={3}>
      <Box>
        <h2> {t("categories")}</h2>
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
                <TableCell align="left">Hy</TableCell>
                <TableCell align="left">Ru</TableCell>
                <TableCell align="left">En</TableCell>
                <TableCell align="left">GE</TableCell>
                <TableCell align="left">AZ</TableCell>
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
                  <TableCell align="left">{row.nameHy}</TableCell>
                  <TableCell align="left">{row.nameRu}</TableCell>
                  <TableCell align="left">{row.nameEn}</TableCell>
                  <TableCell align="left">{row.nameGe}</TableCell>
                  <TableCell align="left">{row.nameAz}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setNameHy(row.nameHy);
                        setNameRu(row.nameRu);
                        setNameEn(row.nameEn);
                        setNameGe(row.nameGe);
                        setNameAz(row.nameAz);
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
                  dispatch(delCategories(currentId));
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
          setNameHy("");
          setNameRu("");
          setNameEn("");
          setNameGe("");
          setNameAz("");
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
                  label="Hy"
                  variant="outlined"
                  fullWidth
                  value={nameHy}
                  onChange={(e) => setNameHy(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ru"
                  variant="outlined"
                  fullWidth
                  value={nameRu}
                  onChange={(e) => setNameRu(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  label="En"
                  variant="outlined"
                  fullWidth
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  label="Ge"
                  variant="outlined"
                  fullWidth
                  value={nameGe}
                  onChange={(e) => setNameGe(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  label="Az"
                  variant="outlined"
                  fullWidth
                  value={nameAz}
                  onChange={(e) => setNameAz(e.target.value)}
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
                          editCategories(
                            currentId,
                            nameHy,
                            nameRu,
                            nameEn,
                            nameGe,
                            nameAz
                          )
                        );
                        setOpenEdit(false);
                        setNameHy("");
                        setNameRu("");
                        setNameEn("");
                        setNameGe("");
                        setNameAz("");
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
                  label="Hy"
                  variant="outlined"
                  fullWidth
                  value={nameHy}
                  onChange={(e) => setNameHy(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ru"
                  variant="outlined"
                  fullWidth
                  value={nameRu}
                  onChange={(e) => setNameRu(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  label="En"
                  variant="outlined"
                  fullWidth
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  label="Ge"
                  variant="outlined"
                  fullWidth
                  value={nameGe}
                  onChange={(e) => setNameGe(e.target.value)}
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  label="Az"
                  variant="outlined"
                  fullWidth
                  value={nameAz}
                  onChange={(e) => setNameAz(e.target.value)}
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
                          addCategories({
                            nameHy,
                            nameRu,
                            nameEn,
                            nameGe,
                            nameAz,
                          })
                        );
                        setOpenAdd(false);
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

export default Categories;
