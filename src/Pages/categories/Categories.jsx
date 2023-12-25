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
import CloseIcon from "@mui/icons-material/Close";
import { useIsMobile } from "../../hooks/useScreenType";

const Categories = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const data = useSelector((state) => state.category.categories);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [nameHy, setNameHy] = useState(null);
  const handleCloseDelete = () => setOpenDelete(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    bgcolor: "background.paper",
    border: "3px solid #008491",
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
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">{t("name")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setNameHy(row.name);
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
                        dispatch(editCategories(currentId, nameHy));
                        setOpenEdit(false);
                        setNameHy("");
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
          <div
            className="mobile-modal-close-btn"
            onClick={() => setOpenAdd(false)}
          >
            <CloseIcon fontSize="large" />
          </div>
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
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpenEdit(false);
                        setOpenAdd(false);
                      }}
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
                          })
                        );
                        setOpenAdd(false);
                      }}
                    >
                      {t("add")}
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
