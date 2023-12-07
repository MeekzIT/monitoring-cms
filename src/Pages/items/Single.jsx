import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  getSingleInfo,
  getSingleLinear,
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
} from "@mui/material";
import { compareWithUTC } from "../../hooks/helpers";
import CalculateIcon from "@mui/icons-material/Calculate";
import LockIcon from "@mui/icons-material/Lock";
import DonutChart from "../../components/graphics/Dount";
import { changeItemActivity } from "../../store/actions/auth-action";
import ItemField3 from "../../components/changeField/ItemFields3";
import ItemField2 from "../../components/changeField/ItemFields2";
import ItemField from "../../components/changeField/ItemFields";
import Calculator from "../../components/claculator/Calculator";
import Calculator2 from "../../components/claculator/Calculator2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoBack from "../../components/goBack/GoBack";
import LineChart from "../../components/graphics/LineChart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Single = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, owner_id, user_id, single, active } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [filterOn, setFilterOn] = useState(false);
  const [changedData, setChangedData] = useState({});
  const [access, setAccess] = useState();
  const [selectedDate, handleDateChange] = useState();
  const [dountDate, handleDountDateChange] = useState();
  const data = useSelector((state) => state.user.singleItem);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const dates = useSelector((state) => state.user.dates);
  const filtredDates = useSelector((state) => state.user.filtredDates);
  const itemInfo = useSelector((state) => state.user.itemIinfo);
  const singleLinear = useSelector((state) => state.user.singleLinear);
  const itemInfoCalc = useSelector((state) => state.user.calcData);
  const itemInfoCalc2 = useSelector((state) => state.user.calcData2);
  const singleInfo = useSelector((state) => state.user.singleInfo);
  const prcemt = useSelector((state) => state.user.infoPrcent);
  useEffect(() => {
    // dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id));
    dispatch(getItemSingle(single));

    dispatch(getItemCurrent({ single, active }));
    dispatch(getItemInfo(single, active));
    dispatch(getItemInfoPrcent(single));
    dispatch(getItemInfoModes(single));
    dispatch(getItemDates(single));
    dispatch(
      getSingleInfo({
        ownerId: single,
        date: dountDate,
      })
    );
    dispatch(
      getSingleLinear({
        ownerId: single,
        date: selectedDate,
      })
    );
    if (active == 1) {
      dispatch(getItemInfoCalc(single));
    } else if (active == 2) {
      dispatch(getItemInfoCalc2(single));
    }
  }, [access, selectedDate, dountDate]);

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
    <Box p={2}>
      <Box p={2}>
        <GoBack prevPath={location.pathname} />
      </Box>
      <Grid
        spacing={1}
        sx={{
          padding: "0",
        }}
        container
      >
        <Grid p={2}>
          <Typography id="modal-modal-title" variant="h3" component="h1">
            {t("device")} №-{data?.id}{" "}
            {compareWithUTC(data?.datatime) ? (
              <span className="online">{t("online")}</span>
            ) : (
              <span className="offline">{t("offline")}</span>
            )}
          </Typography>
          {/* { */}

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
          {(isSuper !== "owner" || isSuper !== "superAdmin") &&
            data?.access && (
              <>
                {data && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          width: "45%",
                          padding: "0 10px",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="date"
                              format="YYYY-MM-DD"
                              onChange={(date) =>
                                handleDountDateChange(
                                  dayjs(date).format("YYYY-MM-DD")
                                )
                              }
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <DonutChart
                          benefit={100 - singleInfo?.ratio}
                          expenses={singleInfo?.ratio}
                          expensesValue={singleInfo?.expense}
                          benefitValue={singleInfo?.benefit}
                          countryId={owner?.countryId}
                          openStatistics={null}
                          singleId={null}
                          show={false}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "45%",
                          padding: "0 10px",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={[
                              "DatePicker",
                              "DatePicker",
                              "DatePicker",
                            ]}
                          >
                            <DatePicker
                              label={"date"}
                              views={["month", "year"]}
                              format="YYYY-MM"
                              onChange={(date) =>
                                handleDateChange(dayjs(date).format("YYYY-MM"))
                              }
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <LineChart
                          benefit={singleLinear?.map((i) => {
                            return i.result;
                          })}
                          expense={singleLinear?.map((i) => {
                            return i.caxs;
                          })}
                          all={singleLinear?.map((i) => {
                            return i.all;
                          })}
                        />
                      </Box>
                    </Box>
                    {(isSuper == "owner" || isSuper == "superAdmin") && (
                      <>
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
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          color: "white",
                          fontSize: "20px",
                        }}
                        onClick={() => setFilterOn(!filterOn)}
                      >
                        {filterOn ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        {filterOn ? t("hide") : t("set-parametrs")}
                      </Button>
                    </Box>
                    {isSuper !== "owner" &&
                      isSuper !== "superAdmin" &&
                      data?.access && (
                        <>
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
                    {filterOn && active == 1 ? (
                      <ItemField
                        data={data}
                        handleChangeData={handleChangeData}
                        values={changedData}
                      />
                    ) : filterOn && active == 3 ? (
                      <ItemField3
                        data={data}
                        handleChangeData={handleChangeData}
                        values={changedData}
                      />
                    ) : filterOn && active == 2 ? (
                      <ItemField2
                        data={data}
                        handleChangeData={handleChangeData}
                        values={changedData}
                      />
                    ) : null}
                  </>
                )}
                {filterOn && (
                  <Box mt={3} mb={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleEditChanges}
                    >
                      {t("savechanges")}
                    </Button>
                  </Box>
                )}
              </>
            )}
          {isSuper !== "owner" && isSuper !== "superAdmin" && !data?.access && (
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
          {/* {(isSuper !== "owner" || isSuper !== "superAdmin") &&
            data?.access && (
              <>
                {data &&
                  (active == 1
                    ? filterOn && (
                        <ItemField
                          data={data}
                          handleChangeData={handleChangeData}
                          values={changedData}
                        />
                      )
                    : active == 3
                    ? filterOn && (
                        <ItemField3
                          data={data}
                          handleChangeData={handleChangeData}
                          values={changedData}
                        />
                      )
                    : active == 2
                    ? filterOn && (
                        <ItemField2
                          data={data}
                          handleChangeData={handleChangeData}
                          values={changedData}
                        />
                      )
                    : null)}
                <Box mt={3} mb={3}>
                  {filterOn && (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleEditChanges}
                    >
                      {t("savechanges")}
                    </Button>
                  )}
                </Box>
              </>
            )} */}
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

// (isSuper == "owner" || isSuper == "superAdmin") && (
//   <>
//     <hr style={{ width: "50vw" }} />
//     <Box
//       sx={{
//         display: "flex",
//         gap: "5px",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           gap: "15px",
//         }}
//       >
//         <Box
//           sx={{
//             width: "40%",
//           }}
//         >
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">
//               Start
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={start}
//               label="Start"
//               onChange={(e) => setStart(e.target.value)}
//             >
//               {dates?.map((i) => (
//                 <MenuItem
//                   key={i}
//                   value={i.slice(0, 10) + " " + "00:00:00+04"}
//                 >
//                   {i.slice(0, 10)}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <Box
//           sx={{
//             width: "40%",
//           }}
//         >
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">End</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={end}
//               label="End"
//               onChange={(e) => setEnd(e.target.value)}
//             >
//               {dates
//                 ?.filter((y) => y.slice(0, 10) !== start)
//                 .map((i) => (
//                   <MenuItem
//                     key={i}
//                     value={i.slice(0, 10) + " " + "00:00:00+04"}
//                   >
//                     {i.slice(0, 10)}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <Box>
//           <Button
//             variant="outlined"
//             size="large"
//             onClick={() => {
//               dispatch(
//                 getItemFiltred({
//                   ownerID: data?.p2,
//                   start,
//                   end,
//                   active,
//                 })
//               );
//               setFilterOn(true);
//             }}
//           >
//             <FilterAltIcon sx={{ color: "#21726A" }} />
//           </Button>
//         </Box>

//         {(start || end) && (
//           <Box>
//             <Button
//               variant="outlined"
//               size="large"
//               onClick={() => {
//                 dispatch(clearItemFiltred(null));
//                 setFilterOn(false);
//                 setStart(null);
//                 setEnd(null);
//               }}
//             >
//               <DeleteIcon sx={{ color: "#21726A" }} />
//             </Button>
//           </Box>
//         )}
//       </Box>
//       <ItemFilters
//         active={active}
//         filtredDates={filtredDates}
//         countryId={owner?.countryId}
//         itemCurrentValue={itemCurrentValue}
//       />
//     </Box>
//   </>
// )}
