import CloseIcon from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { themePallete } from "../.."
import { useIsMobile } from "../../hooks/useScreenType"
import { editItemInfo } from "../../store/actions/users-action"
import CalcRow from "./CalcRow"

const Calculator = ({ open, handleClose, data, itemInfoCalc, active }) => {
	const { t } = useTranslation()
	const { single } = useParams()
	const isMobile = useIsMobile()
	const dispatch = useDispatch()
	const [showSettings, setShowSettings] = useState(false)
	const [currentFunctionId, setCurrentFunctionID] = useState()
	const [currentData, setCurrentData] = useState(null)
	const [changedData, setChangedData] = useState({})
	const handleChangeData = (name, value) => {
		changedData[name] = value
		setChangedData(changedData)
		dispatch(
			editItemInfo({
				...changedData,
				functionId: currentFunctionId,
				ownerID: single,
				active,
			})
		)
		setChangedData({})
	}
	useEffect(() => {
		if (data !== null && data !== undefined && currentFunctionId) {
			setCurrentData(data?.filter(i => i.functionId == currentFunctionId)[0])
		}
	}, [data, currentFunctionId, single, showSettings])

	useEffect(() => {
		// dispatch(getItemInfoCalc(single));
		// !changedData && setChangedData
	}, [showSettings])

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: isMobile ? "100%" : 900,
		bgcolor: "background.paper",
		border: `3px solid ${themePallete}`,
		boxShadow: 24,
		p: 4,
		borderRadius: "10px",
		maxHeight: isMobile ? "100vh" : 600,
		minHeight: isMobile ? "100vh" : 400,
		maxWidth: isMobile ? 600 : 900,
		display: isMobile && "flex",
		justifyContent: isMobile && "center",
		alignItems: isMobile && "center",
		flexDirection: isMobile && "column",
		gap: isMobile && "20px",
		overflowY: "scroll",
		// marginTop: "30px",
	}

	const generateOptions = () => {
		const options = []
		for (let i = 2; i <= 100; i += 2) {
			options.push(i)
		}
		return options
	}
	const options = generateOptions()
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<div className='mobile-modal-close-btn' onClick={handleClose}>
					<CloseIcon fontSize='large' />
				</div>
				<Typography id='modal-modal-title' variant='h6' component='h2' mb={2}>
					{t("calc")}
				</Typography>

				<Box mt={2}>
					<Box sx={{ overflow: "auto" }}>
						<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label='simple table'>
									<TableHead>
										<TableRow>
											<TableCell align='left'>{t("rejim")}</TableCell>
											<TableCell align='left'>
												{/* <WaterDropIcon sx={{ color: themePallete }} /> */}
												{t("enginePower")}
											</TableCell>
											<TableCell align='left'>
												{/* <ElectricBoltIcon sx={{ color: themePallete }} /> */}
												{t("electricPrice")}
											</TableCell>{" "}
											<TableCell align='left'>
												{/* <BubbleChartIcon sx={{ color: themePallete }} /> */}
												{`${t("waterPerMinute")}`}
											</TableCell>{" "}
											<TableCell align='left'>
												{/* <TimelapseIcon sx={{ color: themePallete }} /> */}
												{`${t("waterPrice")} (1㎥)`}
											</TableCell>
											<TableCell align='left'>
												{/* <PlayCircleIcon sx={{ color: themePallete }} /> */}
												{`${t("modeValuePerLitre")} (1L)`}
											</TableCell>
											<TableCell align='right'>
												{`${t("PrcentOfRegulator")} (%)`}
											</TableCell>
											<TableCell align='right'>
												{t("PrcetOfModeValueFirst")}
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{itemInfoCalc?.map(row => (
											<TableRow
												key={row.modeName}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell component='th' scope='row' align='left'>
													{row?.order}
													{") "}
													{t(row.modeName)}
												</TableCell>
												<CalcRow
													row={row}
													data={
														data?.filter(i => i.functionId == row.functionId)[0]
													}
													active={active}
													ownerID={single}
													options={options}
												/>
												{/* <TableCell align='left'>{row.water}</TableCell>
													<TableCell align='left'>{row.electric}</TableCell>
													<TableCell align='left'>{row.modeValue}</TableCell>
													<TableCell align='left'>{row.seconds}</TableCell>
													<TableCell align='left'>{row.used}</TableCell>
													<TableCell align='right'>
														<Button
															variant='outlined'
															endIcon={
																<SettingsSuggestIcon
																	sx={{ color: themePallete }}
																/>
															}
															onClick={() => {
																setShowSettings(!showSettings)
																setCurrentData(
																	data?.filter(
																		i => i.functionId == row.functionId
																	)[0]
																)
																setCurrentFunctionID(row.functionId)
															}}
														>
															{t("settings")}
														</Button>
													</TableCell> */}
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
	)
}

export default Calculator
