import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../hooks/useScreenType";
import { useEffect, useState } from "react";
import {
  clearItemFiltred,
  editItemChanges,
  getBoxes,
  getItemCurrent,
  getItemDates,
  getItemFiltred,
  getItemInfo,
  getItemInfoCalc,
  getItemInfoCalc2,
  getItemInfoModes,
  getItemInfoPrcent,
  getItemSingle,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
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
import ItemFilters from "./ItemFilters";
import { compareWithUTC } from "../../hooks/helpers";
import CalculateIcon from "@mui/icons-material/Calculate";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import DonutChart from "../../components/graphics/Dount";
import { changeItemActivity } from "../../store/actions/auth-action";
import ItemField3 from "../../components/changeField/ItemFields3";
import ItemField2 from "../../components/changeField/ItemFields2";
import ItemField from "../../components/changeField/ItemFields";
import Calculator from "../../components/claculator/Calculator";
import Calculator2 from "../../components/claculator/Calculator2";

const Single = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, owner_id, user_id, single, active } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [filterOn, setFilterOn] = useState(false);
  const [changedData, setChangedData] = useState({});
  const [access, setAccess] = useState();

  const data = useSelector((state) => state.user.singleItem);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const dates = useSelector((state) => state.user.dates);
  const filtredDates = useSelector((state) => state.user.filtredDates);
  const itemInfo = useSelector((state) => state.user.itemIinfo);
  const itemInfoCalc = useSelector((state) => state.user.calcData);
  const itemInfoCalc2 = useSelector((state) => state.user.calcData2);
  const itemCurrentValue = useSelector((state) => state.user.currentValues);
  const prcemt = useSelector((state) => state.user.infoPrcent);
  useEffect(() => {
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id));
    dispatch(getItemSingle(single));

    dispatch(getItemCurrent({ single, active }));
    dispatch(getItemInfo(single, active));
    dispatch(getItemInfoPrcent(single));
    dispatch(getItemInfoModes(single));
    dispatch(getItemDates(single));
    if (active == 1) {
      dispatch(getItemInfoCalc(single));
    } else if (active == 2) {
      dispatch(getItemInfoCalc2(single));
    }
  }, []);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));

    setAccess(data?.access);
  }, [user, data]);

  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
  };

  const handleEditChanges = () => {
    dispatch(editItemChanges({ ...changedData, id: data.id }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => {
          if (user_id == "undefined") {
            navigate(`/boxes`);
          } else navigate(`/user/${user_id}/owner/${owner_id}/item/${id}`);
        }}
      >
        {t("back-to-menu")}
      </Button>
      <Grid
        spacing={1}
        sx={{
          padding: "0",
        }}
        container
      >
        <Grid item>
          {isSuper == "owner" ||
            (isSuper == "superAdmin" && (
              <>
                {/* <div>
                  <DonutChart
                    benefit={prcemt?.benefit}
                    expenses={prcemt?.expenses}
                  />
                </div> */}
                {active !== 3 && (
                  <div>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        color: "white",
                        fontSize: "20px",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      <CalculateIcon />
                      {t("calc")}
                    </Button>
                  </div>
                )}
              </>
            ))}
          {isSuper !== "owner" && isSuper !== "superAdmin" && data?.access && (
            <>
              {/* <div>
                <DonutChart
                  benefit={prcemt?.benefit}
                  expenses={prcemt?.expenses}
                />
              </div> */}
              {active !== 3 && (
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      color: "white",
                      fontSize: "20px",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <CalculateIcon />
                    {t("calc")}
                  </Button>
                </div>
              )}
            </>
          )}
        </Grid>
        <Grid item>
          <Typography id="modal-modal-title" variant="h3" component="h1">
            {t("device")} №-{data?.id}{" "}
            {compareWithUTC(data?.datatime) ? (
              <span className="online">{t("online")}</span>
            ) : (
              <span className="offline">{t("offline")}</span>
            )}
          </Typography>
          {(isSuper == "owner" || isSuper == "superAdmin") && (
            <>
              <hr style={{ width: "50vw" }} />
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: "40%",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Start
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={start}
                        label="Start"
                        onChange={(e) => setStart(e.target.value)}
                      >
                        {dates?.map((i) => (
                          <MenuItem
                            key={i}
                            value={i.slice(0, 10) + " " + "00:00:00+04"}
                          >
                            {i.slice(0, 10)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      width: "40%",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">End</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={end}
                        label="End"
                        onChange={(e) => setEnd(e.target.value)}
                      >
                        {dates
                          ?.filter((y) => y.slice(0, 10) !== start)
                          .map((i) => (
                            <MenuItem
                              key={i}
                              value={i.slice(0, 10) + " " + "00:00:00+04"}
                            >
                              {i.slice(0, 10)}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        dispatch(
                          getItemFiltred({
                            ownerID: data?.p2,
                            start,
                            end,
                            active,
                          })
                        );
                        setFilterOn(true);
                      }}
                    >
                      <FilterAltIcon sx={{ color: "#21726A" }} />
                    </Button>
                  </Box>

                  {(start || end) && (
                    <Box>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {
                          dispatch(clearItemFiltred(null));
                          setFilterOn(false);
                          setStart(null);
                          setEnd(null);
                        }}
                      >
                        <DeleteIcon sx={{ color: "#21726A" }} />
                      </Button>
                    </Box>
                  )}
                </Box>
                <ItemFilters
                  active={active}
                  filtredDates={filtredDates}
                  countryId={owner?.countryId}
                  itemCurrentValue={itemCurrentValue}
                />
              </Box>
            </>
          )}
          {isSuper == "owner" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography>{t("change-access")}</Typography>
              <FormControlLabel
                control={<Switch defaultChecked={access} />}
                label={t("change-access-text")}
                value={access}
                onChange={(e) => {
                  dispatch(
                    changeItemActivity({
                      id: data.p2,
                      access: !access,
                    })
                  );
                  setAccess(e.target.checked);
                }}
              />
              <hr style={{ width: "50vw" }} />
            </Box>
          )}
          <hr style={{ width: "50vw" }} />
          {isSuper == "owner" && (
            <>
              {data &&
                (active == 1 ? (
                  <ItemField
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : active == 3 ? (
                  <ItemField3
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : active == 2 ? (
                  <ItemField2
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : null)}
              <Box mt={3} mb={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleEditChanges}
                >
                  {t("savechanges")}
                </Button>
              </Box>
            </>
          )}
          {isSuper == "superAdmin" && (
            <>
              {data &&
                (active == 1 ? (
                  <ItemField
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : active == 3 ? (
                  <ItemField3
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : active == 2 ? (
                  <ItemField2
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : null)}
              <Box mt={3} mb={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleEditChanges}
                >
                  {t("savechanges")}
                </Button>
              </Box>
            </>
          )}
          {isSuper !== "superAdmin" && !data?.access && (
            <Box
              sx={{
                width: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <LockIcon sx={{ color: "#21726A" }} />
              <h1 style={{ color: "#21726A" }}>{t("block")}</h1>
            </Box>
          )}
          {isSuper !== "superAdmin" && data?.access && (
            <>
              {data &&
                (active == 1 ? (
                  <ItemField
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : active == 3 ? (
                  <ItemField3
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : active == 2 ? (
                  <ItemField2
                    data={data}
                    handleChangeData={handleChangeData}
                    values={changedData}
                  />
                ) : null)}
              <Box mt={3} mb={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleEditChanges}
                >
                  {t("savechanges")}
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
      {active == 1 ? (
        <Calculator
          open={open}
          handleClose={() => setOpen(false)}
          data={itemInfo}
          itemInfoCalc={itemInfoCalc}
          active={active}
        />
      ) : active == 2 ? (
        <Calculator2
          open={open}
          handleClose={() => setOpen(false)}
          data={itemInfo}
          itemInfoCalc={itemInfoCalc2}
          active={active}
          countryId={owner?.countryId}
        />
      ) : null}
    </Box>
  );
};

export default Single;
