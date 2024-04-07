import AddIcon from "@mui/icons-material/Add"
import AddCardIcon from "@mui/icons-material/AddCard"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import LockResetIcon from "@mui/icons-material/LockReset"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import SettingsIcon from "@mui/icons-material/Settings"
import {
	Box,
	Button,
	CircularProgress,
	Menu,
	MenuItem,
	Modal,
	Typography,
} from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { themePallete } from "../.."
import GoBack from "../../components/goBack/GoBack"
import ResetModal from "../../components/resetModal/ResetModal"
import { getCurrency } from "../../hooks/helpers"
import { useIsMobile } from "../../hooks/useScreenType"
import { getCountries } from "../../store/actions/statistics-action"
import {
	deleteOwner,
	getOwnerSystem,
	getSingleOwners,
	getSingleUser,
} from "../../store/actions/users-action"
import AddOwner from "./AddModal"
import EditUser from "./EditUser"
import OwnerSystemModal from "./OwnerSystemModal"

const UserDetail = () => {
	const { id } = useParams()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const isMobile = useIsMobile()
	const [loading, setLoading] = useState(true)
	const data = useSelector(state => state.user.single)
	const isSuper = useSelector(state => state.auth.isSuper)
	const singleData = useSelector(state => state.user.owner)
	const countries = useSelector(state => state.statistics.countries)
	const ownerActives = useSelector(state => state.user.ownerStatistics)
	const ownerSystem = useSelector(state => state.user.ownerSystem)

	const [openReset, setOpenReset] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openSystem, setOpenSystem] = useState(false)
	const [openDel, setOpenDel] = useState(false)

	const [anchorEl, setAnchorEl] = useState(null)
	const openMenu = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: isMobile ? "100%" : 400,
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
	const [currint, setCurrent] = useState()
	useEffect(() => {
		dispatch(getCountries())
		dispatch(getSingleUser(id))
		setLoading(false)
	}, [dispatch, id])

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleNavigate = (id, deviceOwner) => {
		isMobile && dispatch(getSingleOwners(id))
		isMobile && navigate(`/user/${id}/owner/${deviceOwner}`)
	}
	return (
		<div>
			<Box m={3}>
				<GoBack prevPath={location.pathname} />
			</Box>
			<Box>
				{loading ? (
					<div className='loading-box'>
						<CircularProgress
							sx={{
								color: themePallete,
							}}
						/>
					</div>
				) : (
					<Box m={3}>
						<Box>
							<h1>
								{data?.firstName} {data?.lastName}
							</h1>
							<h4>{data?.email}</h4>
						</Box>
						<hr />

						<Box>
							<Box mb={2}>
								<h1>{t("owners")}</h1>
								<h4 style={{ color: "green" }}>
									{t("active")} - {ownerActives?.active?.length}
								</h4>
								<h4 style={{ color: "red" }}>
									{t("pasive")} - {ownerActives?.pasiveve?.length}
								</h4>
								<Button variant='contained' onClick={handleOpen}>
									<AddIcon
										sx={{
											color: "white",
										}}
									/>
								</Button>
							</Box>
							<Box sx={{ overflow: "auto" }}>
								<Box
									sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
								>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 300 }} aria-label='simple table'>
											<TableHead>
												<TableRow>
													<TableCell>{t("name")}</TableCell>
													{!isMobile && <TableCell align='left'></TableCell>}

													{!isMobile && (
														<TableCell align='left'>{t("email")}</TableCell>
													)}
													{!isMobile && (
														<TableCell align='left'>{t("country")}</TableCell>
													)}
													{!isMobile && (
														<TableCell align='left'>{t("active")}</TableCell>
													)}
													{!isMobile && (
														<TableCell align='left'>
															{t("Owner Device ID")}
														</TableCell>
													)}
													{!isMobile && (
														<TableCell align='left'>{t("lastPay")}</TableCell>
													)}
													{isMobile && (
														<TableCell align='left'>
															{t("active")}
															{` / `}
															{t("lastPay")}
														</TableCell>
													)}
													{!isMobile && (
														<TableCell align='left'>{t("edit")}</TableCell>
													)}
													{isSuper === "superAdmin" && (
														<TableCell align='left'></TableCell>
													)}
													{!isMobile && (
														<TableCell align='left'>{t("delete")}</TableCell>
													)}
													{!isMobile && isSuper === "superAdmin" && (
														<TableCell align='left'>{t("reset")}</TableCell>
													)}
												</TableRow>
											</TableHead>
											<TableBody>
												{data?.Owners?.map(row => (
													<TableRow
														key={row.id}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell
															component='th'
															scope='row'
															onClick={() => {
																isMobile &&
																	handleNavigate(row.id, row?.deviceOwner)
															}}
														>
															{row.firstName} {row.lastName}
															{isMobile &&
																`/        Owner Device ID -  ${row?.deviceOwner}    `}
														</TableCell>
														{!isMobile && (
															<TableCell align='left'>
																<Button
																	variant='contained'
																	onClick={() => {
																		dispatch(getSingleOwners(row.id))
																		navigate(
																			`/user/${id}/owner/${row?.deviceOwner}`
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
														{!isMobile && (
															<TableCell align='left'>{row.email}</TableCell>
														)}
														{!isMobile && (
															<TableCell align='left'>
																{row.Country.name}
															</TableCell>
														)}
														<TableCell
															align='left'
															onClick={() => {
																isMobile &&
																	handleNavigate(row.id, row?.deviceOwner)
															}}
														>
															{row.subscribe ? (
																<span
																	style={{
																		color: "green",
																	}}
																>
																	{t("subscribe")}
																</span>
															) : (
																<span
																	style={{
																		color: "red",
																	}}
																>
																	{t("pasive")}
																</span>
															)}

															{isMobile && (
																<>
																	{"   "}
																	{row.lastPay ? row.lastPay : "-"} -{" "}
																	{row?.variant?.toUpperCase()}{" "}
																	{getCurrency(row?.countryId)}
																</>
															)}
														</TableCell>
														{!isMobile && (
															<TableCell align='left'>
																{row?.deviceOwner}
															</TableCell>
														)}
														{!isMobile && (
															<TableCell align='left'>
																{row.lastPay ? row.lastPay : "-"} /{" "}
																{row?.variant?.toUpperCase()}{" "}
																{getCurrency(row?.countryId)}
															</TableCell>
														)}
														{!isMobile ? (
															<>
																<TableCell align='left'>
																	<Button
																		variant='outlined'
																		onClick={() => {
																			dispatch(getSingleOwners(row.id))
																			setOpenEdit(true)
																		}}
																	>
																		<EditIcon />
																	</Button>
																</TableCell>
																{isSuper === "superAdmin" && (
																	<TableCell align='left'>
																		<Button
																			variant='outlined'
																			onClick={() => {
																				dispatch(getOwnerSystem(row.id))
																				setOpenSystem(true)
																			}}
																		>
																			<AddCardIcon />
																		</Button>
																	</TableCell>
																)}

																<TableCell align='left'>
																	<Button
																		variant='contained'
																		onClick={() => {
																			setCurrent(row?.id)
																			setOpenDel(true)
																		}}
																	>
																		<DeleteIcon
																			sx={{
																				color: "white",
																			}}
																		/>
																	</Button>
																</TableCell>
																{isSuper === "superAdmin" && (
																	<TableCell align='left'>
																		<Button
																			variant='outlined'
																			onClick={() => {
																				setCurrent(row.id)
																				setOpenReset(true)
																			}}
																		>
																			<LockResetIcon />
																		</Button>
																	</TableCell>
																)}
															</>
														) : (
															<TableCell
																align='left'
																onClick={e => {
																	setCurrent(row?.id)
																}}
															>
																<Button
																	id={row.id}
																	variant='outlined'
																	aria-controls={
																		open ? "basic-menu" : undefined
																	}
																	aria-haspopup='true'
																	aria-expanded={open ? "true" : undefined}
																	onClick={e => {
																		handleClick(e)
																	}}
																>
																	<SettingsIcon />
																</Button>
																<Menu
																	anchorEl={anchorEl}
																	open={openMenu}
																	onClose={() => {
																		setAnchorEl(null)
																	}}
																>
																	<MenuItem>
																		<Button
																			fullWidth
																			variant='outlined'
																			endIcon={<EditIcon />}
																			onClick={() => {
																				dispatch(getSingleOwners(currint))
																				setOpenEdit(true)
																			}}
																		>
																			{t("edit")}
																		</Button>
																	</MenuItem>
																	{isSuper === "superAdmin" && (
																		<MenuItem>
																			<Button
																				fullWidth
																				variant='outlined'
																				endIcon={<AddCardIcon />}
																				onClick={() => {
																					dispatch(getOwnerSystem(currint))
																					setOpenSystem(true)
																				}}
																			>
																				{t("cart")}
																			</Button>
																		</MenuItem>
																	)}
																	<MenuItem>
																		<Button
																			fullWidth
																			variant='outlined'
																			endIcon={<DeleteIcon />}
																			onClick={() => {
																				setOpenDel(true)
																			}}
																		>
																			{t("delete")}
																		</Button>
																	</MenuItem>
																	{isSuper === "superAdmin" && (
																		<MenuItem>
																			<Button
																				variant='outlined'
																				endIcon={<LockResetIcon />}
																				onClick={() => {
																					setCurrent(currint)
																					setOpenReset(true)
																				}}
																			>
																				{t("reset")}
																			</Button>
																		</MenuItem>
																	)}
																</Menu>
															</TableCell>
														)}
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</Box>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
			<Modal
				open={openDel}
				onClose={() => {
					setOpenDel(false)
				}}
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{t("delete")} ?
					</Typography>
					<Typography
						className='btnsBox'
						id='modal-modal-description'
						sx={{ mt: 2 }}
					>
						<div>
							<Button
								variant='contained'
								onClick={() => {
									setOpenDel(false)
								}}
								sx={{ color: "white" }}
							>
								No
							</Button>
						</div>
						<div>
							<Button
								variant='outlined'
								onClick={() => {
									dispatch(deleteOwner(currint))
									setOpenDel(false)
								}}
							>
								Yes
							</Button>
						</div>
					</Typography>
				</Box>
			</Modal>
			<AddOwner open={open} handleClose={handleClose} />
			<ResetModal
				open={openReset}
				handleClose={() => setOpenReset(false)}
				role='owner'
				currint={currint}
			/>
			{singleData && (
				<EditUser
					open={openEdit}
					handleClose={() => setOpenEdit(false)}
					countries={countries}
					data={singleData}
				/>
			)}
			{ownerSystem && (
				<OwnerSystemModal
					open={openSystem}
					handleClose={() => setOpenSystem(false)}
					data={ownerSystem}
				/>
			)}
		</div>
	)
}

export default UserDetail
