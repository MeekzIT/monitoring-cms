import BubbleChartIcon from "@mui/icons-material/BubbleChart"
import CalculateIcon from "@mui/icons-material/Calculate"
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import LockIcon from "@mui/icons-material/Lock"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import TimelapseIcon from "@mui/icons-material/Timelapse"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import {
	Box,
	Button,
	FormControlLabel,
	Grid,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { themePallete } from "../.."
import ItemField from "../../components/changeField/ItemFields"
import ItemField2 from "../../components/changeField/ItemFields2"
import ItemField3 from "../../components/changeField/ItemFields3"
import Calculator from "../../components/claculator/Calculator"
import Calculator2 from "../../components/claculator/Calculator2"
import GoBack from "../../components/goBack/GoBack"
import { compareWithUTC } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
import { changeItemActivity } from "../../store/actions/auth-action"
import {
	editItemChanges,
	getBoxes,
	getItemCurrent,
	getItemDates,
	getItemInfo,
	getItemInfoCalc,
	getItemInfoCalc2,
	getItemInfoModes,
	getItemInfoPrcent,
	getItemSingle,
	getSingleInfo,
	getSingleLinear,
} from "../../store/actions/users-action"
import DeteBox from "../../packages/dateBox/DateBox"
import { useMemo } from "react"

const Single = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { id, owner_id, user_id, single, active } = useParams()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const location = useLocation()
	const [open, setOpen] = useState(false)
	const [filterOn, setFilterOn] = useState(false)
	const [changedData, setChangedData] = useState({})
	const [access, setAccess] = useState()
	const [showDetails, setShowDetails] = useState(false)
	const [selectedDate, handleDateChange] = useState()
	const [dountDate, handleDountDateChange] = useState()
	const [dountDate2, handleDountDateChange2] = useState()
	const data = useSelector(state => state.user.singleItem)
	const isSuper = useSelector(state => state.auth.isSuper)
	const user = useSelector(state => state.user.single)
	const owner = useSelector(state => state.user.owner)
	const dates = useSelector(state => state.user.dates)
	const filtredDates = useSelector(state => state.user.filtredDates)
	const itemInfo = useSelector(state => state.user.itemIinfo)
	const singleLinear = useSelector(state => state.user.singleLinear)
	const itemInfoCalc = useSelector(state => state.user.calcData)
	const itemInfoCalc2 = useSelector(state => state.user.calcData2)
	const singleInfo = useSelector(state => state.user.singleInfo)
	const prcemt = useSelector(state => state.user.infoPrcent)

	const handleFilter = () => {
		dispatch(
			getSingleInfo({
				ownerId: single,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		dispatch(
			getSingleLinear({
				ownerId: single,
				date: selectedDate,
			})
		)
		if (!dountDate || !dountDate2) {
			dispatch(
				getSingleLinear({
					ownerId: single,
					date: selectedDate,
				})
			)
		} else {
			dispatch(
				getSingleLinear({
					ownerId: single,
					date: dountDate,
					endDate: dountDate2,
				})
			)
		}
	}
	useEffect(() => {
		// dispatch(getSingleUser(user_id));
		dispatch(getBoxes(owner_id))
		dispatch(getItemSingle(single))

		dispatch(getItemCurrent({ single, active }))
		dispatch(getItemInfo(single, active))
		dispatch(getItemInfoPrcent(single))
		dispatch(getItemInfoModes(single))
		dispatch(getItemDates(single))

		if (active == 1) {
			dispatch(getItemInfoCalc(single, dountDate))
		} else if (active == 2) {
			dispatch(getItemInfoCalc2(single))
		}
		dispatch(
			getSingleInfo({
				ownerId: single,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		dispatch(
			getSingleLinear({
				ownerId: single,
				date: selectedDate,
			})
		)
	}, [access])

	useEffect(() => {
		setAccess(data?.access)
	}, [data])

	const handleChangeData = (name, value) => {
		changedData[name] = value
		setChangedData(changedData)
	}

	const handleEditChanges = () => {
		dispatch(editItemChanges({ ...changedData, id: data.id }))

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const dateBox = useMemo(() => {
		return (
			<DeteBox
				dountDate={dountDate}
				dountDate2={dountDate2}
				selectedDate={selectedDate}
				openStatistics={false}
				info={singleInfo}
				linear={singleLinear}
				handleFilter={handleFilter}
				countryId={user?.countryId || null}
				setOpenStatistics={false}
				handleDountDateChange={handleDountDateChange}
				handleDountDateChange2={handleDountDateChange2}
				handleDateChange={handleDateChange}
			/>
		)
	}, [singleInfo, singleLinear])
	return (
		<Box p={2} fullWidth>
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
					<Typography id='modal-modal-title' variant='h3' component='h1'>
						{t("device")}
						{data?.datatime && compareWithUTC(data?.datatime) ? (
							<span className='online'>{t("online")}</span>
						) : (
							<span className='offline'>{t("offline")}</span>
						)}
					</Typography>

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
								onChange={e => {
									dispatch(
										changeItemActivity({
											id: data.p2,
											access: !access,
										})
									)
									setAccess(e.target.checked)
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
										{dateBox()}
										{showDetails ? (
											<Box mt={2} mb={2}>
												<Box sx={{ overflow: "auto" }}>
													<Box
														sx={{
															width: "100%",
															display: "table",
															tableLayout: "fixed",
														}}
													>
														<TableContainer component={Paper}>
															<Table
																sx={{ minWidth: 650 }}
																aria-label='simple table'
															>
																<TableHead>
																	<TableRow>
																		<TableCell align='left'>
																			{t("rejim")}
																		</TableCell>
																		<TableCell align='left'>
																			<WaterDropIcon
																				sx={{ color: themePallete }}
																			/>
																		</TableCell>
																		<TableCell align='left'>
																			<ElectricBoltIcon
																				sx={{ color: themePallete }}
																			/>
																		</TableCell>{" "}
																		<TableCell align='left'>
																			<BubbleChartIcon
																				sx={{ color: themePallete }}
																			/>
																		</TableCell>{" "}
																		<TableCell align='left'>
																			<TimelapseIcon
																				sx={{ color: themePallete }}
																			/>
																		</TableCell>
																		<TableCell align='left'>
																			<PlayCircleIcon
																				sx={{ color: themePallete }}
																			/>
																		</TableCell>
																	</TableRow>
																</TableHead>
																<TableBody>
																	{itemInfoCalc?.map(row => (
																		<TableRow
																			key={row.modeName}
																			sx={{
																				"&:last-child td, &:last-child th": {
																					border: 0,
																				},
																			}}
																		>
																			<TableCell
																				component='th'
																				scope='row'
																				align='left'
																			>
																				{row?.order}
																				{") "}
																				{t(row.modeName)}
																			</TableCell>
																			<TableCell align='left'>
																				{row.water}
																			</TableCell>
																			<TableCell align='left'>
																				{row.electric}
																			</TableCell>
																			<TableCell align='left'>
																				{row.modeValue}
																			</TableCell>
																			<TableCell align='left'>
																				{row.seconds}
																			</TableCell>
																			<TableCell align='left'>
																				{row.used}
																			</TableCell>
																		</TableRow>
																	))}
																</TableBody>
															</Table>
														</TableContainer>
													</Box>
												</Box>
											</Box>
										) : null}
										{(isSuper == "owner" || isSuper == "superAdmin") && (
											<>
												{active !== 3 && (
													<div>
														<Button
															variant='contained'
															size='large'
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
												variant='contained'
												size='large'
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
																variant='contained'
																size='large'
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
											variant='outlined'
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
							<LockIcon sx={{ color: themePallete }} />
							<h1 style={{ color: themePallete }}>{t("block")}</h1>
						</Box>
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
	)
}

export default Single
