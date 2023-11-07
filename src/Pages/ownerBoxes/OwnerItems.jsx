import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { USERS_PAGE, ADMINS_PAGE, BOXES_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getBoxes,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { useIsMobile } from "../../hooks/useScreenType";
import { compareWithUTC, getCurrency } from "../../hooks/helpers";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ItemsMenu from "../items/ItemsMenu";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Items = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const items = useSelector((state) => state.user.items);
  const isSuper = useSelector((state) => state.auth.isSuper);

  const [data, setData] = useState(null);
  const [showMenu, setShowMewnu] = useState(false);
  const [active, setActive] = useState(null);
  useEffect(() => {
    dispatch(getBoxes(id));
  }, []);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);

  useEffect(() => {
    setData(items?.filter((i) => i.p0 == active));
  }, [active]);

  return (
    <div>
      <Box m={2}></Box>
      {!showMenu ? (
        <ItemsMenu
          setShowMewnu={setShowMewnu}
          setActive={setActive}
          isOwner={true}
        />
      ) : (
        <div>
          <Button variant="outlined" onClick={() => setShowMewnu(false)}>
            {t("back-to-menu")}
          </Button>
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {data?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {compareWithUTC(row.datatime) ? (
                            <span className="online">{t("online")}</span>
                          ) : (
                            <span className="offline">{t("offline")}</span>
                          )}
                        </TableCell>
                        <TableCell align="left">ID-{row.p2}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            onClick={() => {
                              // navigate(`/admin-user/${row.id}`);
                              navigate(
                                `/user/${user_id}/owner/${owner_id}/item/${id}/${row.p2}/${active}`
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
        </div>
      )}
    </div>
  );
};

export default Items;
