import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useTranslation } from "react-i18next"
import CloseIcon from "@mui/icons-material/Close"
import BubbleChartIcon from "@mui/icons-material/BubbleChart"

import {
	Divider,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material"
import { useDispatch } from "react-redux"
import { useIsMobile } from "../../hooks/useScreenType"
import { themePallete } from "../.."
import { getCurrency, getPrice } from "../../hooks/helpers"
import CalculateIcon from "@mui/icons-material/Calculate"
import DonutChart from "../../components/graphics/Dount"
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import TimelapseIcon from "@mui/icons-material/Timelapse"
import WaterDropIcon from "@mui/icons-material/WaterDrop"

const Statistics = ({
	open,
	handleClose,
	countryId,
	setShowRows,
	setInfo,
	setSingle,
	showRows,
	result,
	expand,
	boxesInfo,
	handleNested,
}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()

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
	return (
		<Modal
			open={open}
			onClose={handleClose}
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
						handleClose()
					}}
				>
					<CloseIcon fontSize='large' />
				</div>
				<Box>
					{showRows ? (
						<Box>
							<Button
								variant='outlined'
								onClick={() => {
									setShowRows(false)
									setInfo(null)
									setSingle(null)
								}}
							>
								{t("back-to-menu")}
							</Button>
							<Box sx={{ overflow: "auto" }}>
								<Box
									sx={{
										width: "100%",
										display: "table",
										tableLayout: "fixed",
									}}
								>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
												{result?.map(row => (
													<TableRow
														key={row.modeName}
														sx={{
															"&:last-child td, &:last-child th": {
																border: 0,
															},
														}}
													>
														<TableCell align='left'>{row.id}</TableCell>
														<TableCell align='left'>
															{row.type == 1 ? t("moika") : t("cux")}
														</TableCell>
														<TableCell align='left'>
                                                            								{getPrice(countryId, row.result)} {getCurrency(countryId)}
														</TableCell>
														<TableCell align='left'>
                                                            								{getPrice(countryId, row.caxs)} {getCurrency(countryId)}
														</TableCell>
														<TableCell align='left'>
															{Math.round(100 - row.ratio)} %
														</TableCell>
														<TableCell align='left'>
															{!expand ? (
																<Button
																	onClick={() => handleNested(row.id)}
																	variant='outlined'
																>
																	<CalculateIcon />
																</Button>
															) : expand == row.id ? (
																<Button
																	onClick={() => handleNested(row.id)}
																	variant='outlined'
																>
																	<CloseIcon fontSize='large' />
																</Button>
															) : null}
														</TableCell>
														<TableCell align='left'></TableCell>

														{expand === row.id ? (
															<TableRow>
																<TableCell colSpan='1'>
																	{row?.data ? (
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
																						WaterDropIcon
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
																				{row?.data?.map(row => (
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
					) : (
						boxesInfo?.map(i => {
							return (
								<>
									<hr />
									{i !== null && (
										<Box>
											<DonutChart
												benefit={100 - i?.ratio}
												expenses={i?.ratio}
												all={Number(i?.expense) + Number(i?.benefit)}
												expensesValue={i?.expense}
												benefitValue={i?.benefit}
												countryId={countryId}
												name={i?.box?.geolocation}
												openStatistics={null}
												singleId={i.box?.id}
												setSingle={setSingle}
												show={true}
												// setOpenStatistics={setOpenStatistics}
											/>
										</Box>
									)}
									<hr />
								</>
							)
						})
					)}
				</Box>
			</Box>
		</Modal>
	)
}

export default Statistics
