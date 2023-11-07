import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/category-action";

const ItemsMenu = ({ setShowMewnu, setActive, isOwner }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Typography
                        variant="h6"
                        component="h2"
                        className="active-steper-item"
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setShowMewnu(true);
                          setActive(row?.id);
                        }}
                      >
                        {t(row?.name)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>{" "}
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>
    </>
  );
};

export default ItemsMenu;
