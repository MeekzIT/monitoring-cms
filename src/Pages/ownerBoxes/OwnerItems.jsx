import BubbleChartIcon from "@mui/icons-material/BubbleChart"
import CalculateIcon from "@mui/icons-material/Calculate"
import CircleIcon from "@mui/icons-material/Circle"
import CloseIcon from "@mui/icons-material/Close"
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import LocalAtmIcon from "@mui/icons-material/LocalAtm"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import PaymentIcon from "@mui/icons-material/Payment"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import TimelapseIcon from "@mui/icons-material/Timelapse"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import { Box, Button, Modal, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useTheme } from "@mui/material/styles"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { themePallete } from "../.."
import GenerateModal from "../../components/generateModal/GenerateModal"
import GoBack from "../../components/goBack/GoBack"
import DonutChart from "../../components/graphics/Dount"
import LineChart from "../../components/graphics/LineChart"
import { compareWithUTC, getCurrency } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
import {
	getBoxLinear,
	getBoxes,
	getSingleBoxInfo,
	getSingleOwners,
} from "../../store/actions/users-action"

const Items = () => {
	const { t } = useTranslation()
	const theme = useTheme()
	const navigate = useNavigate()
	const { id, box_id } = useParams()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const user = useSelector(state => state.user.single)
	const owner = useSelector(state => state.user.owner)
	const items = useSelector(state => state.user.items)
	const isSuper = useSelector(state => state.auth.isSuper)
	const boxLinear = useSelector(state => state.user.boxLinear)
	const location = useLocation()
	const [info, setInfo] = useState(null)
	const [selectedDate, handleDateChange] = useState()
	const [dountDate, handleDountDateChange] = useState()
	const [dountDate2, handleDountDateChange2] = useState()
	const boxesInfo = useSelector(state => state.user.boxesInfo)
	const singleBoxInfo = useSelector(state => state.user.singleBoxInfo)
	const [openStatistics, setOpenStatistics] = useState(false)
	const [expand, setExpand] = useState(false)
	const [openGenerate, setOpenGenerate] = useState(false)

	const handleNested = id => {
		if (typeof expand == "boolean") {
			setExpand(id)
		} else setExpand(false)
	}
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: isMobile ? "100%" : 800,
		bgcolor: "background.paper",
		border: `3px solid ${themePallete}`,
		boxShadow: 24,
		p: 4,
		borderRadius: "10px",
		minHeight: isMobile ? "100vh" : null,
		display: isMobile && "flex",
		justifyContent: isMobile && "center",
		alignItems: isMobile && "center",
		flexDirection: isMobile && "column",
		gap: isMobile && "20px",
	}
	useEffect(() => {
		dispatch(
			getSingleBoxInfo({
				ownerId: id,
				boxId: box_id,
				date: dountDate,
				endDate: dountDate2,
			})
		)
		if (!dountDate || !dountDate2) {
			dispatch(
				getBoxLinear({
					ownerId: id,
					date: selectedDate,
				})
			)
		} else {
			dispatch(
				getBoxLinear({
					ownerId: id,
					date: dountDate,
					endDate: dountDate2,
				})
			)
		}
		// dispatch(getSingleUser(user_id));
		dispatch(getBoxes(id, box_id))
	}, [])

	useEffect(() => {
		user && dispatch(getSingleOwners(id))
		// boxesInfo.length && setInfo(boxesInfo[0]);
	}, [user, selectedDate, dountDate, dountDate2])

	return (
		<div>
			<Box>
				<GoBack prevPath={location.pathname} />
			</Box>
			<hr />
			<div className='grapsBox'>
				<div className='grap'>
					<div className='grapsBox'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label='start'
									format='YYYY-MM-DD'
									value={dountDate}
									onChange={date =>
										handleDountDateChange(dayjs(date).format("YYYY-MM-DD"))
									}
									sx={{ width: "250px" }}
								/>
							</DemoContainer>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DatePicker"]}>
								<DatePicker
									label='end'
									format='YYYY-MM-DD'
									value={dountDate2}
									onChange={date =>
										handleDountDateChange2(dayjs(date).format("YYYY-MM-DD"))
									}
									sx={{ width: "250px" }}
								/>
							</DemoContainer>
						</LocalizationProvider>
						{(dountDate || dountDate2) && (
							<Button
								onClick={() => {
									handleDountDateChange(null)
									handleDountDateChange2(null)
								}}
							>
								clear filtres
							</Button>
						)}
					</div>
					{singleBoxInfo !== null && (
						<>
							<DonutChart
								benefit={100 - singleBoxInfo?.ratio}
								expenses={singleBoxInfo?.ratio}
								expensesValue={singleBoxInfo?.expense}
								benefitValue={singleBoxInfo?.benefit}
								countryId={owner?.countryId}
								openStatistics={openStatistics}
								setOpenStatistics={setOpenStatistics}
								show={true}
							/>
							<div>
								<hr />
								<Typography
									className='coint-show-heading'
									sx={{ color: themePallete }}
								>
									{" "}
									<MonetizationOnIcon sx={{ color: themePallete }} />
									<div> Coin - {singleBoxInfo?.coin}</div>
								</Typography>
								<hr />
								<Typography
									className='coint-show-heading'
									sx={{ color: themePallete }}
								>
									{" "}
									<LocalAtmIcon sx={{ color: themePallete }} />
									<div> Bill - {singleBoxInfo?.cash}</div>
								</Typography>
								<hr />
								<Typography
									className='coint-show-heading'
									sx={{ color: themePallete }}
								>
									<PaymentIcon sx={{ color: themePallete }} />
									<div> Cash Less - {singleBoxInfo?.bill}</div>
								</Typography>
								<hr />
							</div>
						</>
					)}
				</div>
				<Box className='grap'>
					{selectedDate && (
						<Button
							onClick={() => {
								handleDateChange()
							}}
						>
							clear filtres
						</Button>
					)}
					<LineChart
						benefit={boxLinear?.map(i => {
							return i.result
						})}
						expense={boxLinear?.map(i => {
							return i.caxs
						})}
						all={boxLinear?.map(i => {
							return i.all
						})}
						mont={selectedDate}
						startDate={dountDate}
						endDate={dountDate2}
					/>
				</Box>
			</div>

			<hr />
			<div>
				<hr />
				<Box sx={{ overflow: "auto" }}>
					<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 300 }} aria-label='simple table'>
								<TableBody>
									{items?.map(row => (
										<TableRow
											key={row.name}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
										>
											<TableCell
												onClick={() => {
													navigate(
														`/owner/${id}/item/${row.id}/${row.p2}/${row.p0}`
													)
												}}
												align='left'
											>
												ID-{row?.p2} {row?.name}
											</TableCell>
											{!isMobile && (
												<TableCell align='left'>
													<Button
														variant='contained'
														onClick={() => {
															navigate(
																`/owner/${id}/item/${row.id}/${row.p2}/${row.p0}`
															)
														}}
													>
														<RemoveRedEyeIcon
															sx={{
																color: "white",
															}}
														/>
													</Button>
												</TableCell>
											)}
											<TableCell align='left'>
												{row?.datatime && compareWithUTC(row?.datatime) ? (
													<span className='online'>
														<CircleIcon />
													</span>
												) : (
													<span className='offline'>
														<CircleIcon />
													</span>
												)}
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
						setOpenStatistics(false)
					}}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Typography id='modal-modal-title' variant='h6' component='h2'>
							{t("statistics")}
						</Typography>
						<div
							className='mobile-modal-close-btn'
							onClick={() => {
								setOpenStatistics(false)
							}}
						>
							<CloseIcon fontSize='large' />
						</div>
						<Box>
							<Box sx={{ overflow: "auto" }}>
								<Box
									sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
								>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 300 }} aria-label='simple table'>
											<TableHead>
												<TableRow>
													<TableCell align='left'>ID</TableCell>
													<TableCell align='left'>type</TableCell>
													<TableCell align='left'>benefit</TableCell>
													<TableCell align='left'>exspence</TableCell>
													<TableCell align='left'>prcent</TableCell>
													<TableCell>Expand</TableCell>
													<TableCell></TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{info?.allResult?.map(row => (
													<TableRow
														key={row.modeName}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell align='left'>{row.id}</TableCell>
														<TableCell align='left'>
															{row.type == 1 ? t("moika") : t("cux")}
														</TableCell>
														<TableCell align='left'>
															{row.result} {getCurrency(user?.countryId)}
														</TableCell>
														<TableCell align='left'>
															{row.caxs} {getCurrency(user?.countryId)}
														</TableCell>
														<TableCell align='left'>
															{Math.round(100 - row.ratio)} %
														</TableCell>
														<TableCell align='left'>
															{" "}
															<Button
																onClick={() => handleNested(row.id)}
																variant='outlined'
															>
																<CalculateIcon />
															</Button>
														</TableCell>
														<TableCell align='left'></TableCell>

														{expand === row.id ? (
															<TableRow>
																<TableCell colSpan='1'>
																	{row.data ? (
																		<Table
																			sx={{ minWidth: 300 }}
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
																				</TableRow>
																			</TableHead>
																			<TableBody>
																				{row.data?.map(row => (
																					<TableRow
																						key={row.modeName}
																						sx={{
																							"&:last-child td, &:last-child th":
																								{ border: 0 },
																						}}
																					>
																						<TableCell
																							component='th'
																							scope='row'
																							align='left'
																						>
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
			<GenerateModal
				open={openGenerate}
				setOpen={setOpenGenerate}
				ownerId={id}
			/>
		</div>
	)
}

export default Items
