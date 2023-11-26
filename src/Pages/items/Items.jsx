import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Modal, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { USERS_PAGE, ADMINS_PAGE } from "../../routing/pats";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import {
  getBoxes,
  getBoxesInfo,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import { useTheme } from "@mui/material/styles";
import { useIsMobile } from "../../hooks/useScreenType";
import { compareWithUTC } from "../../hooks/helpers";
import CircleIcon from "@mui/icons-material/Circle";
import DonutChart from "../../components/graphics/Dount";
import CloseIcon from "@mui/icons-material/Close";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CalculateIcon from "@mui/icons-material/Calculate";
import { getCurrency } from "../../hooks/helpers";
import TableHead from "@mui/material/TableHead";

const Items = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [info, setInfo] = useState(null);
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const items = useSelector((state) => state.user.items);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const boxesInfo = useSelector((state) => state.user.boxesInfo);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [expand, setExpand] = useState(false);
  const handleNested = (id) => {
    if (typeof expand == "boolean") {
      setExpand(id);
    } else setExpand(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 800,
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
  useEffect(() => {
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id, id));
    dispatch(
      getBoxesInfo({
        ownerId: owner_id,
      })
    );
  }, []);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
    boxesInfo && setInfo(boxesInfo?.filter((i) => i.box.id == id)[0]);
  }, [user, boxesInfo]);
  return (
    <div>
      <Box m={2}>
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
          <div
            onClick={() => navigate(`/user/${user?.id}`)}
            className="steper-item"
          >
            {t("users").slice(0, t("users").length - 1)} {"  "}
            {"("} {user?.firstName + " " + user?.lastName} {")"}
          </div>
          <div
            className="steper-item"
            onClick={() =>
              navigate(`/user/${user_id}/owner/${owner?.deviceOwner}`)
            }
          >
            {t("owners")} {"("} {owner?.firstName} {owner?.lastName} {")"}
          </div>
          <Typography color="text.primary" className="active-steper-item">
            {t("system")}
          </Typography>
        </Breadcrumbs>
      </Box>
      <hr />
      <Box>
        {info && (
          <DonutChart
            benefit={100 - info?.ratio}
            expenses={info?.ratio}
            expensesValue={info?.expense}
            benefitValue={info?.benefit}
            countryId={user?.countryId}
            openStatistics={openStatistics}
            setOpenStatistics={setOpenStatistics}
          />
        )}
      </Box>

      <hr />
      <div>
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {items?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">ID-{row.p2}</TableCell>
                      <TableCell align="left">
                        {row.active == 1
                          ? t("moika")
                          : row.active == 2
                          ? t("cux")
                          : t("change")}
                      </TableCell>
                      <TableCell align="left">
                        {compareWithUTC(row.datatime) ? (
                          <span className="online">
                            <CircleIcon />
                            {t("online")}
                          </span>
                        ) : (
                          <span className="offline">
                            <CircleIcon />
                            {t("offline")}
                          </span>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            // navigate(`/admin-user/${row.id}`);
                            navigate(
                              `/owner/${owner_id}/item/${id}/${row.p2}/${row.active}`
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
        <Modal
          open={openStatistics}
          onClose={() => {
            setOpenStatistics(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("statistics")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenStatistics(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>
            <Box>
              <Box sx={{ overflow: "auto" }}>
                <Box
                  sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
                >
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">ID</TableCell>
                          <TableCell align="left">type</TableCell>
                          <TableCell align="left">benefit</TableCell>
                          <TableCell align="left">exspence</TableCell>
                          <TableCell align="left">prcent</TableCell>
                          <TableCell>Expand</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {info?.allResult?.map((row) => (
                          <TableRow
                            key={row.modeName}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">
                              {row.type == 1 ? t("moika") : t("cux")}
                            </TableCell>
                            <TableCell align="left">
                              {row.result} {getCurrency(user?.countryId)}
                            </TableCell>
                            <TableCell align="left">
                              {row.caxs} {getCurrency(user?.countryId)}
                            </TableCell>
                            <TableCell align="left">
                              {Math.round(100 - row.ratio)} %
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Button
                                onClick={() => handleNested(row.id)}
                                variant="outlined"
                              >
                                <CalculateIcon />
                              </Button>
                            </TableCell>
                            <TableCell align="left"></TableCell>

                            {expand === row.id ? (
                              <TableRow>
                                <TableCell colSpan="1">
                                  {row.data ? (
                                    <Table
                                      sx={{ minWidth: 650 }}
                                      aria-label="simple table"
                                    >
                                      <TableHead>
                                        <TableRow>
                                          <TableCell align="left">
                                            {t("rejim")}
                                          </TableCell>
                                          <TableCell align="left">
                                            <WaterDropIcon
                                              sx={{ color: "#21726A" }}
                                            />
                                          </TableCell>
                                          <TableCell align="left">
                                            <ElectricBoltIcon
                                              sx={{ color: "#21726A" }}
                                            />
                                          </TableCell>{" "}
                                          <TableCell align="left">
                                            <BubbleChartIcon
                                              sx={{ color: "#21726A" }}
                                            />
                                          </TableCell>{" "}
                                          <TableCell align="left">
                                            <TimelapseIcon
                                              sx={{ color: "#21726A" }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {row.data?.map((row) => (
                                          <TableRow
                                            key={row.modeName}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                { border: 0 },
                                            }}
                                          >
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              align="left"
                                            >
                                              {t(row.modeName)}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.water}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.electric}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.modeValue}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.seconds}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  ) : (
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>firstValue</TableCell>
                                          <TableCell>secondValue</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow>
                                          <TableCell>
                                            {row.firstValue1}
                                          </TableCell>
                                          <TableCell>
                                            {row.secondValue1}
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  )}
                                </TableCell>
                              </TableRow>
                            ) : null}
                            <TableCell align="left">
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  navigate(
                                    `/owner/${id}/item/${user_id}/${row.id}/${row.type}`
                                    // /owner/:owner_id/item/:id/:single/:active
                                  );
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
            </Box>
          </Box>
        </Modal>
      </div>
      {/* )} */}
    </div>
  );
};

export default Items;
