import AddIcon from "@mui/icons-material/Add"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import EditIcon from "@mui/icons-material/Edit"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material"
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
import { useNavigate } from "react-router-dom"
import { themePallete } from "../.."
import { makeArray } from "../../hooks/makeArray"
import { useIsMobile } from "../../hooks/useScreenType"
import { getMe } from "../../store/actions/auth-action"
import { getCountries } from "../../store/actions/statistics-action"
import {
	anulateUser,
	destroyUsers,
	getSingleUser,
	getUsers,
} from "../../store/actions/users-action"
import AddUser from "./AddUser"
import EditUser from "./EditUser"

const UserPage = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [current, setCurrrent] = useState(null)

	const [anchorEl, setAnchorEl] = useState(null)
	const openMenu = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const [page, setPage] = useState(0)
	const [pages, setPages] = useState([])
	const data = useSelector(state => state.user.users)
	const count = useSelector(state => state.user.count)
	const countries = useSelector(state => state.statistics.countries)
	const user = useSelector(state => state.auth.admin)

	const [open, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const isMobile = useIsMobile()

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
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
	useEffect(() => {
		if (count) {
			setPages(makeArray(Math.ceil(count / 12)))
		}
	}, [count])

	useEffect(() => {
		dispatch(getCountries())
		dispatch(getMe())
	}, [])
	useEffect(() => {
		user && dispatch(getUsers(page))
	}, [page, user])

	return (
		<Box m={3}>
			<Box mb={2}>
				<h1>{t("users")}</h1>
				<Button variant='contained' onClick={handleOpen}>
					<AddIcon
						sx={{
							color: "white",
						}}
					/>
				</Button>
			</Box>
			<Box sx={{ overflow: "auto" }}>
				<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 320 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>{t("name")}</TableCell>
									{!isMobile && <TableCell align='left'></TableCell>}
									{!isMobile && (
										<TableCell align='left'>{t("email")}</TableCell>
									)}
									<TableCell align='left'>{t("country")}</TableCell>
									{!isMobile ? (
										<>
											<TableCell align='left'>{t("edit")}</TableCell>
											<TableCell align='left'>{t("delete")}</TableCell>
										</>
									) : (
										<TableCell align='left'>{t("settings")}</TableCell>
									)}
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map(row => (
									<TableRow
										key={row?.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell
											component='th'
											scope='row'
											onClick={() => {
												isMobile && navigate(`/user/${row.id}`)
											}}
										>
											{row.firstName} {row.lastName}
										</TableCell>
										{!isMobile && (
											<TableCell align='left'>
												<Button
													variant='contained'
													onClick={() => {
														navigate(`/user/${row.id}`)
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
										<TableCell
											align='left'
											onClick={() => {
												isMobile && navigate(`/user/${row.id}`)
											}}
										>
											{row.Country.name}
										</TableCell>
										{!isMobile ? (
											<>
												<TableCell align='left'>
													<Button
														variant='outlined'
														onClick={() => {
															setCurrrent(row.id)
															dispatch(getSingleUser(row.id))
															setOpenEdit(true)
														}}
													>
														<EditIcon />
													</Button>
												</TableCell>

												<TableCell align='left'>
													<Button
														variant='outlined'
														onClick={() => {
															setCurrrent(row.id)
															setOpenDel(true)
														}}
													>
														<RemoveRedEyeIcon />
													</Button>
												</TableCell>
											</>
										) : (
											<TableCell
												align='left'
												onClick={e => {
													setCurrrent(row?.id)
												}}
											>
												<Button
													id={row.id}
													variant='outlined'
													aria-controls={open ? "basic-menu" : undefined}
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
															id={row.id}
															fullWidth
															variant='outlined'
															endIcon={<EditIcon />}
															onClick={() => {
																dispatch(getSingleUser(current))
																setOpenEdit(true)
															}}
														>
															{t("edit")}
														</Button>
													</MenuItem>
													<MenuItem>
														<Button
															fullWidth
															endIcon={<RemoveRedEyeIcon />}
															variant='outlined'
															onClick={() => {
																// setCurrrent(row.id)
																setOpenDel(true)
															}}
														>
															{t("delete")}
														</Button>
													</MenuItem>
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
			<Box>
				<div className='pagBox'>
					<div className='arrowBack'>
						{pages.length - 1 == page ? (
							<ArrowBackIcon
								onClick={() => {
									setPage(page - 1)
								}}
							/>
						) : null}
					</div>
					{pages.length > 1 &&
						pages.map((s, index) => {
							return (
								<div
									key={index}
									className={page === s ? "ActivePagItem" : "pagItem"}
									onClick={() => {
										setPage(s)
									}}
									style={{
										border: `1px solid ${themePallete}`,
										color: themePallete,
										cursor: "pointer",
									}}
								>
									{s + 1}
								</div>
							)
						})}
					<div className='arrowBack'>
						{pages.length - 1 == page ? null : (
							<ArrowForwardIcon
								onClick={() => {
									setPage(page + 1)
								}}
							/>
						)}
					</div>
				</div>
			</Box>
			<Modal
				open={openDel}
				onClose={() => {
					setOpenDel(false)
					dispatch(anulateUser())
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
									dispatch(destroyUsers({id:current}))
									dispatch(getUsers(page))
									dispatch(anulateUser())
									setOpenDel(false)
								}}
							>
								Yes
							</Button>
						</div>
					</Typography>
				</Box>
			</Modal>
			<AddUser open={open} handleClose={handleClose} countries={countries} />
			{current && (
				<EditUser
					open={openEdit}
					handleClose={() => {
						dispatch(anulateUser())
						setOpenEdit(false)
					}}
					countries={countries}
				/>
			)}
		</Box>
	)
}

export default UserPage
